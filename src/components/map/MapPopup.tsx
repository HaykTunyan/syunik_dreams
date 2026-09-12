"use client";

import { memo, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { MapLocation } from "./map-types";
import { getLocationDetailsHref, isExternalHref } from "./map-utils";

type PopupAnchor = {
  x: number;
  y: number;
};

type MapPopupProps = {
  location: MapLocation | null;
  isMobile: boolean;
  anchor: PopupAnchor | null;
  containerWidth: number;
  onClose: () => void;
};

function MapPopupComponent({
  location,
  isMobile,
  anchor,
  containerWidth,
  onClose,
}: MapPopupProps) {


  /**
   * 
   * Map Popup Component
   *  
   * @param {MapPopupProps} props
   * @returns {JSX.Element}
   * 
   * 
   */


  const t = useTranslations("map");
  const sheetRef = useRef<HTMLDivElement>(null);
  const [dragY, setDragY] = useState(0);
  const dragStart = useRef<number | null>(null);

  useEffect(() => {
    setDragY(0);
  }, [location?.id]);

  if (!location) return null;

  const detailsHref = getLocationDetailsHref(location);
  const external = isExternalHref(detailsHref);

  const body = (
    <>
      <div className="relative h-36 w-full overflow-hidden bg-zinc-200 sm:h-40">
        {location.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={location.image}
            alt={location.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-linear-to-br from-orange-100 to-amber-50 text-sm font-medium text-zinc-500">
            {t("no_image")}
          </div>
        )}
        {location.isPlaceholder && (
          <span className="absolute top-3 left-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold tracking-wide text-orange-700 uppercase">
            {t("placeholder_badge")}
          </span>
        )}
        <button
          type="button"
          onClick={onClose}
          aria-label={t("close")}
          className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-zinc-700 shadow-sm"
        >
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <div className="space-y-3 p-4">
        <div>
          <p className="text-xs font-bold tracking-widest text-orange-600 uppercase">
            {t(`categories.${location.category}`)}
          </p>
          <h2 className="mt-1 text-lg font-bold text-zinc-900">{location.name}</h2>
        </div>
        {location.description && (
          <p className="text-sm leading-relaxed text-zinc-600">
            {location.description}
          </p>
        )}
        {location.address && (
          <p className="text-sm text-zinc-600">📍 {location.address}</p>
        )}
        {location.phone && (
          <a
            href={`tel:${location.phone}`}
            className="block text-sm font-medium text-zinc-700"
          >
            {location.phone}
          </a>
        )}
        {location.website && (
          <a
            href={location.website}
            target="_blank"
            rel="noreferrer"
            className="block text-sm font-medium text-orange-700 underline-offset-2 hover:underline"
          >
            {location.website}
          </a>
        )}
        {external ? (
          <a
            href={detailsHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-full items-center justify-center rounded-xl bg-orange-600 px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-orange-700"
          >
            {t("view_details")}
          </a>
        ) : (
          <Link
            href={detailsHref}
            className="inline-flex w-full items-center justify-center rounded-xl bg-orange-600 px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-orange-700"
          >
            {t("view_details")}
          </Link>
        )}
      </div>
    </>
  );

  if (isMobile) {
    return (
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 flex justify-center px-3 pb-[max(12px,env(safe-area-inset-bottom))]">
        <div
          ref={sheetRef}
          role="dialog"
          aria-label={location.name}
          className="pointer-events-auto w-full max-w-lg overflow-hidden rounded-t-3xl bg-white shadow-2xl"
          style={{ transform: `translateY(${dragY}px)` }}
          onTouchStart={(event) => {
            dragStart.current = event.touches[0].clientY;
          }}
          onTouchMove={(event) => {
            if (dragStart.current == null) return;
            const delta = event.touches[0].clientY - dragStart.current;
            setDragY(Math.max(0, delta));
          }}
          onTouchEnd={() => {
            if (dragY > 80) onClose();
            else setDragY(0);
            dragStart.current = null;
          }}
        >
          <div className="flex justify-center pt-2">
            <span className="h-1.5 w-12 rounded-full bg-zinc-300" />
          </div>
          {body}
        </div>
      </div>
    );
  }

  if (!anchor) return null;

  const left = Math.min(Math.max(anchor.x, 160), Math.max(containerWidth - 160, 160));

  return (
    <div
      className="pointer-events-auto absolute z-30 w-80 -translate-x-1/2 -translate-y-[calc(100%+18px)] overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-zinc-100"
      style={{ left, top: Math.max(anchor.y, 24) }}
      role="dialog"
      aria-label={location.name}
    >
      {body}
    </div>
  );
}

export const MapPopup = memo(MapPopupComponent);
export default MapPopup;
