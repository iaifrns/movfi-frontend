import { getFishsUrl } from "@/constant/endpoints";
import type { Fish } from "@/types/fish";

export const getFishByActivity = async (
  activityId: string,
  setFishs: (v: Fish[]) => void,
) => {
  try {
    const response = await fetch(getFishsUrl + `/${activityId}`);
    const data = await response.json();

    console.log(data)
    setFishs(data);
  } catch (e) {
    console.log(e);
  }
};
