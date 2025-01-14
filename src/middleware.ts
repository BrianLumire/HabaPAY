import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the access token from cookies or localStorage (if available)
  const accessToken = request.cookies.get('accessToken')?.value;

  // Define protected routes
  const protectedRoutes = 
  [
    '/home',
    '/analytics',
    '/manage-users',
    '/settings',
  ];

  // Check if the requested route is protected
  if (protectedRoutes.includes(request.nextUrl.pathname)) {
    // If the user is not authenticated, redirect to the login page
    if (!accessToken) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // If the user is authenticated, allow access to the requested route
  return NextResponse.next();
}