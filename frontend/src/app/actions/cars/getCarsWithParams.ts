"use server";

import { EXTERNAL_API_URL } from "@/lib/const";
import { CarItem } from "@/types/cars";

export async function getCarsWithParams(params: string): Promise<CarItem[]> {
  try {
    const res = await fetch(`${EXTERNAL_API_URL}/v1/cars${params ? `?${params}`:""}`, {
      next: {tags: ["cars", params]},
      cache: "force-cache",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch cars. Status code: " + res.status);
    }
    
    const cars = await res.json();
    return cars;

  } catch (error) {
    console.error("Error in getCars:", error);
    throw new Error("Something went wrong while fetching cars.");
  }
}

