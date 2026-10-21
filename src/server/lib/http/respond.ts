import "server-only";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { logger } from "@/server/lib/logger";
import { mapErrorToResponse, ValidationError } from "@/server/lib/errors/AppError";

// ─── Standard Response Envelope ──────────────────────────────────────────────

export type ApiResponse<T> =
  | { data: T; meta?: PaginationMeta; error?: never }
  | { data?: never; meta?: never; error: { code: string; message: string; details?: unknown } };

export interface PaginationMeta {
  total?: number;
  page?: number;
  pageSize?: number;
  nextCursor?: string;
  hasMore?: boolean;
}

export function respond<T>(
  data: T,
  meta?: PaginationMeta,
  status = 200
): NextResponse<ApiResponse<T>> {
  return NextResponse.json({ data, ...(meta ? { meta } : {}) }, { status });
}

export function respondError(
  err: unknown,
  requestId?: string
): NextResponse<ApiResponse<never>> {
  // Convert Zod errors to ValidationError format
  if (err instanceof ZodError) {
    const validationErr = new ValidationError("Validation failed", err.flatten());
    const { status, error } = mapErrorToResponse(validationErr);
    logger.warn({ requestId, error }, "Validation error");
    return NextResponse.json({ error }, { status });
  }

  const { status, error } = mapErrorToResponse(err);

  if (status >= 500) {
    logger.error({ requestId, err, error }, "Server error");
  } else {
    logger.warn({ requestId, error }, "Client error");
  }

  return NextResponse.json({ error }, { status });
}
