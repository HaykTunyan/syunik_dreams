"use client";

import { memo, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import type { MapLocation } from "./map-types";
import { searchLocations } from "./map-utils";

type MapSearchProps = {
  locations: MapLocation[];
  onSelect: (location: MapLocation) => void;
};

function MapSearchComponent({ locations, onSelect }: MapSearchProps) {

  /**
   * 
   * Map Search Component
   *  
   * @param {MapSearchProps} props
   * @returns {JSX.Element}
   * 
   * 
   */


  const t = useTranslations("map");
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const results = useMemo(
    () => searchLocations(locations, query).slice(0, 8),
    [locations, query],
  );

  return (
    <div className="pointer-events-auto relative w-full max-w-md">
      <label htmlFor="kapan-map-search" className="sr-only">
        {t("search_placeholder")}
      </label>
      <div className="flex items-center gap-2 rounded-2xl border border-zinc-200/80 bg-white/95 px-4 py-3 shadow-lg backdrop-blur-md">
        <svg
          className="h-5 w-5 shrink-0 text-zinc-400"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3-3" />
        </svg>
        <input
          id="kapan-map-search"
          type="search"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder={t("search_placeholder")}
          className="w-full bg-transparent text-sm font-medium text-zinc-900 outline-none placeholder:text-zinc-400"
          autoComplete="off"
        />
      </div>
      {open && query.trim() && (
        <ul
          className="absolute top-[calc(100%+8px)] right-0 left-0 z-20 overflow-hidden rounded-2xl border border-zinc-100 bg-white shadow-2xl"
          role="listbox"
        >
          {results.length === 0 ? (
            <li className="px-4 py-3 text-sm text-zinc-500">{t("search_empty")}</li>
          ) : (
            results.map((location) => (
              <li key={location.id}>
                <button
                  type="button"
                  role="option"
                  className="flex w-full flex-col items-start px-4 py-3 text-left hover:bg-orange-50"
                  onClick={() => {
                    onSelect(location);
                    setQuery(location.name);
                    setOpen(false);
                  }}
                >
                  <span className="text-sm font-semibold text-zinc-900">
                    {location.name}
                  </span>
                  <span className="text-xs text-zinc-500">
                    {t(`categories.${location.category}`)}
                    {location.address ? ` · ${location.address}` : ""}
                  </span>
                </button>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}

export const MapSearch = memo(MapSearchComponent);
export default MapSearch;
