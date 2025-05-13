"use server";

import { externalApi } from "@/lib/api";
import {  NewCarTypeForm } from "@/lib/validations/dashboard";
import { revalidatePath, revalidateTag } from 'next/cache'
import { getToken } from "../auth/getToken";

export async function postCarType(carData: NewCarTypeForm) {
  try {
    const token = await getToken();
    if (!token) return null;
    const res = await externalApi.post("/v1/car-types", carData, {
      headers: {Authorization: `Bearer ${token}`},
    });

    revalidateTag("filters");
    revalidatePath("/dashboard/car-type-list");
    revalidatePath("/dashboard/cars-list/new");

    return res.data

  } catch (error) {
    console.error("Error in postCar:", error);
    throw new Error("Something went wrong while posting car.");
  }
}