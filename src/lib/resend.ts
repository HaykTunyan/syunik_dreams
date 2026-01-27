import { Resend } from 'resend';

// Initialize Resend with the API key from environment variables
if (!process.env.RESEND_API_KEY) {
  console.warn('RESEND_API_KEY is missing in your environment variables.');
}

export const resend = new Resend(process.env.RESEND_API_KEY);
