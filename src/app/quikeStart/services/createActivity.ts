import { postActiveUrl } from "@/constant/endpoints";

export const createActivity = async (
  activity: { name: string; description: string, user_id: number },
  setData: (v: any) => void,
) => {
  try {
    const response = await fetch(postActiveUrl, {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(activity),
    });

    const data = await response.json();

    console.log(data);
    setData(data);
  } catch (e) {
    console.log(e);
  }
};
