import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicRoutes = [
  "/auth/login",
  "/auth/verify-otp",
  "/auth/set-password",
];

const protectedRoutes = ["/dashboard"];

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value || "";
  const { pathname } = request.nextUrl;

  const isPublicRoute = publicRoutes.some((route) =>
      pathname.startsWith(route)
  );

  const isProtectedRoute = protectedRoutes.some((route) =>
      pathname.startsWith(route)
  );

  if (!token && isProtectedRoute) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (token && isPublicRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (token && isProtectedRoute) {
    try {
      const res = await fetch(
          `${process.env.NEXT_PUBLIC_LTA_API_BASE_URL}/user/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Portal-Type": "mentor",
            },
          }
      );
      if (!res.ok) throw new Error("Unauthorized");
    } catch {
      const response = NextResponse.redirect(
          new URL("/auth/login", request.url)
      );
      response.cookies.delete("token");
      response.cookies.delete("refresh_token");
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|assets|api).*)"],
};