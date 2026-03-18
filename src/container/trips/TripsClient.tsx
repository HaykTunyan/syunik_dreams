"use client";

import { useState } from 'react';
import SyunikMap from '@/components/SyunikMap';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { useTranslations } from 'next-intl';
import { CardNavigation } from '../home/cardNavigation';

// ── Booking Modal ─────────────────────────────────────────────────────────────

const MONTHS = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December',
];

function getDaysInMonth(month: number): number {
    // Use current year for leap year accuracy
    return new Date(new Date().getFullYear(), month, 0).getDate();
}

interface BookingModalProps {
    city: string;
    cityLabel: string;
    onClose: () => void;
}

function BookingModal({ city, cityLabel, onClose }: BookingModalProps) {
    const [selectedMonth, setSelectedMonth] = useState<number | ''>('');
    const [selectedDay, setSelectedDay]     = useState<number | ''>('');
    const [confirmed, setConfirmed]         = useState(false);

    const daysInMonth = selectedMonth !== '' ? getDaysInMonth(selectedMonth) : 31;
    const isComplete  = selectedMonth !== '' && selectedDay !== '';

    function handleConfirm() {
        if (!isComplete) return;
        setConfirmed(true);
        // Auto-close after showing success for 1.8 s
        setTimeout(onClose, 1800);
    }

    return (
        /* Backdrop */
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backdropFilter: 'blur(6px)', backgroundColor: 'rgba(0,0,0,0.60)' }}
            onClick={onClose}
        >
            {/* Panel — stop propagation so clicking inside doesn't close */}
            <div
                className="relative w-full max-w-md bg-zinc-900 border border-white/10 rounded-3xl shadow-2xl overflow-hidden animate-fade-in-up"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Top accent bar */}
                <div className="h-1 w-full bg-gradient-to-r from-orange-500 to-amber-400" />

                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors p-1"
                    aria-label="Close"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="px-8 pt-7 pb-8 space-y-6">

                    {confirmed ? (
                        /* ── Success state ── */
                        <div className="flex flex-col items-center py-6 text-center gap-4 animate-fade-in-up">
                            <div className="w-16 h-16 rounded-full bg-emerald-500/15 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8 text-emerald-400">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-white">Booking Confirmed!</h3>
                            <p className="text-zinc-400 text-sm">
                                Your trip to <span className="text-orange-400 font-semibold">{cityLabel}</span> on{' '}
                                <span className="text-orange-400 font-semibold">
                                    {MONTHS[(selectedMonth as number) - 1]} {selectedDay}
                                </span>{' '}
                                has been received.
                            </p>
                        </div>
                    ) : (
                        /* ── Form state ── */
                        <>
                            {/* Header */}
                            <div>
                                <span className="text-xs font-semibold tracking-[0.18em] uppercase text-orange-400">
                                    Book a Trip
                                </span>
                                <h2 className="text-2xl font-bold text-white mt-1">
                                    Trip to{' '}
                                    <span className="text-orange-400">{cityLabel}</span>
                                </h2>
                                <p className="text-zinc-400 text-sm mt-1">
                                    Choose your preferred travel month and day.
                                </p>
                            </div>

                            {/* City badge */}
                            <div className="flex items-center gap-3 bg-zinc-800 border border-white/5 rounded-xl px-4 py-3">
                                <span className="text-2xl">📍</span>
                                <div>
                                    <p className="text-xs text-zinc-500 uppercase tracking-wider">Destination</p>
                                    <p className="text-white font-semibold">{cityLabel}</p>
                                </div>
                            </div>

                            {/* Month selector */}
                            <div className="space-y-2">
                                <label className="text-xs font-semibold tracking-wider uppercase text-zinc-400">
                                    Month
                                </label>
                                <div className="relative">
                                    <select
                                        value={selectedMonth}
                                        onChange={(e) => {
                                            setSelectedMonth(Number(e.target.value));
                                            setSelectedDay(''); // reset day when month changes
                                        }}
                                        className="w-full appearance-none bg-zinc-800 border border-white/10 text-white rounded-xl px-4 py-3 pr-10 focus:outline-none focus:border-orange-500 transition-colors cursor-pointer"
                                    >
                                        <option value="" disabled>Select a month…</option>
                                        {MONTHS.map((m, i) => (
                                            <option key={m} value={i + 1}>{m}</option>
                                        ))}
                                    </select>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                    </svg>
                                </div>
                            </div>

                            {/* Day selector */}
                            <div className="space-y-2">
                                <label className="text-xs font-semibold tracking-wider uppercase text-zinc-400">
                                    Day
                                </label>
                                <div className="relative">
                                    <select
                                        value={selectedDay}
                                        onChange={(e) => setSelectedDay(Number(e.target.value))}
                                        disabled={selectedMonth === ''}
                                        className={`w-full appearance-none bg-zinc-800 border border-white/10 text-white rounded-xl px-4 py-3 pr-10 focus:outline-none focus:border-orange-500 transition-colors cursor-pointer
                                            ${selectedMonth === '' ? 'opacity-40 cursor-not-allowed' : ''}`}
                                    >
                                        <option value="" disabled>
                                            {selectedMonth === '' ? 'Select a month first' : 'Select a day…'}
                                        </option>
                                        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((d) => (
                                            <option key={d} value={d}>{d}</option>
                                        ))}
                                    </select>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                    </svg>
                                </div>
                            </div>

                            {/* Confirm button */}
                            <button
                                onClick={handleConfirm}
                                disabled={!isComplete}
                                className={`w-full py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all duration-300
                                    ${isComplete
                                        ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:shadow-lg hover:shadow-orange-500/30 hover:scale-[1.02] active:scale-100'
                                        : 'bg-zinc-700 text-zinc-500 cursor-not-allowed'
                                    }`}
                            >
                                {isComplete ? '✓ Confirm Booking' : 'Fill all fields to continue'}
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

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
    const [modalOpen, setModalOpen]       = useState(false);

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

                            {/* ── Sidebar ── */}
                            <div className="lg:col-span-1">
                                <div className="sticky top-24">
                                    <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-lg p-6">
                                        <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">{t('trip_info_title')}</h3>
                                        <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-6">{t('select_city_msg')}</p>
                                        <div className="space-y-3">
                                            {['kapan', 'goris', 'meghri', 'sisian', 'agarak', 'kajaran'].map((city) => (
                                                <button
                                                    key={city}
                                                    onClick={() => setSelectedCity(city)}
                                                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${selectedCity === city ? 'bg-orange-600 text-white' : 'bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400 hover:bg-orange-100'}`}
                                                >
                                                    📍 {t(city)}
                                                </button>
                                            ))}
                                        </div>

                                        {/* Book Now — disabled until city is selected */}
                                        <button
                                            onClick={openBookingModal}
                                            disabled={!selectedCity}
                                            className={`w-full mt-6 font-semibold py-3 px-4 rounded-lg transition-all duration-300
                                                ${selectedCity
                                                    ? 'bg-orange-600 hover:bg-orange-700 text-white hover:shadow-lg hover:shadow-orange-500/30 hover:scale-[1.02] active:scale-100'
                                                    : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-600 cursor-not-allowed'
                                                }`}
                                        >
                                            {selectedCity
                                                ? `🗓 ${t('book_now')} — ${t(selectedCity)}`
                                                : t('book_now')
                                            }
                                        </button>

                                        {/* Hint text */}
                                        {!selectedCity && (
                                            <p className="text-center text-xs text-zinc-400 dark:text-zinc-600 mt-2">
                                                Select a city to activate booking
                                            </p>
                                        )}
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

            {/* Booking Modal */}
            {modalOpen && selectedCity && (
                <BookingModal
                    city={selectedCity}
                    cityLabel={cityLabel}
                    onClose={() => { setModalOpen(false); setSelectedCity(null); }}
                />
            )}
        </div>
    );
}
