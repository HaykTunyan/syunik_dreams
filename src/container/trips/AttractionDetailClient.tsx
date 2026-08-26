"use client";

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Link } from '@/i18n/navigation';

interface Props {
    attractionId: string;
}

const IMAGE_MAP: Record<string, string> = {
    tatev: '/images/for-travel/tatev.png',
    karahunj: '/images/for-travel/karahunj.png',
    khndzoresk: '/images/for-travel/khndzoresk.png',
    shake: '/images/for-travel/shake.png',
    khustup: '/images/for-travel/khustup.png',
    vorotnavanq: '/images/for-travel/vorotnavanq.png',
    old_goris: '/images/for-travel/old_goris.png',
    halidzor: '/images/for-travel/halidzor-fortress.png',
    vahanavank: '/images/for-travel/vahanavank.png',
    khndzoresk_caves: '/images/for-travel/khndzoresk_caves.png',
    meghri_viewpoint: '/images/for-travel/meghri_viewpoint.png',
    devil_bridge: '/images/for-travel/devils_bridge.png',
    hermitage_tatev: '/images/for-travel/hermitage_tatev.png',
    vorotnaberd_fortress: '/images/for-travel/vorotnaberd_fortress.png',
    vorotnaberd: '/images/for-travel/vorotnaberd.png',
    melik_tangi_bridge: '/images/for-travel/melik_tangi_bridge.png',
};

const ALL_TRAVEL_IMAGES = [
    '/images/for-travel/tatev.png',
    '/images/for-travel/karahunj.png',
    '/images/for-travel/khndzoresk.png',
    '/images/for-travel/shake.png',
    '/images/for-travel/khustup.png',
    '/images/for-travel/vorotnavanq.png',
    '/images/for-travel/old_goris.png',
    '/images/for-travel/halidzor-fortress.png',
    '/images/for-travel/vahanavank.png',
    '/images/for-travel/khndzoresk_caves.png',
    '/images/for-travel/meghri_viewpoint.png',
    '/images/for-travel/melik_tangi_bridge.png',
    '/images/for-travel/devils_bridge.png',
    '/images/for-travel/hermitage_tatev.png',
    '/images/for-travel/vorotnaberd_fortress.png',
    '/images/for-travel/vorotnaberd.png',
    "/images/for-travel/syuniks_gate.png",
    "/images/for-travel/harsnadzor_watchtower.png",
];


export default function AttractionDetailClient({ attractionId }: Props) {

    /**
     * 
     * Attraction Detail Client component
     * 
     * @param attractionId - the id of the attraction
     * @returns AttractionDetailClient component
     * 
     */

    const [imageError, setImageError] = useState(false);
    const t = useTranslations('trips');

    // If attractionId is invalid, it would just show keys, but let's assume it's valid based on clicks.
    const name = t(`attraction_${attractionId}` as any);
    const desc = t(`attraction_${attractionId}_desc` as any);

    const locationKey = `attraction_${attractionId}_location`;
    const heightKey = `attraction_${attractionId}_height`;
    const moreKey = `attraction_${attractionId}_more`;

    const location = t.has(locationKey as any) ? t(locationKey as any) : null;
    const height = t.has(heightKey as any) ? t(heightKey as any) : null;
    const more = t.has(moreKey as any) ? t(moreKey as any) : null;

    const imageSrc = imageError ? '/images/syunik_landscape.png' : (IMAGE_MAP[attractionId] || `/images/for-travel/${attractionId}.png`);

    return (
        <div className='min-h-screen bg-white dark:bg-zinc-950 flex flex-col'>
            <Header />

            <main className="grow pt-32 pb-20 px-6 max-w-5xl mx-auto w-full animate-fade-in-up">
                <Link
                    href="/trips"
                    className="inline-flex items-center text-zinc-500 hover:text-orange-500 transition-colors mb-8 font-semibold tracking-wide"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                    </svg>
                    Back to Trips
                </Link>

                <div className="bg-zinc-50 dark:bg-zinc-900 rounded-[2.5rem] p-8 md:p-14 shadow-xl border border-zinc-100 dark:border-white/5 relative overflow-hidden mb-16">
                    {/* Decorative accent */}
                    <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-orange-500 via-amber-500 to-orange-500" />

                    <div className="flex flex-col md:flex-row gap-12 items-start">
                        <div className="flex-1 space-y-6">
                            <span className="text-xs font-bold tracking-[0.2em] uppercase text-orange-500">
                                Most Visited Attraction
                            </span>
                            <h1 className="text-4xl md:text-6xl font-black text-zinc-900 dark:text-white uppercase tracking-tight leading-none">
                                {name}
                            </h1>

                            <div className="flex flex-wrap gap-4 pt-2">
                                {location && (
                                    <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-orange-500">
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                        </svg>
                                        <span className="font-medium">{location}</span>
                                    </div>
                                )}
                                {height && (
                                    <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-orange-500">
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
                                        </svg>
                                        <span className="font-medium">{height}</span>
                                    </div>
                                )}
                            </div>

                            <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">
                                {desc}
                            </p>

                            {more && (
                                <div className="mt-6 p-6 bg-white dark:bg-zinc-950 rounded-2xl border border-zinc-200 dark:border-white/10 shadow-sm">
                                    <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">More Information</h3>
                                    <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                        {more}
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="w-full md:w-1/3 shrink-0">
                            <div className="relative aspect-4/5 rounded-4xl overflow-hidden shadow-2xl border border-zinc-200 dark:border-white/10 group">
                                <Image
                                    src={imageSrc}
                                    alt={name}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    onError={() => setImageError(true)}
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* More Images Gallery */}
                <div className="mt-16">
                    <h2 className="text-3xl font-black uppercase text-zinc-900 dark:text-white mb-8 tracking-tight">
                        More from Syunik
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                        {ALL_TRAVEL_IMAGES.map((src, index) => (
                            <div key={index} className="relative aspect-square rounded-2xl overflow-hidden shadow-lg border border-zinc-200 dark:border-white/10 group cursor-pointer">
                                <Image
                                    src={src}
                                    alt={`Syunik Travel Image ${index + 1}`}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
