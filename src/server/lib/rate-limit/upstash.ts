import "server-only";
import { RateLimitedError } from "@/server/lib/errors/AppError";
import { RATE_LIMIT } from "@/server/config/constants";
import { env } from "@/server/config/env";

type RateLimitConfig = { requests: number; window: string };

// Lazy-init the Upstash client only when credentials are available
async function getRateLimiter(config: RateLimitConfig) {
  if (!env.UPSTASH_REDIS_REST_URL || !env.UPSTASH_REDIS_REST_TOKEN) {
    // Skip rate limiting in development / when Redis is not configured
    return null;
  }

  const { Ratelimit } = await import("@upstash/ratelimit");
  const { Redis } = await import("@upstash/redis");

  const redis = new Redis({
    url: env.UPSTASH_REDIS_REST_URL,
    token: env.UPSTASH_REDIS_REST_TOKEN,
  });

  return new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(config.requests, config.window as import("@upstash/ratelimit").Duration),
    analytics: true,
  });
}

/**
 * checkRateLimit — throws RateLimitedError if the identifier has exceeded the limit.
 * identifier: typically an IP address or email hash.
 */
export async function checkRateLimit(
  identifier: string,
  config: RateLimitConfig
): Promise<void> {
  const limiter = await getRateLimiter(config);
  if (!limiter) return; // No-op when Redis not configured

  const { success, limit, remaining, reset } = await limiter.limit(identifier);

  if (!success) {
    throw new RateLimitedError(
      `Rate limit exceeded. Retry after ${new Date(reset).toISOString()}. Limit: ${limit}, Remaining: ${remaining}`
    );
  }
}

// ─── Pre-configured rate limit helpers ───────────────────────────────────────

export const rateLimitContact    = (ip: string) => checkRateLimit(ip, RATE_LIMIT.CONTACT);
export const rateLimitBooking    = (ip: string) => checkRateLimit(ip, RATE_LIMIT.BOOKING);
export const rateLimitNewsletter = (ip: string) => checkRateLimit(ip, RATE_LIMIT.NEWSLETTER);
export const rateLimitOrder      = (ip: string) => checkRateLimit(ip, RATE_LIMIT.ORDER);
export const rateLimitVapi       = (ip: string) => checkRateLimit(ip, RATE_LIMIT.VAPI);
