'use client';

import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export function Header() {
    const t = useTranslations('header');
    const pathname = usePathname();
    const router = useRouter();

    const switchLocale = (locale: string) => {
        router.replace(pathname, { locale: locale });
    };

    return (
        <header className="bg-white dark:bg-zinc-900 shadow-md">
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-100 dark:border-zinc-800">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link href="/" className="text-xl font-bold tracking-tighter hover:opacity-80 transition-opacity">
                        SYUNIK<span className="text-orange-600">.</span>
                    </Link>
                    <div className="flex items-center gap-6">
                        <Link href="/" className="text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors">
                            {t('backToHome')}
                        </Link>

                        <div className="flex items-center gap-2 text-sm font-medium">
                            <button
                                onClick={() => switchLocale('hy')}
                                className="text-zinc-500 hover:text-orange-600 dark:text-zinc-400 dark:hover:text-orange-500 transition-colors"
                            >
                                HY
                            </button>
                            <span className="text-zinc-300">|</span>
                            <button
                                onClick={() => switchLocale('en')}
                                className="text-zinc-500 hover:text-orange-600 dark:text-zinc-400 dark:hover:text-orange-500 transition-colors"
                            >
                                EN
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}