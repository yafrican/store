// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET as string

// Define the paths that require authentication
const protectedPaths = ['/seller/dashboard']

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Only run middleware for protected paths
  if (protectedPaths.some((path) => pathname.startsWith(path))) {
    const token = req.cookies.get('token')?.value

    if (!token) {
      // Redirect to login if no token
      const loginUrl = new URL('/auth/login', req.url)
      return NextResponse.redirect(loginUrl)
    }

    try {
      // Verify JWT
      jwt.verify(token, JWT_SECRET)
      // If valid, continue to the requested page
      return NextResponse.next()
    } catch (err) {
      console.error('JWT verification failed:', err)
      const loginUrl = new URL('/auth/login', req.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  // For all other paths, continue normally
  return NextResponse.next()
}

// Apply middleware to all routes (or use matcher if you prefer)
export const config = {
  matcher: ['/seller/:path*'], // Protect all /seller/* routes
}
