"use server";

import { externalApi } from "@/lib/api";
import { NewCarForm } from "@/lib/validations/dashboard";
import { revalidatePath, revalidateTag } from 'next/cache'
import { getToken } from "../auth/getToken";

export async function postCar(data: NewCarForm) {
  try {
    const token = await getToken();
    if (!token) return null;
    const res = await externalApi.post("/v1/cars", { ...data, car_type_id: Number(data.car_type_id) }, {
      headers: {Authorization: `Bearer ${token}`},
    });

    revalidateTag("cars");
    revalidatePath("/");
    revalidatePath("/dashboard/cars-list");

    return res.data

  } catch (error) {
    console.error("Error in postCar:", error);
    throw new Error("Something went wrong while posting car.");
  }
}