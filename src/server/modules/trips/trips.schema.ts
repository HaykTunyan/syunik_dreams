import "server-only";
import { z } from "zod";
import { LOCALES, DEFAULT_LOCALE } from "@/server/config/constants";

export const TripDifficultyEnum = z.enum(["EASY", "MEDIUM", "HARD", "EXPERT"]);
export const SeasonEnum = z.enum(["SPRING", "SUMMER", "AUTUMN", "WINTER"]);

export const tripTranslationSchema = z.object({
  name:        z.string().min(1),
  description: z.string().default(""),
  shortDesc:   z.string().default(""),
  activities:  z.array(z.string()).default([]),
});
export type TripTranslation = z.infer<typeof tripTranslationSchema>;

export const tripDtoSchema = z.object({
  id:           z.string(),
  slug:         z.string(),
  difficulty:   TripDifficultyEnum,
  durationDays: z.number(),
  priceAmd:     z.number(),
  seasons:      z.array(SeasonEnum),
  gallery:      z.array(z.string()),
  published:    z.boolean(),
  name:         z.string(),
  description:  z.string(),
  shortDesc:    z.string(),
  activities:   z.array(z.string()),
  createdAt:    z.date().or(z.string()),
  updatedAt:    z.date().or(z.string()),
});
export type TripDto = z.infer<typeof tripDtoSchema>;

export const listTripsQuerySchema = z.object({
  locale:     z.enum(LOCALES).default(DEFAULT_LOCALE),
  difficulty: TripDifficultyEnum.optional(),
  season:     SeasonEnum.optional(),
  cursor:     z.string().optional(),
  pageSize:   z.coerce.number().int().min(1).max(100).default(20),
});

export const createTripSchema = z.object({
  slug:         z.string().min(2).max(80).regex(/^[a-z0-9-]+$/),
  difficulty:   TripDifficultyEnum.default("MEDIUM"),
  durationDays: z.number().int().positive().default(1),
  priceAmd:     z.number().int().nonnegative().default(0),
  seasons:      z.array(SeasonEnum).default([]),
  itinerary:    z.array(z.object({
    day:         z.number().int().positive(),
    title:       z.string(),
    description: z.string().default(""),
    placeIds:    z.array(z.string()).default([]),
  })).default([]),
  gallery:      z.array(z.string()).default([]),
  published:    z.boolean().default(false),
  translations: z.record(z.enum(LOCALES), tripTranslationSchema.partial()),
});
export type CreateTripInput = z.infer<typeof createTripSchema>;
export type UpdateTripInput = Partial<CreateTripInput>;
