import "server-only";
import type { Place } from "@prisma/client";
import { resolveTranslation } from "@/server/lib/i18n/resolveTranslation";
import type { Locale } from "@/server/config/constants";
import type { PlaceDto, PlaceGeoJson, PlaceTranslation } from "./places.schema";

export function toDto(place: Place, locale: Locale): PlaceDto {
  const trans = resolveTranslation<PlaceTranslation>(
    place.translations as Record<string, unknown>,
    locale
  );
  return {
    id:           place.id,
    slug:         place.slug,
    cityId:       place.cityId,
    category:     place.category as PlaceDto["category"],
    lat:          place.lat,
    lng:          place.lng,
    images:       place.images,
    openingHours: place.openingHours,
    ticketPrice:  place.ticketPrice,
    published:    place.published,
    name:         trans.name        ?? place.slug,
    description:  trans.description ?? "",
    shortDesc:    trans.shortDesc   ?? "",
    createdAt:    place.createdAt,
    updatedAt:    place.updatedAt,
  };
}

export function toDtoList(places: Place[], locale: Locale): PlaceDto[] {
  return places.map((p) => toDto(p, locale));
}

export function toGeoJson(places: Place[], locale: Locale): PlaceGeoJson {
  return {
    type: "FeatureCollection",
    features: places.map((place) => {
      const trans = resolveTranslation<PlaceTranslation>(
        place.translations as Record<string, unknown>,
        locale
      );
      return {
        type: "Feature",
        geometry: { type: "Point", coordinates: [place.lng, place.lat] },
        properties: {
          id:          place.id,
          slug:        place.slug,
          category:    place.category,
          name:        trans.name     ?? place.slug,
          description: trans.shortDesc ?? "",
        },
      };
    }),
  };
}
