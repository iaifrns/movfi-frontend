import { getActivitiesUrl, postActiveUrl } from "@/constant/endpoints";
import type { ActivityResponse } from "@/types/activity";

export const getActivities = async (setLoading: (v: boolean) => void, setData:(v:ActivityResponse[])=>void) => {
  try {
    setLoading(true);
    const response = await fetch(getActivitiesUrl);
    const data = await response.json();
    setData(data)
  } catch (e) {
    console.log(e);
  } finally {
    setLoading(false);
  }
};

export const getOneActivityById = async (activityId: string, setActivity:(v:ActivityResponse)=>void) => {
    try{
        const response = await fetch(postActiveUrl+`/get_activity_by_id/${activityId}`)

        const data = await response.json()

        setActivity(data)
    }catch(e){
        console.log(e)
    }
}