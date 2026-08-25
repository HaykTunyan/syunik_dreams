"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function AboutRoadClient() {

    /**
     * 
     * About-road image is broken, add a new image for about-road section
     */

    const t = useTranslations("about_road");

    const timelineSteps = [
        { key: "start", distance: "0 km" },
        { key: "sisian", distance: "210 km" },
        { key: "tatev", distance: "260 km" },
        { key: "kapan", distance: "290 km" },
        { key: "meghri", distance: "360 km" },
    ];

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col font-sans selection:bg-orange-500 selection:text-white transition-colors duration-300">

            <Header />
            <main className="grow">
                <section className="relative h-[80vh] min-h-[500px] flex items-center justify-center overflow-hidden">
                    <Image
                        src="/images/for-travel/syuniks_gate.png"
                        alt="Gates of Syunik"
                        fill
                        priority
                        className="object-cover brightness-[0.7] dark:brightness-[0.5] transition-all duration-700 scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-b from-black/30 via-zinc-950/50 to-zinc-50 dark:to-zinc-950 transition-colors duration-300" />

                    <div className="relative z-10 text-center px-6 max-w-4xl mx-auto space-y-6">
                        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-[0.25em] uppercase text-orange-400 border border-orange-500/30 bg-orange-500/10">
                            {t("title_prefix")}
                        </span>
                        <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white uppercase select-none drop-shadow-2xl">
                            {t("title_suffix")}
                        </h1>
                        <div className="w-24 h-1.5 bg-linear-to-r from-orange-500 to-amber-400 mx-auto rounded-full" />
                        <p className="text-lg md:text-2xl text-zinc-200 dark:text-zinc-300 font-light leading-relaxed max-w-2xl mx-auto drop-shadow-md">
                            {t("subtitle")}
                        </p>
                    </div>
                </section>
                <section className="py-20 px-6 max-w-5xl mx-auto">
                    <div className="bg-white dark:bg-zinc-900 rounded-[2.5rem] p-8 md:p-16 shadow-2xl border border-zinc-100 dark:border-white/5 relative overflow-hidden transition-all duration-300 hover:shadow-orange-500/5">
                        <div className="absolute top-0 left-0 w-2 h-full bg-linear-to-b from-orange-500 to-amber-500" />
                        <p className="text-xl md:text-2xl text-zinc-700 dark:text-zinc-300 font-light leading-relaxed">
                            {t("introduction")}
                        </p>
                    </div>
                </section>
                <section className="py-12 px-6 max-w-6xl mx-auto space-y-24">
                    <div className="flex flex-col lg:flex-row gap-12 items-center">
                        <div className="flex-1 space-y-6">
                            <span className="text-xs font-bold tracking-[0.2em] uppercase text-orange-500">
                                {t("section_landmark")}
                            </span>
                            <h2 className="text-3xl md:text-5xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">
                                {t("section_gateway_title")}
                            </h2>
                            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-lg">
                                {t("section_gateway_desc")}
                            </p>
                        </div>
                        <div className="w-full lg:w-[45%] shrink-0">
                            <div className="relative aspect-video lg:aspect-4/3 rounded-3xl overflow-hidden shadow-2xl border border-zinc-200 dark:border-white/10 group">
                                <Image
                                    src="/images/for-travel/syuniks_gate.png"
                                    alt="Syunik's Gate"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col lg:flex-row-reverse gap-12 items-center">
                        <div className="flex-1 space-y-6">
                            <span className="text-xs font-bold tracking-[0.2em] uppercase text-orange-500">
                                {t('section_engineering_title')}
                            </span>
                            <h2 className="text-3xl md:text-5xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">
                                {t("section_serpentine_title")}
                            </h2>
                            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-lg">
                                {t("section_serpentine_desc")}
                            </p>
                        </div>
                        <div className="w-full lg:w-[45%] shrink-0">
                            <div className="relative aspect-video lg:aspect-4/3 rounded-3xl overflow-hidden shadow-2xl border border-zinc-200 dark:border-white/10 group">
                                <Image
                                    src="/images/for-travel/tatev.png"
                                    alt="Tatev Serpentine"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-12 items-center">
                        <div className="flex-1 space-y-6">
                            <span className="text-xs font-bold tracking-[0.2em] uppercase text-orange-500">
                                {t("section_passes_title_sub")}
                            </span>
                            <h2 className="text-3xl md:text-5xl font-black text-zinc-900 dark:text-white uppercase tracking-tight">
                                {t("section_passes_title")}
                            </h2>
                            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-lg">
                                {t("section_passes_desc")}
                            </p>
                        </div>
                        <div className="w-full lg:w-[45%] shrink-0">
                            <div className="relative aspect-video lg:aspect-4/3 rounded-3xl overflow-hidden shadow-2xl border border-zinc-200 dark:border-white/10 group">
                                <Image
                                    src="/images/for-travel/khustup.png"
                                    alt="Syunik Pass Landscape"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-24 bg-zinc-950 text-white overflow-hidden relative">
                    <div className="pointer-events-none absolute inset-0 overflow-hidden">
                        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-orange-600/5 blur-3xl" />
                        <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-amber-500/5 blur-3xl" />
                    </div>

                    <div className="relative max-w-5xl mx-auto px-6">
                        <div className="text-center mb-16">
                            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-[0.2em] uppercase text-orange-400 border border-orange-500/30 bg-orange-500/10 mb-6">
                                {t('timeline_title')}
                            </span>
                            <h2 className="text-4xl font-black text-white uppercase tracking-tight">
                                {t('timeline_title_sub')}
                            </h2>
                            <div className="w-20 h-1 bg-linear-to-r from-orange-500 to-amber-400 mx-auto rounded-full mt-4" />
                        </div>

                        {/* Interactive Timeline Stepper */}
                        <div className="relative flex flex-col md:flex-row justify-between items-center md:items-start gap-8 md:gap-4">
                            <div className="absolute top-[28px] left-[5%] right-[5%] h-0.5 bg-linear-to-r from-orange-500 via-amber-500 to-red-600 hidden md:block opacity-30" />

                            {timelineSteps.map((step, index) => (
                                <div key={step.key} className="flex-1 flex flex-col items-center text-center relative z-10 group w-full max-w-xs md:max-w-none">
                                    <div className="w-14 h-14 rounded-full bg-zinc-900 border-2 border-orange-500/40 flex items-center justify-center text-orange-400 text-lg font-bold group-hover:border-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300 shadow-lg shadow-orange-500/10 mb-4">
                                        {index + 1}
                                    </div>
                                    <div className="bg-zinc-900/80 border border-white/5 rounded-2xl p-5 w-full hover:bg-zinc-900 hover:border-white/10 transition-colors duration-300">
                                        <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-500 block mb-1">
                                            {step.distance}
                                        </span>
                                        <h3 className="font-bold text-white mb-2 text-base md:text-sm lg:text-base leading-tight">
                                            {t(`timeline_${step.key}`)}
                                        </h3>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-24 px-6 max-w-5xl mx-auto">
                    <div className="bg-zinc-900 rounded-[2.5rem] p-8 md:p-16 border border-white/5 shadow-2xl relative overflow-hidden">
                        <div className="absolute -top-24 -right-24 w-60 h-60 rounded-full bg-orange-500/5 blur-3xl" />

                        <div className="space-y-4 mb-12">
                            <span className="text-xs font-bold tracking-[0.2em] uppercase text-orange-400">
                                {t("tips_sub")}
                            </span>
                            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight">
                                {t("tips_title")}
                            </h2>
                            <div className="w-20 h-1 bg-linear-to-r from-orange-500 to-amber-400 rounded-full" />
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {[1, 2, 3].map((num) => (
                                <div key={num} className="bg-zinc-800/40 border border-white/5 p-6 rounded-2xl space-y-4 transition-all duration-300 hover:bg-zinc-800/60 hover:scale-[1.02]">
                                    <div className="w-12 h-12 rounded-xl bg-orange-500/15 flex items-center justify-center text-orange-400 font-bold text-xl">
                                        {num}
                                    </div>
                                    <h3 className="text-lg font-bold text-white">
                                        {t(`tip_${num}_title`)}
                                    </h3>
                                    <p className="text-zinc-400 text-sm leading-relaxed">
                                        {t(`tip_${num}_desc`)}
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
