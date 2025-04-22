"use server";

import axios from "@/lib/axios";
import { cookies } from "next/headers";
import { redis } from "@/lib/redis";
import { v4 as uuidv4 } from 'uuid'
import { LoginFormData } from "@/lib/validations/auth";


export default async function login(data: LoginFormData) {
  const cookieStore = await cookies();
  try {
    const loginRes = await axios.post("/v1/auth/register", data);
    const sessionRes = await axios.get("/v1/auth/session", {
      headers: { Authorization: `Bearer ${loginRes.data.access_token}` },
    })
    const session = {
      user: sessionRes.data,
      access_token: loginRes.data.access_token,
      refresh_token: loginRes.data.refresh_token,
      expire: loginRes.data?.expire_minutes ?? 60 * 10,
    }

    const old_session_id = await redis.get(`user_session:${session.user.id}`)

    if (old_session_id) {
      await redis.del(old_session_id)
      await redis.del(`user_session:${session.user.id}`)
    }
    const session_id = uuidv4()
    await redis.set(session_id, JSON.stringify(session), 'EX', session.expire * 60)
    await redis.set(`user_session:${session.user.id}`, session_id, 'EX', session.expire * 60)
    cookieStore.set("session_id", session_id, { httpOnly: true, sameSite: "strict" })
    return { message: "Registration successful", data: session };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.detail);
    }
    throw new Error("Something went wrong");
  }
}
