import { type NextRequest } from "next/server";
import { withHandler } from "@/server/lib/http/withHandler";
import { respond } from "@/server/lib/http/respond";
import { resolveLocale } from "@/server/lib/http/parse";
import { getAllTrips } from "@/server/modules/trips/trips.service";

export const runtime = "nodejs";

export const GET = withHandler(async (req: NextRequest) => {
  const locale = resolveLocale(req);
  const trips = await getAllTrips(locale);
  return respond(trips, { total: trips.length });
});
