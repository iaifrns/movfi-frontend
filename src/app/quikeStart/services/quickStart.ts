import { supabase } from "@/client/supabase";
import { quickSetup2Url, quickSetupUrl, supabaseBucket } from "@/constant/endpoints";
import type { SimulatedData } from "@/types/fish";
import * as XLSX from "xlsx";

type Fish = {
  name: string;
  species: string;
  behavior: string;
  weight: number;
  length: number;

  body_points?: number;
  fps?: number;
  duration?: number;
  max_amplitude?: number;
  tail_beat_frequency?: number;
  wave_length?: number;
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
          header: 1,
        });

        if (jsonData && jsonData.length > 0) {
          // Clean up headers
          const headers: string[] = [];
          const rowList = jsonData[0] as string;

          for (let i = 0; i < rowList.length; i++) {
            if (i % 2 == 0) {
              let letter = !isNaN(Number(rowList[i]))
                ? rowList[i]
                : rowList[i + 1];

              headers.push(letter + "x");
              headers.push(letter + "y");
              i++;
            }
          }

          jsonData.shift();

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
  let countX = 0;
  let countY = 0;
  for (let i = 0; i < headers.length; i++) {
    if (headers[i].includes("x")) {
      countX++;
    } else if (headers[i].includes("y")) {
      countY++;
    }
  }

  return countX + countY == headers.length;
};

const quickStartEndPoint = async (
  bodyData: {
    fish: Fish;
    activity: { name: string; description: string };
    file_data: { file_name: string; data: FishData[] };
  },
  file: any,
) => {
  try {
    const response = await fetch(quickSetupUrl, {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        activity: { ...bodyData.activity, user_id: 1 },
        fish: { ...bodyData.fish, file: file, activity_id: "0" },
        file_data: { ...bodyData.file_data, fish_id: "" },
      }),
      credentials: "include",
    });

    const data = await response.json();

    return data;
  } catch (e) {
    console.log(e);
  }
};

const quickStartEndPoint2 = async (bodyData: {
  fish: Fish;
  activity: { name: string; description: string };
}) => {
  console.log("it is on the api call")
  try {
    const response = await fetch(quickSetup2Url, {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        activity: { ...bodyData.activity, user_id: 1 },
        fish: { ...bodyData.fish, activity_id: "0" },
      }),
      credentials: "include",
    });

    const data = await response.json();

    return data;
  } catch (e) {
    console.log(e);
  }
};

export const quickStart = async (
  active: { name: string; description: string },
  fish: Fish,
  extraData: File | SimulatedData,
  setProgress: (v: string) => void,
  setData: (active: any, fish: any, fileData: any) => void,
) => {
  let data = {
    activity: { id: "", name: "", user_id: 1 },
    fish: undefined,
  };

  /* await createActivity({ ...active, user_id: 1 }, (v) => {
    data = { ...data, activity: v };
  }); */

  if (extraData instanceof File) {
    const file = extraData as File;
    setProgress(`Processing file ${file.name} ...`);
    const result = await parseExcel(file);
    setProgress("Checking if all frames has a X and Y axeses");

    console.log(result.headers, result.data);

    if (checkXYStructure(result.headers)) {
      console.log("right here");
      setProgress("Checking for missing values ...");
      const res = checkMissingValues(result.data, result.headers);
      if (res.missingCount == 0) {
        setProgress("Process Uploading file ...");
        const { data: response, error } = await supabase.storage
          .from(supabaseBucket)
          .upload(`${data.activity.user_id}/${active.name}/${file.name}`, file);

        if (error) {
          console.log(error);
          alert(error.message);
        } else {
          console.log(response);
          setProgress("Processing creation of the Fish information ...");

          /* await createFish(
            { ...fish, activity_id: data.activity.id, file: response },
            (v) => (data = { ...data, fish: v }),
          ); */

          const responseData = await quickStartEndPoint(
            {
              fish: {
                ...fish,
                duration: fish.duration || 0,
                fps: fish.fps || 0,
                body_points: fish.body_points || 0,
                max_amplitude: fish.max_amplitude || 0,
                tail_beat_frequency: fish.tail_beat_frequency || 0,
                wave_length: fish.wave_length || 0,
              },
              activity: active,
              file_data: { file_name: file.name, data: result.data },
            },
            response,
          );

          if (responseData.activity) {
            setData(
              responseData.activity,
              responseData.fish,
              responseData.file_data,
            );
          } else {
            const { error } = await supabase.storage
              .from(supabaseBucket)
              .remove([file.name, response.path, response.fullPath]);

            if (error) {
              console.log(error);
            }
          }
        }
      }
    } else {
      alert(
        "The structure of the file is not correct it lakes some x and y axises of some frames",
      );
    }
  } else {
    const responseData = await quickStartEndPoint2({
      fish: {
        ...fish,
        duration: fish.duration || 5,
        fps: fish.fps || 30,
        body_points: fish.body_points || 100,
        max_amplitude: fish.max_amplitude || 5,
        tail_beat_frequency: fish.tail_beat_frequency || 2,
        wave_length: fish.wave_length || 1.2,
      },
      activity: active,
    });

    if (responseData.activity) {
      setData(responseData.activity, responseData.fish, responseData.file_data);
    }
  }
};
