import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import AttractionDetailClient from "@/container/trips/AttractionDetailClient";

interface Props {
    params: Promise<{ locale: string; id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {

    /**
     * 
     * get dynamic metadata for the attraction detail page
     * 
     * @param locale - the locale of the page
     * @param id - the id of the attraction
     * @returns a promise that resolves to the metadata of the attraction
     */


    const { locale, id } = await params;
    const t = await getTranslations({ locale, namespace: 'trips' });

    // We can use the existing translations
    const name = t(`attraction_${id}`);
    const desc = t(`attraction_${id}_desc`);

    return {
        title: name,
        description: desc,
    };
}

export default async function AttractionDetailPage({ params }: Props) {

    /**
     * 
     * render the attraction detail page
     * 
     * @param params - an object that contains the locale and id of the page
     * @returns AttractionDetailClient component
     * 
     */


    const { id } = await params;

    return (
        <AttractionDetailClient attractionId={id} />
    );
}
