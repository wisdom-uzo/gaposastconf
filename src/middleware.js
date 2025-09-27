import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

export async function middleware(request) {
  // Check if the request is for admin routes (excluding login)
  if (request.nextUrl.pathname.startsWith("/admin") && 
      !request.nextUrl.pathname.startsWith("/admin/login")) {
    
    try {
      // Check if user is authenticated
      const session = await getSession();
      
      if (!session) {
        // Redirect to login if not authenticated
        const loginUrl = new URL("/admin/login", request.url);
        return NextResponse.redirect(loginUrl);
      }
      
      // User is authenticated, continue to the requested page
      return NextResponse.next();
      
    } catch (error) {
      // If there's an error checking the session, redirect to login
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }
  
  // For non-admin routes or login page, continue normally
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};