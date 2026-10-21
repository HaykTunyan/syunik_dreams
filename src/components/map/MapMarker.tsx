"use client";

import { memo } from "react";
import type { MapLocationCategory } from "./map-types";
import { CATEGORY_COLORS } from "./map-utils";

type MarkerState = "inactive" | "hover" | "selected";

type MapMarkerProps = {
  category: MapLocationCategory;
  state?: MarkerState;
  title?: string;
};

const ICON_PATHS: Record<MapLocationCategory, string> = {
  museum:
    "M4 9.5 12 4l8 5.5V20H4V9.5Zm2.5 2.2h11v7.3h-11v-7.3Zm2 1.5v4.3h1.8v-4.3H8.5Zm3.1 0v4.3h1.8v-4.3h-1.8Zm3.1 0v4.3H16.5v-4.3h-1.8Z",
  "historical-site":
    "M5 20V9.2L12 4l7 5.2V20h-3.2v-6.2h-7.6V20H5Zm5.2-2.2h3.6V20H10.2v-2.2Z",
  monument:
    "M12 3.2 19 7v3.2H5V7l7-3.8ZM7.4 12h9.2v2.2H7.4V12Zm1.6 3.4h6v4.4h-6v-4.4ZM4.8 20.8h14.4v1.5H4.8v-1.5Z",
  church:
    "M12 2.8 13.4 6h3.2v2.4h-1.1L16.8 12H15v8.8H9V12H7.2l1.3-3.6H7.4V6h3.2L12 2.8ZM10.6 13.4v5.2h2.8v-5.2h-2.8Z",
  monastery:
    "M6 20.6V10.4l6-5.6 6 5.6v10.2h-3.1v-5.4h-5.8v5.4H6Zm4.4-7.6h3.2v2.2h-3.2v-2.2ZM11.2 4.2h1.6v1.8h-1.6V4.2Z",
  hotel:
    "M4.4 19.6V8.8A2.4 2.4 0 0 1 6.8 6.4h10.4A2.4 2.4 0 0 1 19.6 8.8v10.8h-2.2v-3.1H6.6v3.1H4.4Zm3.4-5.4h2.1V11H7.8v3.2Zm4.1 0h2.1V11h-2.1v3.2Zm4.1 0h2.1V11h-2.1v3.2Z",
  restaurant:
    "M7.2 3.4v7.1c0 1.3.9 2.1 2 2.1v8.8H7.2V3.4Zm9.6 0c-1.8 1.8-2.6 3.7-2.6 6.2 0 1.6.7 2.8 2.1 3.2v8.8h2.1V3.4h-1.6Z",
  cafe:
    "M6.2 6.4h9.4a3.2 3.2 0 0 1 0 6.4H15.2v5.2H6.2V6.4Zm9.4 2.2a1 1 0 1 0 0 2 1 1 0 0 0 0-2ZM7.4 4.6h2.1v1.4H7.4V4.6Zm3.4 0h2.1v1.4h-2.1V4.6Z",
  attraction:
    "M12 3.2 13.6 8h5.2l-4.2 3.2 1.6 5.1L12 13.4 8 16.3l1.6-5.1L5.4 8h5.2L12 3.2Z",
  park:
    "M12 3.6c2.8 0 5 2 5 4.6 0 1.4-.6 2.6-1.6 3.4 1.6.7 2.6 2 2.6 3.6 0 2.2-2.1 3.8-5.2 3.8h-.8v2.4H10v-2.4h-.8C6.1 19 4 17.4 4 15.2c0-1.6 1-2.9 2.6-3.6C5.6 10.8 5 9.6 5 8.2 5 5.6 7.2 3.6 12 3.6Z",
  viewpoint:
    "M12 5.2A7.2 7.2 0 0 1 19.2 12 7.2 7.2 0 0 1 12 18.8 7.2 7.2 0 0 1 4.8 12 7.2 7.2 0 0 1 12 5.2Zm0 2.4A4.8 4.8 0 0 0 7.2 12 4.8 4.8 0 0 0 12 16.8 4.8 4.8 0 0 0 16.8 12 4.8 4.8 0 0 0 12 7.6Zm0 2.2a2.6 2.6 0 1 1 0 5.2 2.6 2.6 0 0 1 0-5.2Z",
  shopping:
    "M7.2 7.2V6a4.8 4.8 0 0 1 9.6 0v1.2h2.2l-1.2 13.2H6.2L5 7.2h2.2Zm2.2 0h5.2V6a2.6 2.6 0 0 0-5.2 0v1.2Z",
  hospital:
    "M10.4 3.6h3.2v6.2h6.2v3.2h-6.2v6.2h-3.2v-6.2H4.2V9.8h6.2V3.6Z",
  transport:
    "M6.2 4.8h11.6v9.4c0 1.2-.9 2.1-2.1 2.1H8.3c-1.2 0-2.1-.9-2.1-2.1V4.8Zm2 12.8h1.8v2.1H8.2v-2.1Zm6 0h1.8v2.1h-1.8v-2.1ZM7.6 7h8.8v4.4H7.6V7Z",
  other:
    "M12 4.2a8 8 0 1 1 0 16 8 8 0 0 1 0-16Zm0 6.4v5.2h1.8V10.6H12Zm0-3.4h1.8v2H12V7.2Z",
};

export function getCategoryMarkerSvg(
  category: MapLocationCategory,
  state: MarkerState = "inactive",
): string {
  const color = CATEGORY_COLORS[category];
  const scale = state === "selected" ? 1 : state === "hover" ? 0.92 : 0.82;
  const glow =
    state === "selected"
      ? `<circle cx="24" cy="24" r="18" fill="${color}" opacity="0.22" />`
      : "";
  const icon = ICON_PATHS[category];

  return `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="56" viewBox="0 0 48 56">
    ${glow}
    <g transform="translate(24 28) scale(${scale}) translate(-24 -24)">
      <path d="M24 2C14.6 2 7 9.4 7 18.6c0 10.6 12.4 24.6 16.2 28.6.4.4 1.1.4 1.5 0C27.6 43.2 41 29.2 41 18.6 41 9.4 33.4 2 24 2z" fill="${color}" />
      <circle cx="24" cy="19" r="9.4" fill="#fff" />
      <g transform="translate(12 11) scale(0.5)" fill="${color}">
        <path d="${icon}" />
      </g>
    </g>
  </svg>`;
}

function CategoryGlyph({ category }: { category: MapLocationCategory }) {
  return (
    <svg viewBox="0 0 24 24" className="h-[58%] w-[58%]" aria-hidden="true">
      <path d={ICON_PATHS[category]} fill="currentColor" />
    </svg>
  );
}

function MapMarkerComponent({
  category,
  state = "inactive",
  title,
}: MapMarkerProps) {

  /**
   * 
   * Map Marker Component
   *  
   * @param {MapMarkerProps} props
   * @returns {JSX.Element}
   * 
   * 
   */


  const color = CATEGORY_COLORS[category];
  const sizeClass =
    state === "selected"
      ? "h-14 w-12"
      : state === "hover"
        ? "h-12 w-10"
        : "h-10 w-8";

  return (
    <div
      className={`pointer-events-none relative flex origin-bottom items-end justify-center transition-transform duration-200 ${
        state === "selected" ? "animate-bounce" : ""
      }`}
      style={{ animationDuration: state === "selected" ? "1.6s" : undefined }}
      title={title}
    >
      {state === "selected" && (
        <span
          className="absolute bottom-1 h-6 w-6 rounded-full opacity-40 blur-sm"
          style={{ backgroundColor: color }}
        />
      )}
      <svg
        viewBox="0 0 48 56"
        className={`${sizeClass} drop-shadow-lg transition-all duration-200`}
        aria-hidden="true"
      >
        <path
          d="M24 2C14.6 2 7 9.4 7 18.6c0 10.6 12.4 24.6 16.2 28.6.4.4 1.1.4 1.5 0C27.6 43.2 41 29.2 41 18.6 41 9.4 33.4 2 24 2z"
          fill={color}
        />
        <circle cx="24" cy="19" r="9.4" fill="#fff" />
      </svg>
      <span
        className="absolute top-[7px] flex h-5 w-5 items-center justify-center text-[color:var(--marker-color)]"
        style={{ color }}
      >
        <CategoryGlyph category={category} />
      </span>
    </div>
  );
}

export const MapMarker = memo(MapMarkerComponent);
export default MapMarker;
