// This is a debug endpoint to check what's happening
export async function GET(request: Request) {
  const url = new URL(request.url);
  const host = request.headers.get('host');
  const protocol = url.protocol || 'https';
  
  return Response.json({
    currentDomain: `${protocol}//${host}`,
    requestUrl: request.url,
    headers: {
      host,
      'user-agent': request.headers.get('user-agent'),
    },
    environment: {
      nodeEnv: process.env.NODE_ENV,
      nextauthUrl: process.env.NEXTAUTH_URL,
      hasGoogleClientId: !!process.env.GOOGLE_CLIENT_ID,
      hasFacebookClientId: !!process.env.FACEBOOK_CLIENT_ID,
    },
    timestamp: new Date().toISOString(),
  });
}