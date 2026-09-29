import "server-only";

// ─── Typed Error Classes ──────────────────────────────────────────────────────

export type AppErrorCode =
  | "NOT_FOUND"
  | "VALIDATION"
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "CONFLICT"
  | "RATE_LIMITED"
  | "BAD_REQUEST"
  | "INTERNAL"
  | "PAYMENT_FAILED";

export class AppError extends Error {
  constructor(
    public readonly code: AppErrorCode,
    message: string,
    public readonly details?: unknown
  ) {
    super(message);
    this.name = "AppError";
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string, id?: string) {
    super("NOT_FOUND", id ? `${resource} '${id}' not found` : `${resource} not found`);
    this.name = "NotFoundError";
  }
}

export class ValidationError extends AppError {
  constructor(message: string, details?: unknown) {
    super("VALIDATION", message, details);
    this.name = "ValidationError";
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized") {
    super("UNAUTHORIZED", message);
    this.name = "UnauthorizedError";
  }
}

export class ForbiddenError extends AppError {
  constructor(message = "Forbidden") {
    super("FORBIDDEN", message);
    this.name = "ForbiddenError";
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super("CONFLICT", message);
    this.name = "ConflictError";
  }
}

export class RateLimitedError extends AppError {
  constructor(message = "Too many requests") {
    super("RATE_LIMITED", message);
    this.name = "RateLimitedError";
  }
}

export class PaymentFailedError extends AppError {
  constructor(message: string, details?: unknown) {
    super("PAYMENT_FAILED", message, details);
    this.name = "PaymentFailedError";
  }
}

// ─── Error → HTTP Status Mapping ─────────────────────────────────────────────

export function mapErrorToStatus(err: unknown): number {
  if (!(err instanceof AppError)) return 500;
  switch (err.code) {
    case "NOT_FOUND":      return 404;
    case "VALIDATION":     return 422;
    case "BAD_REQUEST":    return 400;
    case "UNAUTHORIZED":   return 401;
    case "FORBIDDEN":      return 403;
    case "CONFLICT":       return 409;
    case "RATE_LIMITED":   return 429;
    case "PAYMENT_FAILED": return 402;
    case "INTERNAL":       return 500;
    default:               return 500;
  }
}

export function mapErrorToResponse(err: unknown): {
  status: number;
  error: { code: string; message: string; details?: unknown };
} {
  if (err instanceof AppError) {
    return {
      status: mapErrorToStatus(err),
      error: { code: err.code, message: err.message, details: err.details },
    };
  }
  return {
    status: 500,
    error: { code: "INTERNAL", message: "An unexpected error occurred" },
  };
}
