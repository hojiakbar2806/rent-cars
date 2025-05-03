"use server";

import { revalidateTag } from "next/cache";

export async function postCar(carData: any) {
  try {
    // POST qilish
    const res = await fetch("https://api.example.com/cars", {
      method: "POST",
      body: JSON.stringify(carData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Agar muvaffaqiyatsiz bo‘lsa, xatolikni yuborish
    if (!res.ok) {
      throw new Error("Failed to post car.");
    }

    // Revalidate qilish
    revalidateTag("cars");

    return await res.json();

  } catch (error) {
    console.error("Error in postCar:", error);
    throw new Error("Something went wrong while posting car.");
  }
}