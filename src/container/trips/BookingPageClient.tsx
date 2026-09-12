"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import DateRangePicker from '@/components/DateRangePicker';

// ── Hotel data ────────────────────────────────────────────────────────────────

interface Hotel {
    name: string;
    stars: number;
    rating: number;
    reviews: number;
    address: string;
    highlights: string[];
    priceRange: string;
    phone: string;
    url: string;
}

const hotelsByCity: Record<string, Hotel[]> = {
    kapan: [
        {
            name: "Syunik Hotel Kapan",
            stars: 4, rating: 9.3, reviews: 284,
            address: "1A Aram Manukyan St, Kapan, Armenia",
            highlights: ["Modern fitness center", "Hot tub & sauna", "Exceptional breakfast", "Mountain-view suites"],
            priceRange: "~$60–$95 / night", phone: "+374 285 2-88-88",
            url: "https://www.booking.com/searchresults.html?ss=Kapan",
        },
        {
            name: "Imperial Hotel Kapan",
            stars: 4, rating: 9.0, reviews: 142,
            address: "5 Z. Andranik St, Kapan, Armenia",
            highlights: ["Indoor swimming pool", "On-site restaurant & bar", "Close to Zipline Kapan", "Terrace with views"],
            priceRange: "~$55–$85 / night", phone: "+374 285 2-11-22",
            url: "https://www.booking.com/searchresults.html?ss=Kapan",
        },
        {
            name: "Grand House Hotel",
            stars: 4, rating: 9.2, reviews: 98,
            address: "Halidzor District, Kapan, Armenia",
            highlights: ["Panoramic forest views", "Sauna & massage", "Luxury suites", "Hiking trails access"],
            priceRange: "~$70–$110 / night", phone: "+374 285 2-33-44",
            url: "https://www.booking.com/searchresults.html?ss=Kapan",
        },
        {
            name: "Cascade Guesthouse",
            stars: 4, rating: 9.1, reviews: 104,
            address: "18 Davit Bek St, Kapan, Armenia",
            highlights: ["Quiet residential area", "Home-cooked local meals", "Cozy shared lounge", "Free Wi-Fi & parking"],
            priceRange: "~$40–$65 / night", phone: "+374 285 2-55-66",
            url: "https://www.booking.com/searchresults.html?ss=Kapan",
        },
        {
            name: "Bekh Hilltop Camping & Cabins",
            stars: 4, rating: 9.5, reviews: 86,
            address: "Bekh Village Hilltop, Kapan, Armenia",
            highlights: ["Epic mountain panorama", "Wooden A-frame cabins", "Campfire & stargazing", "Eco-friendly retreat"],
            priceRange: "~$45–$80 / night", phone: "+374 285 2-77-88",
            url: "https://www.booking.com/searchresults.html?ss=Kapan",
        },
    ],
    goris: [
        {
            name: "Hotel Mirhav",
            stars: 4, rating: 9.3, reviews: 342,
            address: "100 Mashtots St, Goris, Armenia",
            highlights: ["Traditional Armenian design", "Lush green garden", "Handicrafts shop", "Cozy restaurant & bar"],
            priceRange: "~$65–$110 / night", phone: "+374 284 2-46-12",
            url: "https://www.booking.com/searchresults.html?ss=Goris",
        },
        {
            name: "Khoreayi Dzor Resort",
            stars: 5, rating: 9.5, reviews: 156,
            address: "Old Goris Cave District, Goris, Armenia",
            highlights: ["Cave dwelling views", "Premium dining", "Infinity pool", "Guided hiking tours"],
            priceRange: "~$90–$150 / night", phone: "+374 284 2-55-99",
            url: "https://www.booking.com/searchresults.html?ss=Goris",
        },
        {
            name: "REDROOF Country House",
            stars: 4, rating: 9.4, reviews: 188,
            address: "14 Galstyan St, Goris, Armenia",
            highlights: ["Stunning mountain view", "Orchard garden", "Warm family hospitality", "Outdoor fireplace"],
            priceRange: "~$50–$85 / night", phone: "+374 284 2-11-20",
            url: "https://www.booking.com/searchresults.html?ss=Goris",
        },
        {
            name: "Christy Hotel",
            stars: 4, rating: 8.8, reviews: 215,
            address: "1 Syunik St, Goris, Armenia",
            highlights: ["City center location", "Modern rooms & suites", "Exceptional breakfast", "Bicycle rental"],
            priceRange: "~$45–$75 / night", phone: "+374 284 2-30-50",
            url: "https://www.booking.com/searchresults.html?ss=Goris",
        },
        {
            name: "Yeghevnut Hotel",
            stars: 4, rating: 8.7, reviews: 290,
            address: "9 Gusan Ashot St, Goris, Armenia",
            highlights: ["Spacious rooms", "Pine forest surrounding", "On-site restaurant", "Free private parking"],
            priceRange: "~$40–$70 / night", phone: "+374 284 2-88-88",
            url: "https://www.booking.com/searchresults.html?ss=Goris",
        },
    ],
    sisian: [
        {
            name: "Hotel Vorotan",
            stars: 4, rating: 8.6, reviews: 312,
            address: "Sisian, Syunik Province, Armenia",
            highlights: ["Mountain views", "Free parking", "Restaurant & bar", "Spa & wellness"],
            priceRange: "~$55–$90 / night", phone: "+374 285 2-34-56",
            url: "https://www.booking.com/searchresults.html?ss=Sisian",
        },
        {
            name: "Karahunj Boutique Hotel",
            stars: 4, rating: 9.1, reviews: 187,
            address: "Near Zorats Karer, Sisian, Armenia",
            highlights: ["Stonehenge-view balcony", "Boutique design rooms", "Local cuisine", "Archaeological tours"],
            priceRange: "~$60–$100 / night", phone: "+374 285 2-44-12",
            url: "https://www.booking.com/searchresults.html?ss=Sisian",
        },
    ],
    agarak: [
        {
            name: "ML Hotel Agarak",
            stars: 4, rating: 9.1, reviews: 110,
            address: "1 Border Road, Agarak, Syunik Province, Armenia",
            highlights: ["Armenian-Iranian border view", "Luxe rooms", "On-site restaurant & café", "Free secure parking"],
            priceRange: "~$45–$75 / night", phone: "+374 286 4-12-88",
            url: "https://www.booking.com/searchresults.html?ss=Agarak",
        },
        {
            name: "Shiraz Hotel & Garden",
            stars: 4, rating: 8.9, reviews: 84,
            address: "12 Aras St, Agarak, Armenia",
            highlights: ["Persian-inspired décor", "Rooftop terrace", "Garden & pool", "Warm service"],
            priceRange: "~$40–$70 / night", phone: "+374 286 4-22-11",
            url: "https://www.booking.com/searchresults.html?ss=Agarak",
        },
    ],
    meghri: [
        {
            name: "Nice House Hotel",
            stars: 4, rating: 9.2, reviews: 145,
            address: "12 Zoravar Andranik St, Meghri, Armenia",
            highlights: ["Modern rooms", "Minibar & AC", "Scenic mountain view", "Warm hospitality"],
            priceRange: "~$50–$80 / night", phone: "+374 286 4-33-22",
            url: "https://www.booking.com/searchresults.html?ss=Meghri",
        },
        {
            name: "Khachats Toun Heritage",
            stars: 4, rating: 9.4, reviews: 98,
            address: "Old Town, Meghri, Armenia",
            highlights: ["Heritage stone house", "Pomegranate garden", "Artisan décor", "Local crafts market nearby"],
            priceRange: "~$55–$90 / night", phone: "+374 286 4-44-77",
            url: "https://www.booking.com/searchresults.html?ss=Meghri",
        },
    ],
    kajaran: [
        {
            name: "Kaputjugh Mountain Resort",
            stars: 5, rating: 9.5, reviews: 120,
            address: "Kajaran Heights, Syunik Province, Armenia",
            highlights: ["Alpine views", "Premium spa", "Fine dining", "Hiking trails"],
            priceRange: "~$95–$160 / night", phone: "+374 286 3-12-34",
            url: "https://www.booking.com/searchresults.html?ss=Kapan",
        },
        {
            name: "Qajaran Valley Hotel",
            stars: 4, rating: 8.8, reviews: 94,
            address: "5 Mine Road, Kajaran, Armenia",
            highlights: ["Valley panorama", "Free Wi-Fi", "Airport transfer", "Conference room"],
            priceRange: "~$50–$85 / night", phone: "+374 286 3-56-78",
            url: "https://www.booking.com/searchresults.html?ss=Kapan",
        },
    ],
};

// ── Sub-components ────────────────────────────────────────────────────────────

function StarRow({ count }: { count: number }) {
    return (
        <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
                <svg
                    key={i}
                    className={`w-3.5 h-3.5 ${i < count ? "text-amber-400" : "text-zinc-300 dark:text-zinc-600"}`}
                    fill="currentColor" viewBox="0 0 20 20"
                >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            ))}
        </div>
    );
}

interface HotelCardProps {
    hotel: Hotel;
    index: number;
    isSelected: boolean;
    onSelect: (name: string) => void;
}

function HotelCard({ hotel, index, isSelected, onSelect }: HotelCardProps) {
    return (
        <button
            type="button"
            onClick={() => onSelect(hotel.name)}
            className={`w-full text-left group relative rounded-[28px] border-2 transition-all duration-300 overflow-hidden shadow-sm
                ${isSelected
                    ? 'border-orange-500 bg-orange-50/60 dark:bg-orange-500/5 shadow-orange-500/20 shadow-lg'
                    : 'border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-orange-300 dark:hover:border-orange-500/40 hover:shadow-md'
                }`}
        >
            {/* Rank badge */}
            <div className="absolute top-5 left-5 z-10 w-8 h-8 rounded-full bg-orange-500 text-white font-black flex items-center justify-center text-xs shadow">
                #{index + 1}
            </div>

            {/* Checkbox indicator */}
            <div className={`absolute top-5 right-5 z-10 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200
                ${isSelected ? 'bg-orange-500 border-orange-500' : 'bg-white dark:bg-zinc-800 border-zinc-300 dark:border-zinc-600'}`}>
                {isSelected && (
                    <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                )}
            </div>

            <div className="flex flex-col sm:flex-row gap-0">
                {/* Score panel */}
                <div className={`sm:w-36 shrink-0 flex flex-col items-center justify-center p-6 text-white gap-1 rounded-t-[26px] sm:rounded-l-[26px] sm:rounded-tr-none transition-colors duration-300
                    ${isSelected ? 'bg-gradient-to-br from-orange-500 to-orange-600' : 'bg-gradient-to-br from-zinc-700 to-zinc-900 group-hover:from-orange-500 group-hover:to-orange-600'}`}>
                    <span className="text-4xl font-black">{hotel.rating}</span>
                    <span className="text-xs font-bold uppercase tracking-widest opacity-80">Score</span>
                    <span className="text-xs opacity-70">{hotel.reviews} reviews</span>
                </div>

                {/* Content */}
                <div className="flex-1 p-6 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                        <div className="space-y-1">
                            <h3 className={`text-xl font-black transition-colors ${isSelected ? 'text-orange-600 dark:text-orange-400' : 'text-zinc-900 dark:text-white group-hover:text-orange-500'}`}>
                                {hotel.name}
                            </h3>
                            <StarRow count={hotel.stars} />
                            <p className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1 mt-1">
                                <svg className="w-3.5 h-3.5 text-orange-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                {hotel.address}
                            </p>
                        </div>
                        {/* <div className="text-right shrink-0 ">
                            <p className="text-lg font-black text-zinc-900 dark:text-white">{hotel.priceRange}</p>
                            <p className="text-xs text-zinc-400">per night</p>
                        </div> */}
                    </div>

                    {/* Highlights */}
                    <div className="flex flex-wrap gap-1.5">
                        {hotel.highlights.map((h) => (
                            <span key={h} className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-colors
                                ${isSelected
                                    ? 'bg-orange-100 dark:bg-orange-500/15 text-orange-700 dark:text-orange-300'
                                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300'
                                }`}>
                                ✓ {h}
                            </span>
                        ))}
                    </div>

                    <div className='flex flex-row item-center justify-between'>

                        <p className="text-xs text-zinc-400 flex items-center gap-1.5 pt-1">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            {hotel.phone}
                        </p>


                        <div className="text-right shrink-0 ">
                            <p className="text-lg font-black text-zinc-900 dark:text-white">{hotel.priceRange}</p>
                            {/* <p className="text-xs text-zinc-400">per night</p> */}
                        </div>


                    </div>

                    {/* Phone */}

                </div>
            </div>

            {/* Selected banner */}
            {isSelected && (
                <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-orange-400 to-orange-600" />
            )}
        </button>
    );
}

// ── Main Component ────────────────────────────────────────────────────────────

interface BookingPageClientProps {
    city: string;
}

export default function BookingPageClient({ city }: BookingPageClientProps) {

    /**
     *
     * BookingPageClient — full-page booking flow with selectable hotel cards.
     * Step 1: choose a hotel (required before continuing)
     * Step 2: pick dates
     * Step 3: guest details
     * Step 4: confirmation
     *
     */

    const router = useRouter();
    const t = useTranslations('trips');
    const cityLabel = t(city);

    const hotels = hotelsByCity[city] ?? [];

    const [step, setStep] = useState(1);
    const [selectedHotel, setSelectedHotel] = useState<string | null>(null);

    // Step 2 state
    const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
    const [startDate, endDate] = dateRange;
    const isDatesComplete = startDate !== null && endDate !== null;

    // Step 3 state
    const [formData, setFormData] = useState({ name: '', surname: '', phone: '', email: '' });
    const isFormComplete = formData.name && formData.surname && formData.phone && formData.email;

    const fmtDate = (d: Date) => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
    };

    const selectedHotelObj = hotels.find(h => h.name === selectedHotel);
    const steps = ['Hotel', 'Dates', 'Details', 'Confirm'];

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col">
            <Header />

            <main className="flex-1 pt-28 pb-20 px-4 max-w-7xl mx-auto w-full">

                {/* Back */}
                <button
                    onClick={() => router.back()}
                    className="mb-8 flex items-center gap-2 text-sm font-semibold text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors group"
                >
                    <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Trips
                </button>

                {/* ── Header card ──────────────────────────────────────────── */}
                <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl border border-zinc-100 dark:border-zinc-800 p-8 mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <p className="text-sm font-semibold text-orange-500 uppercase tracking-widest mb-1">Trip Booking</p>
                            <h1 className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-white">
                                Trip to {cityLabel}
                            </h1>
                        </div>

                        {/* Step indicator */}
                        <div className="flex items-center gap-1 sm:gap-2">
                            {steps.map((label, i) => {
                                const num = i + 1;
                                const active = step === num;
                                const done = step > num;
                                return (
                                    <div key={label} className="flex items-center gap-1 sm:gap-2">
                                        <div className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold transition-all
                                            ${done ? 'bg-orange-500 text-white' : active ? 'bg-orange-500 text-white ring-4 ring-orange-500/20' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400'}`}>
                                            {done ? (
                                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                </svg>
                                            ) : num}
                                        </div>
                                        <span className={`hidden sm:block text-xs font-semibold transition-colors
                                            ${active ? 'text-orange-500' : done ? 'text-orange-400' : 'text-zinc-400'}`}>
                                            {label}
                                        </span>
                                        {i < steps.length - 1 && (
                                            <span className="text-zinc-200 dark:text-zinc-700 mx-0.5">→</span>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Selected hotel summary (shown after step 1) */}
                    {selectedHotelObj && step > 1 && (
                        <div className="mt-5 pt-5 border-t border-zinc-100 dark:border-zinc-800 flex items-center gap-3">
                            <div className="w-8 h-8 bg-orange-100 dark:bg-orange-500/20 rounded-full flex items-center justify-center shrink-0">
                                <span className="text-lg">🏨</span>
                            </div>
                            <div>
                                <p className="text-xs text-zinc-400 font-medium">Selected Hotel</p>
                                <p className="text-sm font-bold text-zinc-900 dark:text-white">
                                    {selectedHotelObj.name}
                                    <span className="ml-2 text-xs font-semibold text-orange-500">{selectedHotelObj.priceRange}</span>
                                </p>
                            </div>
                            <button
                                onClick={() => setStep(1)}
                                className="ml-auto text-xs font-semibold text-zinc-400 hover:text-orange-500 transition-colors"
                            >
                                Change
                            </button>
                        </div>
                    )}
                </div>

                {/* ── Step content ─────────────────────────────────────────── */}
                <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-xl border border-zinc-100 dark:border-zinc-800 overflow-hidden mb-8">
                    <div className="p-8 md:p-10">

                        {/* Step 1 — Select hotel */}
                        {step === 1 && (
                            <div className="animate-fade-in-up">
                                <div className="flex items-center justify-between mb-2">
                                    <h2 className="text-2xl font-black text-zinc-900 dark:text-white">
                                        Where to Stay in {cityLabel}
                                    </h2>
                                    {selectedHotel && (
                                        <span className="text-xs font-bold text-orange-500 bg-orange-50 dark:bg-orange-500/10 px-3 py-1.5 rounded-full">
                                            1 selected
                                        </span>
                                    )}
                                </div>
                                <p className="text-zinc-500 dark:text-zinc-400 mb-8">
                                    Choose your preferred hotel — tap a card to select it.
                                </p>

                                {hotels.length === 0 ? (
                                    <p className="text-zinc-400 text-center py-12">No hotels found for this city.</p>
                                ) : (
                                    <div className="space-y-4">
                                        {hotels.map((hotel, i) => (
                                            <HotelCard
                                                key={hotel.name}
                                                hotel={hotel}
                                                index={i}
                                                isSelected={selectedHotel === hotel.name}
                                                onSelect={setSelectedHotel}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Step 2 — Date picker */}
                        {step === 2 && (
                            <div className="animate-fade-in-up max-w-xl mx-auto">
                                <h2 className="text-2xl font-black mb-2 text-zinc-900 dark:text-white">When are you going?</h2>
                                <p className="text-zinc-500 dark:text-zinc-400 mb-8">
                                    Select your check-in and check-out dates for {cityLabel}.
                                </p>
                                <div className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-white/10 rounded-3xl p-6 shadow-inner">
                                    <DateRangePicker
                                        startDate={startDate}
                                        endDate={endDate}
                                        onChange={setDateRange}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Step 3 — Guest details */}
                        {step === 3 && (
                            <div className="animate-fade-in-up max-w-xl mx-auto">
                                <h2 className="text-2xl font-black mb-2 text-zinc-900 dark:text-white">Guest Details</h2>
                                <p className="text-zinc-500 dark:text-zinc-400 mb-8">
                                    Please enter your information to secure the booking.
                                </p>
                                <div className="space-y-5">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">First Name</label>
                                            <input
                                                type="text"
                                                value={formData.name}
                                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-white/10 rounded-xl px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                                                placeholder="John"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">Last Name</label>
                                            <input
                                                type="text"
                                                value={formData.surname}
                                                onChange={e => setFormData({ ...formData, surname: e.target.value })}
                                                className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-white/10 rounded-xl px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                                                placeholder="Doe"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">Email Address</label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-white/10 rounded-xl px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">Phone Number</label>
                                        <input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                            className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-300 dark:border-white/10 rounded-xl px-4 py-3 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                                            placeholder="+374 XX XXX XXX"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 4 — Confirmation */}
                        {step === 4 && (
                            <div className="flex flex-col items-center justify-center text-center max-w-md mx-auto animate-fade-in-up py-12">
                                <div className="w-24 h-24 bg-emerald-100 dark:bg-emerald-500/20 rounded-full flex items-center justify-center mb-6">
                                    <svg className="w-12 h-12 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h2 className="text-4xl font-black mb-4 text-zinc-900 dark:text-white">Booking Confirmed!</h2>
                                <p className="text-lg text-zinc-500 dark:text-zinc-400 mb-3 leading-relaxed">
                                    Thank you, <span className="font-bold text-zinc-900 dark:text-white">{formData.name}</span>.
                                    {' '}Your trip to <span className="font-bold text-orange-500">{cityLabel}</span> from{' '}
                                    <span className="font-bold text-zinc-900 dark:text-white">{fmtDate(startDate!)}</span> to{' '}
                                    <span className="font-bold text-zinc-900 dark:text-white">{fmtDate(endDate!)}</span> has been securely booked.
                                </p>
                                {selectedHotelObj && (
                                    <p className="text-sm text-zinc-400 mb-8">
                                        🏨 Staying at <span className="font-semibold text-zinc-700 dark:text-zinc-300">{selectedHotelObj.name}</span>
                                    </p>
                                )}
                                <button
                                    onClick={() => router.push('/trips')}
                                    className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-bold transition-all hover:-translate-y-1 hover:shadow-lg shadow-orange-500/30"
                                >
                                    Back to Trips
                                </button>
                            </div>
                        )}
                    </div>

                    {/* ── Footer nav ───────────────────────────────────────── */}
                    {step < 4 && (
                        <div className="px-8 md:px-10 py-6 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between bg-zinc-50 dark:bg-zinc-950/50">
                            {step > 1 ? (
                                <button
                                    onClick={() => setStep(step - 1)}
                                    className="px-6 py-3 font-semibold text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors"
                                >
                                    ← Back
                                </button>
                            ) : <div />}

                            {step === 1 && (
                                <div className="flex items-center gap-3">
                                    {!selectedHotel && (
                                        <span className="text-xs text-zinc-400 font-medium">Select a hotel to continue</span>
                                    )}
                                    <button
                                        onClick={() => setStep(2)}
                                        disabled={!selectedHotel}
                                        className={`px-8 py-3 rounded-xl font-bold transition-all ${selectedHotel
                                            ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-md shadow-orange-500/20 hover:-translate-y-0.5'
                                            : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-600 cursor-not-allowed'
                                            }`}
                                    >
                                        Continue to Dates →
                                    </button>
                                </div>
                            )}
                            {step === 2 && (
                                <button
                                    onClick={() => setStep(3)}
                                    disabled={!isDatesComplete}
                                    className={`px-8 py-3 rounded-xl font-bold transition-all ${isDatesComplete
                                        ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-md shadow-orange-500/20 hover:-translate-y-0.5'
                                        : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-600 cursor-not-allowed'
                                        }`}
                                >
                                    Continue to Details →
                                </button>
                            )}
                            {step === 3 && (
                                <button
                                    onClick={() => setStep(4)}
                                    disabled={!isFormComplete}
                                    className={`px-8 py-3 rounded-xl font-bold transition-all ${isFormComplete
                                        ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-md shadow-orange-500/20 hover:-translate-y-0.5'
                                        : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-600 cursor-not-allowed'
                                        }`}
                                >
                                    Confirm Booking ✓
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
