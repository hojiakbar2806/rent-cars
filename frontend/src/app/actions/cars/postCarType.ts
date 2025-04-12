"use server";

import axios from "@/lib/axios";
import { NewCarTypeForm } from "@/app/(root)/dashboard/car-type-list/new/page";
import { revalidatePath } from "next/cache";

export default async function postCarType(data: NewCarTypeForm) {
    try {
        await axios.post("/v1/car-types", data);
        revalidatePath("/dashboard/car-type-list");
        return { message: "Mashina turi yaratildi" };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data.detail[0].body);
        }
        throw new Error("Qandaydur xatolik");
    }
}
