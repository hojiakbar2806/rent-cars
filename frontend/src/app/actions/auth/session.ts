"use server";

import { cookies } from "next/headers";
import { redis } from "@/lib/redis";
import { UserSession } from "@/types/session";

export async function getSession(): Promise<UserSession> {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get('session_id')?.value;
  if (!sessionId) return null;
  const sessionRaw = await redis.get(sessionId);
  if (!sessionRaw) return null;
  try {
    return JSON.parse(sessionRaw);
  } catch {
    return null;
  }
}