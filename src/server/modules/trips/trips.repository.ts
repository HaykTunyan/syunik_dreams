import "server-only";
import { db } from "@/server/db/prisma";
import type { CreateTripInput, UpdateTripInput, ListTripsQuery } from "./trips.schema";
import type { Trip, Prisma } from "@prisma/client";

type ListOpts = { locale?: string; difficulty?: string; season?: string; cursor?: string; pageSize?: number };

export async function findAll(opts: ListOpts, publishedOnly = true): Promise<Trip[]> {
  return db.trip.findMany({
    where: {
      ...(publishedOnly && { published: true }),
      ...(opts.difficulty && { difficulty: opts.difficulty as any }),
      ...(opts.season     && { seasons: { has: opts.season as any } }),
    },
    orderBy: { slug: "asc" },
    take: opts.pageSize ?? 20,
    ...(opts.cursor ? { cursor: { id: opts.cursor }, skip: 1 } : {}),
  }) as Promise<Trip[]>;
}

export async function findBySlug(slug: string): Promise<Trip | null> {
  return db.trip.findUnique({ where: { slug } });
}

export async function findById(id: string): Promise<Trip | null> {
  return db.trip.findUnique({ where: { id } });
}

export async function create(data: CreateTripInput): Promise<Trip> {
  return db.trip.create({
    data: {
      slug:         data.slug,
      difficulty:   data.difficulty as any,
      durationDays: data.durationDays,
      priceAmd:     data.priceAmd,
      seasons:      data.seasons as any,
      itinerary:    data.itinerary as Prisma.InputJsonValue,
      gallery:      data.gallery ?? [],
      published:    data.published ?? false,
      translations: data.translations as Prisma.InputJsonValue,
    },
  });
}

export async function remove(id: string): Promise<void> {
  await db.trip.delete({ where: { id } });
}
