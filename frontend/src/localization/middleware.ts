import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { type NextRequest, NextResponse } from "next/server";
import { localeConfig, Locale } from "./localeConfig";

export function localizationMiddleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const locales = localeConfig.locales;
  const ignoredPaths = localeConfig.ignoredPaths;
  const cookieName = localeConfig.cookieName;
  const cookieMaxAge = localeConfig.cookieMaxAge;

  if (locales.some((loc) => pathname.startsWith(`/${loc}`))) {
    return NextResponse.next();
  }

  if (ignoredPaths.some((path) => pathname.startsWith(`/${path}`))) {
    return NextResponse.next();
  }

  const locale = getLocale(request);
  const response = NextResponse.redirect(
    new URL(`/${locale}${pathname}`, request.url)
  );

  response.cookies.set(cookieName, locale, { path: "/", maxAge: cookieMaxAge });

  return response;
}

function getLocale(request: NextRequest): string {
  const cookiStore = request.cookies;
  const cookiName = localeConfig.cookieName;
  const cookieLang = cookiStore.get(cookiName)?.value as Locale;
  const locales = localeConfig.locales;
  const defaultLocale = localeConfig.defaultLocale;

  if (cookieLang && locales.includes(cookieLang)) {
    return cookieLang;
  }

  const headers = {
    "accept-language": request.headers.get("accept-language") ?? "",
  };
  const languages = new Negotiator({ headers }).languages();
  return match(languages, locales, defaultLocale);
}
