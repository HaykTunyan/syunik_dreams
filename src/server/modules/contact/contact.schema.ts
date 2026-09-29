import "server-only";
import { z } from "zod";
import { LOCALES, DEFAULT_LOCALE } from "@/server/config/constants";

export const contactSchema = z.object({
  name:     z.string().min(2).max(120),
  email:    z.string().email(),
  phone:    z.string().max(30).optional(),
  subject:  z.string().max(200).optional(),
  message:  z.string().min(10).max(5000),
  locale:   z.enum(LOCALES).default(DEFAULT_LOCALE),
  // Honeypot — must be empty string or absent
  website:  z.string().max(0, "Honeypot must be empty").default("").optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const bookingSchema = z.object({
  name:      z.string().min(2).max(120),
  email:     z.string().email(),
  phone:     z.string().max(30).optional(),
  tripSlug:  z.string().optional(),
  citySlug:  z.string().optional(),
  date:      z.string().datetime({ offset: true }).optional(),
  groupSize: z.number().int().positive().max(100).default(1),
  notes:     z.string().max(2000).optional(),
  locale:    z.enum(LOCALES).default(DEFAULT_LOCALE),
  website:   z.string().max(0).default("").optional(),
});

export type BookingInput = z.infer<typeof bookingSchema>;

export const newsletterSchema = z.object({
  email:  z.string().email(),
  locale: z.enum(LOCALES).default(DEFAULT_LOCALE),
});

export type NewsletterInput = z.infer<typeof newsletterSchema>;
