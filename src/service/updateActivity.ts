import { updateActivityUrl } from "@/constant/endpoints";
import type { ActivityInput, ActivityResponse } from "@/types/activity";

export const updateActivity = async (
  activityId: string,
  activity: ActivityInput,
  setActivity: (v: ActivityResponse) => void,
) => {
  try {
    const response = await fetch(updateActivityUrl + activityId, {
      method: "Put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(activity),
    });

    const data = await response.json();

    setActivity(data);
  } catch (e) {
    console.log(e);
  }
};
