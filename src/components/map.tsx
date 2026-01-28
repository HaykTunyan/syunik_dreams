// src/components/Map.tsx
'use client';

import { useMemo } from 'react';

interface City {
  id: string;
  name: string;
  armenianName: string;
  coordinates: { x: number; y: number };
  population: number;
  attractions: string[];
}

interface TripCenter {
  id: string;
  name: string;
  city: string;
  type: 'hiking' | 'cultural' | 'adventure' | 'monastery';
  coordinates: { x: number; y: number };
}

interface POI {
  id: string;
  name: string;
  armenianName: string;
  type: 'church' | 'monastery' | 'mountain' | 'nature' | 'historical';
  city: string;
  coordinates: { x: number; y: number };
}

const SYUNIK_CITIES: City[] = [
  {
    id: 'kapan',
    name: 'Kapan',
    armenianName: 'Կապան',
    coordinates: { x: 20, y: 75 },
    population: 45000,
    attractions: ['Mining Museum', 'Kapan Gorge', 'Local Markets'],
  },
  {
    id: 'goris',
    name: 'Goris',
    armenianName: 'Գորիս',
    coordinates: { x: 35, y: 55 },
    population: 32000,
    attractions: ['Tatev Monastery', 'Basalt Columns', 'Old Town'],
  },
  {
    id: 'meghri',
    name: 'Meghri',
    armenianName: 'Մեղրի',
    coordinates: { x: 15, y: 85 },
    population: 8000,
    attractions: ['Meghri Fortress', 'Border Views', 'Nature Reserve'],
  },
  {
    id: 'sisian',
    name: 'Sisian',
    armenianName: 'Սիսիան',
    coordinates: { x: 50, y: 70 },
    population: 16000,
    attractions: ['Sisian Museum', 'Zorats Stones', 'Caravanserai'],
  },
  {
    id: 'vayk',
    name: 'Vayk',
    armenianName: 'Վայք',
    coordinates: { x: 55, y: 50 },
    population: 5000,
    attractions: ['Mount Babadag', 'Scenic Views', 'Traditional Villages'],
  },
];

const TRIP_CENTERS: TripCenter[] = [
  {
    id: 'tatev-center',
    name: 'Tatev Adventure Center',
    city: 'Goris',
    type: 'adventure',
    coordinates: { x: 36, y: 50 },
  },
  {
    id: 'kapan-hiking',
    name: 'Kapan Hiking Base',
    city: 'Kapan',
    type: 'hiking',
    coordinates: { x: 22, y: 78 },
  },
  {
    id: 'goris-cultural',
    name: 'Goris Cultural Center',
    city: 'Goris',
    type: 'cultural',
    coordinates: { x: 34, y: 56 },
  },
  {
    id: 'meghri-border',
    name: 'Meghri Border Tours',
    city: 'Meghri',
    type: 'adventure',
    coordinates: { x: 16, y: 87 },
  },
  {
    id: 'sisian-exploration',
    name: 'Sisian Exploration Hub',
    city: 'Sisian',
    type: 'cultural',
    coordinates: { x: 51, y: 69 },
  },
];

const POINTS_OF_INTEREST: POI[] = [
  {
    id: 'tatev-monastery',
    name: 'Tatev Monastery',
    armenianName: 'Թաթևի վանք',
    type: 'monastery',
    city: 'Goris',
    coordinates: { x: 38, y: 48 },
  },
  {
    id: 'noravank',
    name: 'Noravank Monastery',
    armenianName: 'Նորավանք',
    type: 'monastery',
    city: 'Sisian',
    coordinates: { x: 52, y: 65 },
  },
  {
    id: 'meghri-church',
    name: 'Meghri Church',
    armenianName: 'Մեղրի Մայր Եկեղեցի',
    type: 'church',
    city: 'Meghri',
    coordinates: { x: 15, y: 86 },
  },
  {
    id: 'caravanserai',
    name: 'Selim Pass Caravanserai',
    armenianName: 'Սելիմ Կամարավան',
    type: 'historical',
    city: 'Sisian',
    coordinates: { x: 56, y: 58 },
  },
  {
    id: 'babadag',
    name: 'Mount Babadag',
    armenianName: 'Բաբա Դաղ',
    type: 'mountain',
    city: 'Vayk',
    coordinates: { x: 58, y: 48 },
  },
  {
    id: 'kapan-gorge',
    name: 'Kapan Gorge',
    armenianName: 'Կապանի Ხճճ',
    type: 'nature',
    city: 'Kapan',
    coordinates: { x: 18, y: 76 },
  },
  {
    id: 'zorats-stones',
    name: 'Zorats Stones',
    armenianName: 'Զորաց քարերը',
    type: 'historical',
    city: 'Sisian',
    coordinates: { x: 49, y: 72 },
  },
  {
    id: 'khustain-nars',
    name: 'Khustain Nars Nature Reserve',
    armenianName: 'Խուստային Նարս',
    type: 'nature',
    city: 'Goris',
    coordinates: { x: 32, y: 52 },
  },
];

const POI_COLORS = {
  monastery: '#7c3aed',
  church: '#dc2626',
  mountain: '#8b5cf6',
  nature: '#059669',
  historical: '#d97706',
};

const TRIP_CENTER_ICONS = {
  hiking: '🥾',
  cultural: '🏛️',
  adventure: '🧗',
  monastery: '⛪',
};

interface MapProps {
  selectedTrip: string | null;
  selectedCity: string | null;
  onTripSelect: (tripId: string | null) => void;
  onCitySelect: (cityId: string | null) => void;
}

export default function Map({
  selectedTrip,
  selectedCity,
  onTripSelect,
  onCitySelect,
}: MapProps) {
  const mapWidth = 600;
  const mapHeight = 600;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-zinc-900 dark:text-white">
        Սյունիքի քարտեզ
      </h2>

      {/* Interactive SVG Map */}
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-zinc-800 dark:to-zinc-900 rounded-lg p-4 border-2 border-blue-200 dark:border-zinc-700 overflow-x-auto">
        <svg
          width={mapWidth}
          height={mapHeight}
          viewBox={`0 0 100 100`}
          className="mx-auto"
        >
          {/* Background */}
          <rect width="100" height="100" fill="url(#mapGradient)" />

          {/* Decorative gradient */}
          <defs>
            <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#dbeafe', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#e0e7ff', stopOpacity: 1 }} />
            </linearGradient>
          </defs>

          {/* Mountain ranges (visual decoration) */}
          <path
            d="M 10 60 L 25 40 L 40 50 L 50 35 L 65 45 L 80 30 L 90 50"
            fill="none"
            stroke="#94a3b8"
            strokeWidth="0.5"
            opacity="0.3"
          />

          {/* POI Layer (draw first - underneath) */}
          {POINTS_OF_INTEREST.map((poi) => (
            <g key={poi.id}>
              <circle
                cx={poi.coordinates.x}
                cy={poi.coordinates.y}
                r="1.2"
                fill={POI_COLORS[poi.type]}
                opacity={selectedCity === poi.city ? 1 : 0.6}
                className="transition-opacity"
              />
              <title>{`${poi.name} (${poi.armenianName})`}</title>
            </g>
          ))}

          {/* Trip Centers Layer */}
          {TRIP_CENTERS.map((center) => (
            <g
              key={center.id}
              onClick={() => onTripSelect(center.id)}
              className="cursor-pointer"
            >
              <circle
                cx={center.coordinates.x}
                cy={center.coordinates.y}
                r="1.8"
                fill={selectedTrip === center.id ? '#f59e0b' : '#fbbf24'}
                opacity={selectedTrip === center.id ? 1 : 0.7}
                className="transition-all hover:opacity-100 hover:r-2.2"
              />
              <text
                x={center.coordinates.x}
                y={center.coordinates.y + 0.3}
                textAnchor="middle"
                fontSize="1"
                fill="white"
                fontWeight="bold"
                pointerEvents="none"
              >
                {TRIP_CENTER_ICONS[center.type]}
              </text>
              <title>{center.name}</title>
            </g>
          ))}

          {/* Cities Layer (draw on top) */}
          {SYUNIK_CITIES.map((city) => (
            <g
              key={city.id}
              onClick={() => onCitySelect(city.id)}
              className="cursor-pointer"
            >
              <circle
                cx={city.coordinates.x}
                cy={city.coordinates.y}
                r={selectedCity === city.id ? 2.5 : 2}
                fill={selectedCity === city.id ? '#ef4444' : '#f87171'}
                opacity={selectedCity === city.id ? 1 : 0.8}
                className="transition-all hover:opacity-100"
              />
              <text
                x={city.coordinates.x}
                y={city.coordinates.y + 0.4}
                textAnchor="middle"
                fontSize="0.7"
                fill="white"
                fontWeight="bold"
                pointerEvents="none"
              >
                {city.name.substring(0, 2)}
              </text>
              <title>{city.name}</title>
            </g>
          ))}
        </svg>
      </div>

      {/* Legend */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <span className="text-sm text-zinc-700 dark:text-zinc-300">Քաղաքներ</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-amber-400"></div>
          <span className="text-sm text-zinc-700 dark:text-zinc-300">Ճամ. Կենտր.</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-purple-600"></div>
          <span className="text-sm text-zinc-700 dark:text-zinc-300">Վանքեր</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-600"></div>
          <span className="text-sm text-zinc-700 dark:text-zinc-300">Բնություն</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-amber-600"></div>
          <span className="text-sm text-zinc-700 dark:text-zinc-300">Պատմական</span>
        </div>
      </div>
    </div>
  );
}
