// Hero Section for History Page

import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import syunik_kingdom from "#/images/images/syunik_kingdom.png";



export const HistoryHeroSection: React.FC = () => {

    /**
      * 
      * Hero Section with background image, title, subtitle, and scroll indicator
      */

    const t = useTranslations('history_page.hero');


    return (
        <section className="relative h-[80vh] w-full flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
                <Image
                    src={syunik_kingdom}
                    alt="Syunik Kingdom"
                    fill
                    className="object-cover transition-transform duration-10000 hover:scale-105"
                    priority
                    quality={100}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
            </div>

            <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
                <h1 className="text-5xl md:text-8xl font-bold mb-6 tracking-tight animate-fade-in-up drop-shadow-2xl">
                    {t('title_prefix')} <span className="text-orange-500">{t('title_suffix')}</span>
                </h1>
                <p className="text-xl md:text-2xl text-zinc-200 font-light leading-relaxed animate-fade-in-up delay-300 drop-shadow-lg">
                    {t('subtitle')}
                </p>
            </div>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce z-10 text-white/50">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
            </div>
        </section>
    );
}


