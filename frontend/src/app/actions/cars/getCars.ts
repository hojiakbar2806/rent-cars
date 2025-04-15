"use server";

import axios from "@/lib/axios";
import { CarItem } from "@/types/cars";

export async function getCars(filterBy: "all" | "popular", page?: number): Promise<CarItem[] | null> {
    const params = new URLSearchParams();
    params.set("filter", filterBy);
    if (page) {
        params.set("limit", "5");
        params.set("page", String(page));
        params.set("offset", String((page - 1) * 5));
    }
    const response = await axios.get(`/v1/cars?${params.toString()}`);
    return response.data
}
