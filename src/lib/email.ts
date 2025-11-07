// src/lib/email.ts
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  }
})

interface SendEmailParams {
  to: string
  subject: string
  html: string
}

export async function sendEmail({ to, subject, html }: SendEmailParams) {
  try {
    const result = await transporter.sendMail({
      from: '"Yafrican" <asayemax1921@gmail.com>', // Hardcoded for consistent display
      to,
      subject,
      html,
    })
    
    console.log('✅ Email sent to:', to)
    return result
  } catch (error) {
    console.error('❌ Email sending failed:', error)
    throw error
  }
}