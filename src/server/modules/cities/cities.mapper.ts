import "server-only";
import type { City } from "@prisma/client";
import { resolveTranslation } from "@/server/lib/i18n/resolveTranslation";
import type { Locale } from "@/server/config/constants";
import type { CityDto, CityTranslation } from "./cities.schema";

/**
 * toDto — maps a Prisma City row to a locale-resolved CityDto.
 * This is the ONLY place where the translations JSONB is unpacked.
 */
export function toDto(city: City, locale: Locale): CityDto {
  const trans = resolveTranslation<CityTranslation>(
    city.translations as Record<string, unknown>,
    locale
  );

  return {
    id:          city.id,
    slug:        city.slug,
    lat:         city.lat,
    lng:         city.lng,
    heroImage:   city.heroImage,
    gallery:     city.gallery,
    population:  city.population,
    altitude:    city.altitude,
    published:   city.published,
    name:        trans.name        ?? city.slug,
    description: trans.description ?? "",
    history:     trans.history     ?? "",
    climate:     trans.climate     ?? "",
    bestVisit:   trans.bestVisit   ?? "",
    founding:    trans.founding    ?? "",
    size:        trans.size        ?? "",
    createdAt:   city.createdAt,
    updatedAt:   city.updatedAt,
  };
}

export function toDtoList(cities: City[], locale: Locale): CityDto[] {
  return cities.map((c) => toDto(c, locale));
}
