import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/profile", "/favorites"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.log(pathname, request.nextUrl,'pathname');
  const requiresAuth = protectedRoutes.some((route) => pathname.startsWith(route));
console.log(requiresAuth,'requiresAuth');
  if (!requiresAuth) {
    return NextResponse.next();
  }

  const hasSession =
    request.cookies.has("gamesunite_refresh_token") ||
    Boolean(request.cookies.get("gamesunite-auth"));

  if (!hasSession) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/favorites/:path*"],
};
