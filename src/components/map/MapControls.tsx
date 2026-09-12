"use client";

import { memo } from "react";
import { useTranslations } from "next-intl";

type MapControlsProps = {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onRecenter: () => void;
  onMyLocation: () => void;
  onFullscreen: () => void;
  locating?: boolean;
};

const buttonClass =
  "flex h-11 w-11 items-center justify-center rounded-2xl bg-white/95 text-zinc-800 shadow-lg ring-1 ring-zinc-200/80 transition hover:bg-orange-50 hover:text-orange-700";

function MapControlsComponent({
  onZoomIn,
  onZoomOut,
  onRecenter,
  onMyLocation,
  onFullscreen,
  locating = false,
}: MapControlsProps) {

  /**
   * 
   * Map Controls Component
   *  
   * @param {MapControlsProps} props
   * @returns {JSX.Element}
   * 
   */

  const t = useTranslations("map");

  return (
    <div className="pointer-events-auto flex flex-col gap-2">
      <button type="button" className={buttonClass} onClick={onZoomIn} aria-label={t("zoom_in")}>
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.4">
          <path d="M12 5v14M5 12h14" />
        </svg>
      </button>
      <button type="button" className={buttonClass} onClick={onZoomOut} aria-label={t("zoom_out")}>
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.4">
          <path d="M5 12h14" />
        </svg>
      </button>
      <button
        type="button"
        className={buttonClass}
        onClick={onRecenter}
        aria-label={t("recenter")}
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="3" />
          <path d="M12 3v2M12 19v2M3 12h2M19 12h2" />
        </svg>
      </button>
      <button
        type="button"
        className={buttonClass}
        onClick={onMyLocation}
        aria-label={t("my_location")}
        disabled={locating}
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
          <circle cx="12" cy="12" r="5" />
        </svg>
      </button>
      <button
        type="button"
        className={buttonClass}
        onClick={onFullscreen}
        aria-label={t("fullscreen")}
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M8 3H4v4M16 3h4v4M4 16v4h4M20 16v4h-4" />
        </svg>
      </button>
    </div>
  );
}

export const MapControls = memo(MapControlsComponent);
export default MapControls;
