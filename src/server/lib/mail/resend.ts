import "server-only";
import { Resend } from "resend";
import { env } from "@/server/config/env";
import { logger } from "@/server/lib/logger";

let _resend: Resend | null = null;

function getResend(): Resend {
  if (!_resend) {
    _resend = new Resend(env.RESEND_API_KEY);
  }
  return _resend;
}

export async function sendContactConfirmation(opts: {
  to: string;
  name: string;
  message: string;
}) {
  try {
    await getResend().emails.send({
      from:    env.RESEND_FROM_EMAIL,
      to:      [opts.to],
      subject: `We received your message — Syunik Dreams`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
          <h2 style="color:#ea580c">Thank you, ${opts.name}!</h2>
          <p>We received your message and will get back to you soon.</p>
          <blockquote style="border-left:4px solid #ea580c;padding-left:12px;color:#555">
            ${opts.message.substring(0, 300)}${opts.message.length > 300 ? "…" : ""}
          </blockquote>
          <p>— The Syunik Dreams Team</p>
        </div>
      `,
    });
  } catch (err) {
    logger.error({ err }, "Failed to send contact confirmation email");
  }
}

export async function sendContactNotification(opts: {
  name: string;
  email: string;
  message: string;
  subject?: string;
}) {
  try {
    await getResend().emails.send({
      from:    env.RESEND_FROM_EMAIL,
      to:      [env.RESEND_TO_EMAIL],
      replyTo: opts.email,
      subject: `New Contact: ${opts.subject ?? opts.name}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;border:1px solid #eee;border-radius:10px;overflow:hidden">
          <div style="background:#ea580c;color:white;padding:20px;text-align:center">
            <h1 style="margin:0">New Contact Message</h1>
          </div>
          <div style="padding:20px;color:#333">
            <p><strong>Name:</strong> ${opts.name}</p>
            <p><strong>Email:</strong> ${opts.email}</p>
            ${opts.subject ? `<p><strong>Subject:</strong> ${opts.subject}</p>` : ""}
            <hr style="border:0;border-top:1px solid #eee;margin:20px 0">
            <p><strong>Message:</strong></p>
            <p style="white-space:pre-wrap;line-height:1.6">${opts.message}</p>
          </div>
        </div>
      `,
    });
  } catch (err) {
    logger.error({ err }, "Failed to send contact notification email");
  }
}

export async function sendNewsletterConfirmation(opts: {
  to: string;
  token: string;
  locale: string;
}) {
  const baseUrl = env.NEXT_PUBLIC_APP_URL;
  const confirmUrl = `${baseUrl}/api/v1/newsletter/confirm?token=${opts.token}`;
  try {
    await getResend().emails.send({
      from:    env.RESEND_FROM_EMAIL,
      to:      [opts.to],
      subject: "Confirm your newsletter subscription — Syunik Dreams",
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
          <h2 style="color:#ea580c">Confirm Your Subscription</h2>
          <p>Click the button below to confirm your subscription to the Syunik Dreams newsletter.</p>
          <a href="${confirmUrl}" style="display:inline-block;background:#ea580c;color:white;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:bold">
            Confirm Subscription
          </a>
          <p style="color:#888;font-size:12px">If you did not subscribe, ignore this email.</p>
        </div>
      `,
    });
  } catch (err) {
    logger.error({ err }, "Failed to send newsletter confirmation email");
  }
}

export async function sendOrderConfirmation(opts: {
  to: string;
  name: string;
  orderNumber: string;
  totalAmd: number;
}) {
  try {
    await getResend().emails.send({
      from:    env.RESEND_FROM_EMAIL,
      to:      [opts.to],
      subject: `Order Confirmed #${opts.orderNumber} — Syunik Dreams`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
          <h2 style="color:#ea580c">Order Confirmed!</h2>
          <p>Dear ${opts.name}, your order <strong>#${opts.orderNumber}</strong> has been confirmed.</p>
          <p><strong>Total:</strong> ${opts.totalAmd.toLocaleString()} AMD</p>
          <p>Expected delivery: 2–3 business days within Armenia.</p>
          <p>— The Syunik Dreams Team</p>
        </div>
      `,
    });
  } catch (err) {
    logger.error({ err }, "Failed to send order confirmation email");
  }
}
