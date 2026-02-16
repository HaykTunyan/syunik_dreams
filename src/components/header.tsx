'use client';

import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { useTranslations, useLocale } from "next-intl";
import { useState, useRef, useEffect } from "react";

export function Header() {
    const t = useTranslations('header');
    const pathname = usePathname();
    const router = useRouter();
    const currentLocale = useLocale();
    const [isLangOpen, setIsLangOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const languages = [
        { code: 'hy', name: 'Հայերեն', flag: '🇦🇲' },
        { code: 'en', name: 'English', flag: '🇺🇸' }
    ];

    const currentLang = languages.find(l => l.code === currentLocale) || languages[0];

    const switchLocale = (locale: string) => {
        router.replace(pathname, { locale: locale });
        setIsLangOpen(false);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsLangOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <header className="relative">
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 dark:bg-zinc-950/70 backdrop-blur-xl border-b border-zinc-100 dark:border-zinc-800">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="group flex items-center gap-2">
                        <div className="w-10 h-10 bg-black dark:bg-white rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-500">
                            <span className="text-white dark:text-black font-black text-xl">S</span>
                        </div>
                        <span className="text-2xl font-black tracking-tighter text-zinc-900 dark:text-white">
                            SYUNIK<span className="text-orange-600">.</span>
                        </span>
                    </Link>

                    <div className="flex items-center gap-8">
                        {/* Navigation Links (Hidden on small mobile if needed, but keeping it simple for now) */}
                        <div className="hidden md:flex items-center gap-8">
                            <Link href="/history" className="text-sm font-bold text-zinc-500 hover:text-orange-600 transition-colors uppercase tracking-widest">{t('history')}</Link>
                            <Link href="/trips" className="text-sm font-bold text-zinc-500 hover:text-orange-600 transition-colors uppercase tracking-widest">{t('tourism')}</Link>
                        </div>

                        {/* Language Selector Dropdown */}
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setIsLangOpen(!isLangOpen)}
                                className="flex items-center gap-3 px-4 py-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all duration-300 group"
                            >
                                {/* <span className="text-lg leading-none">{currentLang.flag}</span> */}
                                <span className="text-xs font-bold uppercase tracking-widest text-zinc-700 dark:text-zinc-300">
                                    {currentLang.code}
                                </span>
                                <svg
                                    className={`w-4 h-4 text-zinc-400 group-hover:text-orange-500 transition-transform duration-300 ${isLangOpen ? 'rotate-180' : ''}`}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {/* Dropdown Menu */}
                            {isLangOpen && (
                                <div className="absolute right-0 mt-3 w-48 py-2 bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-100 dark:border-zinc-800 backdrop-blur-3xl animate-in fade-in zoom-in duration-200 origin-top-right">
                                    {/* <div className="px-4 py-2 border-b border-zinc-50 dark:border-zinc-800 mb-1">
                                        <p className="text-[10px] font-black tracking-widest text-zinc-400 uppercase">Select Language</p>
                                    </div> */}
                                    {languages.map((lang) => (
                                        <button
                                            key={lang.code}
                                            onClick={() => switchLocale(lang.code)}
                                            className={`w-full flex items-center justify-between px-4 py-3 text-sm font-bold transition-all duration-300 ${currentLocale === lang.code
                                                ? 'text-orange-600 bg-orange-50/50 dark:bg-orange-500/10'
                                                : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800'
                                                }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                {/* <span className="text-lg">{lang.flag}</span> */}
                                                <span>{lang.name}</span>
                                            </div>
                                            {currentLocale === lang.code && (
                                                <div className="w-1.5 h-1.5 rounded-full bg-orange-600 shadow-sm shadow-orange-500/50" />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
            {/* Spacer to prevent content from going under the fixed header */}
            <div className="h-20" />
        </header>
    );
}

