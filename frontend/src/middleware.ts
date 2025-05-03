import { type NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "./lib/middleware/authMiddleware";

export async function middleware(req: NextRequest) {
  // const localeResponse = await localeMiddleware(req);
  // if (localeResponse) return localeResponse

  if(req.nextUrl.pathname.includes('/dashboard')||req.nextUrl.pathname.includes('/profile')) {
    const authResponse = await authMiddleware(req);
    if (authResponse) return authResponse
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
  ],
};