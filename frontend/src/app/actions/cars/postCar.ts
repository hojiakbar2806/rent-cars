"use server";

import axios from "@/lib/axios";
import { NewCarForm } from "@/components/pages/new-car/CarForm";
import { revalidatePath } from "next/cache";

export default async function postCar(data: NewCarForm) {
    const images = new FormData()
    const files = data.images as File[]
    files.map((image) => images.append('files', image))
    try {
        const imageRes = await axios.post("/v1/files/upload/", images, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        data.images = imageRes.data
        console.log(data)
        await axios.post("/v1/cars", data);
        revalidatePath("/dashboard/cars-list");
        return { message: "Mashina yaratildi" };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data.detail[0].msg);
        }
        throw new Error("Qandaydur xatolik");
    }
}
