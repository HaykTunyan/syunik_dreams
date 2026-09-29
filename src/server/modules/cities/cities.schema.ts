import "server-only";
import { z } from "zod";
import { LOCALES, DEFAULT_LOCALE } from "@/server/config/constants";

// ─── Translation shape ────────────────────────────────────────────────────────

export const cityTranslationSchema = z.object({
  name:        z.string().min(1),
  description: z.string().default(""),
  history:     z.string().default(""),
  climate:     z.string().default(""),
  bestVisit:   z.string().default(""),
  founding:    z.string().default(""),
  size:        z.string().default(""),
});

export type CityTranslation = z.infer<typeof cityTranslationSchema>;

// ─── DTO ──────────────────────────────────────────────────────────────────────

export const cityDtoSchema = z.object({
  id:          z.string(),
  slug:        z.string(),
  lat:         z.number(),
  lng:         z.number(),
  heroImage:   z.string().nullable(),
  gallery:     z.array(z.string()),
  population:  z.number().nullable(),
  altitude:    z.number().nullable(),
  published:   z.boolean(),
  // Resolved from translations JSONB:
  name:        z.string(),
  description: z.string(),
  history:     z.string(),
  climate:     z.string(),
  bestVisit:   z.string(),
  founding:    z.string(),
  size:        z.string(),
  createdAt:   z.date().or(z.string()),
  updatedAt:   z.date().or(z.string()),
});

export type CityDto = z.infer<typeof cityDtoSchema>;

// ─── Admin input schemas ──────────────────────────────────────────────────────

export const createCitySchema = z.object({
  slug:        z.string().min(2).max(80).regex(/^[a-z0-9-]+$/),
  lat:         z.number().min(-90).max(90),
  lng:         z.number().min(-180).max(180),
  heroImage:   z.string().url().optional(),
  gallery:     z.array(z.string().url()).default([]),
  population:  z.number().int().positive().optional(),
  altitude:    z.number().int().optional(),
  published:   z.boolean().default(false),
  translations: z.record(z.enum(LOCALES), cityTranslationSchema.partial()),
});

export const updateCitySchema = createCitySchema.partial();

export type CreateCityInput = z.infer<typeof createCitySchema>;
export type UpdateCityInput = z.infer<typeof updateCitySchema>;

// ─── Query schemas ────────────────────────────────────────────────────────────

export const listCitiesQuerySchema = z.object({
  locale:   z.enum(LOCALES).default(DEFAULT_LOCALE),
  cursor:   z.string().optional(),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
});

export type ListCitiesQuery = z.infer<typeof listCitiesQuerySchema>;
