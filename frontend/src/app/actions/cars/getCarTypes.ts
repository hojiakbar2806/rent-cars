"use server";

import { BASE_URL } from "@/lib/const";
import { CarType } from "@/types/cars";

export async function getCarTypes(): Promise<CarType[] | null> {
    try {
        const response = await fetch(`${BASE_URL}/v1/car-types`, {
            headers: { "Cache-Control": "max-age=300, stale-while-revalidate=600" },
            next: { revalidate: 300 },
        });
        return response.json();
    }
    catch {
        return null
    }
}
