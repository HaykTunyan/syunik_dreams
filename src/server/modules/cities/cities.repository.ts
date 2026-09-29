import "server-only";
import { db } from "@/server/db/prisma";
import type { CreateCityInput, UpdateCityInput } from "./cities.schema";
import type { City, Prisma } from "@prisma/client";

// ─── Read ─────────────────────────────────────────────────────────────────────

export async function findAll(opts: {
  cursor?: string;
  pageSize?: number;
  publishedOnly?: boolean;
}): Promise<City[]> {
  const { cursor, pageSize = 20, publishedOnly = true } = opts;

  return db.city.findMany({
    where: publishedOnly ? { published: true } : undefined,
    orderBy: { slug: "asc" },
    take: pageSize,
    ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),
    select: {
      id: true, slug: true, lat: true, lng: true,
      heroImage: true, gallery: true, population: true,
      altitude: true, published: true, translations: true,
      createdAt: true, updatedAt: true,
    },
  }) as Promise<City[]>;
}

export async function findBySlug(slug: string): Promise<City | null> {
  return db.city.findUnique({
    where: { slug },
  });
}

export async function findById(id: string): Promise<City | null> {
  return db.city.findUnique({ where: { id } });
}

export async function count(publishedOnly = true): Promise<number> {
  return db.city.count({
    where: publishedOnly ? { published: true } : undefined,
  });
}

// ─── Write ────────────────────────────────────────────────────────────────────

export async function create(data: CreateCityInput): Promise<City> {
  return db.city.create({
    data: {
      slug:         data.slug,
      lat:          data.lat,
      lng:          data.lng,
      heroImage:    data.heroImage,
      gallery:      data.gallery ?? [],
      population:   data.population,
      altitude:     data.altitude,
      published:    data.published ?? false,
      translations: data.translations as Prisma.InputJsonValue,
    },
  });
}

export async function update(id: string, data: UpdateCityInput): Promise<City> {
  return db.city.update({
    where: { id },
    data: {
      ...(data.slug        !== undefined && { slug: data.slug }),
      ...(data.lat         !== undefined && { lat: data.lat }),
      ...(data.lng         !== undefined && { lng: data.lng }),
      ...(data.heroImage   !== undefined && { heroImage: data.heroImage }),
      ...(data.gallery     !== undefined && { gallery: data.gallery }),
      ...(data.population  !== undefined && { population: data.population }),
      ...(data.altitude    !== undefined && { altitude: data.altitude }),
      ...(data.published   !== undefined && { published: data.published }),
      ...(data.translations !== undefined && {
        translations: data.translations as Prisma.InputJsonValue,
      }),
    },
  });
}

export async function remove(id: string): Promise<void> {
  await db.city.delete({ where: { id } });
}

export async function setPublished(id: string, published: boolean): Promise<City> {
  return db.city.update({ where: { id }, data: { published } });
}
