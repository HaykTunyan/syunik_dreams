import type { MapLocation, MapLocationsLoader } from "./map-types";

/**
 * PLACEHOLDER / EXAMPLE DATA
 * -----------------------------------------------------------------------------
 * These records are demo tourism locations for the Kapan map UI.
 * Coordinates are approximate offsets around the official city center
 * (39.20111, 46.41500) and are NOT verified business or attraction positions.
 *
 * Replace this array (or `loadMapLocations`) with real data from an API,
 * database, CMS, or static JSON before production content launch.
 */
export const mapLocations: MapLocation[] = [
  {
    id: "placeholder-kapan-museum",
    name: "Example: Kapan City Museum",
    category: "museum",
    latitude: 39.2024,
    longitude: 46.4168,
    description:
      "Placeholder museum stop in central Kapan. Replace with a verified collection, hours, and exact coordinates.",
    image: "/images/kapan_city.png",
    address: "Central Kapan (approximate demo location)",
    isPlaceholder: true,
  },
  {
    id: "placeholder-historical-quarter",
    name: "Example: Historic Quarter Walk",
    category: "historical-site",
    latitude: 39.2001,
    longitude: 46.4126,
    description:
      "Placeholder historical-site pin near the city center. Swap for a documented heritage location.",
    image: "/images/kapan/center-of-kapan.png",
    address: "Kapan historic streets (approximate demo location)",
    isPlaceholder: true,
  },
  {
    id: "placeholder-nzhdeh-monument",
    name: "Example: City Monument",
    category: "monument",
    latitude: 39.1992,
    longitude: 46.4181,
    description:
      "Placeholder monument marker. Do not treat this coordinate as a real statue or memorial.",
    image: "/images/kapan/kapan-place.png",
    address: "Public square area (approximate demo location)",
    isPlaceholder: true,
  },
  {
    id: "placeholder-city-church",
    name: "Example: City Church",
    category: "church",
    latitude: 39.2036,
    longitude: 46.4134,
    description:
      "Placeholder church pin for category filtering and marker styling. Replace with a verified parish.",
    image: "/images/kapan/charch-of-kapan.png",
    address: "Kapan (approximate demo location)",
    isPlaceholder: true,
  },
  {
    id: "placeholder-monastery-lookout",
    name: "Example: Monastery Viewpoint Stop",
    category: "monastery",
    latitude: 39.2058,
    longitude: 46.4099,
    description:
      "Placeholder monastery-related stop. Nearby real monasteries should be added only with verified coordinates.",
    image: "/images/kapan/vahnavanq_kapan_ai.png",
    address: "Hills above Kapan (approximate demo location)",
    isPlaceholder: true,
  },
  {
    id: "placeholder-guest-hotel",
    name: "Example: Riverside Hotel",
    category: "hotel",
    latitude: 39.1986,
    longitude: 46.4142,
    description:
      "Placeholder lodging pin. Replace with partner hotels and confirmed addresses.",
    image: "/images/kapan/kapan-city-street.png",
    address: "Voghji river corridor (approximate demo location)",
    phone: "+374 00 000000",
    website: "https://syunikdreams.am/city/kapan",
    isPlaceholder: true,
  },
  {
    id: "placeholder-syunik-kitchen",
    name: "Example: Syunik Kitchen",
    category: "restaurant",
    latitude: 39.2019,
    longitude: 46.4194,
    description:
      "Placeholder restaurant for the food filter. Not a real venue.",
    image: "/images/kapan/nzhdeh-street.png",
    address: "Downtown Kapan (approximate demo location)",
    isPlaceholder: true,
  },
  {
    id: "placeholder-coffee-terrace",
    name: "Example: Mountain Cafe",
    category: "cafe",
    latitude: 39.2004,
    longitude: 46.4176,
    description:
      "Placeholder cafe pin to demonstrate search and popups.",
    image: "/images/kapan_city.png",
    address: "Pedestrian street (approximate demo location)",
    isPlaceholder: true,
  },
  {
    id: "placeholder-khustup-trailhead",
    name: "Example: Khustup Trail Glimpse",
    category: "attraction",
    latitude: 39.2069,
    longitude: 46.4188,
    description:
      "Placeholder attraction near the city. Khustup itself needs a verified trailhead coordinate before going live.",
    image: "/images/kapan/Khustup-Kapan.png",
    address: "Northern Kapan approaches (approximate demo location)",
    isPlaceholder: true,
  },
  {
    id: "placeholder-city-park",
    name: "Example: Riverside Park",
    category: "park",
    latitude: 39.1978,
    longitude: 46.4118,
    description:
      "Placeholder green space along the river. Replace with a named public park and verified bounds.",
    image: "/images/kapan_city.png",
    address: "Voghji riverbank (approximate demo location)",
    isPlaceholder: true,
  },
  {
    id: "placeholder-valley-viewpoint",
    name: "Example: Valley Viewpoint",
    category: "viewpoint",
    latitude: 39.1949,
    longitude: 46.4206,
    description:
      "Placeholder lookout for the viewpoint category and fly-to behavior.",
    image: "/images/kapan/baghaberd_fortress.png",
    address: "Southern hillside (approximate demo location)",
    isPlaceholder: true,
  },
  {
    id: "placeholder-market",
    name: "Example: Covered Market",
    category: "shopping",
    latitude: 39.2028,
    longitude: 46.4141,
    description:
      "Placeholder shopping pin. Replace with a verified market or craft shop.",
    image: "/images/kapan/kapan-place.png",
    address: "City center (approximate demo location)",
    isPlaceholder: true,
  },
  {
    id: "placeholder-medical-center",
    name: "Example: Medical Center",
    category: "hospital",
    latitude: 39.2047,
    longitude: 46.4212,
    description:
      "Placeholder hospital pin for visitor-useful categories. Not a real facility location.",
    address: "Eastern Kapan (approximate demo location)",
    phone: "+374 00 000000",
    isPlaceholder: true,
  },
  {
    id: "placeholder-bus-station",
    name: "Example: Intercity Transport Stop",
    category: "transport",
    latitude: 39.1996,
    longitude: 46.4104,
    description:
      "Placeholder transport hub. Replace with the verified marshrutka / bus station coordinate.",
    address: "Western approach road (approximate demo location)",
    isPlaceholder: true,
  },
];

/**
 * Default loader used by InteractiveMap.
 * Swap the body of this function to fetch from an API, CMS, or database
 * without changing InteractiveMap.tsx.
 */
export const loadMapLocations: MapLocationsLoader = async () => mapLocations;
