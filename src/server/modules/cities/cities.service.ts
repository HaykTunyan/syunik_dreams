import "server-only";
import * as repo from "./cities.repository";
import { toDto, toDtoList } from "./cities.mapper";
import { NotFoundError } from "@/server/lib/errors/AppError";
import { CacheTags, cached, revalidateTag } from "@/server/lib/cache/tags";
import type { Locale } from "@/server/config/constants";
import type { CityDto, CreateCityInput, UpdateCityInput } from "./cities.schema";

// ─── Cached public reads ──────────────────────────────────────────────────────

export const getAllCities = cached(
  async (locale: Locale): Promise<CityDto[]> => {
    const cities = await repo.findAll({ publishedOnly: true });
    return toDtoList(cities, locale);
  },
  ["cities-all"],
  { revalidate: 300, tags: [CacheTags.cities] }
);

export const getCityBySlug = cached(
  async (slug: string, locale: Locale): Promise<CityDto> => {
    const city = await repo.findBySlug(slug);
    if (!city) throw new NotFoundError("City", slug);
    return toDto(city, locale);
  },
  ["city-by-slug"],
  { revalidate: 300, tags: [CacheTags.cities] }
);

// ─── Admin writes (no cache; revalidate after) ────────────────────────────────

export async function createCity(input: CreateCityInput): Promise<CityDto> {
  const city = await repo.create(input);
  revalidateTag(CacheTags.cities);
  return toDto(city, "en");
}

export async function updateCity(id: string, input: UpdateCityInput): Promise<CityDto> {
  // Ensure city exists
  const existing = await repo.findById(id);
  if (!existing) throw new NotFoundError("City", id);

  const city = await repo.update(id, input);
  revalidateTag(CacheTags.cities);
  revalidateTag(CacheTags.city(city.slug));
  return toDto(city, "en");
}

export async function deleteCity(id: string): Promise<void> {
  const existing = await repo.findById(id);
  if (!existing) throw new NotFoundError("City", id);
  await repo.remove(id);
  revalidateTag(CacheTags.cities);
  revalidateTag(CacheTags.city(existing.slug));
}

export async function publishCity(id: string, published: boolean): Promise<CityDto> {
  const existing = await repo.findById(id);
  if (!existing) throw new NotFoundError("City", id);
  const city = await repo.setPublished(id, published);
  revalidateTag(CacheTags.cities);
  revalidateTag(CacheTags.city(city.slug));
  return toDto(city, "en");
}

// Admin unfiltered list
export async function getAllCitiesAdmin(): Promise<CityDto[]> {
  const cities = await repo.findAll({ publishedOnly: false });
  return toDtoList(cities, "en");
}
