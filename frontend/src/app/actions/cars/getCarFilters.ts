"use server";

import { BASE_URL } from "@/lib/const";
import { FilterData } from "@/types/filter";

export async function getCarFilters(): Promise<FilterData> {
  const response = await fetch(`${BASE_URL}/v1/cars/filters`, {
    headers: { "Cache-Control": "max-age=300, stale-while-revalidate=600" },
    next: { revalidate: 300 },
  });
  if (!response.ok) {
    throw new Error(`Fetch error: ${response.status}`);
  }
  return response.json();
}
