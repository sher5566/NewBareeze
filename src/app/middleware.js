import { NextResponse } from "next/server";

export function middleware(request) {
  // Get the pathname of the request (e.g. /, /admin, etc.)
  const { pathname } = request.nextUrl;

  // Check if the pathname starts with /admin and isn't the login page
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    // Check if user is authenticated by looking for the token in cookies
    const isAuthenticated = request.cookies.get("adminAuth")?.value === "true";

    // If not authenticated, redirect to the login page
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}
