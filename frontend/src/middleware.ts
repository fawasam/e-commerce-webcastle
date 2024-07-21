import { NextRequest, NextResponse } from "next/server";
import { autheticate } from "./lib/auth";

export async function middleware(request: NextRequest) {
  let currentUser = await autheticate();

  if (currentUser && request.nextUrl.pathname.startsWith("/auth/signin")) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (currentUser && request.nextUrl.pathname.startsWith("/auth/signup")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/product", "/auth/signin", "/auth/signup"],
};
