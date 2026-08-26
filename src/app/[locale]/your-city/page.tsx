import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import YourCityClient from '@/container/your-city/YourCityClient';



export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {

  /**
   * 
   *  generateMetadata function is used to generate the metadata for the your-city page.
   * 
   */

  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'footer' });

  return {
    title: `${t('your_city')} | Syunik Dreams`,
    description: t('your_city'),
    openGraph: {
      title: `${t('your_city')} | Syunik Dreams`,
      description: t('your_city'),
      type: "website",
    }
  };
}

export default function YourCityPage() {

  /**
   * 
   * YourCityPage is a client component that renders the YourCityClient.
   * 
   */

  return <YourCityClient />;
}
