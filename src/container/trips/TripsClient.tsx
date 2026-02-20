"use client";

import { useState } from 'react';
import SyunikMap from '@/components/SyunikMap';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { useTranslations } from 'next-intl';

export default function TripsClient() {
    const t = useTranslations('trips');
    const [selectedCity, setSelectedCity] = useState<string | null>(null);

    return (
        <div className='min-h-screen bg-white dark:bg-zinc-950'>
            <Header />
            <main className=" pt-24 pb-20 px-6  max-w-7xl mx-auto">
                <section className="py-12 px-6 md:px-20 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-3xl overflow-hidden mb-12">
                    <div className="max-w-6xl mx-auto">
                        <h1 className="text-2xl md:text-5xl font-bold mb-4">{t('title')}</h1>
                        <p className="text-lg opacity-90">{t('subtitle')}</p>
                    </div>
                </section>

                <section className="py-12 px-2 md:px-0">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 space-y-8">
                                <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-lg overflow-hidden">
                                    <div className="p-6">
                                        <h2 className="text-2xl font-bold mb-4 text-zinc-900 dark:text-white">
                                            {t('cities_title')}
                                        </h2>
                                        <SyunikMap />
                                    </div>
                                </div>

                                <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-lg p-6">
                                    <h2 className="text-2xl font-bold mb-4 text-zinc-900 dark:text-white">
                                        {t('historical_title')}
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="border-l-4 border-orange-500 pl-4 py-2">
                                            <h3 className="font-semibold text-zinc-900 dark:text-white mb-2">🏛️ {t('tatev_monastery')}</h3>
                                            <p className="text-sm text-zinc-600 dark:text-zinc-400">{t('tatev_monastery_desc')}</p>
                                        </div>
                                        <div className="border-l-4 border-purple-600 pl-4 py-2">
                                            <h3 className="font-semibold text-zinc-900 dark:text-white mb-2">⛪ {t('meghri_church')}</h3>
                                            <p className="text-sm text-zinc-600 dark:text-zinc-400">{t('meghri_church_desc')}</p>
                                        </div>
                                        <div className="border-l-4 border-amber-600 pl-4 py-2">
                                            <h3 className="font-semibold text-zinc-900 dark:text-white mb-2">🏰 {t('zorats_karer')}</h3>
                                            <p className="text-sm text-zinc-600 dark:text-zinc-400">{t('zorats_karer_desc')}</p>
                                        </div>
                                        <div className="border-l-4 border-red-600 pl-4 py-2">
                                            <h3 className="font-semibold text-zinc-900 dark:text-white mb-2">🏯 {t('meghri_fortress')}</h3>
                                            <p className="text-sm text-zinc-600 dark:text-zinc-400">{t('meghri_fortress_desc')}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="lg:col-span-1">
                                <div className="sticky top-24">
                                    <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-lg p-6">
                                        <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">{t('trip_info_title')}</h3>
                                        <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-6">{t('select_city_msg')}</p>
                                        <div className="space-y-3">
                                            {['kapan', 'goris', 'meghri', 'sisian'].map((city) => (
                                                <button
                                                    key={city}
                                                    onClick={() => setSelectedCity(city)}
                                                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${selectedCity === city ? 'bg-orange-600 text-white' : 'bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 hover:bg-orange-100'}`}
                                                >
                                                    📍 {t(city)}
                                                </button>
                                            ))}
                                        </div>
                                        <button className="w-full mt-6 bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
                                            {t('book_now')}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="py-20 border-t border-zinc-100 dark:border-zinc-800">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-zinc-900 dark:text-white mb-4">
                                {t('most_visited_title')}
                            </h2>
                            <p className="text-xl text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto">
                                {t('most_visited_subtitle')}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                { id: 'tatev', icon: '⛪' },
                                { id: 'karahunj', icon: '🏛️' },
                                { id: 'khndzoresk', icon: '🌉' },
                                { id: 'shake', icon: '🌊' },
                                { id: 'khustup', icon: '🏔️' },
                                { id: 'vorotnavank', icon: '🛕' },
                                { id: 'goris_caves', icon: '🛖' },
                                { id: 'halidzor', icon: '🏰' },
                                { id: 'vahanavank', icon: '⛪' }
                            ].map((item) => (
                                <div
                                    key={item.id}
                                    className="group bg-zinc-50 dark:bg-zinc-900/50 p-8 rounded-[2.5rem] border border-transparent hover:border-orange-500/20 hover:bg-white dark:hover:bg-zinc-900 transition-all duration-500"
                                >
                                    <div className="text-4xl mb-6 bg-white dark:bg-zinc-800 w-16 h-16 flex items-center justify-center rounded-2xl shadow-sm group-hover:scale-110 transition-transform duration-500">
                                        {item.icon}
                                    </div>
                                    <h3 className="text-2xl font-black uppercase text-zinc-900 dark:text-white mb-3 group-hover:text-orange-500 transition-colors">
                                        {t(`attraction_${item.id}`)}
                                    </h3>
                                    <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                        {t(`attraction_${item.id}_desc`)}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
