import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import AboutRoadClient from "@/container/about-road/AboutRoadClient";

interface Props {
    params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "about_road" });

    return {
        title: `${t("title_prefix")} ${t("title_suffix")}`,
        description: t("subtitle"),
        openGraph: {
            title: `${t("title_prefix")} ${t("title_suffix")} | Syunik Dreams`,
            description: t("subtitle"),
            type: "article",
        },
    };
}

export default function AboutRoadPage() {
    return <AboutRoadClient />;
}
