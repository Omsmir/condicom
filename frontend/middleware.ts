import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server";

export const middleware = async (req: NextRequest) => {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;
  const PrivateRoutes = [
    "/dashboard/create",
    "/dashboard/doctors",
    "/dashboard/settings/code",
  ];
  if (token) {
    if (pathname.startsWith("/dashboard") && !token.profileState) {
      return NextResponse.redirect(new URL("/register/profile", req.url));
    }

    if (pathname === "/register/profile" && token.profileState) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    if (
      pathname.startsWith("/dashboard") &&
      token.mfa_state &&
      !token.isFullyAuthenicated&&
      token.temporalToken
    ) {
      return NextResponse.redirect(
        new URL(`/multi-auth-verification/${token.temporalToken}`, req.url)
      );
    }
    if (
      pathname.startsWith("/multi-auth-verification") &&
      token.mfa_state &&
      token.isFullyAuthenicated
    ) {
      return NextResponse.redirect(new URL(`/dashboard`, req.url));
    }

    if (PrivateRoutes.includes(pathname) && token?.role !== "Admin") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    const publicPaths = ["/", "/reset", "/register"];
    if (publicPaths.includes(pathname)) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  } else {
    if (pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    if (pathname === "/register/profile") {
      return NextResponse.redirect(new URL("/register", req.url));
    }
  }

  return NextResponse.next();
};

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/",
    "/reset/:path*",
    "/register/:path*",
    "/dashboard/create:path*",
    "/dashboard/doctors:path*",
    "/register/profile:path*",
    "/dashboard/settings/code:path*",
  ],
};
