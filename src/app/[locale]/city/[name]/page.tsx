import { cities } from "@/data/cities";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import CityDetailClient from "@/container/city/CityDetailClient";
import { getTranslations } from "next-intl/server";

interface Props {
    params: Promise<{ locale: string; name: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale, name: cityId } = await params;
    const city = cities.find((c) => c.id === cityId);

    if (!city) {
        return {
            title: "City Not Found",
        };
    }

    const tData = await getTranslations({ locale, namespace: 'cities_data' });
    const cityName = tData(`${city.id}.name`);
    const cityDescription = tData(`${city.id}.description`);

    return {
        title: cityName,
        description: cityDescription,
        openGraph: {
            title: `${cityName} | Syunik Dreams`,
            description: cityDescription,
            url: `https://syunikdreams.am/${locale}/city/${cityId}`,
            siteName: "Syunik Dreams",
            images: [
                {
                    url: "/images/syunik_landscape.png",
                    width: 1200,
                    height: 630,
                    alt: cityName,
                },
            ],
            locale: locale === 'hy' ? 'hy_AM' : 'en_US',
            type: "article",
        },
        twitter: {
            card: "summary_large_image",
            title: cityName,
            description: cityDescription,
            images: ["/images/syunik_landscape.png"],
        },
    };
}

export default async function CityDetailPage({ params }: Props) {
    const { locale, name: cityId } = await params;
    const city = cities.find((c) => c.id === cityId);

    if (!city) {
        notFound();
    }

    const tData = await getTranslations({ locale, namespace: 'cities_data' });
    const cityName = tData(`${city.id}.name`);
    const cityDescription = tData(`${city.id}.description`);

    // Schema.org structured data
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'City',
        name: cityName,
        description: cityDescription,
        url: `https://syunikdreams.am/${locale}/city/${cityId}`,
        geo: {
            '@type': 'GeoCoordinates',
            latitude: city.coords[0],
            longitude: city.coords[1],
        },
        containedInPlace: {
            '@type': 'State',
            name: 'Syunik',
            containedInPlace: {
                '@type': 'Country',
                name: 'Armenia'
            }
        }
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <CityDetailClient cityId={cityId} />
        </>
    );
}
