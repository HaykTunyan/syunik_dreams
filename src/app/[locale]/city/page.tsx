import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import CitiesClient from '@/container/city/CityesClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'city_page' });

  return {
    title: `${t('title_prefix')} ${t('title_suffix')}`,
    description: t('subtitle'),
    openGraph: {
      title: `${t('title_prefix')} ${t('title_suffix')} | Syunik Dreams`,
      description: t('subtitle'),
      type: "website",
    }
  };
}

export default function CitiesPage() {
  return <CitiesClient />;
}
