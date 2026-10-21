import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import BookingPageClient from '@/container/trips/BookingPageClient';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string; city: string }>;
}): Promise<Metadata> {
    const { locale, city } = await params;
    const t = await getTranslations({ locale, namespace: 'trips' });
    const cityLabel = t(city);

    return {
        title: `Book a Trip to ${cityLabel} | Syunik Dreams`,
        description: `Plan and book your trip to ${cityLabel} in Syunik, Armenia.`,
        openGraph: {
            title: `Book a Trip to ${cityLabel} | Syunik Dreams`,
            description: `Plan and book your trip to ${cityLabel} in Syunik, Armenia.`,
            type: 'website',
        },
    };
}

export default async function BookingPage({
    params,
}: {
    params: Promise<{ city: string }>;
}) {
    const { city } = await params;

    return <BookingPageClient city={city} />;
}
