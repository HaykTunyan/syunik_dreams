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

    const tCommon = useTranslations('common'); // Assuming 'common' has some general texts like 'Back' if needed

    // If attractionId is invalid, it would just show keys, but let's assume it's valid based on clicks.
    const name = t(`attraction_${attractionId}`);
    const desc = t(`attraction_${attractionId}_desc`);

    const imageSrc = imageError ? '/images/syunik_landscape.png' : `/images/for-travel/${attractionId}.png`;

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

                <div className="bg-zinc-50 dark:bg-zinc-900 rounded-[2.5rem] p-8 md:p-14 shadow-xl border border-zinc-100 dark:border-white/5 relative overflow-hidden">
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

                            <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">
                                {desc}
                            </p>
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
            </main>
            <Footer />
        </div>
    );
}
