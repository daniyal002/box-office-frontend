import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { IMenu } from './interface/menu';

// Function to get allowed paths
async function getAllowedPaths() {
  const path = cookies().get("path");
  if (!path) return null;

  try {
    const paths: IMenu[] = JSON.parse(path.value);
    const allowedPaths = paths.map(menu => menu.path);
    return allowedPaths;
  } catch (error) {
    console.error('Error retrieving menu:', error);
    return null;
  }
}

export async function middleware(req: NextRequest) {
  const allowedPaths = await getAllowedPaths();
  const currentPath = req.nextUrl.pathname;

  if (allowedPaths === null) {
    return NextResponse.redirect(new URL('/login', req.nextUrl.origin));
  }

  const isPathAllowed = allowedPaths.some(allowedPath =>
    currentPath === allowedPath || currentPath.startsWith(allowedPath + '/')
  );

  if (!isPathAllowed) {
    // Server-side redirect to 403 page
    return NextResponse.redirect(new URL('/', req.nextUrl.origin));
  }

  // Continue with the request if all checks pass
  return NextResponse.next();
}

// Specify that middleware should work on all routes
export const config = {
  matcher: ['/((?!login|403|_next|static|order/*).*)'], // Exclude login, 403, static files, etc.
};
