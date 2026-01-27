import React from 'react';
import { useTranslations } from 'next-intl';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function PrivacyPolicyPage() {

    /**
     * 
     * Privacy Policy Page 
     * 
     * 
     */


    const t = useTranslations('privacy_policy');

    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950 flex flex-col">
            <Header />
            <main className="flex-grow py-24 px-6 md:px-20">
                <div className="max-w-4xl mx-auto space-y-12">
                    <div className="text-center space-y-4">
                        <h1 className="text-4xl md:text-6xl font-bold text-zinc-900 dark:text-white">
                            {t('title')}
                        </h1>
                        <p className="text-zinc-500 dark:text-zinc-400">
                            {t('last_updated')}
                        </p>
                        <div className="w-24 h-1 bg-orange-600 mx-auto rounded-full" />
                    </div>

                    <div className="prose prose-lg dark:prose-invert max-w-none space-y-8 text-zinc-600 dark:text-zinc-300 leading-relaxed">
                        <p>{t('introduction')}</p>

                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
                                {t('collection_title')}
                            </h2>
                            <p>{t('collection_text')}</p>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
                                {t('usage_title')}
                            </h2>
                            <p>{t('usage_text')}</p>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
                                {t('security_title')}
                            </h2>
                            <p>{t('security_text')}</p>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
                                {t('cookies_title')}
                            </h2>
                            <p>{t('cookies_text')}</p>
                        </div>

                        <div className="pt-8 border-t border-zinc-100 dark:border-zinc-800">
                            <p className="font-semibold text-zinc-900 dark:text-white">
                                {t('contact_info')}
                            </p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
