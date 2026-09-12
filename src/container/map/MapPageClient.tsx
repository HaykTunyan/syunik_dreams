"use client";

import dynamic from "next/dynamic";
import { Header } from "@/components/header";

const InteractiveMap = dynamic(() => import("@/components/map/InteractiveMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full min-h-[520px] items-center justify-center bg-zinc-100 text-sm font-medium text-zinc-500">
      Loading Kapan map…
    </div>
  ),
});

export default function MapPageClient() {
  return (
    <div className="flex min-h-dvh flex-col bg-zinc-100">
      <Header />
      <div className="relative min-h-0 flex-1">
        <div className="h-[calc(100dvh-5rem)] w-full">
          <InteractiveMap />
        </div>
      </div>
    </div>
  );
}
