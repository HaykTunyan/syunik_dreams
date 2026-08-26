"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useTranslations } from "next-intl";

interface Attraction {
    id: string;
    image: string;
}

interface Props {
    cityId: string;
    attractions: Attraction[];
}

/** Map attraction IDs to a category badge label */
const CATEGORY_MAP: Record<string, string> = {
    khustup: "🏔️ Nature",
    vahanavank: "⛪ Heritage",
    baghaberd: "🏯 Fortress",
    nzhdeh_statue: "🗿 Landmark",
    main_square: "🏙️ City Life",
    city_center: "🏙️ City Life",
    nzhdeh_street: "🛤️ Streets",
    city_street: "🛤️ Streets",
    // fallbacks for other cities
    tatev: "⛪ Heritage",
    rock_forest: "🌲 Nature",
    khndzoresk: "🌉 Adventure",
    shaki: "💧 Nature",
    zorats: "🪨 Historic",
    church: "⛪ Heritage",
    fortress: "🏯 Fortress",
    viewpoint: "🌅 Viewpoint",
    alleyway: "🛤️ Streets",
    bear: "🐻 Wildlife",
    park: "🌳 Nature",
    lichk: "🏞️ Landscape",
    agarak_ancient_site: "🏺 Historic",
    "agarak_cori-jrvezh": "💧 Nature",
    "agarak_old-tow": "🏘️ Old Town",
};

export default function CityAttractionsCarousel({ cityId, attractions }: Props) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const t = useTranslations("cities_data_details");

    const paginate = useCallback(
        (newDirection: number) => {
            setDirection(newDirection);
            setCurrentIndex(
                (prev) => (prev + newDirection + attractions.length) % attractions.length
            );
        },
        [attractions.length]
    );

    /* Keyboard navigation */
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight") paginate(1);
            if (e.key === "ArrowLeft") paginate(-1);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [paginate]);

    const slideVariants = {
        enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
        center: { x: 0, opacity: 1, zIndex: 1 },
        exit: (dir: number) => ({ x: dir < 0 ? "100%" : "-100%", opacity: 0, zIndex: 0 }),
    };

    const swipePower = (offset: number, velocity: number) => Math.abs(offset) * velocity;
    const SWIPE_THRESHOLD = 10000;

    if (!attractions || attractions.length === 0) return null;

    const current = attractions[currentIndex];
    const category = CATEGORY_MAP[current.id] ?? "📍 Place";
    const progress = ((currentIndex + 1) / attractions.length) * 100;

    return (
        <section className="py-20 px-6 md:px-20 bg-zinc-50 dark:bg-zinc-950 overflow-hidden">
            <div className="max-w-7xl mx-auto space-y-10">
                {/* ── Section header ── */}
                <div className="text-center space-y-3">
                    <p className="text-orange-500 font-black uppercase tracking-widest text-sm">
                        Explore the City
                    </p>
                    <h2 className="text-4xl md:text-5xl font-black uppercase text-zinc-900 dark:text-white leading-tight">
                        Must-Visit{" "}
                        <span className="text-orange-500">Places</span>
                    </h2>
                    <p className="text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto text-base">
                        Top landmarks, streets, and hidden gems — as experienced by travellers
                    </p>
                </div>

                {/* ── Main carousel ── */}
                <div className="relative h-[580px] md:h-[720px] w-full rounded-[2.5rem] overflow-hidden shadow-2xl group">

                    {/* Progress bar */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-white/10 z-30">
                        <motion.div
                            className="h-full bg-orange-500 origin-left"
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                        />
                    </div>

                    {/* Slide counter badge */}
                    <div className="absolute top-6 right-6 z-30 bg-black/40 backdrop-blur-md text-white text-xs font-black px-4 py-2 rounded-full tracking-widest uppercase">
                        {String(currentIndex + 1).padStart(2, "0")} / {String(attractions.length).padStart(2, "0")}
                    </div>

                    <AnimatePresence initial={false} custom={direction} mode="popLayout">
                        <motion.div
                            key={currentIndex}
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                x: { type: "spring", stiffness: 280, damping: 28 },
                                opacity: { duration: 0.25 },
                            }}
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={1}
                            onDragEnd={(_, { offset, velocity }) => {
                                const swipe = swipePower(offset.x, velocity.x);
                                if (swipe < -SWIPE_THRESHOLD) paginate(1);
                                else if (swipe > SWIPE_THRESHOLD) paginate(-1);
                            }}
                            className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
                        >
                            <Image
                                src={current.image}
                                alt={t(`${cityId}.attractions.${currentIndex}`)}
                                fill
                                className="object-cover select-none"
                                priority
                                draggable={false}
                            />

                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                            {/* Vignette sides */}
                            <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30 pointer-events-none" />

                            {/* Bottom caption */}
                            <div className="absolute bottom-10 left-8 right-8 md:left-14 md:right-14 text-white space-y-4">
                                <motion.span
                                    key={`cat-${currentIndex}`}
                                    initial={{ opacity: 0, y: 14 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.15, duration: 0.4 }}
                                    className="inline-block bg-orange-500 text-white text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg"
                                >
                                    {category}
                                </motion.span>

                                <motion.h3
                                    key={`title-${currentIndex}`}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.25, duration: 0.45 }}
                                    className="text-2xl md:text-5xl font-black uppercase max-w-3xl leading-tight drop-shadow-lg"
                                >
                                    {t(`${cityId}.attractions.${currentIndex}`)}
                                </motion.h3>

                                {/* Mini dot strip inside caption */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.35 }}
                                    className="flex items-center gap-2 pt-2"
                                >
                                    {attractions.map((_, idx) => (
                                        <button
                                            key={idx}
                                            aria-label={`Go to slide ${idx + 1}`}
                                            onClick={() => {
                                                setDirection(idx > currentIndex ? 1 : -1);
                                                setCurrentIndex(idx);
                                            }}
                                            className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex
                                                ? "w-10 bg-orange-500"
                                                : "w-3 bg-white/40 hover:bg-white/70"
                                                }`}
                                        />
                                    ))}
                                </motion.div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Nav arrows */}
                    <button
                        aria-label="Previous"
                        className="absolute left-5 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-orange-500 backdrop-blur-md text-white p-4 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 hidden md:flex items-center justify-center shadow-xl"
                        onClick={() => paginate(-1)}
                    >
                        <FiChevronLeft size={28} />
                    </button>
                    <button
                        aria-label="Next"
                        className="absolute right-5 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-orange-500 backdrop-blur-md text-white p-4 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 hidden md:flex items-center justify-center shadow-xl"
                        onClick={() => paginate(1)}
                    >
                        <FiChevronRight size={28} />
                    </button>
                </div>

                {/* ── Thumbnail strip ── */}
                {/* <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide justify-start md:justify-center">
                    {attractions.map((attraction, idx) => (
                        <button
                            key={idx}
                            aria-label={`View attraction ${idx + 1}`}
                            onClick={() => {
                                setDirection(idx > currentIndex ? 1 : -1);
                                setCurrentIndex(idx);
                            }}
                            className={`relative flex-shrink-0 w-20 h-14 md:w-24 md:h-16 rounded-xl overflow-hidden transition-all duration-300 ${
                                idx === currentIndex
                                    ? "ring-2 ring-orange-500 ring-offset-2 ring-offset-zinc-50 dark:ring-offset-zinc-950 scale-105 shadow-lg shadow-orange-500/30"
                                    : "opacity-50 hover:opacity-80"
                            }`}
                        >
                            <Image
                                src={attraction.image}
                                alt={`Thumbnail ${idx + 1}`}
                                fill
                                className="object-cover"
                            />
                            {idx === currentIndex && (
                                <div className="absolute inset-0 bg-orange-500/20" />
                            )}
                        </button>
                    ))}
                </div> */}

                {/* Keyboard hint */}
                {/* <p className="text-center text-zinc-400 dark:text-zinc-600 text-xs font-medium tracking-wider hidden md:block">
                    Use ← → arrow keys or swipe to navigate
                </p> */}
            </div>
        </section>
    );
}
