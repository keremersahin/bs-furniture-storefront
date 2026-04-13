import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const { pathname, origin, search } = request.nextUrl;
  const isAdminRoute = pathname.startsWith("/admin");
  const isLoginRoute = pathname.startsWith("/admin/login");

  if (!isAdminRoute || isLoginRoute) {
    return NextResponse.next();
  }

  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
    secureCookie: request.nextUrl.protocol === "https:"
  });

  const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase();
  const currentEmail =
    typeof token?.email === "string" ? token.email.toLowerCase() : undefined;
  const isAllowedAdmin = Boolean(adminEmail && currentEmail && currentEmail === adminEmail);

  if (isAllowedAdmin) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/admin/login", origin);
  const callbackUrl = `${pathname}${search}`;
  loginUrl.searchParams.set("callbackUrl", callbackUrl);

  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin/:path*"]
};
