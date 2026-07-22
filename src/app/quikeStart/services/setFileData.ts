import { postFileUrl } from "@/constant/endpoints";
import type { FileDataStructure } from "@/types/fish";

export const setFileData = async (
  fileData: Record<string, number>[],
  fileName: string,
  fishId: string,
  setData: (_: FileDataStructure) => void,
) => {
  try {
    const response = await fetch(postFileUrl, {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        file_name: fileName,
        data: fileData,
        fish_id: fishId,
      }),
    });

    const data = await response.json();
    setData(data);
  } catch (e) {
    console.log(e);
  }
};
