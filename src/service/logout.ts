import api from "@/api/axios";

export const logout = async (navigate: () => void) => {
  document.cookie = "access_token=;";
  localStorage.removeItem("activity_key");
  await api.post("auth/logout");
  // redirect
  navigate();
};
