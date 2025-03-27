"use server";

import { cookies } from "next/headers";
import axios from "@/lib/axios";

export const getSession = async () => {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refresh_token")?.value;
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
  } catch (error) {
    cookieStore.delete("refresh_token");
    if (axios.isAxiosError(error)) {
      return { user: null, token: null };
    }
  }
  return { user: null, token: null };
};
