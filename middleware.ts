// middleware.ts

import axiosInstance from "@/lib/axios";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value || "";

  if (!token) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // Verify the token with the external API
  try {
    await axiosInstance.get("/user/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

// Specify which paths should use the middleware
export const config = {
  matcher: ["/", "/dashboard", "/onboarding"],
};
