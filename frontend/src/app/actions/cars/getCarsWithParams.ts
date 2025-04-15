"use server";

import axios from "@/lib/axios";
import { CarItem } from "@/types/cars";

export default async function getCarsWithFilters(params: string, token?: string | null): Promise<CarItem[]> {
  const header = token ? { Authorization: `Bearer ${token}` } : {};
  const response = await axios.get(`/v1/cars?${params}`, {
    headers: header
  });
  return response.data;
}
