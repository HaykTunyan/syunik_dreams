"use client";

import { memo } from "react";
import { useTranslations } from "next-intl";
import type { MapFilterCategory, MapLocationCategory } from "./map-types";
import { MAP_LOCATION_CATEGORIES } from "./map-utils";

type MapFiltersProps = {
  value: MapFilterCategory;
  onChange: (category: MapFilterCategory) => void;
  visibleCategories?: MapLocationCategory[];
};

function MapFiltersComponent({
  value,
  onChange,
  visibleCategories = MAP_LOCATION_CATEGORIES,
}: MapFiltersProps) {

  /**
   * 
   * Map Filters Component
   *  
   * @param {MapFiltersProps} props
   * @returns {JSX.Element}
   * 
   * 
   */


  const t = useTranslations("map");
  const options: MapFilterCategory[] = ["all", ...visibleCategories];

  return (
    <div className="pointer-events-auto max-w-full">
      <div
        className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        role="tablist"
        aria-label={t("filters_label")}
      >
        {options.map((category) => {
          const selected = value === category;
          const label =
            category === "all"
              ? t("filters_all")
              : t(`categories.${category}`);

          return (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => onChange(category)}
              className={`shrink-0 rounded-full px-4 py-2.5 text-sm font-semibold whitespace-nowrap shadow-sm transition-all ${
                selected
                  ? "bg-orange-600 text-white shadow-orange-600/30"
                  : "border border-zinc-200/80 bg-white/95 text-zinc-700 hover:border-orange-200 hover:text-orange-700"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export const MapFilters = memo(MapFiltersComponent);
export default MapFilters;
