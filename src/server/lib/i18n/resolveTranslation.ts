import "server-only";
import { DEFAULT_LOCALE, LOCALES, type Locale } from "@/server/config/constants";

type Translations = Record<string, unknown>;

/**
 * resolveTranslation — given a translations JSONB blob and a requested locale,
 * returns the translation object for that locale, falling back to DEFAULT_LOCALE ('en').
 *
 * Example blob:
 *   { en: { name: "Kapan", description: "..." }, hy: { name: "Կապան", description: "..." } }
 *
 * resolveTranslation(blob, "hy") → { name: "Կապան", description: "..." }
 * resolveTranslation(blob, "ru") → falls back to { name: "Kapan", description: "..." }
 */
export function resolveTranslation<T extends object>(
  translations: Translations | null | undefined,
  locale: Locale
): T {
  if (!translations || typeof translations !== "object") {
    return {} as T;
  }

  const requested = translations[locale] as T | undefined;
  if (requested && typeof requested === "object" && Object.keys(requested).length > 0) {
    return requested;
  }

  // Fallback: try DEFAULT_LOCALE
  const fallback = translations[DEFAULT_LOCALE] as T | undefined;
  if (fallback && typeof fallback === "object") {
    return fallback;
  }

  // Last resort: try any available locale
  for (const l of LOCALES) {
    const attempt = translations[l] as T | undefined;
    if (attempt && typeof attempt === "object" && Object.keys(attempt).length > 0) {
      return attempt;
    }
  }

  return {} as T;
}

/**
 * Checks whether a locale string is valid.
 */
export function isValidLocale(locale: string): locale is Locale {
  return LOCALES.includes(locale as Locale);
}

/**
 * Merge entity base fields with resolved translation fields into a DTO.
 */
export function withTranslation<TBase extends object, TTrans extends object>(
  base: TBase,
  translations: Translations | null | undefined,
  locale: Locale
): TBase & TTrans {
  const trans = resolveTranslation<TTrans>(translations, locale);
  return { ...base, ...trans };
}
