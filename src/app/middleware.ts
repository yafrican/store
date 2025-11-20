// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET as string

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone()

  // Protect /seller routes
  if (url.pathname.startsWith('/seller')) {
    const tokenCookie = req.cookies.get('token')?.value

    if (!tokenCookie) {
      url.pathname = '/login'
      return NextResponse.redirect(url)
    }

    try {
      jwt.verify(tokenCookie, JWT_SECRET)
      return NextResponse.next()
    } catch (err) {
      url.pathname = '/login'
      return NextResponse.redirect(url)
    }
  }

  // NEW: Protect /admin routes
  if (url.pathname.startsWith('/admin')) {
    // Check for authToken (used in login API) or token (used in your middleware)
    const authToken = req.cookies.get('authToken')?.value
    const tokenCookie = req.cookies.get('token')?.value
    const token = authToken || tokenCookie

    if (!token) {
      url.pathname = '/admin/login'
      return NextResponse.redirect(url)
    }

    try {
      const payload = jwt.verify(token, JWT_SECRET) as { id: string; role: string }
      
      // Check if user is admin
      if (payload.role !== 'admin') {
        url.pathname = '/admin/login'
        return NextResponse.redirect(url)
      }
      
      return NextResponse.next()
    } catch (err) {
      url.pathname = '/admin/login'
      return NextResponse.redirect(url)
    }
  }

  // public routes → continue
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/seller/:path*',
    '/admin/:path*',
    '/profile' // Add profile to protected routes
  ],
}