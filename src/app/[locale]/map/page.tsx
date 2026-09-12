import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import MapPageClient from "@/container/map/MapPageClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "map" });

  return {
    title: t("title"),
    description: t("subtitle"),
    openGraph: {
      title: `${t("title")} | Syunik Dreams`,
      description: t("subtitle"),
      type: "website",
    },
  };
}

export default function MapPage() {
  return <MapPageClient />;
}
