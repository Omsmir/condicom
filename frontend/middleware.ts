import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server";
import { getUser } from "./actions/getUser";
export const middleware = async (req: NextRequest) => {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  if (token) {
    const user = await getUser(token?.id);

    if (
      pathname.startsWith("/dashboard") &&
      token &&
      !user.existingUser.profileState
    ) {
      return NextResponse.redirect(new URL("/register/profile", req.url));
    }

    if (
      pathname === "/register/profile" &&
      token &&
      user.existingUser.profileState
    ) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
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
    if (pathname === "/register" && token) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }else {
    
  if (pathname.startsWith("/dashboard") && !token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (pathname.startsWith("/dashboard/appointments") && !token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (pathname === "/register/profile" && !token) {
    return NextResponse.redirect(new URL("/register", req.url));
  }

  }

  return NextResponse.next();
};

export const config = {
  matcher: [
    "/dashboard:path*",
    "/dashboard/appointments",
    "/",
    "/dashboard/admin:path*",
    "/reset:path*",
    "/register:path*",
    "/dashboard/create:path*",
    "/register/profile:path*",
  ],
};
