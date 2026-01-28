// src/components/TripDetails.tsx
'use client';

import { useTranslations } from "next-intl";

interface TripDetailsProps {
  tripId: string | null;
  cityId: string | null;
}

export default function TripDetails({ tripId, cityId }: TripDetailsProps) {
  const t = useTranslations('trip_details');
  const tTrips = useTranslations('trips_data');
  const tCities = useTranslations('cities_data');
  const tCityDetails = useTranslations('cities_data_details');

  if (tripId) {
    // Generate valid keys for activities mapping
    const activityIndices = [0, 1, 2, 3];

    return (
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-lg p-6 space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">
              {/* Note: In a real app, type would be from data, for now inferring icon or using generic */}
              🧗
            </span>
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">
              {tTrips(`${tripId}.name`)}
            </h3>
          </div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">{tTrips(`${tripId}.city`)}</p>
          <p className="text-zinc-700 dark:text-zinc-300 mb-4">{tTrips(`${tripId}.description`)}</p>
        </div>

        <div className="space-y-3 border-t border-zinc-200 dark:border-zinc-700 pt-4">
          <div>
            <p className="font-semibold text-zinc-900 dark:text-white mb-2">{t('features')}</p>
            <ul className="space-y-1">
              {activityIndices.map((i) => (
                <li
                  key={i}
                  className="text-sm text-zinc-600 dark:text-zinc-400 flex items-center gap-2"
                >
                  <span className="text-orange-500">•</span> {tTrips(`${tripId}.activities.${i}`)}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <div>
              <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase">
                {t('duration')}
              </p>
              <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                {tTrips(`${tripId}.duration`)}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase">
                {t('difficulty')}
              </p>
              <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                {tTrips(`${tripId}.difficulty`)}
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-200 dark:border-zinc-700">
            <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase mb-2">
              {t('price')}
            </p>
            <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              {tTrips(`${tripId}.price`)}
            </p>
          </div>

          <button className="w-full mt-6 bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
            {t('book_now')}
          </button>
        </div>
      </div>
    );
  }

  if (cityId) {
    const attractionIndices = [0, 1, 2];

    return (
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-lg p-6 space-y-6">
        <div>
          <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">
            {tCities(`${cityId}.name`)}
          </h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-2">
            {t('population')}: {tCities(`${cityId}.population`)}
          </p>
          <p className="text-zinc-700 dark:text-zinc-300 text-sm">{tCities(`${cityId}.description`)}</p>
        </div>

        <div className="border-t border-zinc-200 dark:border-zinc-700 pt-4">
          <p className="font-semibold text-zinc-900 dark:text-white mb-3">{t('attractions')}</p>
          <ul className="space-y-2">
            {attractionIndices.map((i) => (
              <li
                key={i}
                className="text-sm text-zinc-600 dark:text-zinc-400 flex items-start gap-2"
              >
                <span className="text-orange-500 mt-1">▸</span>
                <span>{tCityDetails(`${cityId}.attractions.${i}`)}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-1 gap-3 pt-4 border-t border-zinc-200 dark:border-zinc-700">
          <div>
            <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase">
              {t('climate')}
            </p>
            <p className="text-sm font-semibold text-zinc-900 dark:text-white">
              {tCityDetails(`${cityId}.climate`)}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase">
              {t('best_visit')}
            </p>
            <p className="text-sm font-semibold text-zinc-900 dark:text-white">
              {tCityDetails(`${cityId}.bestVisit`)}
            </p>
          </div>
        </div>

        <button className="w-full mt-6 bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
          {t('book_tour')}
        </button>
      </div>
    );
  }

  return null;
}
