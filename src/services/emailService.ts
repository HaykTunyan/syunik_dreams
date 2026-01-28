import { getResend } from '@/lib/resend';

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export const EmailService = {
  async sendContactEmail(data: ContactFormData) {
    const { name, email, message } = data;

    const resend = getResend(); // ✅ runtime-only

    return await resend.emails.send({
      from: 'Syunik Dreams <onboarding@resend.dev>',
      to: ['syunikdreams@gmail.com'],
      subject: `New Contact Form Submission: ${name}`,
      replyTo: email,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 10px; overflow: hidden;">
          <div style="background-color: #ea580c; color: white; padding: 20px; text-align: center;">
            <h1 style="margin: 0;">New Message</h1>
          </div>
          <div style="padding: 20px; color: #333;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
          </div>
          <div style="background-color: #f9f9f9; padding: 20px; text-align: center; font-size: 12px; color: #999;">
            Syunik Dreams • Contact Form System
          </div>
        </div>
      `,
    });
  }
};
