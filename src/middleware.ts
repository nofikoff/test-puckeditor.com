import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // Check if this is a protected route (admin or editor under any locale)
  const isProtected = routing.locales.some(
    (locale) =>
      pathname.startsWith(`/${locale}/admin`) ||
      pathname.startsWith(`/${locale}/editor`)
  );

  if (isProtected) {
    const token = await getToken({ req });
    if (!token) {
      const locale = pathname.split("/")[1] || routing.defaultLocale;
      const loginUrl = new URL(`/${locale}/login`, req.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
