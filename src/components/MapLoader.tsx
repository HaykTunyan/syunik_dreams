"use client";

import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";

const SyunikMap = dynamic(() => import("./SyunikMap"), {
    ssr: false,
    loading: () => {
        return <LoaderMessage />;
    }
});

function LoaderMessage() {
    const t = useTranslations('home_page.map');
    return (
        <div className="h-[500px] w-full bg-zinc-200 animate-pulse rounded-2xl flex items-center justify-center text-zinc-400">
            {t('loading')}
        </div>
    );
}

export default function MapLoader() {
    return <SyunikMap />;
}
