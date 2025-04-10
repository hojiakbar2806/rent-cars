import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const refreshToken = request.cookies.get("refresh_token")?.value;
  const pathname = request.nextUrl.pathname;

  const protectedRoutes = ["/profile"];

  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    if (!refreshToken) {
      return NextResponse.redirect(new URL(`/login`, request.url));
    }
  }

  return NextResponse.next();
}

export const config = { matcher: ["/((?!api|_next|.*.svg$).*)"] };
