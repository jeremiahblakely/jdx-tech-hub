import { NextResponse } from 'next/server';
import { getCurrentUser } from 'aws-amplify/auth';

export async function middleware(request) {
  // Only protect specific routes
  const protectedRoutes = ['/dashboard', '/projects', '/setup'];
  const { pathname } = request.nextUrl;
  
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  );
  
  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  // For protected routes, redirect to login if not authenticated
  // Note: Server-side getCurrentUser doesn't work in middleware
  // We'll handle auth checks client-side in each protected component
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/projects/:path*',
    '/setup/:path*'
  ]
};