import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server";
import { getUser } from "./actions/User";
import { useGetUser } from "./actions/queries";
export const middleware = async (req: NextRequest) => {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

const PrivateRoutes = ["/dashboard/create","/dashboard/doctors"]
  
  if (token) {
    const {data} = useGetUser(token?.id)

   if(data){
    if (pathname.startsWith("/dashboard") && !data.existingUser.profileState) {
      return NextResponse.redirect(new URL("/register/profile", req.url));
    }

    if (pathname === "/register/profile" && user.ex.profileState) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

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
  ],
};
