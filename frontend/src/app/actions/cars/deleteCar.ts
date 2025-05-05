"use server"

import { externalApi } from "@/lib/api";
import { revalidatePath, revalidateTag } from 'next/cache'
import { getToken } from "../auth/getToken";

export async function deleteCar(id: number) {
    try {
        const token = await getToken();
        if (!token) return null;
        const res = await externalApi.delete(`/v1/cars/${id}`, {
            headers: {Authorization: `Bearer ${token}`},
        });

        revalidateTag("cars");
        revalidatePath("/");
        revalidatePath("/dashboard/cars-list");

        return res.data

    } catch (error) {
        console.error("Error in deleteCar:", error);
        throw new Error("Something went wrong while deleting car.");
    }
}