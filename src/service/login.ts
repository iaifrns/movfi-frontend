import api from "@/api/axios";
import type { User } from "@/types/user";

export const login = async (
  data: { email: string; password: string },
  navNext: () => void,
  setUSer: (_: User) => void,
) => {
  try {
    const response = await api.post(
      "/auth/login",
      { ...data },
    );

    const resData = response.data;

    console.log(response);

    if (resData.id) {
      setUSer(resData);
      document.cookie = `access_token=${resData.token}`
      navNext();
    }
  } catch (e) {
    console.log(e);
    alert("Please check your credentails and try again");
  }
};
