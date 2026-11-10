
import { db } from '@/server/db/prisma';
import type { City } from '@prisma/client';
import { resolveTranslation } from '@/server/lib/i18n/resolveTranslation';

export type Chunk = {
    id: string;
    lang: 'en' | 'hy';
    title: string;
    url: string;
    content: string;
};

type PlaceTranslation = { name?: string; description?: string };
type CityTranslation = { name?: string };


export async function buildChunks(): Promise<Chunk[]> {

    /**
     * 
     * build chunks 
     * 
     */

    const [places, cities] = await Promise.all([
        db.place.findMany({ where: { published: true } }),
        db.city.findMany({ where: { published: true } }),
    ]);

    const cityMap = new Map<string, City>(cities.map((c) => [c.id, c]));
    const chunks: Chunk[] = [];

    for (const place of places) {
        for (const lang of ['en', 'hy'] as const) {
            const trans = resolveTranslation<PlaceTranslation>(
                place.translations as Record<string, unknown>,
                lang,
            );
            const city = place.cityId ? cityMap.get(place.cityId) : undefined;
            const cityTrans = city
                ? resolveTranslation<CityTranslation>(
                    city.translations as Record<string, unknown>,
                    lang,
                )
                : undefined;

            const name = trans.name ?? place.slug;
            const desc = trans.description ?? '';
            const cityName = cityTrans?.name ?? '';

            chunks.push({
                id: `place-${place.slug}-${lang}`,
                lang,
                title: name,
                url: `/${lang}/trips/${place.slug}`,
                content: cityName
                    ? `${name} (${cityName}). ${desc}`
                    : `${name}. ${desc}`,
            });
        }
    }

    return chunks;
}