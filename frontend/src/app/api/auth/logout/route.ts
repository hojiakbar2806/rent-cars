import { redis } from "@/lib/redis";
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const session_id = req.cookies.get('session_id')?.value;

    if (!session_id) {
      return NextResponse.json({ error: 'Session not found' }, { status: 401 });
    }
    await redis.del(session_id);
    const response = NextResponse.json({ message: "Logout successfully" });
    response.cookies.delete('session_id');
    return response

  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
