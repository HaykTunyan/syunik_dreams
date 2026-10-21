"use client";

import { useEffect, useMemo, useState } from "react";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  Marker,
  Popup,
  useMap,
  Circle,
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
  | "bridge"
  | "hotel"
  | "fortress"
  | "park"
  | "viewpoint"
  | "church"
  | "attraction";

type Landmark = {
  id: string;
  name: string;
  coords: [number, number];
  category: LandmarkCategory;
  description?: string;
};

type Props = {
  cityId: string;
  cityName: string;
  coords: [number, number];
  zoom?: number;
};

// ---------- Per-city landmark data ----------

const CITY_LANDMARKS: Record<string, Landmark[]> = {
  kapan: [
    { id: "vahanavank", name: "Vahanavank Monastery", coords: [39.2214, 46.4067], category: "monastery", description: "10th–11th c. monastery above Kapan" },
    { id: "khustup", name: "Khustup Peak", coords: [39.185, 46.435], category: "nature", description: "Iconic 3206 m summit overlooking Kapan" },
    { id: "baghaberd", name: "Baghaberd Fortress", coords: [39.178, 46.432], category: "fortress", description: "Medieval fortress ruins south of Kapan" },
    { id: "kapan-museum", name: "Kapan History Museum", coords: [39.2075, 46.413], category: "museum", description: "Regional history and archaeology museum" },
    { id: "kapan-park", name: "City Park", coords: [39.208, 46.406], category: "park", description: "Green park along the Voghji river" },
  ],
  goris: [
    { id: "tatev", name: "Tatev Monastery", coords: [39.3778, 46.2506], category: "monastery", description: "9th c. monastery, one of Armenia's most iconic" },
    { id: "wings-of-tatev", name: "Wings of Tatev Cable Car", coords: [39.3903, 46.2331], category: "attraction", description: "World's longest reversible cable car" },
    { id: "khndzoresk", name: "Old Khndzoresk Caves", coords: [39.4497, 46.2892], category: "nature", description: "Ancient cave village in spectacular gorge" },
    { id: "devils-bridge", name: "Khndzoresk Swing Bridge", coords: [39.4453, 46.2939], category: "bridge", description: "Thrilling suspension bridge over the gorge" },
    { id: "rock-forest", name: "Goris Rock Forest", coords: [39.505, 46.358], category: "nature", description: "Surreal rock spires outside of town" },
    { id: "goris-museum", name: "Goris Museum", coords: [39.512, 46.338], category: "museum", description: "Local history and cultural exhibits" },
  ],
  sisian: [
    { id: "zorats-karer", name: "Zorats Karer (Karahunj)", coords: [39.5636, 46.0272], category: "attraction", description: "Ancient megalithic observatory, 7500 years old" },
    { id: "shaki-waterfall", name: "Shaki Waterfall", coords: [39.4986, 46.2872], category: "waterfall", description: "Stunning 18 m basalt waterfall" },
    { id: "vorotnavank", name: "Vorotnavank Monastery", coords: [39.5019, 46.1361], category: "monastery", description: "12th c. monastery on a cliff ledge" },
    { id: "st-hovhannes", name: "St. Hovhannes Church", coords: [39.524, 46.031], category: "church", description: "7th c. church in central Sisian" },
    { id: "ughtasar", name: "Ughtasar Petroglyphs", coords: [39.6167, 46.0167], category: "nature", description: "Thousands of ancient rock carvings" },
  ],
  agarak: [
    { id: "agarak-mine", name: "Agarak Mine Viewpoint", coords: [38.875, 46.245], category: "attraction", description: "One of Armenia's largest open-pit mines" },
    { id: "cori-jrvezh", name: "Cori Jrvezh Waterfall", coords: [38.883, 46.256], category: "waterfall", description: "Scenic waterfall near Agarak" },
    { id: "old-town", name: "Old Town Quarter", coords: [38.880, 46.252], category: "nature", description: "Soviet-era architecture and local life" },
    { id: "arax-river", name: "Arax Riverbank", coords: [38.870, 46.260], category: "viewpoint", description: "Panoramic view toward Iran across the Arax river" },
  ],
  meghri: [
    { id: "meghri-fortress", name: "Meghri Fortress", coords: [38.907, 46.252], category: "fortress", description: "18th c. fortress ruins above the town" },
    { id: "meghri-viewpoint", name: "Meghri Viewpoint", coords: [38.905, 46.248], category: "viewpoint", description: "Stunning panoramic view over the valley" },
    { id: "old-street", name: "Old Meghri Alleyways", coords: [38.901, 46.244], category: "attraction", description: "Traditional Armenian architecture and vineyards" },
    { id: "surb-hovhannes", name: "Surb Hovhannes Church", coords: [38.903, 46.242], category: "church", description: "17th c. church in the heart of old Meghri" },
    { id: "meghri-pomegranate", name: "Pomegranate Orchards", coords: [38.895, 46.255], category: "nature", description: "Famous pomegranate groves in subtropical climate" },
  ],
  qajaran: [
    { id: "qajaran-bear", name: "Bear Monument", coords: [39.148, 46.258], category: "attraction", description: "Iconic city landmark and symbol of Qajaran" },
    { id: "qajaran-park", name: "Qajaran Central Park", coords: [39.144, 46.255], category: "park", description: "City park with mountain views" },
    { id: "lichk", name: "Lichk Village", coords: [39.165, 46.270], category: "nature", description: "Traditional mountain village above Qajaran" },
    { id: "qajaran-mine", name: "Zangezur Copper-Molybdenum Mine", coords: [39.135, 46.250], category: "attraction", description: "One of the world's largest molybdenum mines" },
  ],
};

// ---------- OSM Relation IDs for city boundaries ----------

const CITY_OSM_RELATIONS: Record<string, number> = {
  kapan:   172021,
  goris:   170800,
  sisian:  173089,
  agarak:  1657432,
  meghri:  1737196,
  qajaran: 1737197,
};

// Approximate bounding boxes for each city [sw, ne]
const CITY_BOUNDS: Record<string, [[number, number], [number, number]]> = {
  kapan:   [[39.16, 46.38], [39.25, 46.46]],
  goris:   [[39.36, 46.22], [39.55, 46.39]],
  sisian:  [[39.49, 45.97], [39.58, 46.09]],
  agarak:  [[38.85, 46.21], [38.91, 46.30]],
  meghri:  [[38.88, 46.21], [38.93, 46.27]],
  qajaran: [[39.12, 46.22], [39.17, 46.30]],
};

// ---------- Category styles ----------

const CATEGORY_STYLES: Record<
  LandmarkCategory,
  { color: string; emoji: string; label: string }
> = {
  monastery:  { color: "#8b1e1e", emoji: "⛪", label: "Monastery" },
  waterfall:  { color: "#1f6fb2", emoji: "💧", label: "Waterfall" },
  museum:     { color: "#6a4baf", emoji: "🏛", label: "Museum" },
  nature:     { color: "#3f7d3f", emoji: "🌲", label: "Nature" },
  bridge:     { color: "#555555", emoji: "🌉", label: "Bridge" },
  hotel:      { color: "#1f6fb2", emoji: "🏨", label: "Hotel" },
  fortress:   { color: "#7a4f1f", emoji: "🏰", label: "Fortress" },
  park:       { color: "#2d8c4e", emoji: "🌳", label: "Park" },
  viewpoint:  { color: "#c97a1f", emoji: "🔭", label: "Viewpoint" },
  church:     { color: "#9b2c2c", emoji: "✝", label: "Church" },
  attraction: { color: "#c0392b", emoji: "⭐", label: "Attraction" },
};

// ---------- Helpers ----------

function pinIcon(category: LandmarkCategory, active: boolean = false) {
  const { color, emoji } = CATEGORY_STYLES[category];
  const size = active ? 38 : 32;
  const borderColor = active ? "#f97316" : "white";
  return L.divIcon({
    className: "city-focus-pin",
    html: `
      <div style="
        width: ${size}px; height: ${size}px; border-radius: 50% 50% 50% 0;
        background: ${color}; transform: rotate(-45deg);
        border: 2.5px solid ${borderColor}; box-shadow: 0 3px 10px rgba(0,0,0,.5);
        display:flex; align-items:center; justify-content:center;
      ">
        <span style="transform: rotate(45deg); font-size:${active ? 16 : 14}px; color:white; line-height:1;">${emoji}</span>
      </div>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -(size - 2)],
  });
}

async function fetchCityBoundary(relationId: number): Promise<FeatureCollection | null> {
  const query = `[out:json][timeout:25];relation(${relationId});out geom;`;
  try {
    const res = await fetch("https://overpass-api.de/api/interpreter", {
      method: "POST",
      body: query,
    });
    const data = await res.json();
    const relation = data.elements?.find((el: any) => el.type === "relation");
    if (!relation) return null;

    const outerWays = relation.members.filter(
      (m: any) => m.role === "outer" && m.geometry
    );
    const rings: [number, number][][] = outerWays.map((w: any) =>
      w.geometry.map((pt: any) => [pt.lon, pt.lat])
    );

    const feature: Feature<Geometry> = {
      type: "Feature",
      properties: { name: "City Boundary" },
      geometry: { type: "MultiPolygon", coordinates: rings.map((ring) => [ring]) },
    };

    return { type: "FeatureCollection", features: [feature] };
  } catch (err) {
    console.error("Failed to fetch city boundary from Overpass:", err);
    return null;
  }
}

// ---------- Sub-components ----------

function FitToBounds({ bounds }: { bounds: [[number, number], [number, number]] }) {
  const map = useMap();
  useEffect(() => {
    map.fitBounds(bounds, { padding: [30, 30] });
  }, [map, bounds]);
  return null;
}

// ---------- Main component ----------

export default function CityFocusMap({ cityId, cityName, coords, zoom = 13 }: Props) {
  const [boundary, setBoundary] = useState<FeatureCollection | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [boundaryLoading, setBoundaryLoading] = useState(true);

  const landmarks = CITY_LANDMARKS[cityId] ?? [];
  const bounds = CITY_BOUNDS[cityId];
  const relationId = CITY_OSM_RELATIONS[cityId];

  useEffect(() => {
    if (!relationId) {
      setBoundaryLoading(false);
      return;
    }
    let cancelled = false;
    setBoundaryLoading(true);
    fetchCityBoundary(relationId).then((fc) => {
      if (!cancelled) {
        setBoundary(fc);
        setBoundaryLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [relationId]);

  // Unique categories present in this city's landmarks
  const presentCategories = useMemo(() => {
    const cats = new Set(landmarks.map((l) => l.category));
    return Array.from(cats);
  }, [landmarks]);

  return (
    <div className="relative h-full w-full rounded-3xl overflow-hidden">
      {/* City name badge */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] flex items-center gap-2 bg-black/80 backdrop-blur-md text-white px-5 py-2 rounded-full text-sm font-bold tracking-widest uppercase border border-white/10 shadow-xl">
        <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
        {cityName}
      </div>

      {/* Boundary loading indicator */}
      {boundaryLoading && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-[1000] bg-black/60 text-white/70 text-xs px-3 py-1 rounded-full backdrop-blur-sm">
          Loading boundary…
        </div>
      )}

      <MapContainer
        center={coords}
        zoom={zoom}
        scrollWheelZoom={false}
        zoomControl={false}
        style={{ height: "100%", width: "100%" }}
      >
        {/* Free OpenStreetMap tile layer — no API key required */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
        />

        {/* Fit map to city bounds */}
        {bounds && <FitToBounds bounds={bounds} />}

        {/* Soft orange glow at city center */}
        <Circle
          center={coords}
          radius={800}
          pathOptions={{
            fillColor: "#f97316",
            fillOpacity: 0.06,
            color: "#f97316",
            weight: 0,
          }}
        />

        {/* City administrative boundary */}
        {boundary && (
          <GeoJSON
            data={boundary as any}
            style={{
              color: "#f97316",
              weight: 2,
              fillOpacity: 0.05,
              fillColor: "#f97316",
              dashArray: "6 4",
            }}
          />
        )}

        {/* Landmark markers */}
        {landmarks.map((lm) => (
          <Marker
            key={lm.id}
            position={lm.coords}
            icon={pinIcon(lm.category, activeId === lm.id)}
            eventHandlers={{
              click: () => setActiveId(lm.id),
              popupclose: () => setActiveId(null),
            }}
          >
            <Popup maxWidth={220} closeButton={true}>
              <div style={{ fontFamily: "inherit" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px" }}>
                  <span style={{ fontSize: "18px" }}>{CATEGORY_STYLES[lm.category].emoji}</span>
                  <span style={{ fontSize: "13px", fontWeight: 800, color: "#111", lineHeight: 1.2 }}>
                    {lm.name}
                  </span>
                </div>
                <div style={{
                  display: "inline-block",
                  fontSize: "10px",
                  fontWeight: 700,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  background: CATEGORY_STYLES[lm.category].color,
                  color: "white",
                  padding: "2px 8px",
                  borderRadius: "99px",
                  marginBottom: "6px",
                }}>
                  {CATEGORY_STYLES[lm.category].label}
                </div>
                {lm.description && (
                  <p style={{ fontSize: "12px", color: "#555", lineHeight: 1.5, margin: 0 }}>
                    {lm.description}
                  </p>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Legend — only categories present in this city */}
      <div className="absolute bottom-4 left-4 z-[1000] bg-black/80 backdrop-blur-md rounded-2xl shadow-xl px-3 py-3 text-xs space-y-1.5 border border-white/10 max-h-48 overflow-y-auto">
        {presentCategories.map((cat) => {
          const style = CATEGORY_STYLES[cat];
          return (
            <div key={cat} className="flex items-center gap-2">
              <span className="inline-block w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: style.color }} />
              <span className="text-white/80 font-medium">{style.label}</span>
            </div>
          );
        })}
      </div>

      {/* Landmark count badge */}
      <div className="absolute bottom-4 right-4 z-[1000] bg-orange-500/90 backdrop-blur-md text-white text-xs font-bold px-3 py-2 rounded-2xl shadow-lg border border-orange-400/30">
        {landmarks.length} attractions
      </div>
    </div>
  );
}
