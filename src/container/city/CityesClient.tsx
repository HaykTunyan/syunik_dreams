"use client";

import dynamic from "next/dynamic";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Link } from "@/i18n/navigation";
import { cities } from "@/data/cities";
import { useTranslations } from 'next-intl';
import CityInfoCard from "./CityInfoCard";

const CityMap = dynamic(() => import("@/components/CityMap"), {
    ssr: false,
});

export default function CitiesClient() {

    /**
     * 
     * CityInfoCard component is used to display the information of the city.
     *  
     */

    const t = useTranslations('city_page');
    const tData = useTranslations('cities_data');

    return (
        <main className="min-h-screen bg-zinc-50 dark:bg-black font-sans">
            <Header />
            <section className="relative h-[80vh] w-full flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/20" />
                <div className="relative z-10 text-center px-4">
                    <h1 className="text-6xl md:text-7xl font-black text-white uppercase">
                        {t('title_prefix')} <span className="text-orange-500">{t('title_suffix')}</span>
                    </h1>
                    <p className="mt-6 text-xl text-zinc-200">
                        {t('subtitle')}
                    </p>
                </div>
            </section>

            <section className="py-20 px-6 md:px-20 -mt-20 relative z-20">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
                    {cities.map((city) => (
                        <div
                            key={city.id}
                            className="bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden shadow-xl border border-zinc-100 dark:border-zinc-800"
                        >
                            <div className="relative h-72 w-full">
                                <div className="z-10 h-full w-full relative">
                                    <CityMap coords={city.coords} name={tData(`${city.id}.name`)} />
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-20 pointer-events-none" />
                                <div className="absolute bottom-6 left-8 text-white z-30 pointer-events-none">
                                    <span className="text-orange-500 uppercase text-sm font-bold">{t('city_label')}</span>
                                    <h2 className="text-3xl font-black uppercase">{tData(`${city.id}.name`)}</h2>
                                </div>
                            </div>

                            <div className="p-8 space-y-6">
                                <p className="text-zinc-600 dark:text-zinc-400 text-lg">
                                    {tData(`${city.id}.description`)}
                                </p>
                                <div className="grid grid-cols-2 gap-4">

                                    <CityInfoCard label={t('area')} value={tData(`${city.id}.size`)} />
                                    <CityInfoCard label={t('founding')} value={tData(`${city.id}.founding`)} />
                                </div>
                                <div className="flex justify-between items-center border-t pt-4">
                                    <div>
                                        <span className="text-xs uppercase text-zinc-400">{t('population')}</span>
                                        <p className="font-semibold">{tData(`${city.id}.population`)}</p>
                                    </div>
                                    <Link
                                        href={`/city/${city.id}`}
                                        className="text-orange-600 font-bold hover:text-orange-500 transition-colors"
                                    >
                                        {t('more')}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="py-20 px-6 md:px-20 bg-orange-600 text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
                <div className="max-w-7xl mx-auto text-center space-y-8 relative z-10">
                    <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight">
                        {t('history_cta_title')}
                    </h2>
                    <p className="text-xl text-orange-100 max-w-2xl mx-auto">
                        {t('history_cta_description')}
                    </p>
                    <div className="flex justify-center">
                        <Link
                            href="/history"
                            className="bg-white text-orange-600 px-10 py-4 rounded-full font-black uppercase text-lg hover:bg-zinc-100 transition-colors shadow-2xl"
                        >
                            {t('history_cta_button')}
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
