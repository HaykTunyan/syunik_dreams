// Info Section for Home Page

import React from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

import SyunikView from "#/images/images/syunik_view.png"

import { useTranslations } from "next-intl";

export const HomeInfoSection: React.FC = () => {

    /**
     * 
     * 
     * Section providing information about Syunik with an image and text
     *  
     **/

    const t = useTranslations('home_page.info');

    return (

        <section className="py-24 px-6 md:px-20 bg-zinc-50 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-200">
            <div className="max-w-6xl mx-auto space-y-16 animate-fade-in-up delay-500">
                <div className="text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        {t('title')}
                    </h2>
                    <div className="w-24 h-1 bg-orange-500 mx-auto rounded-full"></div>
                </div>

                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8 text-lg leading-loose text-zinc-600 dark:text-zinc-300">
                        <p>
                            {t('description_1')}
                        </p>
                        <p>
                            {t.rich('description_two', {
                                span: (chunks) => <span className="text-orange-600 font-semibold">{chunks}</span>
                            })}
                        </p>
                        <div className="pt-6">
                            <Link href="/history" className="inline-flex group bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-full transition-all duration-300 shadow-xl hover:shadow-orange-600/40 items-center gap-2">
                                <span>{t('learn_more')}</span>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 group-hover:translate-x-1 transition-transform">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                                </svg>
                            </Link>
                        </div>
                    </div>

                    <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl rotate-1 hover:rotate-0 transition-all duration-500 group">
                        <Image
                            src={SyunikView}
                            alt="Syunik Nature"
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-8">
                            <div>
                                <span className="text-orange-400 text-sm font-bold uppercase tracking-widest">{t('image_label')}</span>
                                <h3 className="text-white text-2xl font-bold mt-2">{t('image_caption')}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

