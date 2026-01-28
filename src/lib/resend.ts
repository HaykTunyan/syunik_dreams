import { Resend } from 'resend';

let instance: Resend | null = null;

export function getResend() {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY is missing');
  }

  if (!instance) {
    instance = new Resend(process.env.RESEND_API_KEY);
  }

  return instance;
}
