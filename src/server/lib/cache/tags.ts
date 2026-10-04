import "server-only";
import { unstable_cache } from "next/cache";

// ─── Cache tag registry ───────────────────────────────────────────────────────
// Each entity type has a list tag and optional per-item tags.

export const CacheTags = {
  // List tags
  cities:      "cities",
  places:      "places",
  trips:       "trips",
  history:     "history",
  road:        "road",
  products:    "products",
  search:      "search",

  // Per-item tag generators
  city:    (slug: string) => `city:${slug}`,
  place:   (slug: string) => `place:${slug}`,
  trip:    (slug: string) => `trip:${slug}`,
  product: (slug: string) => `product:${slug}`,

  // Commerce tags (shorter TTL)
  orders:   "orders",
  inventory: "inventory",
} as const;

// ─── Revalidation helpers ─────────────────────────────────────────────────────

import { revalidateTag as nextRevalidateTag } from "next/cache";

export function revalidateTag(tag: string) {
  // @ts-expect-error Next.js typing bug: profile is not required at runtime but marked as required in types
  return nextRevalidateTag(tag);
}

// ─── Typed cached function wrapper ────────────────────────────────────────────

/**
 * cached — convenience wrapper around unstable_cache.
 * Usage:
 *   export const getCities = cached(
 *     async (locale: Locale) => citiesService.findAll(locale),
 *     ["cities"],
 *     { revalidate: 300 }
 *   );
 */
export function cached<TArgs extends unknown[], TReturn>(
  fn: (...args: TArgs) => Promise<TReturn>,
  keyParts: string[],
  options?: { revalidate?: number; tags?: string[] }
): (...args: TArgs) => Promise<TReturn> {
  return unstable_cache(fn, keyParts, {
    revalidate: options?.revalidate ?? 300,
    tags: options?.tags,
  }) as (...args: TArgs) => Promise<TReturn>;
}
