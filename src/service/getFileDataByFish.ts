import {
  getAllFileDataByFishUrl,
  getFileDataByFishUrl,
} from "@/constant/endpoints";

export const getFileDataByFish = async (fishId: string) => {
  try {
    const response = await fetch(getFileDataByFishUrl + fishId, {
      method: "GET",
      credentials: "include",
    });

    const data = await response.json();

    return data;
  } catch (e) {
    console.log(e);
  }
};

export const getAllFileDataByFish = async (fishId: string) => {
  try {
    const response = await fetch(getAllFileDataByFishUrl + fishId, {
      method: "GET",
      credentials: "include",
    });

    const data = await response.json();

    return data;
  } catch (e) {
    console.log(e);
  }
};
