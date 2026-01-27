// Culture Section for History Page
import React from 'react';
import { useTranslations } from 'next-intl';


export const HistoryCultoreSection: React.FC = () => {

    /**
     * 
     * 
     * History Culture Section Component
     * 
     * @returns {JSX.Element}
     * 
     *  
     */

    const t = useTranslations('history_page.culture');

    return (
        <section className="py-24 px-6 md:px-20 bg-zinc-900 text-white relative">
            <div className="absolute inset-0 opacity-20 bg-[url('#/images/images/syunik_view.png')] bg-cover bg-fixed bg-center" />
            <div className="absolute inset-0 bg-black/80" />

            <div className="relative max-w-5xl mx-auto text-center space-y-12">
                <h2 className="text-4xl md:text-6xl font-bold">
                    {t('title_prefix')} <span className="text-orange-500">{t('title_suffix')}</span>
                </h2>

                <p className="text-xl text-zinc-300 leading-relaxed max-w-3xl mx-auto">
                    {t('description')}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                    <div className="p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                        <div className="text-orange-500 text-4xl mb-4">⛪</div>
                        <h3 className="text-xl font-bold mb-2">{t('tatev')}</h3>
                        <p className="text-zinc-400 text-sm">
                            {t('tatev_desc')}
                        </p>
                    </div>

                    <div className="p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                        <div className="text-orange-500 text-4xl mb-4">🏛</div>
                        <h3 className="text-xl font-bold mb-2">{t('vahanavank')}</h3>
                        <p className="text-zinc-400 text-sm">
                            {t('vahanavank_desc')}
                        </p>
                    </div>

                    <div className="p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                        <div className="text-orange-500 text-4xl mb-4">🌉</div>
                        <h3 className="text-xl font-bold mb-2">{t('zorats')}</h3>
                        <p className="text-zinc-400 text-sm">
                            {t('zorats_desc')}
                        </p>
                    </div>
                </div>
            </div>

        </section>
    )
}

