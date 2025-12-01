// import { NextRequest, NextResponse } from 'next/server';
// import jwt from 'jsonwebtoken';
// import bcrypt from 'bcryptjs';
// import crypto from 'crypto';
// import connectMongo from '@/lib/mongodb';
// import User from '@/models/User';

// const JWT_SECRET = process.env.JWT_SECRET!;
// const FACEBOOK_CLIENT_ID = process.env.FACEBOOK_CLIENT_ID!;
// const FACEBOOK_CLIENT_SECRET = process.env.FACEBOOK_CLIENT_SECRET!;

// export async function GET(request: NextRequest) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const code = searchParams.get('code');
    
//     console.log('🔍 Facebook OAuth started, code exists:', !!code);
    
//     if (!code) {
//       // First step: Redirect to Facebook OAuth
//       const redirectUri = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/auth/facebook`;
//       const facebookAuthUrl = `https://www.facebook.com/v19.0/dialog/oauth?client_id=${FACEBOOK_CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=email,public_profile`;
      
//       console.log('🔍 Redirecting to Facebook OAuth');
//       return NextResponse.redirect(facebookAuthUrl);
//     }

//     // Second step: Exchange code for access token
//     const redirectUri = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/auth/facebook`;
//     console.log('🔍 Exchanging Facebook code for token...');
    
//     const tokenResponse = await fetch(`https://graph.facebook.com/v19.0/oauth/access_token?client_id=${FACEBOOK_CLIENT_ID}&client_secret=${FACEBOOK_CLIENT_SECRET}&code=${code}&redirect_uri=${encodeURIComponent(redirectUri)}`);
    
//     const tokenData = await tokenResponse.json();
//     console.log('🔍 Facebook token response:', tokenData);

//     if (!tokenData.access_token) {
//       throw new Error('Failed to get Facebook access token');
//     }

//     // Get user info from Facebook
//     const userResponse = await fetch(`https://graph.facebook.com/v19.0/me?fields=id,name,email,picture.type(large)&access_token=${tokenData.access_token}`);
//     const facebookUser = await userResponse.json();
    
//     console.log('🔍 Facebook user info:', {
//       id: facebookUser.id,
//       email: facebookUser.email,
//       name: facebookUser.name,
//       hasPicture: !!facebookUser.picture
//     });

//     await connectMongo();
    
//     // Find existing user by email
//     let user = await User.findOne({ email: facebookUser.email?.toLowerCase() });
    
//     if (!user) {
//       console.log('📝 Creating new user for Facebook login...');
      
//       if (!facebookUser.email) {
//         throw new Error('Facebook did not return email address');
//       }
      
//       // Generate a random password and hash it
//       const randomPassword = crypto.randomBytes(16).toString('hex');
//       const hashedPassword = await bcrypt.hash(randomPassword, 10);
      
//       // Create user with ONLY fields that exist in your schema
//       user = await User.create({
//         name: facebookUser.name,
//         email: facebookUser.email.toLowerCase(),
//         phone: "",
//         storeName: "",
//         username: "",  
//         address: "",
//         paymentMethod: "",
//         passwordHash: hashedPassword, // REQUIRED field
//         role: 'customer',
//         status: 'active'
//       });
      
//       console.log('✅ New user created via Facebook:', user.email);
//     } else {
//       console.log('✅ Existing user found via Facebook:', user.email);
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

//     console.log('✅ Facebook JWT token created, redirecting to home');
    
//     // Create proper redirect URL
//     const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
//     const redirectUrl = new URL(baseUrl);
    
//     // Set the cookie
//     const response = NextResponse.redirect(redirectUrl);
    
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
//     console.error('❌ Facebook OAuth error:', error);
    
//     // Fix the redirect URL - use absolute URL
//     const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
//     const errorUrl = new URL('/signin', baseUrl);
//     errorUrl.searchParams.set('error', error.message || 'Facebook login failed');
    
//     return NextResponse.redirect(errorUrl);
//   }
// }
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import connectMongo from '@/lib/mongodb';
import User from '@/models/User';

const JWT_SECRET = process.env.JWT_SECRET!;
const FACEBOOK_CLIENT_ID = process.env.FACEBOOK_CLIENT_ID!;
const FACEBOOK_CLIENT_SECRET = process.env.FACEBOOK_CLIENT_SECRET!;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    
    console.log('🔍 Facebook OAuth started, code exists:', !!code);
    
    // FIXED: Get the current host/domain dynamically
    const host = request.headers.get('host');
    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
    const currentDomain = `${protocol}://${host}`;
    
    // FIXED: Use dynamic redirect URI
    const redirectUri = `${currentDomain}/api/auth/facebook`;
    console.log('🔍 Using Facebook redirect URI:', redirectUri);
    
    if (!code) {
      // First step: Redirect to Facebook OAuth
      const facebookAuthUrl = `https://www.facebook.com/v19.0/dialog/oauth?client_id=${FACEBOOK_CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=email,public_profile`;
      
      console.log('🔍 Redirecting to Facebook OAuth');
      return NextResponse.redirect(facebookAuthUrl);
    }

    // Second step: Exchange code for access token
    console.log('🔍 Exchanging Facebook code for token...');
    
    const tokenResponse = await fetch(`https://graph.facebook.com/v19.0/oauth/access_token?client_id=${FACEBOOK_CLIENT_ID}&client_secret=${FACEBOOK_CLIENT_SECRET}&code=${code}&redirect_uri=${encodeURIComponent(redirectUri)}`);
    
    const tokenData = await tokenResponse.json();
    console.log('🔍 Facebook token response:', tokenData);

    if (!tokenData.access_token) {
      throw new Error('Failed to get Facebook access token: ' + JSON.stringify(tokenData));
    }

    // Get user info from Facebook
    const userResponse = await fetch(`https://graph.facebook.com/v19.0/me?fields=id,name,email,picture.type(large)&access_token=${tokenData.access_token}`);
    const facebookUser = await userResponse.json();
    
    console.log('🔍 Facebook user info:', facebookUser);

    if (!facebookUser.email) {
      throw new Error('Facebook did not return email address. User info: ' + JSON.stringify(facebookUser));
    }

    await connectMongo();
    
    // Find existing user by email
    let user = await User.findOne({ email: facebookUser.email.toLowerCase() });
    
    if (!user) {
      console.log('📝 Creating new user for Facebook login...');
      
      // Generate a random password and hash it
      const randomPassword = crypto.randomBytes(16).toString('hex');
      const hashedPassword = await bcrypt.hash(randomPassword, 10);
      
      // Create user
      user = await User.create({
        name: facebookUser.name,
        email: facebookUser.email.toLowerCase(),
        phone: "",
        storeName: "",
        username: "",  
        address: "",
        paymentMethod: "",
        passwordHash: hashedPassword,
        role: 'customer',
        status: 'active'
      });
      
      console.log('✅ New user created via Facebook:', user.email);
    } else {
      console.log('✅ Existing user found via Facebook:', user.email);
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

    console.log('✅ Facebook JWT token created, redirecting to home');
    
    // FIXED: Redirect to current domain
    const response = NextResponse.redirect(`${currentDomain}/`);
    
    // Set the cookie
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
    console.error('❌ Facebook OAuth error:', error);
    
    // FIXED: Error redirect to current domain
    const host = request.headers.get('host');
    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
    const currentDomain = `${protocol}://${host}`;
    
    const errorUrl = `${currentDomain}/signin?error=${encodeURIComponent(error.message || 'Facebook login failed')}`;
    
    return NextResponse.redirect(errorUrl);
  }
}