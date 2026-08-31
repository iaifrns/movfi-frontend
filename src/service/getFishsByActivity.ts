import { getFishsUrl } from "@/constant/endpoints";

export const getFishByActivity = async (activityId: string) => {
  try {
    const response = await fetch(getFishsUrl + `/${activityId}`, {
      method: "GET",
      credentials: "include",
    });
    const data = await response.json();

    //console.log(data)
    return data;
  } catch (e) {
    console.log(e);
  }
};
