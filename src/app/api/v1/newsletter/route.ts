import { type NextRequest } from "next/server";
import { withHandler } from "@/server/lib/http/withHandler";
import { respond } from "@/server/lib/http/respond";
import { parseBody } from "@/server/lib/http/parse";
import { subscribeNewsletter } from "@/server/modules/contact/contact.service";
import { newsletterSchema } from "@/server/modules/contact/contact.schema";
import { rateLimitNewsletter } from "@/server/lib/rate-limit/upstash";

export const runtime = "nodejs";

export const POST = withHandler(async (req: NextRequest) => {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  await rateLimitNewsletter(ip);

  const input = await parseBody(req, newsletterSchema);
  const result = await subscribeNewsletter(input);
  return respond(result, undefined, 201);
});
