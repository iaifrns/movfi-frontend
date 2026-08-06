import { getFileDataByFish } from "@/service/getFileDataByFish";
import { getFishByActivity } from "@/service/getFishsByActivity";
import { getGeneralJointPoint } from "@/service/getJointpoints";
import type { Fish } from "@/types/fish";

export const checkFishAndFileData = async (
  fishId: any,
  fileId: any,
  activityId: string,
  setFish: (_: any) => void,
  setFileData: (_: any) => void,
) => {
  if (!fishId) {
    let fish: Fish;
    const fishs = await getFishByActivity(activityId);

    fish = fishs[0];

    if (fish.id) {
      setFish(fish);
      if (!fileId) {
        const fileDataList = await getFileDataByFish(fish.id);

        if (fileDataList[0]) {
          setFileData(fileDataList[0]);
        }
      }
    }
  } else {
    if (!fileId) {
      const fileDataList = await getFileDataByFish(fishId);

      if (fileDataList[0]) {
        setFileData(fileDataList[0]);
      }
    }
  }
};

export const checkFishFileDataAndJointPoints = async (
  fishId: any,
  activityId: string,
  setFish: (_: any) => void,
  setFileData: (_: any) => void,
  setJintPoints: (_: any) => void,
) => {
  if (!fishId) {
    let fish: Fish;
    const fishs = await getFishByActivity(activityId);

    fish = fishs[0];

    if (fish.id) {
      setFish(fish);
      await Promise.all([
        getFileDataByFish(fish.id),
        getGeneralJointPoint(fish.id),
      ]).then(([fileDataList, joinPoints]) => {
        if (fileDataList[0]) {
          setFileData(fileDataList[0]);
        }
        if (joinPoints) {
          setJintPoints(joinPoints);
        }
      });
    }
  } else {
    await Promise.all([
      getFileDataByFish(fishId),
      getGeneralJointPoint(fishId),
    ]).then(([fileDataList, joinPoints]) => {
      if (fileDataList[0]) {
        setFileData(fileDataList[0]);
      }
      if (joinPoints) {
        setJintPoints(joinPoints);
      }
    });
  }
};
