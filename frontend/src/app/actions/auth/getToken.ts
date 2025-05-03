"use server";


import { cookies } from "next/headers";
import { redis } from "../../../lib/redis";

export async function getToken(): Promise<string|null> {
    const cokieStore = await cookies();
    const session_id = cokieStore.get('session_id')?.value;
    if (!session_id) return null;
    const sessionData = await redis.get(session_id).then(res => res ? JSON.parse(res) : null);
    if (!sessionData) return null;
    return sessionData.access_token
}
