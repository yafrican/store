// src/app/api/auth/logout/route.ts
import { NextResponse } from 'next/server'

export async function POST() {
  try {
    const response = NextResponse.json({ 
      success: true,
      message: 'Logged out successfully' 
    })

    // Clear both possible cookie names to be safe
    response.cookies.set({
      name: 'token',
      value: '',
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 0,
    })

    response.cookies.set({
      name: 'authToken',
      value: '',
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 0,
    })

    return response
  } catch (err: any) {
    console.error('Logout error:', err)
    return NextResponse.json({ error: 'Failed to logout' }, { status: 500 })
  }
}