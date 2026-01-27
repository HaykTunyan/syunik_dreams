'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function ContactPage() {

    /**
     * 
     * Contact Page
     * 
     * Features:
     * 
     * 1. Contact Form
     * 2. Success Message
     * 
     * 
     */


    const t = useTranslations('contact');
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');

        try {
            const response = await fetch('/api/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error('Submission error:', error);
            setStatus('error');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950 flex flex-col font-sans">
            <Header />

            <main className="flex-grow pt-32 pb-24 px-6 md:px-20">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-20">
                        {/* Contact Form */}
                        <div className="space-y-12">
                            <div className="space-y-4">
                                <h1 className="text-5xl md:text-7xl font-bold text-zinc-900 dark:text-white tracking-tight">
                                    {t('title')}
                                </h1>
                                <p className="text-xl text-zinc-500 dark:text-zinc-400 max-w-lg leading-relaxed">
                                    {t('subtitle')}
                                </p>
                                <div className="w-20 h-1.5 bg-orange-600 rounded-full" />
                            </div>

                            {status === 'success' ? (
                                <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 p-8 rounded-3xl animate-fade-in">
                                    <div className="flex items-center gap-4 text-orange-600 dark:text-orange-400 font-semibold text-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                        </svg>
                                        {t('form.success')}
                                    </div>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in-up">
                                    {status === 'error' && (
                                        <div className="text-red-500 font-medium bg-red-50 dark:bg-red-900/10 p-4 rounded-xl border border-red-100 dark:border-red-900/20">
                                            Something went wrong. Please try again.
                                        </div>
                                    )}
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-widest ml-1">
                                                {t('form.name')}
                                            </label>
                                            <input
                                                required
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                placeholder={t('form.placeholder_name')}
                                                className="w-full bg-zinc-50 dark:bg-zinc-900 border-2 border-zinc-100 dark:border-zinc-800 rounded-2xl px-6 py-4 outline-none focus:border-orange-500 transition-all duration-300 dark:text-white"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-widest ml-1">
                                                {t('form.email')}
                                            </label>
                                            <input
                                                required
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder={t('form.placeholder_email')}
                                                className="w-full bg-zinc-50 dark:bg-zinc-900 border-2 border-zinc-100 dark:border-zinc-800 rounded-2xl px-6 py-4 outline-none focus:border-orange-500 transition-all duration-300 dark:text-white"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-widest ml-1">
                                            {t('form.message')}
                                        </label>
                                        <textarea
                                            required
                                            rows={5}
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            placeholder={t('form.placeholder_message')}
                                            className="w-full bg-zinc-50 dark:bg-zinc-900 border-2 border-zinc-100 dark:border-zinc-800 rounded-2xl px-6 py-4 outline-none focus:border-orange-500 transition-all duration-300 dark:text-white resize-none"
                                        />
                                    </div>
                                    <button
                                        disabled={status === 'sending'}
                                        type="submit"
                                        className="group relative w-full md:w-auto bg-orange-600 hover:bg-orange-700 text-white font-bold py-5 px-12 rounded-2xl transition-all duration-300 shadow-xl hover:shadow-orange-600/40 disabled:opacity-70 flex items-center justify-center gap-3 overflow-hidden"
                                    >
                                        <span className="relative z-10">
                                            {status === 'sending' ? 'Sending...' : t('form.submit')}
                                        </span>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 group-hover:translate-x-1 transition-transform animate-pulse">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                                        </svg>
                                    </button>
                                </form>
                            )}
                        </div>

                        {/* Information Panel */}
                        <div className="lg:pl-20">
                            <div className="bg-zinc-50 dark:bg-zinc-900 rounded-[40px] p-10 md:p-16 space-y-12">
                                <h2 className="text-3xl font-bold text-zinc-900 dark:text-white">
                                    {t('info.title')}
                                </h2>

                                <div className="space-y-8">
                                    <div className="flex gap-6 group">
                                        <div className="w-14 h-14 bg-white dark:bg-zinc-800 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-500">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-orange-600">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-1">{t('info.address_label')}</p>
                                            <p className="text-lg text-zinc-900 dark:text-white font-medium">{t('info.address_value')}</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-6 group">
                                        <div className="w-14 h-14 bg-white dark:bg-zinc-800 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-500">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-orange-600">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-1">{t('info.email_label')}</p>
                                            <p className="text-lg text-zinc-900 dark:text-white font-medium">{t('info.email_value')}</p>
                                        </div>
                                    </div>

                                    <div className="flex gap-6 group">
                                        <div className="w-14 h-14 bg-white dark:bg-zinc-800 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-500">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-orange-600">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-1">{t('info.phone_label')}</p>
                                            <p className="text-lg text-zinc-900 dark:text-white font-medium">{t('info.phone_value')}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-8 border-t border-zinc-200 dark:border-zinc-800">
                                    <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-6">{t('info.social_title')}</p>
                                    <div className="flex gap-4">
                                        {[1, 2, 3, 4].map((i) => (
                                            <div key={i} className="w-12 h-12 bg-white dark:bg-zinc-800 rounded-xl flex items-center justify-center cursor-pointer hover:bg-orange-600 hover:text-white transition-all duration-300">
                                                <span className="font-bold">#</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
