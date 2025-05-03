import { NextRequest, NextResponse } from 'next/server'
import { externalApi } from '@/lib/api';
import { redis } from "@/lib/redis";

export async function GET(req: NextRequest) {
  try {
   const session_id = req.cookies.get('session_id')?.value;

    if (!session_id) {
      return NextResponse.json({ error: 'Session not found' }, { status: 401 });
    }
    const sessionData = await redis.get(session_id).then(res => res ? JSON.parse(res) : null);
    if (!sessionData) {
      return NextResponse.json({ error: 'Session expired' }, { status: 401 });
    }
    const res = await externalApi.post('/v1/auth/refresh_token', { refresh_token: sessionData.refresh_token });
    redis.set(session_id, JSON.stringify({ ...sessionData, access_token: res.data.access_token }));
    return NextResponse.json(res.data, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
