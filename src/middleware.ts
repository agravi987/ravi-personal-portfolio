import { auth } from "@/auth";

/**
 * Middleware
 * Protects routes that require authentication (e.g., /admin/*).
 * Redirects unauthenticated users to the login page.
 */
import { NextResponse } from "next/server";

export default auth((req) => {
  const needsAuth = req.nextUrl.pathname.startsWith("/admin");
  const isLoggedIn = !!req.auth;

  if (needsAuth && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  // If we want to check for 'admin' role specifically:
  // if (needsAuth && req.auth?.user?.role !== 'admin') ...
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
