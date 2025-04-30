"use server";


import { internalApi } from "@/lib/api";
import { UserSession } from "@/types/session";
import { isAxiosError } from "axios";
import { cookies } from "next/headers";

export async function getSession(): Promise<UserSession> {
    const cokieStore = await cookies();
    const session_id = cokieStore.get('session_id')?.value;
    if (!session_id) return null;
    try{
        const sessionRes = await internalApi.get("/api/auth/session", {headers: { cookie: `session_id=${session_id}` }})
        return sessionRes.data
    }
    catch(error){
        if (isAxiosError(error)){
            if (error.response?.status === 401) return null
        }
        return null;
    }
}
