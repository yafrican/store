import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-fallback-secret';

export async function verifyAdmin(request: Request) {
  try {
    // Get token from cookies
    const cookieHeader = request.headers.get('cookie');
    console.log('🔍 All cookies:', cookieHeader);
    
    const token = cookieHeader?.split(';')
      .find(c => c.trim().startsWith('token='))
      ?.split('=')[1];
    
    console.log('🔍 Token exists:', !!token);
    if (token) {
      console.log('🔍 Token value (first 20 chars):', token.substring(0, 20) + '...');
    }

    if (!token) {
      console.error('❌ No token found in cookies');
      throw new Error('No authentication token');
    }

    // Verify token
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as any;
      console.log('✅ Token verified, user ID:', decoded.id);
      console.log('🔍 User role:', decoded.role);
      
      // Check if user is admin
      if (decoded.role !== 'admin') {
        console.error('❌ User is not admin, role:', decoded.role);
        throw new Error('Insufficient permissions');
      }
      
      return decoded;
    } catch (jwtError: any) {
      console.error('❌ JWT verification failed:', jwtError.message);
      console.error('🔍 JWT error name:', jwtError.name);
      throw new Error('Authentication failed: ' + jwtError.message);
    }
    
  } catch (error: any) {
    console.error('Admin auth error:', error.message);
    throw new Error('Authentication failed');
  }
}