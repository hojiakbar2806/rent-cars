"use server";

import axios from "@/lib/axios";
import { CarItem } from "@/types/cars";

export async function getCarById(id: number): Promise<CarItem> {
  const response = await axios.get(`/v1/cars/${id}`)
  return response.data
}
