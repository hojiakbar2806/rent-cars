import { NextRequest, NextResponse } from 'next/server';
import { redis } from '@/lib/redis';
import { api } from '@/lib/api';

export async function GET(req: NextRequest) {
    const session_id = req.cookies.get('session_id')?.value;

    if (!session_id) {
        return NextResponse.json({ error: 'You are not logged in' }, { status: 400 });
    }

    const session = await redis.get(session_id);
    if (!session) {
        return NextResponse.json({ error: 'Session expired' }, { status: 403 });
    }

    const user = JSON.parse(session);

    try {
        const res = await api.post('/v1/auth/refresh_token', {
            refresh_token: user.refresh_token
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        user.access_token = res.data.access_token;
        await redis.set(session_id, JSON.stringify(user), 'EX', user.expire * 60);

        return NextResponse.json({ token: user.access_token });

    } catch (error: any) {
        console.error("Refresh token error:", error.response?.data || error.message);
        return NextResponse.json({ error: 'Unauthorized or token expired' }, { status: 401 });
    }
}