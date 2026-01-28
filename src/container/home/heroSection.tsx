// Hero Section for Home Page

import React from "react";
import Image from "next/image";

import Landscape from "#/images/syunik_landscape.png"

import { useTranslations } from "next-intl";

export const HomeHeroSection: React.FC = () => {

    /**
     * 
     * Hero Section with background image, title, subtitle, and scroll indicator
     * 
     */

    const t = useTranslations('home_page.hero');

    return (
        <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={Landscape}
                    alt="Syunik Landscape"
                    fill
                    className="object-cover"
                    priority
                    quality={100}
                />
                {/* Overlay for better text readability */}
                <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* Hero Content */}
            <div className="relative z-10 text-center text-white px-4">
                <h1 className="text-6xl md:text-9xl font-bold mb-6 animate-fade-in-up tracking-wider drop-shadow-2xl">
                    {t('title')}
                </h1>
                <p className="text-xl md:text-3xl font-light animate-fade-in-up delay-300 tracking-wide drop-shadow-md">
                    {t('subtitle')}
                </p>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce z-10 text-white opacity-80">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
            </div>
        </section>

    )
}                      
