import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./services/AuthService";


type Role = keyof typeof roleBasedPrivateRoutes;

const authRoutes = ["/login", "/register"];

const protectedRoutes = [
  /^\/dashboard/,
];

const roleBasedPrivateRoutes = {
  user: [/^\/user/, /^\/create-shop/],
  admin: [/^\/admin/],
};

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  const userInfo = await getCurrentUser();

  // Check if the route is protected (dashboard routes)
  const isProtectedRoute = protectedRoutes.some((route) => pathname.match(route));

  if (!userInfo) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    } else if (isProtectedRoute) {
      return NextResponse.redirect(
        new URL(
          `http://localhost:3000/login?redirectPath=${pathname}`,
          request.url
        )
      );
    } else {
      return NextResponse.next();
    }
  }

  // If user is authenticated and trying to access dashboard routes, allow it
  if (isProtectedRoute) {
    return NextResponse.next();
  }

  // Handle role-based routes
  if (userInfo?.role && roleBasedPrivateRoutes[userInfo?.role as Role]) {
    const routes = roleBasedPrivateRoutes[userInfo?.role as Role];
    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }

  return NextResponse.next();
};

export const config = {
  matcher: [
    "/login",
    "/dashboard",
    "/dashboard/:path*",
  ],
};
