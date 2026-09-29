import "server-only";
import * as repo from "./trips.repository";
import { toDto, toDtoList } from "./trips.mapper";
import { NotFoundError } from "@/server/lib/errors/AppError";
import { CacheTags, cached, revalidateTag } from "@/server/lib/cache/tags";
import type { Locale } from "@/server/config/constants";
import type { CreateTripInput, TripDto } from "./trips.schema";

export const getAllTrips = cached(
  async (locale: Locale): Promise<TripDto[]> => {
    const trips = await repo.findAll({ locale }, true);
    return toDtoList(trips, locale);
  },
  ["trips-all"],
  { revalidate: 300, tags: [CacheTags.trips] }
);

export const getTripBySlug = cached(
  async (slug: string, locale: Locale): Promise<TripDto> => {
    const trip = await repo.findBySlug(slug);
    if (!trip) throw new NotFoundError("Trip", slug);
    return toDto(trip, locale);
  },
  ["trip-by-slug"],
  { revalidate: 300, tags: [CacheTags.trips] }
);

export async function createTrip(input: CreateTripInput): Promise<TripDto> {
  const trip = await repo.create(input);
  revalidateTag(CacheTags.trips);
  return toDto(trip, "en");
}

export async function deleteTrip(id: string): Promise<void> {
  const existing = await repo.findById(id);
  if (!existing) throw new NotFoundError("Trip", id);
  await repo.remove(id);
  revalidateTag(CacheTags.trips);
}
