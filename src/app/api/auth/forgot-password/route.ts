// /api/auth/forgot-password/route.ts
import { NextResponse } from 'next/server'
import connectMongo from '@/lib/mongodb'
import User from '@/models/User'
import crypto from 'crypto'
import { sendEmail } from '@/lib/email'

export async function POST(req: Request) {
  try {
    await connectMongo()

    const { email } = await req.json()
    console.log('📧 Forgot password request for:', email)

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() })
    if (!user) {
      // Don't reveal whether email exists or not
      console.log('📧 User not found, but returning success for security')
      return NextResponse.json({ 
        success: true, 
        message: 'If an account with that email exists, a reset link has been sent.' 
      })
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex')
    const resetTokenExpiry = new Date(Date.now() + 3600000) // 1 hour

    // Save token to user
    user.resetToken = resetToken
    user.resetTokenExpiry = resetTokenExpiry
    await user.save()

    // FIXED: Create reset URL that works for both local and production
    const baseUrl = process.env.URL || 'http://localhost:3000'
    const resetUrl = `${baseUrl}/reset-password?token=${resetToken}`

    // Send email
    try {
      await sendEmail({
        to: user.email,
        subject: 'Reset Your Yafrican Password',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #f59e0b;">Reset Your Password</h2>
            <p>Hello ${user.name || 'there'},</p>
            <p>You requested to reset your password for your Yafrican account.</p>
            <p>Click the link below to reset your password:</p>
            <a href="${resetUrl}" style="display: inline-block; background: #f59e0b; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; margin: 16px 0;">
              Reset Password
            </a>
            <p>This link will expire in 1 hour.</p>
            <p>If you didn't request this, please ignore this email.</p>
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;">
            <p style="color: #6b7280; font-size: 14px;">
              Yafrican - Ethiopia's Marketplace
            </p>
          </div>
        `
      })
      console.log('✅ Reset email sent to:', user.email)
    } catch (emailError) {
      console.error('❌ Failed to send email:', emailError)
      // Clear the token if email fails
      user.resetToken = undefined
      user.resetTokenExpiry = undefined
      await user.save()
      
      return NextResponse.json({ error: 'Failed to send reset email' }, { status: 500 })
    }

    return NextResponse.json({ 
      success: true, 
      message: 'If an account with that email exists, a reset link has been sent.' 
    })

  } catch (err: any) {
    console.error('❌ Forgot password error:', err.message || err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}