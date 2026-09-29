import "server-only";
import { NextRequest } from "next/server";
import { z, ZodSchema } from "zod";
import { ValidationError } from "@/server/lib/errors/AppError";
import { DEFAULT_LOCALE, LOCALES, type Locale } from "@/server/config/constants";

/**
 * parseBody — parse and validate a JSON request body using a Zod schema.
 * Throws ValidationError on failure.
 */
export async function parseBody<T>(
  req: NextRequest,
  schema: ZodSchema<T>
): Promise<T> {
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    throw new ValidationError("Request body must be valid JSON");
  }

  const result = schema.safeParse(raw);
  if (!result.success) {
    throw new ValidationError("Validation failed", result.error.flatten());
  }
  return result.data;
}

/**
 * parseQuery — extract and validate URL search params.
 */
export function parseQuery<T>(
  req: NextRequest,
  schema: ZodSchema<T>
): T {
  const params: Record<string, string> = {};
  req.nextUrl.searchParams.forEach((v, k) => {
    params[k] = v;
  });

  const result = schema.safeParse(params);
  if (!result.success) {
    throw new ValidationError("Invalid query parameters", result.error.flatten());
  }
  return result.data;
}

/**
 * resolveLocale — derive a validated locale from query string or Accept-Language header.
 */
export function resolveLocale(req: NextRequest): Locale {
  const qLocale = req.nextUrl.searchParams.get("locale");
  if (qLocale && LOCALES.includes(qLocale as Locale)) {
    return qLocale as Locale;
  }

  const acceptLang = req.headers.get("accept-language") ?? "";
  for (const locale of LOCALES) {
    if (acceptLang.startsWith(locale)) return locale;
  }

  return DEFAULT_LOCALE;
}

// ─── Common shared Zod schemas ────────────────────────────────────────────────

export const paginationSchema = z.object({
  cursor:   z.string().optional(),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
  locale:   z.enum(LOCALES).default(DEFAULT_LOCALE),
});

export const localeSchema = z.object({
  locale: z.enum(LOCALES).default(DEFAULT_LOCALE),
});

export const slugParamSchema = z.object({
  slug: z.string().min(1),
});

export type PaginationParams = z.infer<typeof paginationSchema>;
