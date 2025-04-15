"use server";

import axios from "@/lib/axios";
import { CarItem } from "@/types/cars";

export async function getCarById(id: number, token?: string|null): Promise<CarItem> {
  const header = token ? { Authorization: `Bearer ${token}` } : {};
  const response = await axios.get(`/v1/cars/${id}`, {
    headers: header
  })
  return response.data
}
