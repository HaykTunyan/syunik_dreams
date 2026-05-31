"use client";

import { motion } from "framer-motion";

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

const sisianHotels: Hotel[] = [
    {
        name: "Hotel Vorotan",
        stars: 4,
        rating: 8.6,
        reviews: 312,
        address: "Sisian, Syunik Province, Armenia",
        highlights: ["Mountain views", "Free parking", "Restaurant & bar", "Spa & wellness"],
        priceRange: "~$55–$90 / night",
        phone: "+374 285 2-34-56",
        url: "https://www.booking.com/searchresults.html?ss=Sisian",
    },
    {
        name: "Karahunj Boutique Hotel",
        stars: 4,
        rating: 9.1,
        reviews: 187,
        address: "Near Zorats Karer, Sisian, Armenia",
        highlights: ["Panoramic highland views", "Stone terrace", "Local cuisine", "Private garden"],
        priceRange: "~$70–$120 / night",
        phone: "+374 285 2-21-10",
        url: "https://www.booking.com/searchresults.html?ss=Sisian",
    },
    {
        name: "Vorotan Valley Resort",
        stars: 5,
        rating: 9.4,
        reviews: 98,
        address: "Vorotan River, Sisian, Armenia",
        highlights: ["Riverside location", "Infinity pool", "Gourmet dining", "Hiking trails"],
        priceRange: "~$110–$180 / night",
        phone: "+374 285 2-55-00",
        url: "https://www.booking.com/searchresults.html?ss=Sisian",
    },
    {
        name: "Syunik Heritage Inn",
        stars: 4,
        rating: 8.9,
        reviews: 224,
        address: "Central Sisian, Syunik, Armenia",
        highlights: ["Historic building", "Breakfast included", "Tour desk", "Free Wi-Fi"],
        priceRange: "~$45–$75 / night",
        phone: "+374 285 2-10-88",
        url: "https://www.booking.com/searchresults.html?ss=Sisian",
    },
    {
        name: "Shaki Falls Lodge",
        stars: 4,
        rating: 8.7,
        reviews: 143,
        address: "Shaki Waterfall Road, Sisian, Armenia",
        highlights: ["Waterfall proximity", "Eco-friendly", "Fireplace rooms", "Guided tours"],
        priceRange: "~$60–$95 / night",
        phone: "+374 285 2-67-44",
        url: "https://www.booking.com/searchresults.html?ss=Sisian",
    },
];

function StarRow({ count }: { count: number }) {

    /**
     * 
     * StarRow Component:
     * 
     * @param count - The rating of the hotel.
     * 
     * @returns The rating of the hotel in the form of stars.
     */


    return (
        <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
                <svg
                    key={i}
                    className={`w-4 h-4 ${i < count ? "text-amber-400" : "text-zinc-300 dark:text-zinc-600"}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            ))}
        </div>
    );
}

export default function SisianHotels() {

    /**
     * 
     * SisianHotels Component:
     * 
     * @returns The list of hotels in Sisian.
     */


    return (
        <section className="py-20 px-6 md:px-20 bg-linear-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-900">
            <div className="max-w-7xl mx-auto space-y-14">

                <motion.div
                    className="text-center space-y-4"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="inline-block bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">
                        🏨 Where to Stay
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black uppercase text-zinc-900 dark:text-white">
                        Top <span className="text-orange-500">5 Hotels</span> in Sisian
                    </h2>
                    <p className="text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto text-lg">
                        Handpicked accommodations with 4+ stars — comfort, views, and authentic Syunik hospitality.
                    </p>
                </motion.div>
                <div className="grid gap-6 md:gap-8">
                    {sisianHotels.map((hotel, index) => (
                        <motion.div
                            key={hotel.name}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group relative bg-white dark:bg-zinc-900 rounded-[32px] border border-zinc-100 dark:border-zinc-800 shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden"
                        >

                            <div className="absolute top-6 left-6 z-10 w-10 h-10 rounded-full bg-orange-500 text-white font-black flex items-center justify-center text-sm shadow-lg">
                                #{index + 1}
                            </div>

                            <div className="flex flex-col md:flex-row gap-0">

                                <div className="md:w-48 shrink-0 bg-linear-to-br from-orange-500 to-orange-600 flex flex-col items-center justify-center p-8 text-white gap-2 rounded-t-[32px] md:rounded-l-[32px] md:rounded-tr-none">
                                    <span className="text-5xl font-black">{hotel.rating}</span>
                                    <span className="text-xs font-bold uppercase tracking-widest opacity-80">Score</span>
                                    <span className="text-xs opacity-70">{hotel.reviews} reviews</span>
                                </div>

                                <div className="flex-1 p-8 space-y-4">
                                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                                        <div className="space-y-1">
                                            <h3 className="text-2xl font-black text-zinc-900 dark:text-white group-hover:text-orange-500 transition-colors">
                                                {hotel.name}
                                            </h3>
                                            <StarRow count={hotel.stars} />
                                            <p className="text-sm text-zinc-500 dark:text-zinc-400 flex items-center gap-1 mt-1">
                                                <svg className="w-4 h-4 text-orange-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                {hotel.address}
                                            </p>
                                        </div>
                                        <div className="text-right shrink-0">
                                            <p className="text-2xl font-black text-zinc-900 dark:text-white">{hotel.priceRange}</p>
                                            <p className="text-xs text-zinc-400 mt-0.5">per night</p>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        {hotel.highlights.map((h) => (
                                            <span
                                                key={h}
                                                className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 rounded-full text-xs font-semibold"
                                            >
                                                ✓ {h}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2 border-t border-zinc-100 dark:border-zinc-800">
                                        <a
                                            href={`tel:${hotel.phone}`}
                                            className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-orange-500 transition-colors flex items-center gap-2"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                            {hotel.phone}
                                        </a>
                                        <a
                                            href={hotel.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-2.5 rounded-xl transition-all duration-300 text-sm shadow-md hover:shadow-orange-500/30 hover:scale-105"
                                        >
                                            Book Now
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
