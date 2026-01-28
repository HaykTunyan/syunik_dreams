// Map Section for Home Page
import React from "react";
import MapLoader from "@/components/MapLoader";
import { useTranslations } from "next-intl";

export const HomeMapSection: React.FC = () => {
    const t = useTranslations('home_page.map');

    /**
     * 
     * Section displaying the map of Syunik region
     * 
     */
    return (

        <section className="py-20 px-6 md:px-20 bg-white dark:bg-zinc-950">
            <div className="max-w-6xl mx-auto space-y-12">
                <div className="text-center">
                    <h2 className="text-4xl font-bold mb-4 text-zinc-800 dark:text-zinc-100">{t('title')}</h2>
                    <p className="text-zinc-600 dark:text-zinc-400">{t('subtitle')}</p>
                </div>
                <div className="shadow-2xl rounded-2xl border border-zinc-200 dark:border-zinc-800 p-2 bg-white dark:bg-zinc-900">
                    <MapLoader />
                </div>
            </div>
        </section>
    )
}
