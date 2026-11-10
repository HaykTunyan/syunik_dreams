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
  | "attraction"
  ;

type LandmarkProximity = "in-city" | "near-city";

type Landmark = {
  id: string;
  name: string;
  coords: [number, number];
  category: LandmarkCategory;
  description?: string;
  /** Geographic proximity to the parent city center.
   *  "in-city"   — physically within the city limits.
   *  "near-city" — in the surrounding area / municipality, discoverable from the city page. */
  proximity?: LandmarkProximity;
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
    {
      id: "nzhdeh-statue",
      name: "Garegin Nzhdeh Statue",
      coords: [39.19592, 46.39473],
      category: "attraction",
      proximity: "in-city",
      description: "Monument to Garegin Nzhdeh overlooking Kapan"
    },

    {
      id: "kapan-museum",
      name: "Kapan History Museum",
      coords: [39.20746, 46.40279],
      category: "museum",
      proximity: "in-city",
      description: "Museum showcasing the history, archaeology, and culture of the Kapan region"
    },

    {
      id: "kapan-zipline",
      name: "Zipline Kapan",
      coords: [39.2083, 46.4140],
      category: "attraction",
      proximity: "in-city",
      description: "Adventure zipline above the Voghji River gorge"
    },

    {
      id: "voghji-gorge",
      name: "Voghji River Gorge",
      coords: [39.2080, 46.4120],
      category: "nature",
      proximity: "in-city",
      description: "Scenic gorge shaped by the Voghji River near Kapan"
    },
    {
      id: "vahanavank",
      name: "Vahanavank Monastery",
      coords: [39.21778, 46.33194],
      category: "monastery",
      proximity: "near-city",
      description: "Historic 10th–11th century Armenian monastery near Kapan"
    },

    {
      id: "baghaberd",
      name: "Baghaberd Fortress",
      coords: [39.21485, 46.27761],
      category: "fortress",
      proximity: "near-city",
      description: "Ancient fortress overlooking the Voghji valley near Kapan"
    },

    {
      id: "halidzor",
      name: "Halidzor Fortress",
      coords: [39.2192, 46.3533],
      category: "fortress",
      proximity: "near-city",
      description: "Historic fortress overlooking the Voghji River near Kapan"
    },

    {
      id: "khustup",
      name: "Khustup Mountain",
      coords: [39.13556, 46.33139],
      category: "nature",
      proximity: "near-city",
      description: "3,206-meter mountain in the Zangezur range south of Kapan"
    },
  ],
  goris: [
    // ── Goris / Tatev area ────────────────────────────────────────────────
    {
      id: "tatev",
      name: "Tatev Monastery",
      coords: [39.3796, 46.2481],
      category: "monastery",
      description: "Historic 9th-century Armenian monastery and one of Armenia's most iconic landmarks"
    },

    {
      id: "wings-of-tatev",
      name: "Wings of Tatev Cable Car",
      coords: [39.3887, 46.2337],
      category: "attraction",
      description: "Aerial tramway connecting Halidzor with Tatev Monastery"
    },

    {
      id: "khndzoresk",
      name: "Old Khndzoresk Caves",
      coords: [39.4453, 46.2928],
      category: "nature",
      description: "Historic cave settlement spread across the dramatic Khndzoresk gorge"
    },

    {
      id: "khndzoresk-swing-bridge",
      name: "Khndzoresk Swing Bridge",
      coords: [39.4450, 46.2941],
      category: "bridge",
      description: "Suspension bridge crossing the Khndzoresk gorge near the old cave settlement"
    },

    {
      id: "goris-rock-forest",
      name: "Goris Rock Forest",
      coords: [39.5050, 46.3580],
      category: "nature",
      description: "Dramatic natural rock formations surrounding Goris"
    },

    {
      id: "goris-museum",
      name: "Goris Museum",
      coords: [39.5120, 46.3380],
      category: "museum",
      description: "Museum showcasing the history and culture of Goris and the surrounding region"
    },
  ],
  sisian: [
    // ── Sisian / Southern Syunik ──────────────────────────────────────────
    {
      id: "zorats-karer",
      name: "Zorats Karer (Karahunj)",
      coords: [39.5529, 46.0287],
      category: "attraction",
      description: "Ancient megalithic monument known for its prehistoric stone formations"
    },

    {
      id: "shaki-waterfall",
      name: "Shaki Waterfall",
      coords: [39.5528, 46.3578],
      category: "waterfall",
      description: "Spectacular 18-meter waterfall on the Shaki River near Sisian"
    },

    {
      id: "vorotnavank",
      name: "Vorotnavank Monastery",
      coords: [39.4978, 46.1374],
      category: "monastery",
      description: "Historic Armenian monastery complex overlooking the Vorotan gorge"
    },

    {
      id: "st-hovhannes",
      name: "St. Hovhannes Church",
      coords: [39.5206, 46.0337],
      category: "church",
      description: "Historic church in Sisian surrounded by the region's cultural heritage"
    },

    // {
    //   id: "ughtasar",
    //   name: "Ughtasar Petroglyphs",
    //   coords: [39.6530, 46.0030],
    //   category: "",
    //   description: "Ancient rock carvings scattered around Mount Ughtasar"
    // },
  ],
  agarak: [
    // ── Agarak / Southern Syunik ──────────────────────────────────────────
    {
      id: "agarak-mine",
      name: "Agarak Mine Viewpoint",
      coords: [38.8928, 46.2519],
      category: "viewpoint",
      description: "Viewpoint overlooking the Agarak open-pit copper and molybdenum mine"
    },

    {
      id: "cori-jrvezh",
      name: "Cori Jrvezh Waterfall",
      coords: [38.8830, 46.2560],
      category: "waterfall",
      description: "Scenic waterfall in the mountainous area near Agarak"
    },

    {
      id: "old-town",
      name: "Agarak Old Town",
      coords: [38.8798, 46.2520],
      category: "attraction",
      description: "Agarak's urban area with Soviet-era architecture and local atmosphere"
    },

    {
      id: "arax-river",
      name: "Arax Riverbank",
      coords: [38.8700, 46.2600],
      category: "viewpoint",
      description: "Scenic views of the Arax River and the landscape along the Armenia–Iran border"
    },
  ],
  meghri: [
    // ── Meghri / Southern Syunik ──────────────────────────────────────────
    {
      id: "meghri-fortress",
      name: "Meghri Fortress",
      coords: [38.9047, 46.2446],
      category: "fortress",
      description: "Historic fortress ruins overlooking Meghri and the surrounding valley"
    },

    {
      id: "meghri-viewpoint",
      name: "Meghri Viewpoint",
      coords: [38.9060, 46.2475],
      category: "viewpoint",
      description: "Scenic viewpoint overlooking Meghri and the surrounding Araks valley"
    },

    {
      id: "old-street",
      name: "Old Meghri Alleyways",
      coords: [38.9020, 46.2440],
      category: "attraction",
      description: "Historic streets featuring traditional Meghri architecture and local character"
    },

    {
      id: "surb-hovhannes",
      name: "Surb Hovhannes Church",
      coords: [38.9018, 46.2418],
      category: "church",
      description: "Historic Armenian church in the old quarter of Meghri"
    },

    {
      id: "meghri-pomegranate",
      name: "Pomegranate Orchards",
      coords: [38.8950, 46.2550],
      category: "nature",
      description: "Pomegranate orchards characteristic of Meghri's warm subtropical climate"
    },
  ],
  qajaran: [
    // ── Qajaran / Central Syunik ──────────────────────────────────────────
    {
      id: "qajaran-bear",
      name: "Bear Monument",
      coords: [39.1480, 46.2580],
      category: "attraction",
      description: "Distinctive landmark in Qajaran"
    },

    {
      id: "qajaran-park",
      name: "Qajaran Central Park",
      coords: [39.1440, 46.2550],
      category: "park",
      description: "Central green space with views of the surrounding Zangezur mountains"
    },

    {
      id: "lichk",
      name: "Lichk Village",
      coords: [39.1650, 46.2700],
      category: "nature",
      description: "Mountain village in the landscape surrounding Qajaran"
    },

    {
      id: "qajaran-mine",
      name: "Zangezur Copper-Molybdenum Mine",
      coords: [39.1350, 46.2500],
      category: "attraction",
      description: "Major copper and molybdenum mining complex near Qajaran"
    },
  ],
};

// ---------- OSM Relation IDs for city boundaries ----------

const CITY_OSM_RELATIONS: Record<string, number> = {
  kapan: 172021,
  goris: 170800,
  sisian: 173089,
  agarak: 1657432,
  meghri: 1737196,
  qajaran: 1737197,
};

// Approximate bounding boxes for each city [sw, ne]
const CITY_BOUNDS: Record<string, [[number, number], [number, number]]> = {
  kapan: [[39.16, 46.38], [39.25, 46.46]],
  goris: [[39.36, 46.22], [39.55, 46.39]],
  sisian: [[39.49, 45.97], [39.58, 46.09]],
  agarak: [[38.85, 46.21], [38.91, 46.30]],
  meghri: [[38.88, 46.21], [38.93, 46.27]],
  qajaran: [[39.12, 46.22], [39.17, 46.30]],
};

// ---------- Category styles ----------

const CATEGORY_STYLES: Record<
  LandmarkCategory,
  { color: string; emoji: string; label: string }
> = {
  monastery: { color: "#8b1e1e", emoji: "⛪", label: "Monastery" },
  waterfall: { color: "#1f6fb2", emoji: "💧", label: "Waterfall" },
  museum: { color: "#6a4baf", emoji: "🏛", label: "Museum" },
  nature: { color: "#3f7d3f", emoji: "🌲", label: "Nature" },
  bridge: { color: "#555555", emoji: "🌉", label: "Bridge" },
  hotel: { color: "#1f6fb2", emoji: "🏨", label: "Hotel" },
  fortress: { color: "#7a4f1f", emoji: "🏰", label: "Fortress" },
  park: { color: "#2d8c4e", emoji: "🌳", label: "Park" },
  viewpoint: { color: "#c97a1f", emoji: "🔭", label: "Viewpoint" },
  church: { color: "#9b2c2c", emoji: "✝", label: "Church" },
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
                <div style={{ display: "flex", alignItems: "center", gap: "5px", flexWrap: "wrap", marginBottom: "6px" }}>
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
                  }}>
                    {CATEGORY_STYLES[lm.category].label}
                  </div>
                  {lm.proximity && (
                    <div style={{
                      display: "inline-block",
                      fontSize: "10px",
                      fontWeight: 700,
                      letterSpacing: "0.04em",
                      textTransform: "uppercase",
                      background: lm.proximity === "in-city" ? "#16a34a" : "#9333ea",
                      color: "white",
                      padding: "2px 8px",
                      borderRadius: "99px",
                    }}>
                      {lm.proximity === "in-city" ? "📍 In Kapan" : "🗺️ Near Kapan"}
                    </div>
                  )}
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
