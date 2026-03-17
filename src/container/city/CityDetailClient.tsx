"use client";

import { cities } from "@/data/cities";
import { useTranslations } from "next-intl";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import dynamic from "next/dynamic";
import CityStatsCard from "./CityStatsCard";

const CityMap = dynamic(() => import("@/components/CityMap"), {
    ssr: false,
});

interface Props {
    cityId: string;
}

export default function CityDetailClient({ cityId }: Props) {

    /**
     * 
     * City image is not visible
     * 
     */

    const city = cities.find((c) => c.id === cityId);

    if (!city) return null;

    const t = useTranslations('city_page');
    const tData = useTranslations('cities_data');
    const tDetails = useTranslations('cities_data_details');
    const tTrip = useTranslations('trip_details');

    const heroSrc = city.image || '/images/syunik_landscape.png';

    const attractionKeys = ['0', '1', '2'];

    return (
        <main className="min-h-screen bg-zinc-50 dark:bg-black font-sans">
            <Header />

            <section className="relative h-[70vh] w-full flex items-center justify-center overflow-hidden">
                <Image
                    src={heroSrc}
                    alt={tData(`${city.id}.name`)}
                    fill
                    className="object-cover brightness-50"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />

                <div className="relative z-10 text-center px-4 max-w-4xl">
                    <Link
                        href="/city"
                        className="inline-flex items-center gap-2 text-orange-500 font-bold mb-6 hover:text-orange-400 transition-colors uppercase tracking-widest text-sm"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                        </svg>
                        {t('back_to_cities')}
                    </Link>
                    <h1 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter">
                        {tData(`${city.id}.name`)}
                    </h1>
                    <p className="mt-6 text-xl md:text-2xl text-zinc-200 font-medium">
                        {tData(`${city.id}.description`)}
                    </p>
                </div>
            </section>

            <section className="py-12 px-6 md:px-20 -mt-24 relative z-20">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
                        <CityStatsCard label={t('area')} value={tData(`${city.id}.size`)} icon="📏" />
                        <CityStatsCard label={t('population')} value={tData(`${city.id}.population`)} icon="👥" />
                        <CityStatsCard label={t('founding')} value={tData(`${city.id}.founding`)} icon="🏛️" />
                        <CityStatsCard label={tTrip('climate')} value={tDetails(`${city.id}.climate`)} icon="⛅" />
                    </div>
                </div>
            </section>

            <section className="py-20 px-6 md:px-20">
                <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-16">
                    <div className="md:col-span-2 space-y-12">
                        <div className="space-y-6">
                            <h2 className="text-4xl font-black uppercase text-zinc-900 dark:text-white flex items-center gap-4">
                                <span className="w-12 h-1 bg-orange-500 rounded-full"></span>
                                {t('history_title')}
                            </h2>
                            <p className="text-xl leading-relaxed text-zinc-600 dark:text-zinc-400 first-letter:text-5xl first-letter:font-bold first-letter:text-orange-500 first-letter:mr-3 first-letter:float-left">
                                {tDetails(`${city.id}.history`)}
                            </p>
                        </div>

                        <div className="space-y-8">
                            <h2 className="text-3xl font-black uppercase text-zinc-900 dark:text-white">
                                {tTrip('attractions')}
                            </h2>
                            <div className="grid sm:grid-cols-2 gap-6">
                                {attractionKeys.map((key) => (
                                    <div key={key} className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-100 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-all duration-300">
                                        <span className="text-orange-500 font-black text-2xl mb-4 block">0{parseInt(key) + 1}</span>
                                        <p className="text-lg text-zinc-700 dark:text-zinc-300">
                                            {tDetails(`${city.id}.attractions.${key}`)}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-12">
                        <div className="bg-orange-500 rounded-[2.5rem] p-10 text-white shadow-2xl shadow-orange-500/20 top-24">
                            <h3 className="text-2xl font-black uppercase mb-6">{tTrip('best_visit')}</h3>
                            <p className="text-4xl font-bold mb-8">{tDetails(`${city.id}.bestVisit`)}</p>
                            <div className="h-px bg-white/20 mb-8"></div>
                            <p className="text-orange-100 leading-relaxed mb-8">
                                Discover the seasonal beauty of {tData(`${city.id}.name`)}. Each month brings a unique atmosphere to this historical city.
                            </p>
                            <button className="w-full bg-white text-orange-500 font-bold py-4 rounded-2xl hover:bg-zinc-100 transition-colors">
                                {tTrip('book_tour')}
                            </button>
                        </div>

                        <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] p-10 border border-zinc-100 dark:border-zinc-800 shadow-xl">
                            <h3 className="text-2xl font-black uppercase mb-6 text-zinc-900 dark:text-white">{t('learn_more')}</h3>
                            <div className="space-y-4">
                                {((tDetails.raw(`${city.id}.links`) as any[]) || []).map((link: any, index: number) => (
                                    <a
                                        key={index}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-between p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 hover:bg-orange-50 dark:hover:bg-orange-900/20 border border-transparent hover:border-orange-200 dark:hover:border-orange-800 transition-all duration-300 group"
                                    >
                                        <span className="font-bold text-zinc-700 dark:text-zinc-300 group-hover:text-orange-600 dark:group-hover:text-orange-400">
                                            {link.name}
                                        </span>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-zinc-400 group-hover:text-orange-500 group-hover:translate-x-1 translate-y-[-1px] transition-all">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                                        </svg>
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div className="bg-zinc-900 dark:bg-zinc-800 rounded-[2.5rem] p-10 text-white shadow-xl">
                            <h3 className="text-xl font-black uppercase mb-6 tracking-tight">Explore More of Syunik</h3>
                            <div className="grid gap-3">
                                <Link
                                    href="/history"
                                    className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all group"
                                >
                                    <span className="text-2xl">⚔️</span>
                                    <div>
                                        <p className="font-bold group-hover:text-orange-400 transition-colors">Heroic History</p>
                                        <p className="text-xs text-zinc-400 font-medium">Legends & Battles</p>
                                    </div>
                                </Link>
                                <Link
                                    href="/trips"
                                    className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all group"
                                >
                                    <span className="text-2xl">🏔️</span>
                                    <div>
                                        <p className="font-bold group-hover:text-orange-400 transition-colors">Planned Trips</p>
                                        <p className="text-xs text-zinc-400 font-medium">Guided Adventures</p>
                                    </div>
                                </Link>
                                <Link
                                    href="/"
                                    className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all group"
                                >
                                    <span className="text-2xl">🏠</span>
                                    <div>
                                        <p className="font-bold group-hover:text-orange-400 transition-colors">Home Page</p>
                                        <p className="text-xs text-zinc-400 font-medium">Syunik Overview</p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20 px-6 md:px-20 bg-zinc-100 dark:bg-zinc-900/50">
                <div className="max-w-7xl mx-auto space-y-10">
                    <div className="text-center space-y-4">
                        <h2 className="text-4xl font-black uppercase">{tData(`${city.id}.name`)} on Map</h2>
                        <p className="text-zinc-500">Explore the location and surroundings</p>
                    </div>
                    <div className="h-[500px] w-full rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white dark:border-zinc-800">
                        <CityMap coords={city.coords} name={tData(`${city.id}.name`)} />
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}

