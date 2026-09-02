import { registerUrl } from "@/constant/endpoints";

export const register = async (
  data: { name: string; email: string; password: string },
  navNext: () => void,
) => {
  try {
    const response = await fetch(registerUrl, {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });

    const resData = await response.json();

    if (resData.message) {
      alert(resData.message);
      navNext();
    }
  } catch (e) {
    console.log(e);
    alert("An Error occured please try later");
  }
};
