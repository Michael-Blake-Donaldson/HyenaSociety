import { NextRequest, NextResponse } from 'next/server';

/**
 * Route Protection Middleware
 * Protects /account, /admin, /checkout from unauthenticated access
 * Redirects to / with returnUrl query param for later redirect
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Routes that require authentication
  const protectedRoutes = ['/account', '/admin', '/checkout', '/orders'];

  // Check if current path is protected
  const isProtected = protectedRoutes.some(route => 
    pathname === route || pathname.startsWith(route + '/')
  );

  if (!isProtected) {
    return NextResponse.next();
  }

  // Check for authentication cookie
  const authCookie = request.cookies.get('hyena.auth.session');

  if (authCookie) {
    // User is authenticated, allow access
    return NextResponse.next();
  }

  // User is not authenticated, redirect to home with returnUrl
  const returnUrl = pathname + (request.nextUrl.search || '');
  const redirectUrl = new URL('/', request.url);
  redirectUrl.searchParams.set('returnUrl', returnUrl);

  return NextResponse.redirect(redirectUrl);
}

// Configure which routes use this middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.gif|.*\\.svg).*)',
  ],
};
