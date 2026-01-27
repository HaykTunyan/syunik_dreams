"use client";

import dynamic from "next/dynamic";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const CityMap = dynamic(() => import("@/components/CityMap"), {
  ssr: false,
});


import { cities } from "@/data/cities";
import { useTranslations } from 'next-intl';

export default function CitiesPage() {
  const t = useTranslations('city_page');
  const tData = useTranslations('cities_data');

  /**
   * 
   *  Cities Page Component
   * 
   * @returns {JSX.Element} 
   *  
   */

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-black font-sans">
      <Header />

      {/* Hero */}
      <section className="relative h-[80vh] w-full flex items-center justify-center overflow-hidden">

        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/20" />

        <div className="relative z-10 text-center px-4">

          <h1 className="text-6xl md:text-7xl font-black text-white uppercase">
            {t('title_prefix')} <span className="text-orange-500">{t('title_suffix')}</span>
          </h1>
          <p className="mt-6 text-xl text-zinc-200">
            {t('subtitle')}
          </p>
        </div>
      </section>

      {/* Cities */}
      <section className="py-20 px-6 md:px-20 -mt-20 relative z-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          {cities.map((city) => (
            <div
              key={city.id}
              className="bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden shadow-xl border border-zinc-100 dark:border-zinc-800"
            >
              {/* Map */}
              <div className="relative h-72 w-full">


                {/* Map */}
                <div className="z-10 h-full w-full relative">
                  <CityMap coords={city.coords} name={tData(`${city.id}.name`)} />
                </div>
                {/* <CityMap coords={city.coords} name={city.name} /> */}

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-20 pointer-events-none" />

                {/* Bottom label */}
                <div className="absolute bottom-6 left-8 text-white z-30 pointer-events-none">
                  <span className="text-orange-500 uppercase text-sm font-bold">{t('city_label')}</span>
                  <h2 className="text-3xl font-black uppercase">{tData(`${city.id}.name`)}</h2>
                </div>
              </div>



              {/* Info */}
              <div className="p-8 space-y-6">
                <p className="text-zinc-600 dark:text-zinc-400 text-lg">
                  {tData(`${city.id}.description`)}
                </p>

                <div className="grid grid-cols-2 gap-4">
                  <InfoCard label={t('area')} value={tData(`${city.id}.size`)} />
                  <InfoCard label={t('founding')} value={tData(`${city.id}.founding`)} />
                </div>

                <div className="flex justify-between items-center border-t pt-4">
                  <div>
                    <span className="text-xs uppercase text-zinc-400">
                      {t('population')}
                    </span>
                    <p className="font-semibold">{tData(`${city.id}.population`)}</p>
                  </div>

                  <button className="text-orange-600 font-bold hover:text-orange-500">
                    {t('more')}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-zinc-50 dark:bg-zinc-800/50 p-4 rounded-2xl border">
      <span className="text-xs uppercase text-zinc-400 font-bold">
        {label}
      </span>
      <p className="text-xl font-bold mt-1">{value}</p>
    </div>
  );
}
