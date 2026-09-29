import { type NextRequest } from "next/server";
import { withHandler } from "@/server/lib/http/withHandler";
import { respond } from "@/server/lib/http/respond";
import { parseQuery, resolveLocale } from "@/server/lib/http/parse";
import { getAllCities } from "@/server/modules/cities/cities.service";
import { listCitiesQuerySchema } from "@/server/modules/cities/cities.schema";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export const GET = withHandler(async (req: NextRequest) => {
  const query = parseQuery(req, listCitiesQuerySchema);
  const cities = await getAllCities(query.locale);

  return respond(cities, {
    total: cities.length,
    pageSize: query.pageSize,
  });
});
