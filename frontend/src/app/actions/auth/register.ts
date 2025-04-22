"use server";

import axios from "@/lib/axios";
import { RegisterFormData } from "@/lib/validations/auth";
import { cookies } from "next/headers";

export default async function register(data: RegisterFormData) {
  try {
    const res = await axios.post("/v1/auth/register", data);
    const cookieStore = await cookies();
    cookieStore.set("refresh_token", res.data.refresh_token, {
      httpOnly: true,
      sameSite: "strict",
    });
    return { ok: true, msg: "Registration successful" };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { ok: false, msg: error.response?.data.detail };
    }
    return { ok: false, msg: "Something went wrong" };
  }
}
