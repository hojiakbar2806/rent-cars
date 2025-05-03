"use server";

import { EXTERNAL_API_URL } from "@/lib/const";
import { FilterData } from "@/types/filter";


export async function getCarsFilter(): Promise<FilterData> {
  try {
    
    const res =  await fetch(`${EXTERNAL_API_URL}/v1/cars/filters`, {
      next: {tags: ["filters"]},
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

