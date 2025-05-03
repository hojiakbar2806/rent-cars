import { redis } from '@/lib/redis';
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const session_id = req.cookies.get('session_id')?.value;

    if (!session_id) {
      return NextResponse.json({ error: 'Session not found' }, { status: 403 });
    }

    const sessionData = await redis.get(session_id).then(res => res ? JSON.parse(res) : null);

    if (!sessionData) {
      return NextResponse.json({ error: 'Session expired' }, { status: 401 });
    }

    return NextResponse.json({ access_token: sessionData.access_token, user: sessionData.user });

  } catch (error) {
    console.error('Error fetching session data:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
