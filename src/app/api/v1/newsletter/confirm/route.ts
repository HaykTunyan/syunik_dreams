import { type NextRequest, NextResponse } from "next/server";
import { withHandler } from "@/server/lib/http/withHandler";
import { confirmNewsletterSubscription } from "@/server/modules/contact/contact.service";

export const runtime = "nodejs";

export const GET = withHandler(async (req: NextRequest) => {
  const token = req.nextUrl.searchParams.get("token");
  if (!token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  const { confirmed } = await confirmNewsletterSubscription(token);
  const dest = confirmed ? "/?newsletter=confirmed" : "/?newsletter=invalid";
  return NextResponse.redirect(new URL(dest, req.url));
});
