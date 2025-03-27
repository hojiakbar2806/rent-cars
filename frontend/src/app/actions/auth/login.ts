"use server";

import axios from "@/lib/axios";
import { LoginFormData } from "@/app/(root)/(auth)/login/page";
import { cookies } from "next/headers";

export default async function login(data: LoginFormData) {
  try {
    const res = await axios.post("/v1/auth/login", data);
    const cookieStore = await cookies();
    cookieStore.set("refresh_token", res.data.refresh_token, {
      httpOnly: true,
      sameSite: "strict",
    });
    return { message: "Login successful" };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.detail);
    }
    throw new Error("Something went wrong");
  }
}
