import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
  const session_id = req.cookies.get('session_id')?.value;
  const pathname = req.nextUrl.pathname;

  if (!session_id) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  const res = await fetch(`${req.nextUrl.origin}/api/get-user`, {
    headers: { cookie: req.headers.get('cookie') || '' }
  });

  if (!res.ok) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  const user = await res.json();

  if (pathname.startsWith('/dashboard') && user.is_admin) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  if (pathname.startsWith('/profile') && !user) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/profile/:path*',
  ],
};