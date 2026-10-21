import { type NextRequest } from "next/server";
import { withHandler } from "@/server/lib/http/withHandler";
import { respond } from "@/server/lib/http/respond";
import { parseQuery } from "@/server/lib/http/parse";
import { getAllPlaces } from "@/server/modules/places/places.service";
import { listPlacesQuerySchema } from "@/server/modules/places/places.schema";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export const GET = withHandler(async (req: NextRequest) => {
  const query = parseQuery(req, listPlacesQuerySchema);
  const result = await getAllPlaces(query);
  return respond(result);
});
