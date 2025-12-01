import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import connectMongo from '@/lib/mongodb';
import User from '@/models/User';

const JWT_SECRET = process.env.JWT_SECRET!;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    
    // Debug
    console.log('🔍 Google OAuth started, code exists:', !!code);
    
    if (!code) {
      // First step: Redirect to Google OAuth
      const redirectUri = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/auth/google`;
      const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=email%20profile&access_type=offline&prompt=consent`;
      
      console.log('🔍 Redirecting to Google OAuth');
      return NextResponse.redirect(googleAuthUrl);
    }

    // Exchange code for tokens
    const redirectUri = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/auth/google`;
    console.log('🔍 Exchanging code for token...');
    
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      }),
    });
    
    const tokenData = await tokenResponse.json();
    console.log('🔍 Token response:', tokenData);

    if (!tokenData.access_token) {
      throw new Error(`Google token error: ${tokenData.error_description || 'No access token'}`);
    }

    // Get user info
    const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });
    const googleUser = await userResponse.json();
    
    console.log('🔍 Google user info:', {
      id: googleUser.id,
      email: googleUser.email,
      name: googleUser.name,
      picture: googleUser.picture ? 'Yes' : 'No'
    });

    await connectMongo();
    
    // Find existing user by email
    let user = await User.findOne({ email: googleUser.email.toLowerCase() });
    
    if (!user) {
      console.log('📝 Creating new user for Google login...');
      
      // Generate a random password and hash it
      const randomPassword = crypto.randomBytes(16).toString('hex');
      const hashedPassword = await bcrypt.hash(randomPassword, 10);
      
      // Create user with ONLY fields that exist in your schema
      user = await User.create({
        name: googleUser.name,
        email: googleUser.email.toLowerCase(),
        phone: "", // Required field
        storeName: "", // Optional but set default
        username: "", // Optional but set default  
        address: "", // Optional but set default
        paymentMethod: "", // Optional but set default
        passwordHash: hashedPassword, // REQUIRED field
        role: 'customer',
        status: 'active',
        // These don't exist in your schema, so don't include them:
        // image: googleUser.picture, 
        // provider: 'google',
        // providerId: googleUser.id,
        // emailVerified: true
      });
      
      console.log('✅ New user created:', user.email);
    } else {
      console.log('✅ Existing user found:', user.email);
    }

    // Create JWT token
    if (!JWT_SECRET) {
      throw new Error('JWT_SECRET is not configured');
    }
    
    const token = jwt.sign(
      { 
        id: user._id.toString(), 
        email: user.email, 
        role: user.role
      },
      JWT_SECRET,
      { expiresIn: '30d' }
    );

    console.log('✅ JWT token created, redirecting to home');
    
    // Create proper redirect URL (fix the absolute URL issue)
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
    const redirectUrl = new URL(baseUrl);
    
    // Set the cookie
    const response = NextResponse.redirect(redirectUrl);
    
    // Set the cookie (same as your login route)
    response.cookies.set({
      name: 'token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 30 * 24 * 60 * 60, // 30 days
    });

    return response;

  } catch (error: any) {
    console.error('❌ Google OAuth error:', error);
    
    // Fix the redirect URL - use absolute URL
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
    const errorUrl = new URL('/signin', baseUrl);
    errorUrl.searchParams.set('error', error.message || 'Google login failed');
    
    return NextResponse.redirect(errorUrl);
  }
}