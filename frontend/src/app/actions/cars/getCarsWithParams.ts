"use server";

import axios from "@/lib/axios";
import { CarItem } from "@/types/cars";

export default async function getCarsWithFilters(
  params: string
): Promise<CarItem[]> {
  const response = await axios.get(`/v1/cars?${params}`);
  return response.data;
}
