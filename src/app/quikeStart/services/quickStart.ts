import { supabase } from "@/client/supabase";
import { createActivity } from "./createActivity";
import { createFish } from "./createFish";
import * as XLSX from "xlsx";
import { supabaseBucket } from "@/constant/endpoints";

type Fish = {
  name: string;
  species: string;
  note: string;
  behavior: string;
  weight: number;
  length: number;
};

interface FishData {
  name: string;
  species: string;
  weight: number | string;
  length: number | string;
  [key: string]: any; // For dynamic headers
}

// Parse Excel files
const parseExcel = (
  file: File,
): Promise<{ data: FishData[]; headers: string[] }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });

        // Get first sheet
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        // Convert to JSON
        const jsonData = XLSX.utils.sheet_to_json(worksheet, {
          defval: "", // Default value for empty cells
        });

        if (jsonData && jsonData.length > 0) {
          // Clean up headers
          const headers = Object.keys(jsonData[0] as {}).map((h) =>
            h.trim().toLowerCase().replace(/\s+/g, "_"),
          );

          // Rename keys in data
          const cleanData = jsonData.map((row: any) => {
            const cleanRow: any = {};
            Object.keys(row).forEach((key, index) => {
              cleanRow[headers[index] || key] = row[key];
            });
            return cleanRow;
          });

          resolve({
            data: cleanData,
            headers: headers,
          });
        } else {
          reject(new Error("No data found in Excel file"));
        }
      } catch (err) {
        reject(
          new Error(
            `Excel parsing error: ${err instanceof Error ? err.message : "Unknown error"}`,
          ),
        );
      }
    };

    reader.onerror = () => {
      reject(new Error("Failed to read file"));
    };
    console.log(file);
    reader.readAsArrayBuffer(file);
  });
};

function checkMissingValues(
  data: Record<string, number>[],
  expectedKeys?: string[],
) {
  // If expectedKeys not provided, get all unique keys from all objects
  if (!expectedKeys) {
    const allKeys = new Set<string>();
    data.forEach((obj) => {
      Object.keys(obj).forEach((key) => allKeys.add(key));
    });
    expectedKeys = Array.from(allKeys);
  }

  const results = {
    totalObjects: data.length,
    expectedKeys: expectedKeys,
    missingCount: 0,
    objectsWithMissing: 0,
    missingDetails: [] as {
      index: number;
      missingKeys: string[];
      missingCount: number;
    }[],
    keyMissingStats: {} as Record<string, number>,
  };

  // Check each object
  data.forEach((obj, index) => {
    const missingKeys: string[] = [];

    expectedKeys!.forEach((key) => {
      // Check if key exists and value is not undefined/null/NaN
      if (
        !(key in obj) ||
        obj[key] === undefined ||
        obj[key] === null ||
        Number.isNaN(obj[key])
      ) {
        missingKeys.push(key);

        // Track missing count per key
        if (!results.keyMissingStats[key]) {
          results.keyMissingStats[key] = 0;
        }
        results.keyMissingStats[key]++;
      }
    });

    if (missingKeys.length > 0) {
      results.objectsWithMissing++;
      results.missingCount += missingKeys.length;
      results.missingDetails.push({
        index,
        missingKeys,
        missingCount: missingKeys.length,
      });
    }
  });

  return results;
}

const checkXYStructure = (headers: string[]): boolean => {
  let count = 0;
  for (let i = 0; i < headers.length; i++) {
    if (parseFloat(headers[i])) {
      count++;
    }
  }

  return count * 2 == headers.length;
};

export const quickStart = async (
  active: { name: string; description: string },
  fish: Fish,
  file: File,
  setProgress: (v: string) => void,
  setData: (active:any, fish:any, fileData:Record<string, number>[]) => void
) => {
  let data = {
    activity: { id: "", name: "", user_id: 0 },
    fish: undefined,
  };

  await createActivity({ ...active, user_id: 1 }, (v) => {
    data = { ...data, activity: v };
  });

  if (data.activity) {
    setProgress(`Processing file ${file.name} ...`);
    const result = await parseExcel(file);
    setProgress("Checking if all frames has a X and Y axeses");

    console.log(result)

    if (checkXYStructure(result.headers)) {
      setProgress("Checking for missing values ...");
      const res = checkMissingValues(result.data, result.headers);

      if (res.missingCount == 0) {
        setProgress("Process Uploading file ...");
        const { data: response, error } = await supabase.storage
          .from(supabaseBucket)
          .upload(
            `${data.activity.user_id}/${data.activity.id}/${file.name}`,
            file,
          );

        if (error) {
          console.log(error);
        } else {
          console.log(response);
          setProgress("Processing creation of the Fish information ...");

          await createFish(
            { ...fish, activity_id: data.activity.id, file: response },
            (v) => (data = { ...data, fish: v }),
          );

          

          setData(data.activity, data.fish, result.data)
        }
      }
    }
  }
};
