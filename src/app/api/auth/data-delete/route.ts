import { NextResponse } from 'next/server';

export async function POST() {
  // Simple version that doesn't actually delete for now
  // Just returns instructions
  return NextResponse.json({
    success: true,
    message: "To delete your data, please email yafricanstore@gmail.com with your user ID or email address.",
    confirmation_code: `DEL_${Date.now()}`,
    contact_email: "yafricanstore@gmail.com"
  });
}

export async function GET() {
  return NextResponse.json({
    instructions: "This endpoint handles GDPR data deletion requests.",
    how_to: "Send POST request or email yafricanstore@gmail.com",
    required_for: "Facebook App Review compliance"
  });
}