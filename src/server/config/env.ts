import "server-only";
import { z } from "zod";

const envSchema = z.object({
  // Database
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),

  // Auth
  AUTH_SECRET: z.string().min(32, "AUTH_SECRET must be at least 32 chars"),
  AUTH_URL: z.string().url().optional(),

  // Resend (email)
  RESEND_API_KEY: z.string().min(1, "RESEND_API_KEY is required"),
  RESEND_FROM_EMAIL: z
    .string()
    .email()
    .default("Syunik Dreams <noreply@syunikdreams.am>"),
  RESEND_TO_EMAIL: z.string().email().default("syunikdreams@gmail.com"),

  // Upstash Redis (rate limiting)
  UPSTASH_REDIS_REST_URL: z.string().url().optional(),
  UPSTASH_REDIS_REST_TOKEN: z.string().optional(),

  // Vercel Blob (media)
  BLOB_READ_WRITE_TOKEN: z.string().optional(),

  // Vapi
  VAPI_SECRET: z.string().optional(),
  NEXT_PUBLIC_VAPI_PUBLIC_KEY: z.string().default(""),
  NEXT_PUBLIC_VAPI_TEST_ASSISTANT_ID: z.string().default(""),

  // App
  NEXT_PUBLIC_APP_URL: z
    .string()
    .url()
    .default("https://syunikdreams.am"),
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
});

type Env = z.infer<typeof envSchema>;

function validateEnv(): Env {
  // In Next.js, process.env is available at module evaluation time
  const result = envSchema.safeParse(process.env);
  if (!result.success) {
    const missing = result.error.issues
      .map((i) => `  ${i.path.join(".")}: ${i.message}`)
      .join("\n");
    throw new Error(`❌ Invalid environment variables:\n${missing}`);
  }
  return result.data;
}

// Validate once at module load, cached. Build-time errors are caught early.
export const env: Env = validateEnv();
