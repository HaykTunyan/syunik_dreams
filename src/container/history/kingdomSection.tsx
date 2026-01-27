// Kingdom Section for History Page
'use client';

import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import syunik_kingdom from "#/images/images/syunik_kingdom.png";

export const HistoryKingdomSection: React.FC = () => {

    /**
     * 
     * 
     * Section showcasing the Syunik Kingdom with an image and description
     */

    const t = useTranslations('history_page');


    return (

        <section className="py-24 px-6 md:px-20 bg-white dark:bg-zinc-900 border-b border-zinc-100 dark:border-zinc-800">
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
                <div className="space-y-8 order-2 md:order-1">
                    <div className="w-16 h-1 bg-orange-600 mb-8 rounded-full" />
                    <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white">
                        {t('kingdom.title_prefix')} <span className="text-orange-600">{t('kingdom.title_suffix')}</span>
                    </h2>
                    <div className="space-y-6 text-lg text-zinc-600 dark:text-zinc-300 leading-loose">
                        <p>
                            <strong className="text-orange-600">{t('kingdom.p1')}</strong>
                        </p>

                        <p>
                            {t.rich('kingdom.p2', {
                                strong: (chunks) => <strong className="text-orange-600">{chunks}</strong>
                            })}
                        </p>

                        <p>
                            {t.rich('kingdom.p3', {
                                strong: (chunks) => <strong className="text-orange-600">{chunks}</strong>
                            })}
                        </p>
                    </div>

                </div>
                <div className="relative h-[600px] w-full rounded-2xl overflow-hidden shadow-2xl order-1 md:order-2 group">
                    <Image
                        src={syunik_kingdom}
                        alt="Syunik Kingdom Fortress"
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 border-4 border-white/10 rounded-2xl m-4 pointer-events-none" />
                </div>
            </div>
        </section>
    );
}
