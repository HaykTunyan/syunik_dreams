import "server-only";
import type { Trip } from "@prisma/client";
import { resolveTranslation } from "@/server/lib/i18n/resolveTranslation";
import type { Locale } from "@/server/config/constants";
import type { TripDto, TripTranslation } from "./trips.schema";

export function toDto(trip: Trip, locale: Locale): TripDto {
  const trans = resolveTranslation<TripTranslation>(
    trip.translations as Record<string, unknown>,
    locale
  );
  return {
    id:           trip.id,
    slug:         trip.slug,
    difficulty:   trip.difficulty as TripDto["difficulty"],
    durationDays: trip.durationDays,
    priceAmd:     trip.priceAmd,
    seasons:      trip.seasons as TripDto["seasons"],
    gallery:      trip.gallery,
    published:    trip.published,
    name:         trans.name        ?? trip.slug,
    description:  trans.description ?? "",
    shortDesc:    trans.shortDesc   ?? "",
    activities:   trans.activities  ?? [],
    createdAt:    trip.createdAt,
    updatedAt:    trip.updatedAt,
  };
}

export function toDtoList(trips: Trip[], locale: Locale): TripDto[] {
  return trips.map((t) => toDto(t, locale));
}
