// War Section for History Page

import Image from "next/image";
import syunik_war from "#/images/images/syunik_war.png";
import React from "react";
import { useTranslations } from "next-intl";


export const HistoryWarSection: React.FC = () => {

    /**
     * 
     * War Section Component
     * 
     * @returns {JSX.Element}
     *  
     */

    const t = useTranslations('history_page.war');

    return (

        <section className="py-24 px-6 md:px-20 bg-zinc-50 dark:bg-black overflow-hidden relative">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-orange-500/5 rotate-12 blur-3xl" />
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
                <div className="relative h-[500px] w-full rounded-tr-[100px] rounded-bl-[100px] overflow-hidden shadow-2xl group">
                    <Image
                        src={syunik_war}
                        alt="Battle for Syunik"
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105 grayscale hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-orange-900/40 to-transparent mix-blend-overlay" />
                </div>

                <div className="space-y-8">
                    <div className="flex items-center gap-4 text-orange-600 font-bold tracking-widest uppercase mb-2">
                        <span className="w-12 h-[2px] bg-orange-600"></span>
                        {t('label')}
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white">
                        {t('title_prefix')} <span className="text-zinc-500">{t('title_suffix')}</span>
                    </h2>
                    <div className="space-y-6 text-lg text-zinc-600 dark:text-zinc-300 leading-loose">
                        <p>
                            {t.rich('p1', {
                                strong: (chunks) => <strong className="text-orange-600">{chunks}</strong>
                            })}
                        </p>
                        <p>
                            {t('p2')}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}