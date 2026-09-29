import "server-only";

export const LOCALES = ["en", "hy", "ru"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

export const API_VERSION = "v1";
export const API_PREFIX = `/api/${API_VERSION}`;

export const CACHE_TTL = {
  SHORT: 60,       // 1 min
  MEDIUM: 300,     // 5 min
  LONG: 3600,      // 1 hour
  DAY: 86400,      // 24 hours
} as const;

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
} as const;

export const RATE_LIMIT = {
  CONTACT: { requests: 3, window: "1 h" },
  BOOKING: { requests: 5, window: "1 h" },
  NEWSLETTER: { requests: 3, window: "1 h" },
  ORDER: { requests: 10, window: "1 h" },
  VAPI: { requests: 60, window: "1 m" },
} as const;

export const SITE_URL = "https://syunikdreams.am";
export const SITE_NAME = "Syunik Dreams";
