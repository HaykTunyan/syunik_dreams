"use client";

import { useEffect, useMemo, useState } from "react";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Feature, FeatureCollection, Geometry } from "geojson";

// ---------- Types ----------

type LandmarkCategory =
  | "monastery"
  | "waterfall"
  | "museum"
  | "nature"
  | "town"
  | "bridge"
  | "hotel";

type Landmark = {
  id: string;
  name: string;
  coords: [number, number];
  category: LandmarkCategory;
};

type Props = {
  coords?: [number, number];
  name?: string;
  landmarks?: Landmark[];
};

// ---------- Constants ----------

const SYUNIK_RELATION_ID = 364082;
const SYUNIK_CENTER: [number, number] = [39.25, 46.25];

// Category -> pin styling, mirroring the color-coded icons in the reference map
const CATEGORY_STYLES: Record<
  LandmarkCategory,
  { color: string; emoji: string; label: string }
> = {
  monastery: { color: "#8b1e1e", emoji: "⛪", label: "Monastery" },
  waterfall: { color: "#1f6fb2", emoji: "💧", label: "Waterfall" },
  museum: { color: "#6a4baf", emoji: "🏛", label: "Museum" },
  nature: { color: "#3f7d3f", emoji: "🌲", label: "Nature" },
  town: { color: "#c97a1f", emoji: "🏘", label: "Town" },
  bridge: { color: "#555555", emoji: "🌉", label: "Bridge" },
  hotel: { color: "#1f6fb2", emoji: "H", label: "Hotel" },
};

const DEFAULT_LANDMARKS: Landmark[] = [
  { id: "tatev", name: "Tatev Monastery", coords: [39.3778, 46.2506], category: "monastery" },
  { id: "wings", name: "Wings of Tatev", coords: [39.3903, 46.2331], category: "bridge" },
  { id: "shaki", name: "Shaki Waterfall", coords: [39.4986, 46.2872], category: "waterfall" },
  { id: "karahunj", name: "Zorats Karer (Karahunj)", coords: [39.5636, 46.0272], category: "nature" },
  { id: "vahanavank", name: "Vahanavank Monastery", coords: [39.2214, 46.4067], category: "monastery" },
  { id: "vorotnavank", name: "Vorotnavank Monastery", coords: [39.5019, 46.1361], category: "monastery" },
  { id: "bgheno-noravank", name: "Bgheno-Noravank", coords: [39.3242, 46.3197], category: "monastery" },
  { id: "tatevi-anapat", name: "Tatevi Anapat", coords: [39.3878, 46.2628], category: "monastery" },
  { id: "yeritsavank", name: "Yeritsavank", coords: [39.255, 46.467], category: "monastery" },
  { id: "kapan", name: "Kapan", coords: [39.2064, 46.4093], category: "town" },
  { id: "goris", name: "Goris", coords: [39.5106, 46.3378], category: "town" },
  { id: "sisian", name: "Sisian", coords: [39.5311, 46.0333], category: "town" },
  { id: "meghri", name: "Meghri", coords: [38.9086, 46.2367], category: "town" },
  { id: "qajaran", name: "Qajaran", coords: [39.1511, 46.1558], category: "town" },
  { id: "agarak", name: "Agarak", coords: [38.868, 46.191], category: "town" },
  { id: "devils-bridge", name: "Devil's Bridge (Khndzoresk)", coords: [39.4453, 46.2939], category: "bridge" },
  { id: "khndzoresk", name: "Old Khndzoresk", coords: [39.4497, 46.2892], category: "nature" },
  { id: "ughtasar", name: "Ughtasar Petroglyphs", coords: [39.6167, 46.0167], category: "nature" },
];

// Approximate framing box for Syunik Province — good enough to fit the map
// view. Swap in the exact Nominatim/Overpass bbox for the relation if you
// need pixel-perfect framing.
const SYUNIK_BOUNDS: [[number, number], [number, number]] = [
  [38.82, 45.75],
  [39.77, 46.62],
];

const WORLD_RING: [number, number][] = [
  [-90, -180],
  [-90, 180],
  [90, 180],
  [90, -180],
  [-90, -180],
];

// ---------- Helpers ----------

function pinIcon(category: LandmarkCategory) {
  const { color, emoji } = CATEGORY_STYLES[category];
  return L.divIcon({
    className: "syunik-pin",
    html: `
      <div style="
        width: 30px; height: 30px; border-radius: 50% 50% 50% 0;
        background: ${color}; transform: rotate(-45deg);
        border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,.4);
        display:flex; align-items:center; justify-content:center;
      ">
        <span style="transform: rotate(45deg); font-size:14px; color:white;">${emoji}</span>
      </div>
    `,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -28],
  });
}

// Pulls the admin boundary for the relation from Overpass and stitches its
// outer ways into a GeoJSON MultiPolygon.
async function fetchRelationBoundary(relationId: number): Promise<FeatureCollection | null> {
  const query = `[out:json][timeout:25];relation(${relationId});out geom;`;
  try {
    const res = await fetch("https://overpass-api.de/api/interpreter", {
      method: "POST",
      body: query,
    });
    const data = await res.json();
    const relation = data.elements?.find((el: any) => el.type === "relation");
    if (!relation) return null;

    const outerWays = relation.members.filter((m: any) => m.role === "outer" && m.geometry);
    const rings: [number, number][][] = outerWays.map((w: any) =>
      w.geometry.map((pt: any) => [pt.lon, pt.lat])
    );

    const feature: Feature<Geometry> = {
      type: "Feature",
      properties: { name: "Syunik Province" },
      geometry: { type: "MultiPolygon", coordinates: rings.map((ring) => [ring]) },
    };

    return { type: "FeatureCollection", features: [feature] };
  } catch (err) {
    console.error("Failed to fetch Syunik boundary from Overpass:", err);
    return null;
  }
}

// ---------- Sub components ----------

function FitToBounds({ bounds }: { bounds: [[number, number], [number, number]] }) {
  const map = useMap();
  useEffect(() => {
    map.fitBounds(bounds, { padding: [20, 20] });
  }, [map, bounds]);
  return null;
}

// ---------- Main component ----------

export default function CityMap({
  coords = SYUNIK_CENTER,
  name = "Syunik Province",
  landmarks = DEFAULT_LANDMARKS,
}: Props) {
  const [boundary, setBoundary] = useState<FeatureCollection | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchRelationBoundary(SYUNIK_RELATION_ID).then((fc) => {
      if (!cancelled) setBoundary(fc);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // World rectangle with the province punched out as a hole — dims
  // everything outside Syunik, giving the "spotlighted region" look.
  const maskFeature: Feature<Geometry> | null = useMemo(() => {
    if (!boundary) return null;
    const holes = boundary.features.flatMap((f) => {
      const g = f.geometry;
      if (g.type === "Polygon") return g.coordinates;
      if (g.type === "MultiPolygon") return g.coordinates.flat();
      return [];
    });
    return {
      type: "Feature",
      properties: {},
      geometry: {
        type: "Polygon",
        coordinates: [
          WORLD_RING.map(([lat, lon]) => [lon, lat]),
          ...holes.map((ring) => ring.map(([lon, lat]) => [lon, lat])),
        ],
      },
    };
  }, [boundary]);

  return (
    <div className="relative h-full w-full rounded-3xl overflow-hidden border border-black/10 shadow-lg">
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] bg-black/70 text-white px-5 py-1.5 rounded-lg text-lg font-bold tracking-wide">
        {name}
      </div>

      <MapContainer
        center={coords}
        zoom={9}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <FitToBounds bounds={SYUNIK_BOUNDS} />

        {maskFeature && (
          <GeoJSON
            data={maskFeature as any}
            style={{ fillColor: "#0b0b0b", fillOpacity: 0.45, stroke: false }}
            interactive={false}
          />
        )}

        {boundary && (
          <GeoJSON
            data={boundary as any}
            style={{ color: "#c0392b", weight: 3, fillOpacity: 0, dashArray: "6 4" }}
          />
        )}

        {landmarks.map((lm) => (
          <Marker key={lm.id} position={lm.coords} icon={pinIcon(lm.category)}>
            <Popup>
              <div className="font-semibold">{lm.name}</div>
              <div className="text-xs text-gray-500">{CATEGORY_STYLES[lm.category].label}</div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <div className="absolute bottom-4 left-4 z-[1000] bg-white/90 rounded-xl shadow-md px-3 py-2 text-xs space-y-1">
        {Object.entries(CATEGORY_STYLES).map(([key, style]) => (
          <div key={key} className="flex items-center gap-2">
            <span className="inline-block w-3 h-3 rounded-full" style={{ background: style.color }} />
            <span style={{ color: "black" }} >{style.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}