import type { Fish } from "@/app/quikeStart";
import { getAllFileDataByFish } from "@/service/getFileDataByFish";
import { getFishByActivity } from "@/service/getFishsByActivity";
import type { FileDataStructure } from "@/types/fish";

export const getFishandData = async (
  setFish: (_: Fish) => void,
  setFileData: (_: FileDataStructure) => void,
  activityId: string,
  fishId?: string,
  fileDataId?: string,
) => {
  if (!fishId) {
    let fish: any;
    await getFishByActivity(activityId).then((data) => {
      setFish(data[0]);
      fish = data[0];
    });

    if (fish.id) {
      await getAllFileDataByFish(fish.id).then((data) => {
        setFileData(data[0]);
      });
    }
  } else {
    if (!fileDataId) {
      await getAllFileDataByFish(fishId).then((data) => setFileData(data[0]));
    }
  }
};
