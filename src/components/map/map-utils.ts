import type {
  MapFilterCategory,
  MapLocation,
  MapLocationCategory,
  TourismFeatureCollection,
} from "./map-types";

export const KAPAN_CENTER = {
  latitude: 39.20111,
  longitude: 46.41500,
} as const;

export const KAPAN_INITIAL_ZOOM = 13.35;
export const KAPAN_SELECTED_ZOOM = 15.4;

export const TOURISM_SOURCE_ID = "kapan-tourism";
export const CLUSTER_LAYER_ID = "kapan-tourism-clusters";
export const CLUSTER_COUNT_LAYER_ID = "kapan-tourism-cluster-count";
export const UNCLUSTERED_LAYER_ID = "kapan-tourism-points";

export const MAPBOX_STYLE_URL = "mapbox://styles/mapbox/outdoors-v12";

export const MAP_LOCATION_CATEGORIES: MapLocationCategory[] = [
  "museum",
  "historical-site",
  "monument",
  "church",
  "monastery",
  "hotel",
  "restaurant",
  "cafe",
  "attraction",
  "park",
  "viewpoint",
  "shopping",
  "hospital",
  "transport",
  "other",
];

export const CATEGORY_COLORS: Record<MapLocationCategory, string> = {
  museum: "#7c3aed",
  "historical-site": "#b45309",
  monument: "#be123c",
  church: "#0369a1",
  monastery: "#4338ca",
  hotel: "#0f766e",
  restaurant: "#c2410c",
  cafe: "#a16207",
  attraction: "#ea580c",
  park: "#15803d",
  viewpoint: "#0284c7",
  shopping: "#db2777",
  hospital: "#dc2626",
  transport: "#475569",
  other: "#78716c",
};

export function locationsToGeoJSON(
  locations: MapLocation[],
): TourismFeatureCollection {
  return {
    type: "FeatureCollection",
    features: locations.map((location, index) => ({
      type: "Feature",
      id: index + 1,
      geometry: {
        type: "Point",
        coordinates: [location.longitude, location.latitude],
      },
      properties: {
        id: location.id,
        name: location.name,
        category: location.category,
        address: location.address ?? "",
      },
    })),
  };
}

export function filterLocations(
  locations: MapLocation[],
  category: MapFilterCategory,
): MapLocation[] {
  if (category === "all") return locations;
  return locations.filter((location) => location.category === category);
}

export function searchLocations(
  locations: MapLocation[],
  query: string,
): MapLocation[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return [];

  return locations.filter((location) => {
    const haystack = [
      location.name,
      location.category.replace("-", " "),
      location.address ?? "",
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(normalized);
  });
}

export function findLocationById(
  locations: MapLocation[],
  id: string | null,
): MapLocation | null {
  if (!id) return null;
  return locations.find((location) => location.id === id) ?? null;
}

export function getLocationDetailsHref(location: MapLocation): string {
  if (location.website) return location.website;
  return "/city/kapan";
}

export function isExternalHref(href: string): boolean {
  return href.startsWith("http://") || href.startsWith("https://");
}

export function markerImageId(category: MapLocationCategory): string {
  return `kapan-marker-${category}`;
}

export function svgToDataUrl(svg: string): string {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

export function loadSvgImage(
  svg: string,
  width: number,
  height: number,
): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image(width, height);
    image.decoding = "async";
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Failed to decode marker SVG"));
    image.src = svgToDataUrl(svg);
  });
}

export function getMapboxToken(): string | undefined {
  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
  if (!token || token === "your_mapbox_token_here") return undefined;
  return token;
}
