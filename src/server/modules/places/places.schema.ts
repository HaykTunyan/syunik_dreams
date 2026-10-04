import "server-only";
import { z } from "zod";
import { LOCALES, DEFAULT_LOCALE } from "@/server/config/constants";

export const PlaceCategoryEnum = z.enum([
  "MONASTERY", "NATURE", "FORTRESS", "MUSEUM",
  "FOOD", "STAY", "ACTIVITY", "BRIDGE", "WATERFALL", "TOWN",
]);
export type PlaceCategoryEnum = z.infer<typeof PlaceCategoryEnum>;

export const placeTranslationSchema = z.object({
  name: z.string().min(1),
  description: z.string().default(""),
  shortDesc: z.string().default(""),
});
export type PlaceTranslation = z.infer<typeof placeTranslationSchema>;

export const placeDtoSchema = z.object({
  id: z.string(),
  slug: z.string(),
  cityId: z.string().nullable(),
  category: PlaceCategoryEnum,
  lat: z.number(),
  lng: z.number(),
  images: z.array(z.string()),
  openingHours: z.string().nullable(),
  ticketPrice: z.number().nullable(),
  published: z.boolean(),
  name: z.string(),
  description: z.string(),
  shortDesc: z.string(),
  createdAt: z.date().or(z.string()),
  updatedAt: z.date().or(z.string()),
});
export type PlaceDto = z.infer<typeof placeDtoSchema>;

// GeoJSON FeatureCollection output for map
export const placeGeoJsonSchema = z.object({
  type: z.literal("FeatureCollection"),
  features: z.array(z.object({
    type: z.literal("Feature"),
    geometry: z.object({ type: z.literal("Point"), coordinates: z.tuple([z.number(), z.number()]) }),
    properties: z.record(z.string(), z.unknown()),
  })),
});
export type PlaceGeoJson = z.infer<typeof placeGeoJsonSchema>;

export const listPlacesQuerySchema = z.object({
  locale: z.enum(LOCALES).default(DEFAULT_LOCALE),
  category: PlaceCategoryEnum.optional(),
  city: z.string().optional(),
  bbox: z.string().optional(), // "minLat,minLng,maxLat,maxLng"
  geojson: z.coerce.boolean().default(false),
  cursor: z.string().optional(),
  pageSize: z.coerce.number().int().min(1).max(200).default(50),
});
export type ListPlacesQuery = z.infer<typeof listPlacesQuerySchema>;

export const createPlaceSchema = z.object({
  slug: z.string().min(2).max(80).regex(/^[a-z0-9-]+$/),
  cityId: z.string().optional(),
  category: PlaceCategoryEnum,
  lat: z.number(),
  lng: z.number(),
  images: z.array(z.string()).default([]),
  openingHours: z.string().optional(),
  ticketPrice: z.number().int().nonnegative().optional(),
  published: z.boolean().default(false),
  translations: z.record(z.enum(LOCALES), placeTranslationSchema.partial()),
});
export type CreatePlaceInput = z.infer<typeof createPlaceSchema>;
export type UpdatePlaceInput = Partial<CreatePlaceInput>;
