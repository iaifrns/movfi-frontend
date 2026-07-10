import { postFishUrl } from "@/constant/endpoints";

type Fish = {
  name: string;
  note: string;
  behavior: string;
  weight: number;
  lenght: number;
};

export const createFish = async (
  fish: Fish,
  setData: (v: any) => void,
) => {
  try {
    const response = await fetch(postFishUrl, {
      headers: {
        "Contact-Type": "application/json",
      },
      body: JSON.stringify(fish),
    });

    const data = await response.json();

    setData(data);
  } catch (e) {
    console.log(e);
  }
};
