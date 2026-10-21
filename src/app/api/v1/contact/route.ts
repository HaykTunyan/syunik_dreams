import { type NextRequest, NextResponse } from "next/server";
import { withHandler } from "@/server/lib/http/withHandler";
import { respond } from "@/server/lib/http/respond";
import { parseBody } from "@/server/lib/http/parse";
import { submitContact } from "@/server/modules/contact/contact.service";
import { contactSchema } from "@/server/modules/contact/contact.schema";
import { rateLimitContact } from "@/server/lib/rate-limit/upstash";

export const runtime = "nodejs";

export const POST = withHandler(async (req: NextRequest) => {
  // Rate limit by IP
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  await rateLimitContact(ip);

  const input = await parseBody(req, contactSchema);
  const result = await submitContact(input);

  return respond(result, undefined, 201);
});
