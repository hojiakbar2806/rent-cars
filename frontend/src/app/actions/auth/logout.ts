"use server";

import { cookies } from "next/headers";

export default async function logout() {
  const cookieStore = await cookies();
  if (!cookieStore.has("refresh_token")) {
    return { ok: false, msg: "You are not logged in" };
  }
  cookieStore.delete("refresh_token");
  return { ok: true, msg: "Logout successful" };
}
