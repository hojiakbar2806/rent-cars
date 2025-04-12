import { NextRequest, NextResponse } from "next/server";
import { UserSession } from "./types/session";

export function middleware(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  const pathname = request.nextUrl.pathname;

  if (session) {
    const userSession = JSON.parse(session) as UserSession;

    const protectedRoutes = ["/profile", "/dashboard"];
    const adminRoutes = ["/dashboard"];

    if (protectedRoutes.includes(pathname) && !userSession.user) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    if (adminRoutes.includes(pathname) && !userSession.user?.is_admin) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }


  return NextResponse.next();
}

export const config = { matcher: ["/((?!api|_next|.*.svg$).*)"] };
