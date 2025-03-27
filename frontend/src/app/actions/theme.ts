"use server";

import { cookies } from "next/headers";

export default async function getTheme() {
  const cookieStore = await cookies();
  const theme = cookieStore.get("theme")?.value;
  return theme || "system";
}

export async function setTheme(theme: string) {
  const cookieStore = await cookies();
  cookieStore.set("theme", theme, { httpOnly: true, sameSite: "strict" });
}
