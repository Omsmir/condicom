import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server";

export const middleware = async (req: NextRequest) => {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/dashboard") && !token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (
    (pathname.startsWith("/dashboard/admin") && token?.role !== "admin") ||
    (pathname.startsWith("/dashboard/create") && token?.role !== "admin")
  ) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (pathname === "/" && token) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (pathname.startsWith("/reset") && token) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (pathname.startsWith("/register") && token) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: [
    "/dashboard:path*",
    "/",
    "/dashboard/admin:path*",
    "/reset:path*",
    "/register:path*",
    "/dashboard/create:path*"
  ],
};
