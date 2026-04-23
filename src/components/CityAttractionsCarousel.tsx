"use client";

import React, { useState } from "react";
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

export default function CityAttractionsCarousel({ cityId, attractions }: Props) {

    /**
     * 
     * City Attractions Caruousel Hooks.
     */


    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const t = useTranslations("cities_data_details");

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
        }),
    };

    const swipeConfidenceThreshold = 10000;
    const swipePower = (offset: number, velocity: number) => {
        return Math.abs(offset) * velocity;
    };

    const paginate = (newDirection: number) => {
        setDirection(newDirection);
        setCurrentIndex((prevIndex) => (prevIndex + newDirection + attractions.length) % attractions.length);
    };

    if (!attractions || attractions.length === 0) return null;

    return (
        <section className="py-20 px-6 md:px-20 bg-zinc-50 dark:bg-zinc-950 overflow-hidden">
            <div className="max-w-7xl mx-auto space-y-12">
                <div className="text-center space-y-4">
                    <h2 className="text-4xl font-black uppercase text-zinc-900 dark:text-white">
                        Traveler <span className="text-orange-500">Favorites</span>
                    </h2>
                    <p className="text-zinc-500 max-w-2xl mx-auto">
                        Top activities and landmarks as recommended by travelers on TripAdvisor
                    </p>
                </div>

                <div className="relative h-[500px] md:h-[650px] w-full rounded-[3rem] overflow-hidden shadow-2xl group">
                    <AnimatePresence initial={false} custom={direction}>
                        <motion.div
                            key={currentIndex}
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                x: { type: "spring", stiffness: 300, damping: 30 },
                                opacity: { duration: 0.2 },
                            }}
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={1}
                            onDragEnd={(e, { offset, velocity }) => {
                                const swipe = swipePower(offset.x, velocity.x);

                                if (swipe < -swipeConfidenceThreshold) {
                                    paginate(1);
                                } else if (swipe > swipeConfidenceThreshold) {
                                    paginate(-1);
                                }
                            }}
                            className="absolute inset-0 w-full h-full"
                        >
                            <Image
                                src={attractions[currentIndex].image}
                                alt={t(`${cityId}.attractions.${currentIndex}`)}
                                fill
                                className="object-cover"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                            <div className="absolute bottom-12 left-12 right-12 text-white space-y-4">
                                <motion.span
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="bg-orange-500 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest"
                                >
                                    Top Rated
                                </motion.span>
                                <motion.h3
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="text-3xl md:text-5xl font-black uppercase max-w-3xl leading-tight"
                                >
                                    {t(`${cityId}.attractions.${currentIndex}`)}
                                </motion.h3>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    <button
                        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white p-4 rounded-full transition-all opacity-0 group-hover:opacity-100 hidden md:block"
                        onClick={() => paginate(-1)}
                    >
                        <FiChevronLeft size={32} />
                    </button>
                    <button
                        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white p-4 rounded-full transition-all opacity-0 group-hover:opacity-100 hidden md:block"
                        onClick={() => paginate(1)}
                    >
                        <FiChevronRight size={32} />
                    </button>

                    {/* Indicators */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
                        {attractions.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    setDirection(index > currentIndex ? 1 : -1);
                                    setCurrentIndex(index);
                                }}
                                className={`h-2 transition-all duration-300 rounded-full ${index === currentIndex ? "w-12 bg-orange-500" : "w-2 bg-white/50"
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
