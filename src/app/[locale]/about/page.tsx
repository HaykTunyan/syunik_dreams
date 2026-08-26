import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import AboutClient from '@/container/about/AboutClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {

    /**
     * 
     * generateMetadata function generates the metadata for the About Us page.
     * 
     */

    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'about' });

    return {
        title: t('page_title'),
        description: t('hero_subtitle'),
        openGraph: {
            title: `${t('page_title')} | Syunik Dreams`,
            description: t('hero_subtitle'),
            type: 'website',
        }
    };
}

export default function AboutPage() {

    /**
     * 
     * About Us Page — server component wrapper that renders the AboutClient.
     * 
     * @returns {JSX.Element}
     */

    return <AboutClient />;
}
