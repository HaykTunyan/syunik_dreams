// src/app/trips/page.tsx
'use client';

import { useState } from 'react';
import SyunikMap from '@/components/SyunikMap';
import TripDetails from '@/components/TripDetails';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { useTranslations } from 'next-intl';

export default function TripsPage() {

  /**
   * 
   * Trips Page Component
   * 
   * @returns {JSX.Element}
   * 
   * 
   */


  const t = useTranslations('trips');
  const [selectedTrip, setSelectedTrip] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  return (

    <div className='min-h-screen bg-white dark:bg-zinc-950'>

      <Header />

      <main className=" pt-24 pb-20 px-6  max-w-7xl mx-auto">
        {/* Header */}
        <section className="py-12 px-6 md:px-20 bg-gradient-to-r from-orange-500 to-red-600 text-white">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('title')}</h1>
            <p className="text-lg opacity-90">{t('subtitle')}</p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12 px-6 md:px-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Map Section */}
              <div className="lg:col-span-2 space-y-8">
                {/* Interactive Map with Cities */}
                <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-lg overflow-hidden">
                  <div className="p-6">
                    <h2 className="text-2xl font-bold mb-4 text-zinc-900 dark:text-white">
                      {t('cities_title')}
                    </h2>
                    <SyunikMap />
                  </div>
                </div>

                {/* Historical Locations Info */}
                <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-lg p-6">
                  <h2 className="text-2xl font-bold mb-4 text-zinc-900 dark:text-white">
                    {t('historical_title')}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border-l-4 border-orange-500 pl-4 py-2">
                      <h3 className="font-semibold text-zinc-900 dark:text-white mb-2">
                        🏛️ {t('tatev_monastery')}
                      </h3>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        {t('tatev_monastery_desc')}
                      </p>
                    </div>

                    <div className="border-l-4 border-purple-600 pl-4 py-2">
                      <h3 className="font-semibold text-zinc-900 dark:text-white mb-2">
                        ⛪ {t('meghri_church')}
                      </h3>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        {t('meghri_church_desc')}
                      </p>
                    </div>

                    <div className="border-l-4 border-amber-600 pl-4 py-2">
                      <h3 className="font-semibold text-zinc-900 dark:text-white mb-2">
                        🏰 {t('zorats_karer')}
                      </h3>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        {t('zorats_karer_desc')}
                      </p>
                    </div>

                    <div className="border-l-4 border-red-600 pl-4 py-2">
                      <h3 className="font-semibold text-zinc-900 dark:text-white mb-2">
                        🏯 {t('meghri_fortress')}
                      </h3>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        {t('meghri_fortress_desc')}
                      </p>
                    </div>

                    <div className="border-l-4 border-green-600 pl-4 py-2">
                      <h3 className="font-semibold text-zinc-900 dark:text-white mb-2">
                        🏞️ {t('shikahogh')}
                      </h3>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        {t('shikahogh_desc')}
                      </p>
                    </div>

                    <div className="border-l-4 border-blue-600 pl-4 py-3">
                      <h3 className="font-semibold text-zinc-900 dark:text-white mb-1">
                        ⛲ {t('shake_waterfall')}
                      </h3>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        {t('shake_waterfall_desc')}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Nature & Adventure Section */}
                <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-lg p-6">
                  <h2 className="text-2xl font-bold mb-4 text-zinc-900 dark:text-white">
                    {t('nature_title')}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border-l-4 border-teal-500 pl-4 py-2">
                      <h3 className="font-semibold text-zinc-900 dark:text-white mb-2">
                        🚡 {t('wings_of_tatev')}
                      </h3>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        {t('wings_of_tatev_desc')}
                      </p>
                    </div>

                    <div className="border-l-4 border-lime-600 pl-4 py-2">
                      <h3 className="font-semibold text-zinc-900 dark:text-white mb-2">
                        🌉 {t('khndzoresk_bridge')}
                      </h3>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        {t('khndzoresk_bridge_desc')}
                      </p>
                    </div>

                    <div className="border-l-4 border-rose-600 pl-4 py-2">
                      <h3 className="font-semibold text-zinc-900 dark:text-white mb-2">
                        😈 {t('devils_bridge')}
                      </h3>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        {t('devils_bridge_desc')}
                      </p>
                    </div>

                    <div className="border-l-4 border-indigo-600 pl-4 py-2">
                      <h3 className="font-semibold text-zinc-900 dark:text-white mb-2">
                        ⛰️ {t('ughtasar')}
                      </h3>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        {t('ughtasar_desc')}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Sport Life Section */}
                <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-lg p-6">
                  <h2 className="text-2xl font-bold mb-4 text-zinc-900 dark:text-white">
                    {t('sport_title')}
                  </h2>


                  <div className="mt-6">
                    <h3 className="font-semibold text-lg text-zinc-900 dark:text-white mb-3">
                      🏟️ {t('stadiums_in_syunik')}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-zinc-50 dark:bg-zinc-800 p-3 rounded-md">
                        <h4 className="font-medium text-orange-700 dark:text-orange-400">{t('kapan')}</h4>
                        <p className="text-sm text-zinc-700 dark:text-zinc-300 font-semibold">{t('stadium_kapan_name')}</p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">{t('stadium_kapan_info')}</p>
                      </div>

                      <div className="bg-zinc-50 dark:bg-zinc-800 p-3 rounded-md">
                        <h4 className="font-medium text-purple-700 dark:text-purple-400">{t('goris')}</h4>
                        <p className="text-sm text-zinc-700 dark:text-zinc-300 font-semibold">{t('stadium_goris_name')}</p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">{t('stadium_goris_info')}</p>
                      </div>

                      <div className="bg-zinc-50 dark:bg-zinc-800 p-3 rounded-md">
                        <h4 className="font-medium text-blue-700 dark:text-blue-400">{t('sisian')}</h4>
                        <p className="text-sm text-zinc-700 dark:text-zinc-300 font-semibold">{t('stadium_sisian_name')}</p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">{t('stadium_sisian_info')}</p>
                      </div>

                      <div className="bg-zinc-50 dark:bg-zinc-800 p-3 rounded-md">
                        <h4 className="font-medium text-red-700 dark:text-red-400">{t('meghri')} / {t('stadium_agarak_name').split(' ')[0]}</h4>
                        {/* Note: Splitting here is a bit hacky, but 'stadium_agarak_name' is Agarak Sports Complex. */}
                        <p className="text-sm text-zinc-700 dark:text-zinc-300 font-semibold">{t('stadium_agarak_name')}</p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">{t('stadium_agarak_info')}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Useful Info Section */}
                <div className="bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900 rounded-lg shadow-lg p-6">
                  <h2 className="text-2xl font-bold mb-4 text-zinc-900 dark:text-white">
                    {t('useful_info_title')}
                  </h2>
                  <div className="space-y-4">
                    <div className="bg-white dark:bg-zinc-800 p-4 rounded-md shadow-sm">
                      <h3 className="font-semibold text-orange-600 dark:text-orange-400 mb-1">☀️ {t('weather')}</h3>
                      <p className="text-zinc-700 dark:text-zinc-300 text-sm">
                        {t('weather_desc')}
                      </p>
                    </div>
                    <div className="bg-white dark:bg-zinc-800 p-4 rounded-md shadow-sm">
                      <h3 className="font-semibold text-orange-600 dark:text-orange-400 mb-1">🚗 {t('transport')}</h3>
                      <p className="text-zinc-700 dark:text-zinc-300 text-sm">
                        {t('transport_desc')}
                      </p>
                    </div>
                    <div className="bg-white dark:bg-zinc-800 p-4 rounded-md shadow-sm">
                      <h3 className="font-semibold text-orange-600 dark:text-orange-400 mb-1">🍽️ {t('cuisine')}</h3>
                      <p className="text-zinc-700 dark:text-zinc-300 text-sm">
                        {t('cuisine_desc')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trip Details Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-20">
                  <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-lg p-6">
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">
                      {t('trip_info_title')}
                    </h3>
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-6">
                      {t('select_city_msg')}
                    </p>

                    {/* Quick Links */}
                    <div className="space-y-3">
                      <button
                        onClick={() => setSelectedCity('kapan')}
                        className="w-full text-left px-4 py-2 rounded-lg bg-orange-50 dark:bg-orange-900/20 hover:bg-orange-100 dark:hover:bg-orange-900/40 text-orange-700 dark:text-orange-400 transition-colors"
                      >
                        📍 {t('kapan')}
                      </button>
                      <button
                        onClick={() => setSelectedCity('goris')}
                        className="w-full text-left px-4 py-2 rounded-lg bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/40 text-purple-700 dark:text-purple-400 transition-colors"
                      >
                        📍 {t('goris')}
                      </button>
                      <button
                        onClick={() => setSelectedCity('meghri')}
                        className="w-full text-left px-4 py-2 rounded-lg bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 text-red-700 dark:text-red-400 transition-colors"
                      >
                        📍 {t('meghri')}
                      </button>
                      <button
                        onClick={() => setSelectedCity('sisian')}
                        className="w-full text-left px-4 py-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 text-blue-700 dark:text-blue-400 transition-colors"
                      >
                        📍 {t('sisian')}
                      </button>
                    </div>

                    {/* Trip Info */}
                    <div className="mt-6 pt-6 border-t border-zinc-200 dark:border-zinc-700">
                      <h4 className="font-semibold text-zinc-900 dark:text-white mb-3">
                        {t('tour_info')}
                      </h4>
                      <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                        <li>✓ {t('feature_historical')}</li>
                        <li>✓ {t('feature_guides')}</li>
                        <li>✓ {t('feature_transport')}</li>
                        <li>✓ {t('feature_food')}</li>
                        <li>✓ {t('feature_insurance')}</li>
                      </ul>
                    </div>

                    <button className="w-full mt-6 bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
                      {t('book_now')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}