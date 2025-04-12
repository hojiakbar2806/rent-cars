"use server";

import axios from "@/lib/axios";
import { NewUserForm } from "@/app/(root)/dashboard/users-list/new/page";
import { revalidatePath } from "next/cache";

export default async function postUser(data: NewUserForm) {
    console.log(data);
    try {
        await axios.post("/v1/users", data);
        revalidatePath("/dashboard/users-list");
        return { message: "Foydalanuvchi yaratildi" };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data.detail[0].body);
        }
        throw new Error("Qandaydur xatolik");
    }
}
