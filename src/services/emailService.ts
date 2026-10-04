// import { getResend } from '@/lib/resend';

// export interface ContactFormData {
//   name: string;
//   email: string;
//   message: string;
// }

// export const EmailService = {

//   /**
//    * 
//    * @param data 
//    * sends an email to the specified recipient with the provided data
//    * @returns 
//    * 
//    */


//   async sendContactEmail(data: ContactFormData) {
//     const { name, email, message } = data;

//     const resend = getResend(); 

//     return await resend.emails.send({
//       from: 'Syunik Dreams <onboarding@resend.dev>',
//       to: ['syunikdreams@gmail.com'],
//       subject: `New Contact Form Submission: ${name}`,
//       replyTo: email,
//       html: `
//         <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 10px; overflow: hidden;">
//           <div style="background-color: #ea580c; color: white; padding: 20px; text-align: center;">
//             <h1 style="margin: 0;">New Message</h1>
//           </div>
//           <div style="padding: 20px; color: #333;">
//             <p><strong>Name:</strong> ${name}</p>
//             <p><strong>Email:</strong> ${email}</p>
//             <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
//             <p><strong>Message:</strong></p>
//             <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
//           </div>
//           <div style="background-color: #f9f9f9; padding: 20px; text-align: center; font-size: 12px; color: #999;">
//             Syunik Dreams • Contact Form System
//           </div>
//         </div>
//       `,
//     });
//   }
// };



import { getResend } from '@/lib/resend';

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://your-domain.com';

const BRAND = {
  logoUrl: `${SITE_URL}/logo-syunik.jpg`, // put the logo in /public
  green: '#0b2e1a',
  greenLight: '#14452a',
  gold: '#c9a24b',
  bg: '#f4f1ea',
  address: 'Syunik Region, Armenia',
  email: 'syunikdreams@gmail.com',
  social: [
    { label: 'Facebook', url: 'https://facebook.com/your-page' },
    { label: 'Instagram', url: 'https://instagram.com/your-page' },
    { label: 'TikTok', url: 'https://tiktok.com/@your-page' },
    { label: 'Twitter', url: 'https://twitter.com/your-page' },
  ],
};

// Prevents HTML injection from user-submitted form values
const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const buildContactEmailHtml = ({ name, email, message }: ContactFormData) => {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message);

  const socialLinks = BRAND.social
    .map(
      (s) => `
        <a href="${s.url}" target="_blank"
           style="display:inline-block; margin:4px; padding:8px 14px; border:1px solid ${BRAND.gold}; border-radius:20px; color:${BRAND.gold}; font-size:12px; font-weight:600; text-decoration:none;">
          ${s.label}
        </a>`
    )
    .join('');

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Contact Message</title>
</head>
<body style="margin:0; padding:0; background-color:${BRAND.bg}; font-family:'Segoe UI', Helvetica, Arial, sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${BRAND.bg}; padding:32px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0"
               style="max-width:600px; width:100%; background-color:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 8px 30px rgba(0,0,0,0.08);">

          <!-- Header with logo -->
          <tr>
            <td align="center" style="background-color:${BRAND.green}; padding:32px 20px 24px;">
              <img src="${BRAND.logoUrl}" alt="Syunik Dreams" width="140" height="140"
                   style="display:block; width:140px; height:140px; border-radius:50%; border:3px solid ${BRAND.gold}; object-fit:cover;" />
              <h1 style="margin:20px 0 4px; color:#ffffff; font-size:24px; font-weight:700; letter-spacing:0.5px;">
                New Message Received
              </h1>
              <p style="margin:0; color:${BRAND.gold}; font-size:13px; letter-spacing:2px; text-transform:uppercase;">
                Syunik Dreams
              </p>
            </td>
          </tr>
          <tr><td style="height:4px; background-color:${BRAND.gold}; line-height:4px; font-size:0;">&nbsp;</td></tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px 32px 8px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:14px 16px; background-color:#f8f6f1; border-left:4px solid ${BRAND.gold}; border-radius:6px;">
                    <p style="margin:0 0 4px; font-size:11px; color:#8a8a8a; text-transform:uppercase; letter-spacing:1px;">From</p>
                    <p style="margin:0; font-size:16px; font-weight:600; color:${BRAND.green};">${safeName}</p>
                  </td>
                </tr>
                <tr><td style="height:12px; line-height:12px; font-size:0;">&nbsp;</td></tr>
                <tr>
                  <td style="padding:14px 16px; background-color:#f8f6f1; border-left:4px solid ${BRAND.gold}; border-radius:6px;">
                    <p style="margin:0 0 4px; font-size:11px; color:#8a8a8a; text-transform:uppercase; letter-spacing:1px;">Email</p>
                    <a href="mailto:${safeEmail}" style="font-size:16px; font-weight:600; color:${BRAND.greenLight}; text-decoration:none;">${safeEmail}</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding:20px 32px 8px;">
              <p style="margin:0 0 10px; font-size:11px; color:#8a8a8a; text-transform:uppercase; letter-spacing:1px;">Message</p>
              <div style="padding:20px; background-color:#ffffff; border:1px solid #e8e4da; border-radius:10px; font-size:15px; line-height:1.7; color:#333333; white-space:pre-wrap;">${safeMessage}</div>
            </td>
          </tr>

          <!-- Reply button -->
          <tr>
            <td align="center" style="padding:28px 32px 36px;">
              <a href="mailto:${safeEmail}?subject=Re: Your message to Syunik Dreams"
                 style="display:inline-block; padding:14px 36px; background-color:${BRAND.green}; color:${BRAND.gold}; font-size:14px; font-weight:700; letter-spacing:1px; text-decoration:none; border-radius:30px; border:2px solid ${BRAND.gold};">
                REPLY TO ${safeName.toUpperCase()}
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="background-color:${BRAND.green}; padding:32px 24px;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center" style="padding-bottom:16px;">
                    <p style="margin:0 0 4px; font-size:11px; color:${BRAND.gold}; text-transform:uppercase; letter-spacing:2px;">Address</p>
                    <p style="margin:0; font-size:14px; color:#ffffff;">${BRAND.address}</p>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding-bottom:20px;">
                    <p style="margin:0 0 4px; font-size:11px; color:${BRAND.gold}; text-transform:uppercase; letter-spacing:2px;">Email</p>
                    <a href="mailto:${BRAND.email}" style="font-size:14px; color:#ffffff; text-decoration:none;">${BRAND.email}</a>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding-bottom:20px;">
                    <p style="margin:0 0 8px; font-size:11px; color:${BRAND.gold}; text-transform:uppercase; letter-spacing:2px;">Follow Us</p>
                    ${socialLinks}
                  </td>
                </tr>
                <tr>
                  <td align="center" style="border-top:1px solid rgba(201,162,75,0.3); padding-top:16px;">
                    <p style="margin:0; font-size:12px; color:#9fb5a6;">
                      © ${new Date().getFullYear()} Syunik Dreams • Contact Form System
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
};

export const EmailService = {
  /**
   * Sends a contact form submission to the Syunik Dreams inbox.
   */
  async sendContactEmail(data: ContactFormData) {
    const resend = getResend();

    return await resend.emails.send({
      from: 'Syunik Dreams <onboarding@resend.dev>',
      to: [BRAND.email],
      subject: `New Contact Form Submission: ${data.name}`,
      replyTo: data.email,
      html: buildContactEmailHtml(data),
    });
  },
};
