import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {
  const token = req.cookies.get("accessToken")?.value;
  const { pathname } = req.nextUrl;

  const isAuthPage = pathname.startsWith("/login") || pathname.startsWith("/register");
  const isDashboard = pathname.startsWith("/contacts") || pathname.startsWith("/profile");

  // No server-side token check (JWT is in localStorage, not cookies).
  // Client-side route guards handle redirects.
  // This middleware only handles the root redirect.
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/contacts", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/contacts/:path*", "/profile/:path*"],
};
