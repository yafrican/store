// src/lib/email.ts
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

interface SendEmailParams {
  to: string
  subject: string
  html: string
  text?: string
}

export async function sendEmail({ to, subject, html, text }: SendEmailParams) {
  try {
    const { data, error } = await resend.emails.send({
      // Use Resend's default verified domain for now
      // from: 'Yafrican <noreply@yafrican.com>', // or any @yafrican.com address

      from: 'Yafrican <onboarding@resend.dev>',
      to: [to],
      subject,
      html,
      text: text || html.replace(/<[^>]*>/g, ''),
    })

    if (error) {
      console.error('❌ Email sending failed:', error)
      throw error
    }

    console.log('✅ Email sent to:', to, 'ID:', data?.id)
    return data
  } catch (error) {
    console.error('❌ Email sending failed:', error)
    throw error
  }
}