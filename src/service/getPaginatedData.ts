import { getDataUrl } from "@/constant/endpoints";

export const getPaginatedData = async (
  fileId: string,
  page: number,
  setData: (_: Record<string, any>[]) => void,
) => {
  try {
    const response = await fetch(`${getDataUrl}${fileId}/${page}`, {
      method: "GET",
      credentials: "include",
    });

    const data = await response.json();

    setData(data);
  } catch (e) {
    console.log(e);
  }
};
