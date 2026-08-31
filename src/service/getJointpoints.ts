import {
  allFramesJointPointsUrl,
  framesJointPointsUrl,
} from "@/constant/endpoints";

export const getEachFrameJointPoint = async (fishId: string) => {
  try {
    const response = await fetch(framesJointPointsUrl + fishId, {
      method: "GET",
      credentials: "include",
    });

    const data = await response.json();

    return data;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const getGeneralJointPoint = async (fishId: string) => {
  try {
    const response = await fetch(allFramesJointPointsUrl + fishId, {
      method: "GET",
      credentials: "include",
    });
    const data = await response.json();

    return data;
  } catch (e) {
    console.log(e, "this is 21445");
    return null;
  }
};
