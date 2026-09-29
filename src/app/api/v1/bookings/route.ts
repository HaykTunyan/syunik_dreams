import { type NextRequest } from "next/server";
import { withHandler } from "@/server/lib/http/withHandler";
import { respond } from "@/server/lib/http/respond";
import { parseBody } from "@/server/lib/http/parse";
import { submitBooking } from "@/server/modules/contact/contact.service";
import { bookingSchema } from "@/server/modules/contact/contact.schema";
import { rateLimitBooking } from "@/server/lib/rate-limit/upstash";
import { db } from "@/server/db/prisma";

export const runtime = "nodejs";

export const POST = withHandler(async (req: NextRequest) => {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  await rateLimitBooking(ip);

  const input = await parseBody(req, bookingSchema);

  // Resolve IDs from slugs if provided
  let tripId: string | undefined;
  let cityId: string | undefined;

  if (input.tripSlug) {
    const trip = await db.trip.findUnique({ where: { slug: input.tripSlug } });
    tripId = trip?.id;
  }
  if (input.citySlug) {
    const city = await db.city.findUnique({ where: { slug: input.citySlug } });
    cityId = city?.id;
  }

  const result = await submitBooking(input, { tripId, cityId });
  return respond(result, undefined, 201);
});
