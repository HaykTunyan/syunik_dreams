import { type NextRequest } from "next/server";
import { withHandler } from "@/server/lib/http/withHandler";
import { respond } from "@/server/lib/http/respond";
import { resolveLocale } from "@/server/lib/http/parse";
import { getCityBySlug } from "@/server/modules/cities/cities.service";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export const GET = withHandler(async (req: NextRequest, { params }) => {
  const locale = resolveLocale(req);
  const city = await getCityBySlug(params.slug, locale);
  return respond(city);
});
