import { type NextRequest, NextResponse } from "next/server";
import { localeMiddleware } from "./lib/middleware/localeMiddleware";
import { authMiddleware } from "./lib/middleware/authMiddleware";

export async function middleware(req: NextRequest) {
  const localeResponse = await localeMiddleware(req);
  if (localeResponse) return localeResponse

  if(req.nextUrl.pathname.includes('/dashboard')) {
    const authResponse = await authMiddleware(req);
    if (authResponse) return authResponse
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next|favicon.ico|robots.txt|sitemap.xml|fonts|images|assets|icons).*)',
  ],
};