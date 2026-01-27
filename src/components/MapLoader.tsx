"use client";

import dynamic from "next/dynamic";

const SyunikMap = dynamic(() => import("./SyunikMap"), {
    ssr: false,
    loading: () => (
        <div className="h-[500px] w-full bg-zinc-200 animate-pulse rounded-2xl flex items-center justify-center text-zinc-400">
            Քարտեզի բեռնում...
        </div>
    ),
});

export default function MapLoader() {
    return <SyunikMap />;
}
