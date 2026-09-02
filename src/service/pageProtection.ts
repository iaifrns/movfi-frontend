import api from "@/api/axios";
import { baseUrl } from "@/constant/endpoints";
import { login } from "@/constant/routs";
import type { ActivityResponse } from "@/types/activity";
import type { User } from "@/types/user";
import { getActivity } from "./checkActivity";

export const verifyToken = async () => {
  try {
    const response = await api.get(baseUrl + "auth/me");

    const current_user = response.data;

    return current_user;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const pageProtection = async (
  goToLogin: (_: string) => void,
  setUser: (_: User) => void,
  setLoading: (_: boolean) => void,
  activityKey: string,
  setActivities: (_: []) => void,
  navQuick: ()=>void,
  setActivity: (_:ActivityResponse) => void
) => {
  const user = await verifyToken();

  console.log(user)

  if (!user) goToLogin(login);

  setUser(user);

  getActivity(setLoading).then((data) => {
    if (data.length == 0) {
      navQuick();
    }

    setActivities(data);
    const selectedActivity = localStorage.getItem(activityKey);
    if (
      selectedActivity &&
      data.filter((i: any) => i.id == selectedActivity).length > 0
    ) {
      setActivity(data.filter((i: any) => i.id == selectedActivity)[0]);
    } else {
      localStorage.setItem(activityKey, data[0].id);
      setActivity(data[0]);
    }
  });
};
