import "server-only";
import { NextRequest, NextResponse } from "next/server";
import { logger } from "@/server/lib/logger";
import { respondError } from "./respond";

type RouteHandler = (
  req: NextRequest,
  ctx: { params: Record<string, string>; requestId: string }
) => Promise<NextResponse>;

/**
 * withHandler — wraps a route handler with:
 *  - Request ID generation
 *  - Structured request logging
 *  - Centralized try/catch → respondError
 *  - Response time logging
 */
export function withHandler(handler: RouteHandler) {
  return async (
    req: NextRequest,
    context: any
  ): Promise<NextResponse> => {
    const requestId = crypto.randomUUID();
    const start = Date.now();

    const log = logger.child({ requestId });

    // Handle both Next.js 14 (object) and Next.js 15 (Promise) params
    const params = context?.params ? await Promise.resolve(context.params) : {};

    log.info(
      {
        method: req.method,
        url: req.nextUrl.pathname,
        params,
      },
      "→ incoming request"
    );

    try {
      const res = await handler(req, { params, requestId });

      log.info(
        {
          status: res.status,
          ms: Date.now() - start,
        },
        "← response"
      );

      // Attach request ID to response headers for observability
      res.headers.set("X-Request-Id", requestId);
      return res;
    } catch (err) {
      log.error({ err, ms: Date.now() - start }, "Unhandled error in route");
      return respondError(err, requestId);
    }
  };
}
