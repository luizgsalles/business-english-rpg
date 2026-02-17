import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/auth';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/demo')) {
    return NextResponse.next();
  }

  const isDemoMode = request.cookies.get('demo-session')?.value === 'true';

  const protectedPaths = ['/dashboard', '/exercise', '/profile'];
  const isProtectedRoute = protectedPaths.some((path) => pathname.startsWith(path));

  if (isProtectedRoute) {
    if (isDemoMode) {
      return NextResponse.next();
    }

    const session = await auth();
    if (!session?.user) {
      const signInUrl = new URL('/auth/signin', request.url);
      signInUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(signInUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
