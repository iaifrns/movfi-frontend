import { getOneActiveUrl, postActiveUrl } from "@/constant/endpoints";
import { activityKey } from "@/constant/localStorage";

const getActivity = async (id?: string|null) => {
  if (id) {
    const result = await fetch(postActiveUrl + `/get_activity_by_id/${id}`);
    return result;
  } else {
    const result = await fetch(getOneActiveUrl);
    return result;
  }
};

export const getOneActivity = async (setActivity: (v: any) => void) => {
  try {
    const activityId = localStorage.getItem(activityKey);
    console.log(activityId, "this is the activity key")
    const data = await getActivity(activityId)
   
    setActivity(data);
  } catch (e) {
    console.log(e);
  }
};
