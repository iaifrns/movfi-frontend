import { updateFishUrl } from "@/constant/endpoints";
import type { FishInput } from "@/types/fish";

export const updateFishData = async (
  fishId: string,
  fish: FishInput,
  setFishInfo: (v: FishInput) => void,
) => {
  try {
    const response = await fetch(updateFishUrl + fishId, {
      method: "Put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fish),
    });

    const data = await response.json();

    console.log(data);
    setFishInfo(data);
  } catch (e) {
    console.log(e);
  }
};
