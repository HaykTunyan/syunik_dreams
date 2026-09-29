import "server-only";
import * as repo from "./contact.repository";
import * as mail from "@/server/lib/mail/resend";
import { ConflictError } from "@/server/lib/errors/AppError";
import type { ContactInput, BookingInput, NewsletterInput } from "./contact.schema";

export async function submitContact(input: ContactInput): Promise<{ id: string }> {
  // Honeypot check (double guard — schema already validates, belt + suspenders)
  if (input.website) {
    return { id: "honeypot" };
  }

  const msg = await repo.createContactMessage(input);

  // Fire emails in background — don't await to keep response fast
  void mail.sendContactNotification({
    name:    input.name,
    email:   input.email,
    message: input.message,
    subject: input.subject,
  });
  void mail.sendContactConfirmation({
    to:      input.email,
    name:    input.name,
    message: input.message,
  });

  return { id: msg.id };
}

export async function submitBooking(
  input: BookingInput,
  opts: { tripId?: string; cityId?: string }
): Promise<{ id: string }> {
  if (input.website) {
    return { id: "honeypot" };
  }

  const inquiry = await repo.createBookingInquiry({ ...input, ...opts });
  return { id: inquiry.id };
}

export async function subscribeNewsletter(input: NewsletterInput): Promise<{ status: "pending" }> {
  const token = crypto.randomUUID();

  const subscriber = await repo.createOrUpdateNewsletterSubscriber({
    email:  input.email,
    locale: input.locale,
    token,
  });

  if (!subscriber.confirmedAt) {
    void mail.sendNewsletterConfirmation({
      to:     input.email,
      token:  subscriber.token,
      locale: input.locale,
    });
  }

  return { status: "pending" };
}

export async function confirmNewsletterSubscription(token: string): Promise<{ confirmed: boolean }> {
  const subscriber = await repo.findSubscriberByToken(token);
  if (!subscriber) return { confirmed: false };
  if (subscriber.confirmedAt) return { confirmed: true }; // already confirmed

  await repo.confirmNewsletterSubscriber(token);
  return { confirmed: true };
}
