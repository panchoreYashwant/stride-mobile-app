import { apiClient } from "./apiClient";

export const fetchHomeItems = async () => {
  const response = await apiClient.get("/posts");
  return (response.data || []).map((item) => ({
    id: item.id,
    title: item.title,
    body: item.body,
  }));
};
