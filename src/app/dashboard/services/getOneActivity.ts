import { getOneActiveUrl } from "@/constant/endpoints";

export const getOneActivity = async (setActivity: (v: any) => void) => {
  try {
    const result = await fetch(getOneActiveUrl);
    const data = await result.json()
    setActivity(data);
  } catch (e) {
    console.log(e);
  }
};
