import api from "@/api/axios";
import { getActivitiesUrl } from "@/constant/endpoints";

export const getActivity = async (setLoading: (v: boolean) => void) => {
  setLoading(true);
  let result = [];
  try {
    const response = await api.get(getActivitiesUrl);
    result = await response.data;
  } catch (e) {
    console.log(e);
  } finally {
    setLoading(false);
    return result;
  }
};
