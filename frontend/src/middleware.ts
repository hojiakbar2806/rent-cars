import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/profile", "/dashboard"];

const adminRoutes = ["/dashboard"];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isAdmin = request.cookies.get("is_admin")?.value;
  const refreshToken = request.cookies.get("refresh_token")?.value;

  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route));
  if (isProtected && !refreshToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const isAdminOnly = adminRoutes.some((route) => pathname.startsWith(route));
  if (isAdminOnly && isAdmin !== "true") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|.*\\.(?:svg|png|jpg|jpeg|gif|ico|webp|css|js)$).*)"],
};