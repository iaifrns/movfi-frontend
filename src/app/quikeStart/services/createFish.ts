import { postFishUrl } from "@/constant/endpoints";

type Fish = {
  name: string;
  note: string;
  behavior: string;
  weight: number;
  length: number;
  activity_id: string;
  file: any
};

export const createFish = async (
  fish: Fish,
  setData: (v: any) => void,
) => {
  try {
    const response = await fetch(postFishUrl, {
      method: 'Post',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fish),
    });

    const data = await response.json();

    setData(data);
  } catch (e) {
    console.log(e);
  }
};
