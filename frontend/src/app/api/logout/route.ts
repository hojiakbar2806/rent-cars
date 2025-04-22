import { redis } from '@/lib/redis';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const session_id = req.cookies.get('session_id')?.value;

    if (!session_id) {
        return NextResponse.json({ error: 'You are not logged in' }, { status: 400 });
    }

    await redis.del(session_id);

    const response = NextResponse.json({ message: 'Logout successful' }, { status: 200 });
    response.cookies.set('session_id', '', { maxAge: 0, path: '/' });
    return response;
}