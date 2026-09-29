import "server-only";
import { db } from "@/server/db/prisma";
import type { ContactInput, BookingInput } from "./contact.schema";

export async function createContactMessage(data: ContactInput) {
  return db.contactMessage.create({
    data: {
      name:    data.name,
      email:   data.email,
      phone:   data.phone,
      subject: data.subject,
      message: data.message,
      locale:  data.locale,
    },
  });
}

export async function createBookingInquiry(data: BookingInput & {
  tripId?: string;
  cityId?: string;
}) {
  return db.bookingInquiry.create({
    data: {
      name:      data.name,
      email:     data.email,
      phone:     data.phone,
      tripId:    data.tripId,
      cityId:    data.cityId,
      date:      data.date ? new Date(data.date) : undefined,
      groupSize: data.groupSize ?? 1,
      notes:     data.notes,
      locale:    data.locale,
    },
  });
}

export async function createOrUpdateNewsletterSubscriber(data: {
  email: string;
  locale: string;
  token: string;
}) {
  return db.newsletterSubscriber.upsert({
    where:  { email: data.email },
    create: { email: data.email, locale: data.locale, token: data.token },
    update: { locale: data.locale },
  });
}

export async function confirmNewsletterSubscriber(token: string) {
  return db.newsletterSubscriber.update({
    where:  { token },
    data:   { confirmedAt: new Date() },
  });
}

export async function findSubscriberByToken(token: string) {
  return db.newsletterSubscriber.findUnique({ where: { token } });
}
