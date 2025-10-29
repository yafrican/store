// src/app/api/test-password/route.ts
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

export async function POST(req: Request) {
  return testPassword(req)
}

export async function GET(req: Request) {
  return testPassword(req)
}

async function testPassword(req: Request) {
  try {
    let password = ''
    
    if (req.method === 'POST') {
      const body = await req.json()
      password = body.password || ''
    } else {
      // For GET, get password from URL params
      const url = new URL(req.url)
      password = url.searchParams.get('password') || ''
    }
    
    if (!password) {
      return NextResponse.json({ 
        error: 'Password is required. Add ?password=yourpassword to URL' 
      }, { status: 400 })
    }

    // The exact hash from your database
    const dbHash = "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdCvGW7NB4D9/HG"
    
    const isMatch = await bcrypt.compare(password, dbHash)
    
    console.log('🔐 Password test:')
    console.log('  Input password:', `"${password}"`)
    console.log('  Password length:', password.length)
    console.log('  Password char codes:', Array.from(password).map(c => c.charCodeAt(0)))
    console.log('  Match result:', isMatch)
    
    return NextResponse.json({
      inputPassword: `"${password}"`,
      inputLength: password.length,
      inputCharCodes: Array.from(password).map(c => c.charCodeAt(0)),
      matches: isMatch,
      databaseHash: dbHash,
      message: isMatch ? '✅ Password matches!' : '❌ Password does not match'
    })
    
  } catch (error: any) {
    console.error('Test password error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}