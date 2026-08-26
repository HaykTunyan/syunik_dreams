'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import SyunikLandscape from '#/images/syunik_landscape.png';
import TatevView from '#/images/tatev-view.png';
import SyunikKingdom from '#/images/syunik_kingdom.png';

interface Variants {
    hidden: {
        opacity: number;
        y: number;
    };
    visible: (i: number) => {
        opacity: number;
        y: number;
        transition: {
            delay: number;
            duration: number;
            ease: [number, number, number, number];
        };
    };
}

const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.15, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }
    })
};

const scaleIn = {
    hidden: { opacity: 0, scale: 0.85 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
    }
};

export default function AboutClient() {

    /**
     * 
     * About Us Client Component:
     * Showcases the Syunik Dreams company story, mission, vision,
     * core values, team philosophy, and key stats.
     * 
     */

    const t = useTranslations('about');

    const stats = [
        { value: t('stat_1_value'), label: t('stat_1_label') },
        { value: t('stat_2_value'), label: t('stat_2_label') },
        { value: t('stat_3_value'), label: t('stat_3_label') },
        { value: t('stat_4_value'), label: t('stat_4_label') },
    ];

    const values = [
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                </svg>
            ),
            title: t('value_1_title'),
            desc: t('value_1_desc'),
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                </svg>
            ),
            title: t('value_2_title'),
            desc: t('value_2_desc'),
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                </svg>
            ),
            title: t('value_3_title'),
            desc: t('value_3_desc'),
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                </svg>
            ),
            title: t('value_4_title'),
            desc: t('value_4_desc'),
        },
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950 flex flex-col font-sans">
            <Header />

            {/* Hero Section */}
            <section className="relative w-full h-[70vh] md:h-[80vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src={SyunikLandscape}
                        alt="Syunik Mountains"
                        fill
                        className="object-cover"
                        priority
                        quality={90}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
                </div>
                <div className="relative z-10 text-center text-white px-6 max-w-4xl">
                    <motion.p
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-sm md:text-base font-bold uppercase tracking-[0.3em] text-orange-400 mb-6"
                    >
                        {t('hero_label')}
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-4xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6 drop-shadow-2xl"
                    >
                        {t('hero_title')}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-lg md:text-2xl font-light text-zinc-200 max-w-2xl mx-auto leading-relaxed"
                    >
                        {t('hero_subtitle')}
                    </motion.p>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10 text-white opacity-60">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                </div>
            </section>

            {/* Stats Bar */}
            <section className="relative z-20 -mt-16 px-6">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    className="max-w-5xl mx-auto bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl border border-zinc-100 dark:border-zinc-800 p-8 md:p-12"
                >
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, i) => (
                            <motion.div
                                key={i}
                                custom={i}
                                variants={fadeInUp as any}
                                className="text-center"
                            >
                                <p className="text-3xl md:text-4xl font-black text-orange-600 mb-2">{stat.value}</p>
                                <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* Our Story Section */}
            <section className="py-24 md:py-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            className="space-y-8"
                        >
                            <motion.div variants={fadeInUp as any} custom={0}>
                                <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-500 mb-3">{t('story_label')}</p>
                                <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-white tracking-tight leading-tight">
                                    {t('story_title')}
                                </h2>
                                <div className="w-20 h-1.5 bg-orange-600 rounded-full mt-6" />
                            </motion.div>
                            <motion.p variants={fadeInUp as any} custom={1} className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                {t('story_p1')}
                            </motion.p>
                            <motion.p variants={fadeInUp as any} custom={2} className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                {t('story_p2')}
                            </motion.p>
                        </motion.div>

                        <motion.div
                            variants={scaleIn as any}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            className="relative"
                        >
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
                                <Image
                                    src={TatevView}
                                    alt="Tatev Monastery View"
                                    fill
                                    className="object-cover"
                                    quality={85}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                            </div>
                            {/* Decorative accent */}
                            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-orange-500/10 rounded-3xl -z-10" />
                            <div className="absolute -top-6 -left-6 w-24 h-24 border-2 border-orange-500/20 rounded-3xl -z-10" />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-24 md:py-32 px-6 bg-zinc-50 dark:bg-zinc-900/50">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        className="text-center mb-20"
                    >
                        <motion.p variants={fadeInUp as any} custom={0} className="text-sm font-bold uppercase tracking-[0.2em] text-orange-500 mb-3">
                            {t('mission_vision_label')}
                        </motion.p>
                        <motion.h2 variants={fadeInUp as any} custom={1} className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-white tracking-tight">
                            {t('mission_vision_title')}
                        </motion.h2>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-10">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            variants={fadeInUp as any}
                            custom={0}
                            className="bg-white dark:bg-zinc-900 rounded-3xl p-10 md:p-14 border border-zinc-100 dark:border-zinc-800 shadow-lg hover:shadow-xl transition-shadow duration-500 group"
                        >
                            <div className="w-16 h-16 bg-orange-50 dark:bg-orange-500/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-orange-600">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">{t('mission_title')}</h3>
                            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-lg">{t('mission_desc')}</p>
                        </motion.div>

                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            variants={fadeInUp as any}
                            custom={1}
                            className="bg-white dark:bg-zinc-900 rounded-3xl p-10 md:p-14 border border-zinc-100 dark:border-zinc-800 shadow-lg hover:shadow-xl transition-shadow duration-500 group"
                        >
                            <div className="w-16 h-16 bg-orange-50 dark:bg-orange-500/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-orange-600">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">{t('vision_title')}</h3>
                            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-lg">{t('vision_desc')}</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="py-24 md:py-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        className="text-center mb-20"
                    >
                        <motion.p variants={fadeInUp as any} custom={0} className="text-sm font-bold uppercase tracking-[0.2em] text-orange-500 mb-3">
                            {t('values_label')}
                        </motion.p>
                        <motion.h2 variants={fadeInUp as any} custom={1} className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-white tracking-tight">
                            {t('values_title')}
                        </motion.h2>
                    </motion.div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, i) => (
                            <motion.div
                                key={i}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.3 }}
                                custom={i}
                                variants={fadeInUp as any}
                                className="bg-zinc-50 dark:bg-zinc-900 rounded-3xl p-8 border border-zinc-100 dark:border-zinc-800 hover:border-orange-200 dark:hover:border-orange-800 hover:shadow-lg transition-all duration-500 group"
                            >
                                <div className="w-14 h-14 bg-orange-50 dark:bg-orange-500/10 rounded-2xl flex items-center justify-center mb-6 text-orange-600 group-hover:scale-110 transition-transform duration-500">
                                    {value.icon}
                                </div>
                                <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-3">{value.title}</h3>
                                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{value.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* What We Offer / Website Purpose */}
            <section className="py-24 md:py-32 px-6 bg-zinc-50 dark:bg-zinc-900/50">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                        <motion.div
                            variants={scaleIn as any}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            className="relative order-2 lg:order-1"
                        >
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
                                <Image
                                    src={SyunikKingdom}
                                    alt="Syunik Heritage"
                                    fill
                                    className="object-cover"
                                    quality={85}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                            </div>
                            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-orange-500/10 rounded-3xl -z-10" />
                        </motion.div>

                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            className="space-y-8 order-1 lg:order-2"
                        >
                            <motion.div variants={fadeInUp as any} custom={0}>
                                <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-500 mb-3">{t('offer_label')}</p>
                                <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-white tracking-tight leading-tight">
                                    {t('offer_title')}
                                </h2>
                                <div className="w-20 h-1.5 bg-orange-600 rounded-full mt-6" />
                            </motion.div>
                            <motion.p variants={fadeInUp as any} custom={1} className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                {t('offer_p1')}
                            </motion.p>

                            <motion.div variants={fadeInUp as any} custom={2} className="space-y-4">
                                {[1, 2, 3, 4].map((n) => (
                                    <div key={n} className="flex items-start gap-4">
                                        <div className="w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center mt-0.5 shrink-0">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3.5 h-3.5 text-white">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                            </svg>
                                        </div>
                                        <p className="text-zinc-700 dark:text-zinc-300 font-medium">{t(`offer_bullet_${n}`)}</p>
                                    </div>
                                ))}
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 md:py-32 px-6">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    className="max-w-4xl mx-auto text-center"
                >
                    <motion.h2 variants={fadeInUp as any} custom={0} className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-white tracking-tight mb-6">
                        {t('cta_title')}
                    </motion.h2>
                    <motion.p variants={fadeInUp as any} custom={1} className="text-xl text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                        {t('cta_desc')}
                    </motion.p>
                    <motion.div variants={fadeInUp as any} custom={2} className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="/trips" className="inline-flex items-center justify-center gap-3 bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 px-10 rounded-2xl transition-all duration-300 shadow-xl hover:shadow-orange-600/40 group">
                            {t('cta_explore')}
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 group-hover:translate-x-1 transition-transform">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                            </svg>
                        </a>
                        <a href="/contact" className="inline-flex items-center justify-center gap-3 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white font-bold py-4 px-10 rounded-2xl transition-all duration-300">
                            {t('cta_contact')}
                        </a>
                    </motion.div>
                </motion.div>
            </section>

            <Footer />
        </div>
    );
}
