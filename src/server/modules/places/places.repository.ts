import "server-only";
import { db } from "@/server/db/prisma";
import type { CreatePlaceInput, UpdatePlaceInput, ListPlacesQuery } from "./places.schema";
import type { Place, Prisma } from "@prisma/client";

function buildWhere(opts: Partial<ListPlacesQuery>, publishedOnly: boolean): Prisma.PlaceWhereInput {
  const where: Prisma.PlaceWhereInput = {};
  if (publishedOnly) where.published = true;
  if (opts.category) where.category = opts.category;
  if (opts.city)     where.city = { slug: opts.city };

  if (opts.bbox) {
    const [minLat, minLng, maxLat, maxLng] = opts.bbox.split(",").map(Number);
    if (!isNaN(minLat) && !isNaN(minLng) && !isNaN(maxLat) && !isNaN(maxLng)) {
      where.lat = { gte: minLat, lte: maxLat };
      where.lng = { gte: minLng, lte: maxLng };
    }
  }

  return where;
}

export async function findAll(opts: ListPlacesQuery, publishedOnly = true): Promise<Place[]> {
  return db.place.findMany({
    where: buildWhere(opts, publishedOnly),
    orderBy: { slug: "asc" },
    take: opts.pageSize ?? 50,
    ...(opts.cursor ? { cursor: { id: opts.cursor }, skip: 1 } : {}),
  }) as Promise<Place[]>;
}

export async function findBySlug(slug: string): Promise<Place | null> {
  return db.place.findUnique({ where: { slug } });
}

export async function findById(id: string): Promise<Place | null> {
  return db.place.findUnique({ where: { id } });
}

export async function create(data: CreatePlaceInput): Promise<Place> {
  return db.place.create({
    data: {
      slug:         data.slug,
      cityId:       data.cityId,
      category:     data.category,
      lat:          data.lat,
      lng:          data.lng,
      images:       data.images ?? [],
      openingHours: data.openingHours,
      ticketPrice:  data.ticketPrice,
      published:    data.published ?? false,
      translations: data.translations as Prisma.InputJsonValue,
    },
  });
}

export async function update(id: string, data: UpdatePlaceInput): Promise<Place> {
  return db.place.update({
    where: { id },
    data: {
      ...(data.slug         !== undefined && { slug: data.slug }),
      ...(data.cityId       !== undefined && { cityId: data.cityId }),
      ...(data.category     !== undefined && { category: data.category }),
      ...(data.lat          !== undefined && { lat: data.lat }),
      ...(data.lng          !== undefined && { lng: data.lng }),
      ...(data.images       !== undefined && { images: data.images }),
      ...(data.openingHours !== undefined && { openingHours: data.openingHours }),
      ...(data.ticketPrice  !== undefined && { ticketPrice: data.ticketPrice }),
      ...(data.published    !== undefined && { published: data.published }),
      ...(data.translations !== undefined && {
        translations: data.translations as Prisma.InputJsonValue,
      }),
    },
  });
}

export async function remove(id: string): Promise<void> {
  await db.place.delete({ where: { id } });
}
