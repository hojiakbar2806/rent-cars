"use server";

import axios from "@/lib/axios";
import { LoginFormData } from "@/app/(root)/(auth)/login/page";
import { cookies } from "next/headers";
import { redis } from "@/lib/redis";
import { v4 as uuidv4 } from 'uuid'


export default async function login(data: LoginFormData) {
  const cookieStore = await cookies();
  try {
    const loginRes = await axios.post("/v1/auth/login", data);
    const sessionRes = await axios.get("/v1/auth/session", {
      headers: { Authorization: `Bearer ${loginRes.data.access_token}` },
    })
    const session = {
      user: sessionRes.data,
      access_token: loginRes.data.access_token,
      refresh_token: loginRes.data.refresh_token,
      expire: loginRes.data?.expire || 100,
    }

    const old_session_id = await redis.get(`user_session:${session.user.id}`)

    if (old_session_id) {
      await redis.del(old_session_id)
      await redis.del(`user_session:${session.user.id}`)
    }
    const session_id = uuidv4()
    await redis.set(session_id, JSON.stringify(session), 'EX', session.expire)
    await redis.set(`user_session:${session.user.id}`, session_id, 'EX', session.expire)
    cookieStore.set("session_id", session_id, { httpOnly: true, sameSite: "strict" })
    return { message: "Login successful" };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.detail);
    }
    throw new Error("Something went wrong");
  }
}
