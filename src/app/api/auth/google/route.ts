// import { NextRequest, NextResponse } from 'next/server';
// import jwt from 'jsonwebtoken';
// import bcrypt from 'bcryptjs';
// import crypto from 'crypto';
// import connectMongo from '@/lib/mongodb';
// import User from '@/models/User';

// const JWT_SECRET = process.env.JWT_SECRET!;
// const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
// const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;

// export async function GET(request: NextRequest) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const code = searchParams.get('code');
    
//     // Debug
//     console.log('🔍 Google OAuth started, code exists:', !!code);
    
//     if (!code) {
//       // First step: Redirect to Google OAuth
//       const redirectUri = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/auth/google`;
//       const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=email%20profile&access_type=offline&prompt=consent`;
      
//       console.log('🔍 Redirecting to Google OAuth');
//       return NextResponse.redirect(googleAuthUrl);
//     }

//     // Exchange code for tokens
//     const redirectUri = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/auth/google`;
//     console.log('🔍 Exchanging code for token...');
    
//     const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//       body: new URLSearchParams({
//         code,
//         client_id: GOOGLE_CLIENT_ID,
//         client_secret: GOOGLE_CLIENT_SECRET,
//         redirect_uri: redirectUri,
//         grant_type: 'authorization_code',
//       }),
//     });
    
//     const tokenData = await tokenResponse.json();
//     console.log('🔍 Token response:', tokenData);

//     if (!tokenData.access_token) {
//       throw new Error(`Google token error: ${tokenData.error_description || 'No access token'}`);
//     }

//     // Get user info
//     const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
//       headers: { Authorization: `Bearer ${tokenData.access_token}` },
//     });
//     const googleUser = await userResponse.json();
    
//     console.log('🔍 Google user info:', {
//       id: googleUser.id,
//       email: googleUser.email,
//       name: googleUser.name,
//       picture: googleUser.picture ? 'Yes' : 'No'
//     });

//     await connectMongo();
    
//     // Find existing user by email
//     let user = await User.findOne({ email: googleUser.email.toLowerCase() });
    
//     if (!user) {
//       console.log('📝 Creating new user for Google login...');
      
//       // Generate a random password and hash it
//       const randomPassword = crypto.randomBytes(16).toString('hex');
//       const hashedPassword = await bcrypt.hash(randomPassword, 10);
      
//       // Create user with ONLY fields that exist in your schema
//       user = await User.create({
//         name: googleUser.name,
//         email: googleUser.email.toLowerCase(),
//         phone: "", // Required field
//         storeName: "", // Optional but set default
//         username: "", // Optional but set default  
//         address: "", // Optional but set default
//         paymentMethod: "", // Optional but set default
//         passwordHash: hashedPassword, // REQUIRED field
//         role: 'customer',
//         status: 'active',
//         // These don't exist in your schema, so don't include them:
//         // image: googleUser.picture, 
//         // provider: 'google',
//         // providerId: googleUser.id,
//         // emailVerified: true
//       });
      
//       console.log('✅ New user created:', user.email);
//     } else {
//       console.log('✅ Existing user found:', user.email);
//     }

//     // Create JWT token
//     if (!JWT_SECRET) {
//       throw new Error('JWT_SECRET is not configured');
//     }
    
//     const token = jwt.sign(
//       { 
//         id: user._id.toString(), 
//         email: user.email, 
//         role: user.role
//       },
//       JWT_SECRET,
//       { expiresIn: '30d' }
//     );

//     console.log('✅ JWT token created, redirecting to home');
    
//     // Create proper redirect URL (fix the absolute URL issue)
//     const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
//     const redirectUrl = new URL(baseUrl);
    
//     // Set the cookie
//     const response = NextResponse.redirect(redirectUrl);
    
//     // Set the cookie (same as your login route)
//     response.cookies.set({
//       name: 'token',
//       value: token,
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production',
//       sameSite: 'strict',
//       path: '/',
//       maxAge: 30 * 24 * 60 * 60, // 30 days
//     });

//     return response;

//   } catch (error: any) {
//     console.error('❌ Google OAuth error:', error);
    
//     // Fix the redirect URL - use absolute URL
//     const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
//     const errorUrl = new URL('/signin', baseUrl);
//     errorUrl.searchParams.set('error', error.message || 'Google login failed');
    
//     return NextResponse.redirect(errorUrl);
//   }
// }
// app/api/auth/google/route.ts - FIXED VERSION
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
    console.log('=== GOOGLE OAUTH DEBUG ===');
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const stateParam = searchParams.get('state');
    
    // PARSE the state parameter to get userType
    let userType = 'customer'; // Default
    
    if (stateParam) {
      try {
        const state = JSON.parse(stateParam);
        if (state.userType && (state.userType === 'customer' || state.userType === 'seller')) {
          userType = state.userType;
        }
      } catch (error) {
        console.log('Could not parse state parameter:', error);
      }
    }
    
    console.log('Parsed user type from state:', userType);
    
    // Determine the correct domain
    let baseDomain = 'https://yafrican.com';
    const host = request.headers.get('host');
    if (host) {
      if (host.includes('localhost')) {
        baseDomain = `http://${host}`;
      } else {
        baseDomain = `https://${host}`;
      }
    }
    
    const redirectUri = `${baseDomain}/api/auth/google`;
    
    // Step 1: If no code, redirect to Google
    if (!code) {
      // Get userType from query parameter (initial request)
      const initialUserType = searchParams.get('userType') || 'customer';
      const state = JSON.stringify({ userType: initialUserType });
      
      const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=email%20profile&access_type=offline&prompt=consent&state=${encodeURIComponent(state)}`;
      
      console.log('🔍 Google Auth URL with state:', googleAuthUrl);
      return NextResponse.redirect(googleAuthUrl);
    }

    // Step 2: Exchange code for tokens
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
      throw new Error(`Google token error: ${JSON.stringify(tokenData)}`);
    }

    // Get user info
    const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });
    
    if (!userResponse.ok) {
      throw new Error(`Failed to get user info: ${userResponse.statusText}`);
    }
    
    const googleUser = await userResponse.json();
    console.log('🔍 Google user:', googleUser.email);

    await connectMongo();
    
    // Find or create user
    let user = await User.findOne({ email: googleUser.email.toLowerCase() });
    
    if (!user) {
      console.log(`📝 Creating new ${userType}...`);
      const randomPassword = crypto.randomBytes(16).toString('hex');
      const hashedPassword = await bcrypt.hash(randomPassword, 10);
      
      // Create user with selected role
      const userData: any = {
        name: googleUser.name,
        email: googleUser.email.toLowerCase(),
        phone: "",
        storeName: "",
        username: "",
        address: "",
        paymentMethod: "",
        passwordHash: hashedPassword,
        role: userType,
        status: 'active',
      };
      
      // Add storeName for sellers
      if (userType === 'seller') {
        userData.storeName = `${googleUser.name}'s Store`;
      }
      
      user = await User.create(userData);
      
      console.log(`✅ New ${userType} created via Google:`, user.email);
    } else {
      console.log('✅ Existing user found:', user.email);
      // Optionally update role if needed (uncomment if you want to allow role change)
      // if (user.role !== userType) {
      //   user.role = userType;
      //   if (userType === 'seller' && !user.storeName) {
      //     user.storeName = `${googleUser.name}'s Store`;
      //   }
      //   await user.save();
      //   console.log(`🔄 Updated user role to ${userType}`);
      // }
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

    // Determine redirect URL based on user role
    let redirectUrl = `${baseDomain}/`;
    if (user.role === 'seller') {
      redirectUrl = `${baseDomain}/seller/dashboard`;
    } else if (user.role === 'admin') {
      redirectUrl = `${baseDomain}/admin/dashboard`;
    }

    console.log(`🔀 Redirecting ${user.role} to: ${redirectUrl}`);
    
    // Redirect with cookie
    const response = NextResponse.redirect(redirectUrl);
    response.cookies.set({
      name: 'token',
      value: token,
      httpOnly: true,
      secure: baseDomain.startsWith('https'),
      sameSite: 'strict',
      path: '/',
      maxAge: 30 * 24 * 60 * 60,
    });

    return response;

  } catch (error: any) {
    console.error('❌ Google OAuth error:', error);
    
    const host = request.headers.get('host');
    const baseDomain = host?.includes('localhost') 
      ? `http://${host}` 
      : `https://${host || 'yafrican.com'}`;
    
    return NextResponse.redirect(`${baseDomain}/signin?error=${encodeURIComponent(error.message)}`);
  }
}