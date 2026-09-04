import { NextResponse, type NextRequest } from "next/server";
import { DEFAULT_LOCALE, LOCALE_COOKIE, isLocale, type Locale } from "@/i18n/config";

function detectLocale(req: NextRequest): Locale {
  const cookie = req.cookies.get(LOCALE_COOKIE)?.value;
  if (isLocale(cookie)) return cookie;
  const header = req.headers.get("accept-language") ?? "";
  for (const part of header.split(",")) {
    const lang = part.split(";")[0].trim().toLowerCase().slice(0, 2);
    if (isLocale(lang)) return lang;
  }
  return DEFAULT_LOCALE;
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const first = pathname.split("/")[1];

  if (isLocale(first)) {
    // Remember the explicitly visited locale so "/" keeps sending the visitor back to it.
    const res = NextResponse.next();
    if (req.cookies.get(LOCALE_COOKIE)?.value !== first) {
      res.cookies.set(LOCALE_COOKIE, first, { path: "/", maxAge: 60 * 60 * 24 * 365, sameSite: "lax" });
    }
    return res;
  }

  const url = req.nextUrl.clone();
  url.pathname = `/${detectLocale(req)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Everything except admin, API, uploads, Next internals and static files (anything with a dot in the last segment).
  matcher: ["/((?!admin|api|uploads|_next|.*\\.[\\w]+$).*)"],
};
