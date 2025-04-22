import { NextRequest, NextResponse } from 'next/server';
import { redis } from '@/lib/redis';

export async function GET(req: NextRequest) {
    const session_id = req.cookies.get('session_id')?.value;

    if (!session_id) {
        return NextResponse.json({ error: 'No session ID' }, { status: 400 });
    }

    const session = await redis.get(session_id);

    if (!session) {
        return NextResponse.json({ error: 'Session not found' }, { status: 404 });
    }
    const user = JSON.parse(session);
    return NextResponse.json(user);
}