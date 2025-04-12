"use server";

import { BASE_URL } from "@/lib/const";
import { CarItem } from "@/types/cars";

export async function getCarById(id: number): Promise<CarItem> {
  const response = await fetch(`${BASE_URL}/v1/cars/${id}`, {
    headers: { "Cache-Control": "max-age=300, stale-while-revalidate=600" },
    next: { revalidate: 300 },
  });
  if (!response.ok) {
    throw new Error(`Fetch error: ${response.status}`);
  }
  return response.json();
}
