"use client";

import { usePathname } from "@/i18n/navigation";
import VoiceAssistantWidget from "./VoiceAssistantWidget";
import { cities } from "@/data/cities";
import { useTranslations } from "next-intl";

export default function GlobalVoiceAssistant() {
  const pathname = usePathname();
  const tData = useTranslations('cities_data');

  // Hide the floating widget on the home page
  if (pathname === "/") {
    return null;
  }

  let cityName;
  if (pathname.startsWith("/city/")) {
    const cityId = pathname.split("/city/")[1];
    const city = cities.find((c) => c.id === cityId);
    if (city) {
      cityName = tData(`${city.id}.name`);
    }
  }

  return <VoiceAssistantWidget cityName={cityName} />;
}
