// // // middleware.ts
// // import { NextResponse } from 'next/server'
// // import type { NextRequest } from 'next/server'
// // import jwt from 'jsonwebtoken'

// // const JWT_SECRET = process.env.JWT_SECRET as string

// // // Define the paths that require authentication
// // const protectedPaths = ['/seller/dashboard']

// // export function middleware(req: NextRequest) {
// //   const { pathname } = req.nextUrl

// //   // Only run middleware for protected paths
// //   if (protectedPaths.some((path) => pathname.startsWith(path))) {
// //     const token = req.cookies.get('token')?.value

// //     if (!token) {
// //       // Redirect to login if no token
// //       const loginUrl = new URL('/auth/login', req.url)
// //       return NextResponse.redirect(loginUrl)
// //     }

// //     try {
// //       // Verify JWT
// //       jwt.verify(token, JWT_SECRET)
// //       // If valid, continue to the requested page
// //       return NextResponse.next()
// //     } catch (err) {
// //       console.error('JWT verification failed:', err)
// //       const loginUrl = new URL('/auth/login', req.url)
// //       return NextResponse.redirect(loginUrl)
// //     }
// //   }

// //   // For all other paths, continue normally
// //   return NextResponse.next()
// // }

// // // Apply middleware to all routes (or use matcher if you prefer)
// // export const config = {
// //   matcher: ['/seller/:path*'], // Protect all /seller/* routes
// // }
// // middleware.ts
// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'
// import { jwtVerify } from 'jose'

// const JWT_SECRET = process.env.JWT_SECRET as string

// export async function middleware(req: NextRequest) {
//   const { pathname } = req.nextUrl

//   // Only run middleware for protected paths
//   if (pathname.startsWith('/seller')) {
//     const token = req.cookies.get('token')?.value

//     if (!token) {
//       // Redirect to login if no token
//       const loginUrl = new URL('/auth/login', req.url)
//       return NextResponse.redirect(loginUrl)
//     }

//     try {
//       // Verify JWT using jose (Edge compatible)
//       const secret = new TextEncoder().encode(JWT_SECRET)
//       await jwtVerify(token, secret)
      
//       // If valid, continue to the requested page
//       return NextResponse.next()
//     } catch (err) {
//       console.error('JWT verification failed:', err)
//       const loginUrl = new URL('/auth/login', req.url)
//       return NextResponse.redirect(loginUrl)
//     }
//   }

//   // For all other paths, continue normally
//   return NextResponse.next()
// }

// export const config = {
//   matcher: ['/seller/:path*'],
// }
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const JWT_SECRET = process.env.JWT_SECRET as string

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Protected paths that require authentication
  const protectedPaths = [
    '/seller',
    '/admin',
    '/profile',
    '/checkout'
  ]

  // Check if the current path is protected
  const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path))

  if (isProtectedPath) {
    const token = req.cookies.get('token')?.value

    if (!token) {
      // Redirect to signin page with return URL
      const signinUrl = new URL('/signin', req.url)
      signinUrl.searchParams.set('returnUrl', pathname)
      return NextResponse.redirect(signinUrl)
    }

    try {
      // Verify JWT using jose (Edge compatible)
      const secret = new TextEncoder().encode(JWT_SECRET)
      const { payload } = await jwtVerify(token, secret)
      
      // Check role-based access
      const userRole = payload.role as string
      
      // Role-based route restrictions
      if (pathname.startsWith('/seller') && userRole !== 'seller' && userRole !== 'admin') {
        // Redirect to home if non-seller tries to access seller routes
        const homeUrl = new URL('/', req.url)
        return NextResponse.redirect(homeUrl)
      }

      if (pathname.startsWith('/admin') && userRole !== 'admin') {
        // Redirect to home if non-admin tries to access admin routes
        const homeUrl = new URL('/', req.url)
        return NextResponse.redirect(homeUrl)
      }

      // If valid and authorized, continue to the requested page
      return NextResponse.next()
    } catch (err) {
      console.error('JWT verification failed:', err)
      // Clear invalid token and redirect to signin
      const signinUrl = new URL('/signin', req.url)
      signinUrl.searchParams.set('returnUrl', pathname)
      const response = NextResponse.redirect(signinUrl)
      response.cookies.delete('token')
      return response
    }
  }

  // For all other paths, continue normally
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/seller/:path*',
    '/admin/:path*',
    '/profile/:path*',
    '/checkout/:path*'
  ],
}