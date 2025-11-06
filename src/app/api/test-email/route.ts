import { NextResponse } from 'next/server'
import { sendEmail } from '@/lib/email'

export async function GET() {
  try {
    await sendEmail({
      to: 'onboarding@resend.dev', // Replace with your actual email
      subject: 'Yafrican - Test Email',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h1 style="color: #f59e0b;">🎉 Resend is Working!</h1>
          <p>Your Yafrican email setup is successful.</p>
          <p>You can now send password reset emails.</p>
        </div>
      `
    })

    return NextResponse.json({ 
      success: true, 
      message: 'Test email sent successfully!' 
    })
  } catch (error: any) {
    console.error('Test email error:', error)
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    }, { status: 500 })
  }
}