import "server-only";
import * as repo from "./places.repository";
import { toDto, toDtoList, toGeoJson } from "./places.mapper";
import { NotFoundError } from "@/server/lib/errors/AppError";
import { CacheTags, cached, revalidateTag } from "@/server/lib/cache/tags";
import type { Locale } from "@/server/config/constants";
import type { CreatePlaceInput, ListPlacesQuery, PlaceDto, PlaceGeoJson } from "./places.schema";

export const getAllPlaces = cached(
  async (opts: ListPlacesQuery): Promise<PlaceDto[] | PlaceGeoJson> => {
    const places = await repo.findAll(opts, true);
    if (opts.geojson) return toGeoJson(places, opts.locale);
    return toDtoList(places, opts.locale);
  },
  ["places-all"],
  { revalidate: 300, tags: [CacheTags.places] }
);

export const getPlaceBySlug = cached(
  async (slug: string, locale: Locale): Promise<PlaceDto> => {
    const place = await repo.findBySlug(slug);
    if (!place) throw new NotFoundError("Place", slug);
    return toDto(place, locale);
  },
  ["place-by-slug"],
  { revalidate: 300, tags: [CacheTags.places] }
);

export async function createPlace(input: CreatePlaceInput): Promise<PlaceDto> {
  const place = await repo.create(input);
  revalidateTag(CacheTags.places);
  return toDto(place, "en");
}

export async function deletePlace(id: string): Promise<void> {
  const existing = await repo.findById(id);
  if (!existing) throw new NotFoundError("Place", id);
  await repo.remove(id);
  revalidateTag(CacheTags.places);
}
