import "server-only";
import { z } from "zod";
import { LOCALES, DEFAULT_LOCALE } from "@/server/config/constants";

export const createOrderSchema = z.object({
  customerName:  z.string().min(2).max(120),
  customerEmail: z.string().email(),
  customerPhone: z.string().max(30).optional(),
  locale:        z.enum(LOCALES).default(DEFAULT_LOCALE),
  shippingAddress: z.object({
    street:  z.string().optional(),
    city:    z.string().optional(),
    country: z.string().default("AM"),
  }).default({}),
  items: z.array(z.object({
    variantId: z.string(),
    quantity:  z.number().int().positive().max(100),
  })).min(1),
  notes: z.string().max(500).optional(),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;

export const paymentWebhookSchema = z.object({
  externalId: z.string(),
  orderId:    z.string(),
  status:     z.enum(["succeeded", "failed", "pending"]),
});
