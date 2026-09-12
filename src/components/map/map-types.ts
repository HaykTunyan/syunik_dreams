export type MapLocationCategory =
  | "museum"
  | "historical-site"
  | "monument"
  | "church"
  | "monastery"
  | "hotel"
  | "restaurant"
  | "cafe"
  | "attraction"
  | "park"
  | "viewpoint"
  | "shopping"
  | "hospital"
  | "transport"
  | "other";

export type MapLocation = {
  id: string;
  name: string;
  category: MapLocationCategory;
  latitude: number;
  longitude: number;
  description?: string;
  image?: string;
  address?: string;
  phone?: string;
  website?: string;
  /**
   * Seed/example records only. Real API, CMS, or database records should omit this.
   */
  isPlaceholder?: boolean;
};

export type MapFilterCategory = "all" | MapLocationCategory;

export type TourismFeatureProperties = {
  id: string;
  name: string;
  category: MapLocationCategory;
  address: string;
};

export type TourismFeature = {
  type: "Feature";
  id: number;
  geometry: {
    type: "Point";
    coordinates: [number, number];
  };
  properties: TourismFeatureProperties;
};

export type TourismFeatureCollection = {
  type: "FeatureCollection";
  features: TourismFeature[];
};

export type MapLocationsLoader = () => Promise<MapLocation[]>;
