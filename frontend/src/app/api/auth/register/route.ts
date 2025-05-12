import { externalApi } from "@/lib/api";
import { v4 as uuidv4 } from 'uuid'
import { NextRequest, NextResponse } from 'next/server';
import { redis } from "@/lib/redis";
import { isAxiosError } from "axios";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json(); 
    const res = await externalApi.post('/v1/auth/register', data);

        const session_id = uuidv4()
        const sessionData = {
            user: res.data.user_info,
            access_token: res.data.access_token,
            refresh_token: res.data.refresh_token,
            expire: res.data.expire_minutes
        }
        await redis.set(session_id, JSON.stringify(sessionData), "EX", sessionData.expire);

        const response = NextResponse.json(
          { 
            message: "Register successful", 
            session:{user:sessionData.user, access_token:sessionData.access_token} 
          }
        );
        response.cookies.set('session_id', session_id, {httpOnly: true,secure: true,sameSite: 'strict'});
    return response;

  } catch (error) {
    if (isAxiosError(error)) {
        return NextResponse.json({ error: error.response?.data.detail }, { status: error.response?.status });
    }
    return NextResponse.json(error, { status: 500 });
  }
}
