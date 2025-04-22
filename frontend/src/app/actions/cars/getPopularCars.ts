import { api } from "@/lib/api";
import { CarItem } from "@/types/cars";
import { cookies } from "next/headers";

const getPopularCars = async (page: number, limit: number): Promise<CarItem[]> => {
  const offset = (page - 1) * limit;
  const urlEndpoint = `/v1/cars?page=${page}&limit=${limit}&offset=${offset}`;
  const cookieStore = await cookies();
  try {
    const response = await api.get(urlEndpoint, cookieStore.get("access_token")?.value ? {
      headers: {
        Authorization: `Bearer ${cookieStore.get("access_token")?.value}`
      }
    } : {});
    return response.data;
  } catch (error) {
    console.error("Error fetching recommended cars:", error);
    throw new Error("Failed to fetch recommended cars.");
  }
};

export default getPopularCars;