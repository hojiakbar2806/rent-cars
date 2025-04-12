"use server";

import { BASE_URL } from "@/lib/const";
import { CarItem } from "@/types/cars";

export async function getCars(): Promise<CarItem[] | null> {
    try {
        const response = await fetch(`${BASE_URL}/v1/cars`, {
            headers: { "Cache-Control": "max-age=300, stale-while-revalidate=600" },
            next: { revalidate: 300 },
        });
        return response.json();
    }
    catch {
        return null
    }
}
