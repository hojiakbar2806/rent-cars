"use server";

import { cookies } from "next/headers";
import axios from "@/lib/axios";

export const getSession = async () => {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refresh_token")?.value;
  const session = cookieStore.get("session")?.value;

  if (session) {
    return JSON.parse(session);
  }

  let accessToken = null;

  try {
    if (refreshToken) {
      const refreshRes = await axios.get("/v1/auth/refresh_token", {
        headers: { Cookie: `refresh_token=${refreshToken}` },
      });
      accessToken = refreshRes.data.access_token;
    }

    if (accessToken) {
      const sessionRes = await axios.get("/v1/auth/session", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return { user: sessionRes.data, token: accessToken };
    }
  } catch {
    return null
  }
  return null
};