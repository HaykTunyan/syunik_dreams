// Nzhdeh Section for History Page

import Image from "next/image";
import nzhdeh_syunik from "#/images/garegin_nzhdeh_syunik.png";
import { useTranslations } from "next-intl";


export const HistoryNzhdehSection: React.FC = () => {

    /**
     * 
     * History Nzhdeh Section Component
     * 
     * @returns {JSX.Element}
     * 
     */

    const t = useTranslations('history_page.nzhdeh');

    return (
        <section className="relative py-24 bg-zinc-100 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center px-6">

                {/* Image */}
                <div className="relative group perspective-1000">
                    <div className="relative transform transition-transform duration-700 group-hover:rotate-y-12">
                        <Image
                            src={nzhdeh_syunik}
                            alt="Garegin Nzhdeh and the Defense of Mountainous Armenia"
                            className="rounded-2xl shadow-2xl object-cover w-full h-[500px] border-4 border-white dark:border-zinc-800"
                        />
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                        <div className="absolute bottom-6 left-6 text-white text-sm font-light tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {t('image_caption')}
                        </div>
                    </div>
                    {/* Decorative element behind */}
                    <div className="absolute -inset-4 bg-gradient-to-tr from-orange-500/20 to-blue-500/20 rounded-2xl -z-10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </div>

                {/* Content */}
                <div className="space-y-8">
                    <div className="inline-block px-4 py-2 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full text-sm font-semibold tracking-wide">
                        {t('label')}
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white leading-tight">
                        {t('title_prefix')} <span className="text-orange-600">{t('title_suffix')}</span>
                    </h2>

                    <h3 className="text-2xl font-serif italic text-zinc-700 dark:text-zinc-300">
                        {t('subtitle')}
                    </h3>

                    <div className="space-y-6 text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed text-justify">
                        <p>
                            {t.rich('p1', {
                                strong: (chunks) => <strong className="text-orange-600 font-bold">{chunks}</strong>
                            })}
                        </p>
                        <p>
                            {t('p2')}
                        </p>
                        <p>
                            {t('p3')}
                        </p>
                    </div>

                    <blockquote className="border-l-4 border-orange-500 pl-6 italic text-zinc-500 text-xl font-medium">
                        {t('quote')}
                    </blockquote>
                </div>

            </div>
        </section>

    )

}
