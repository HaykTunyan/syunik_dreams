"use client";

import { useState } from 'react';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { useTranslations } from 'next-intl';
import { CardNavigation } from '../home/cardNavigation';
import { Link } from '@/i18n/navigation';
import DateRangePicker from '@/components/DateRangePicker';
import Image from 'next/image';

import CityBookingFlow from '@/components/booking/CityBookingFlow';

// ── Main Component ────────────────────────────────────────────────────────────

export default function TripsClient() {

    /**
     *
     * Trips Client Component
     *
     * @returns {JSX.Element}
     *
     */

    const t = useTranslations('trips');
    const [selectedCity, setSelectedCity] = useState<string | null>(null);
    const [modalOpen, setModalOpen] = useState(false);

    // Map city id → displayed label using translations
    const cityLabel = selectedCity ? t(selectedCity) : '';

    function openBookingModal() {
        if (!selectedCity) return;
        setModalOpen(true);
    }

    return (
        <div className='min-h-screen bg-white dark:bg-zinc-950'>
            <Header />
            <CardNavigation />
            <main className="pt-24 pb-20 px-6  max-w-7xl mx-auto">
                <section className="py-12 px-6 md:px-20 bg-linear-to-r from-orange-500 to-red-600 text-white rounded-3xl overflow-hidden mb-12">
                    <div className="max-w-6xl mx-auto">
                        <h1 className="text-2xl md:text-5xl font-bold mb-4">{t('title')}</h1>
                        <p className="text-lg opacity-90">{t('subtitle')}</p>
                    </div>
                </section>

                <section className="py-12 px-2 md:px-0">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 space-y-8">


                                <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl p-8 border border-zinc-100 dark:border-zinc-800/50">
                                    <div className="flex items-center gap-6 mb-8">
                                        <h2 className="text-3xl font-black text-zinc-900 dark:text-white tracking-tight whitespace-nowrap">
                                            {t('historical_title')}
                                        </h2>
                                        <div className="h-px flex-1 bg-gradient-to-r from-orange-500/50 to-transparent"></div>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                                        {/* Tatev */}
                                        <div className="group flex flex-col bg-white dark:bg-zinc-800/30 p-4 rounded-3xl border border-zinc-200 dark:border-white/5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 min-h-[360px]">
                                            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-5 shrink-0 bg-zinc-200 dark:bg-zinc-800">
                                                {/* TODO: verify image /images/places/tatev-monastery.jpg */}
                                                <Image src="/images/for-travel/tatev.png" alt="Tatev Monastery" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                                                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent"></div>
                                            </div>
                                            <div className="flex flex-col grow px-2 pb-2">
                                                <h3 className="font-bold text-lg text-zinc-900 dark:text-white mb-2">{t('tatev_monastery')}</h3>
                                                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-3 mb-4">{t('tatev_monastery_desc')}</p>
                                                
                                                <div className="mt-auto pt-4 border-t border-zinc-100 dark:border-white/10 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                                                    <span className="bg-zinc-100 dark:bg-white/10 px-2.5 py-1 rounded-md">UNESCO</span>
                                                    <span>4h</span>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Meghri Church */}
                                        <div className="group flex flex-col bg-white dark:bg-zinc-800/30 p-4 rounded-3xl border border-zinc-200 dark:border-white/5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 min-h-[360px]">
                                            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-5 shrink-0 bg-zinc-200 dark:bg-zinc-800">
                                                {/* TODO: verify image /images/places/meghri-church.jpg */}
                                                <Image src="/images/for-travel/vahanavank.png" alt="Meghri Mother Church" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                                                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent"></div>
                                            </div>
                                            <div className="flex flex-col grow px-2 pb-2">
                                                <h3 className="font-bold text-lg text-zinc-900 dark:text-white mb-2">{t('meghri_church')}</h3>
                                                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-3 mb-4">{t('meghri_church_desc')}</p>
                                                
                                                <div className="mt-auto pt-4 border-t border-zinc-100 dark:border-white/10 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                                                    <span className="bg-zinc-100 dark:bg-white/10 px-2.5 py-1 rounded-md">Church</span>
                                                    <span>1h</span>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Zorats Karer */}
                                        <div className="group flex flex-col bg-white dark:bg-zinc-800/30 p-4 rounded-3xl border border-zinc-200 dark:border-white/5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 min-h-[360px]">
                                            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-5 shrink-0 bg-zinc-200 dark:bg-zinc-800">
                                                {/* TODO: verify image /images/places/zorats-karer.jpg */}
                                                <Image src="/images/for-travel/karahunj.png" alt="Zorats Karer" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                                                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent"></div>
                                            </div>
                                            <div className="flex flex-col grow px-2 pb-2">
                                                <h3 className="font-bold text-lg text-zinc-900 dark:text-white mb-2">{t('zorats_karer')}</h3>
                                                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-3 mb-4">{t('zorats_karer_desc')}</p>
                                                
                                                <div className="mt-auto pt-4 border-t border-zinc-100 dark:border-white/10 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                                                    <span className="bg-zinc-100 dark:bg-white/10 px-2.5 py-1 rounded-md">Archaeological</span>
                                                    <span>2h</span>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Meghri Fortress */}
                                        <div className="group flex flex-col bg-white dark:bg-zinc-800/30 p-4 rounded-3xl border border-zinc-200 dark:border-white/5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 min-h-[360px]">
                                            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-5 shrink-0 bg-zinc-200 dark:bg-zinc-800">
                                                {/* TODO: verify image /images/places/meghri-fortress.jpg */}
                                                <Image src="/images/for-travel/halidzor-fortress.png" alt="Meghri Fortress" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                                                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent"></div>
                                            </div>
                                            <div className="flex flex-col grow px-2 pb-2">
                                                <h3 className="font-bold text-lg text-zinc-900 dark:text-white mb-2">{t('meghri_fortress')}</h3>
                                                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-3 mb-4">{t('meghri_fortress_desc')}</p>
                                                
                                                <div className="mt-auto pt-4 border-t border-zinc-100 dark:border-white/10 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                                                    <span className="bg-zinc-100 dark:bg-white/10 px-2.5 py-1 rounded-md">Fortress</span>
                                                    <span>2h</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* ── Sidebar ── */}
                            <div className="lg:col-span-1">
                                <div className="sticky top-24">
                                    <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl p-8 border border-zinc-100 dark:border-zinc-800/50">
                                        <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">{t('trip_info_title')}</h3>
                                        <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-6">{t('select_city_msg')}</p>
                                        
                                        <div className="space-y-2">
                                            {['kapan', 'goris', 'meghri', 'sisian', 'agarak', 'kajaran'].map((city) => (
                                                <button
                                                    key={city}
                                                    onClick={() => setSelectedCity(city)}
                                                    className={`w-full flex items-center px-4 py-3 rounded-xl transition-all duration-200 border-l-[4px] ${selectedCity === city ? 'border-orange-500 bg-orange-50 dark:bg-white/10 text-orange-700 dark:text-orange-400 font-semibold' : 'border-transparent bg-zinc-50 dark:bg-white/5 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-white/10'}`}
                                                >
                                                    <span className="mr-3 text-lg">📍</span> {t(city)}
                                                </button>
                                            ))}
                                        </div>

                                        {/* Booking Container */}
                                        <div className="mt-6 p-4 bg-zinc-50 dark:bg-zinc-800/40 rounded-2xl border border-zinc-100 dark:border-white/5">
                                            <button
                                                onClick={openBookingModal}
                                                disabled={!selectedCity}
                                                className={`w-full font-semibold py-3.5 px-4 rounded-xl transition-all duration-300
                                                    ${selectedCity
                                                        ? 'bg-orange-600 hover:bg-orange-500 text-white shadow-md shadow-orange-500/20 hover:shadow-lg hover:shadow-orange-500/40 hover:-translate-y-0.5 active:translate-y-0'
                                                        : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-600 cursor-not-allowed opacity-80'
                                                    }`}
                                            >
                                                {selectedCity ? `🗓 ${t('book_now')} — ${t(selectedCity)}` : t('book_now')}
                                            </button>
                                            
                                            <p className={`text-center text-sm mt-3 font-medium transition-colors duration-300 ${selectedCity ? 'text-orange-600 dark:text-orange-400' : 'text-zinc-500 dark:text-zinc-500'}`}>
                                                {selectedCity ? `Booking available for ${t(selectedCity)}` : 'Select a city to activate booking'}
                                            </p>
                                        </div>
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

                        <div className="flex overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 snap-x snap-mandatory pb-8 md:pb-0 hide-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
                            {[
                                { id: 'tatev', icon: '⛪', image: '/images/for-travel/tatev.png' },
                                { id: 'karahunj', icon: '🏛️', image: '/images/for-travel/karahunj.png' },
                                { id: 'khndzoresk', icon: '🌉', image: '/images/for-travel/khndzoresk.png' },
                                { id: 'shake', icon: '🌊', image: '/images/for-travel/shake.png' },
                                { id: 'khustup', icon: '🏔️', image: '/images/for-travel/khustup.png' },
                                { id: 'old_goris', icon: '🛖', image: '/images/for-travel/old_goris.png' },
                                { id: 'halidzor', icon: '🏰', image: '/images/for-travel/halidzor.png' },
                                { id: 'vahanavank', icon: '⛪', image: '/images/for-travel/vahanavank.png' },
                                { id: 'khndzoresk_caves', icon: '🛖', image: '/images/for-travel/khndzoresk_caves.png' },
                                { id: 'meghri_viewpoint', icon: '☀️', image: '/images/for-travel/meghri_viewpoint.png' },
                                { id: 'devil_bridge', icon: '🌉', image: '/images/for-travel/devils_bridge.png' },
                                { id: 'hermitage_tatev', icon: '🏛️', image: '/images/for-travel/hermitage_tatev.png' },
                                { id: 'vorotnaberd_fortress', icon: '🏛️', image: '/images/for-travel/vorotnaberd_fortress.png' },
                                { id: 'vorotnaberd', icon: '🏛️', image: '/images/for-travel/vorotnaberd.png' },
                                { id: 'vorotnavanq', icon: '🏛️', image: '/images/for-travel/vorotnavanq.png' },
                                { id: 'melik_tangi_bridge', icon: '🌉', image: '/images/for-travel/melik_tangi_bridge.png' },
                                { id: 'harsnadzor_watchtower', icon: '🗼', image: '/images/for-travel/harsnadzor_watchtower.png' },
                            ].map((item) => (
                                <Link
                                    href={`/trips/${item.id}`}
                                    key={item.id}
                                    className="relative group rounded-[2.5rem] overflow-hidden aspect-[4/5] block shadow-lg border border-white/10 dark:border-white/5 shrink-0 w-[75vw] md:w-auto snap-center"
                                >
                                    <Image 
                                        src={item.image} 
                                        alt={t(`attraction_${item.id}`)} 
                                        fill 
                                        className="object-cover transition-transform duration-700 group-hover:scale-110" 
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-900/40 to-transparent transition-opacity duration-500 group-hover:opacity-90" />
                                    <div className="absolute inset-0 p-8 flex flex-col justify-end translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                        <div className="text-4xl mb-5 bg-white/10 backdrop-blur-xl w-14 h-14 flex items-center justify-center rounded-2xl border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.2)]">
                                            {item.icon}
                                        </div>
                                        <h3 className="text-2xl font-black uppercase text-white mb-2 group-hover:text-orange-400 transition-colors drop-shadow-md">
                                            {t(`attraction_${item.id}`)}
                                        </h3>
                                        <p className="text-zinc-200 text-sm leading-relaxed line-clamp-3 opacity-90 group-hover:opacity-100 transition-opacity">
                                            {t(`attraction_${item.id}_desc`)}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />

            {/* Booking Modal */}
            {modalOpen && selectedCity && (
                <CityBookingFlow
                    city={selectedCity}
                    cityLabel={cityLabel}
                    onClose={() => { setModalOpen(false); setSelectedCity(null); }}
                />
            )}
        </div>
    );
}
