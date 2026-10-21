"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import mapboxgl, {
  type GeoJSONSource,
  type Map as MapboxMap,
  type MapLayerMouseEvent,
} from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useTranslations } from "next-intl";
import { loadMapLocations } from "./map-data";
import type { MapFilterCategory, MapLocation } from "./map-types";
import {
  CLUSTER_COUNT_LAYER_ID,
  CLUSTER_LAYER_ID,
  KAPAN_CENTER,
  KAPAN_INITIAL_ZOOM,
  KAPAN_SELECTED_ZOOM,
  MAP_LOCATION_CATEGORIES,
  MAPBOX_STYLE_URL,
  TOURISM_SOURCE_ID,
  UNCLUSTERED_LAYER_ID,
  filterLocations,
  findLocationById,
  getMapboxToken,
  loadSvgImage,
  locationsToGeoJSON,
  markerImageId,
} from "./map-utils";
import { MapControls } from "./MapControls";
import { MapFilters } from "./MapFilters";
import { MapMarker, getCategoryMarkerSvg } from "./MapMarker";
import { MapPopup } from "./MapPopup";
import { MapSearch } from "./MapSearch";

type InteractiveMapProps = {
  locations?: MapLocation[];
};

type PixelAnchor = { x: number; y: number };

function TokenMissingNotice() {
  const t = useTranslations("map");
  return (
    <div className="flex h-full min-h-[420px] items-center justify-center bg-zinc-100 p-6">
      <div className="max-w-lg rounded-3xl border border-amber-200 bg-white p-8 shadow-xl">
        <p className="text-xs font-bold tracking-[0.2em] text-orange-600 uppercase">
          {t("developer_notice")}
        </p>
        <h2 className="mt-2 text-xl font-bold text-zinc-900">{t("token_missing_title")}</h2>
        <p className="mt-3 text-sm leading-relaxed whitespace-pre-line text-zinc-600">
          {t("token_missing_body")}
        </p>
      </div>
    </div>
  );
}

async function registerCategoryImages(map: MapboxMap) {
  await Promise.all(
    MAP_LOCATION_CATEGORIES.map(async (category) => {
      const imageId = markerImageId(category);
      if (map.hasImage(imageId)) return;
      const image = await loadSvgImage(
        getCategoryMarkerSvg(category, "inactive"),
        48,
        56,
      );
      if (!map.hasImage(imageId)) {
        map.addImage(imageId, image, { pixelRatio: 2 });
      }
    }),
  );
}

function addTourismLayers(map: MapboxMap) {
  if (map.getSource(TOURISM_SOURCE_ID)) return;

  map.addSource(TOURISM_SOURCE_ID, {
    type: "geojson",
    data: locationsToGeoJSON([]),
    cluster: true,
    clusterMaxZoom: 16,
    clusterRadius: 56,
    promoteId: "id",
  });

  map.addLayer({
    id: CLUSTER_LAYER_ID,
    type: "circle",
    source: TOURISM_SOURCE_ID,
    filter: ["has", "point_count"],
    paint: {
      "circle-color": [
        "step",
        ["get", "point_count"],
        "#fb923c",
        8,
        "#ea580c",
        20,
        "#c2410c",
      ],
      "circle-radius": ["step", ["get", "point_count"], 18, 8, 22, 20, 28],
      "circle-stroke-width": 3,
      "circle-stroke-color": "#fff7ed",
    },
  });

  map.addLayer({
    id: CLUSTER_COUNT_LAYER_ID,
    type: "symbol",
    source: TOURISM_SOURCE_ID,
    filter: ["has", "point_count"],
    layout: {
      "text-field": ["get", "point_count_abbreviated"],
      "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
      "text-size": 13,
    },
    paint: {
      "text-color": "#fff",
    },
  });

  map.addLayer({
    id: UNCLUSTERED_LAYER_ID,
    type: "symbol",
    source: TOURISM_SOURCE_ID,
    filter: ["!", ["has", "point_count"]],
    layout: {
      "icon-image": ["concat", "kapan-marker-", ["get", "category"]],
      "icon-size": [
        "case",
        ["boolean", ["feature-state", "hover"], false],
        1.12,
        0.92,
      ],
      "icon-anchor": "bottom",
      "icon-allow-overlap": true,
      "icon-ignore-placement": true,
    },
  });
}

function polishTourismStyle(map: MapboxMap) {
  try {
    if (!map.getSource("mapbox-dem")) {
      map.addSource("mapbox-dem", {
        type: "raster-dem",
        url: "mapbox://mapbox.mapbox-terrain-dem-v1",
        tileSize: 512,
        maxzoom: 14,
      });
    }
    map.setTerrain({ source: "mapbox-dem", exaggeration: 1.15 });
  } catch {
    // Terrain is optional if the style already defines DEM.
  }

  if (!map.getLayer("kapan-sky")) {
    map.addLayer({
      id: "kapan-sky",
      type: "sky",
      paint: {
        "sky-type": "atmosphere",
        "sky-atmosphere-sun": [0.0, 78.0],
        "sky-atmosphere-sun-intensity": 12,
      },
    });
  }

  const optionalPaint: Array<[string, string, unknown]> = [
    ["water", "fill-color", "#8ecae6"],
    ["waterway", "line-color", "#7ab8d9"],
    ["national-park", "fill-color", "#c5e1a5"],
    ["landcover", "fill-color", "#d7ecc8"],
  ];

  for (const [layer, property, value] of optionalPaint) {
    if (map.getLayer(layer)) {
      map.setPaintProperty(layer, property as any, value);
    }
  }
}

export default function InteractiveMap({ locations: locationsProp }: InteractiveMapProps) {

  /**
   * 
   * Interactive Map Component
   * 
   * @param {InteractiveMapProps} props
   * @returns {JSX.Element}
   * 
   */


  const t = useTranslations("map");
  const token = getMapboxToken();
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapboxMap | null>(null);
  const userMarkerRef = useRef<mapboxgl.Marker | null>(null);
  const hoverIdRef = useRef<string | null>(null);
  const selectedIdRef = useRef<string | null>(null);

  const [loadedLocations, setLoadedLocations] = useState<MapLocation[]>([]);
  const [category, setCategory] = useState<MapFilterCategory>("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [anchor, setAnchor] = useState<PixelAnchor | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [locating, setLocating] = useState(false);
  const [mapReady, setMapReady] = useState(false);
  const [containerWidth, setContainerWidth] = useState(800);

  const locations = locationsProp ?? loadedLocations;
  const locationsRef = useRef(locations);
  const selectLocationRef = useRef<(location: MapLocation) => void>(() => undefined);
  const clearSelectionRef = useRef<() => void>(() => undefined);
  const updateSelectedAnchorRef = useRef<() => void>(() => undefined);

  const visibleLocations = useMemo(
    () => filterLocations(locations, category),
    [locations, category],
  );
  const selectedLocation = useMemo(
    () => findLocationById(locations, selectedId),
    [locations, selectedId],
  );

  locationsRef.current = locations;

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const sync = () => setIsMobile(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (locationsProp) return;
    let cancelled = false;
    loadMapLocations()
      .then((data) => {
        if (!cancelled) setLoadedLocations(data);
      })
      .catch(() => {
        if (!cancelled) setLoadedLocations([]);
      });
    return () => {
      cancelled = true;
    };
  }, [locationsProp]);

  const updateSelectedAnchor = useCallback(() => {
    const map = mapRef.current;
    const location = findLocationById(locations, selectedIdRef.current);
    if (!map || !location) {
      setAnchor(null);
      return;
    }
    const point = map.project([location.longitude, location.latitude]);
    setAnchor({ x: point.x, y: point.y });
  }, [locations]);

  const flyToLocation = useCallback((location: MapLocation) => {
    const map = mapRef.current;
    if (!map) return;
    map.flyTo({
      center: [location.longitude, location.latitude],
      zoom: Math.max(map.getZoom(), KAPAN_SELECTED_ZOOM),
      pitch: 48,
      offset: isMobile ? [0, -140] : [0, -36],
      essential: true,
      duration: 1100,
    });
  }, [isMobile]);

  const selectLocation = useCallback(
    (location: MapLocation) => {
      selectedIdRef.current = location.id;
      setSelectedId(location.id);
      flyToLocation(location);
    },
    [flyToLocation],
  );

  const clearSelection = useCallback(() => {
    selectedIdRef.current = null;
    setSelectedId(null);
    setAnchor(null);
  }, []);

  selectLocationRef.current = selectLocation;
  clearSelectionRef.current = clearSelection;
  updateSelectedAnchorRef.current = updateSelectedAnchor;

  useEffect(() => {
    if (!token || !containerRef.current || mapRef.current) return;

    mapboxgl.accessToken = token;
    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: MAPBOX_STYLE_URL,
      center: [KAPAN_CENTER.longitude, KAPAN_CENTER.latitude],
      zoom: KAPAN_INITIAL_ZOOM,
      pitch: 42,
      bearing: -16,
      antialias: true,
      attributionControl: true,
      cooperativeGestures: false,
      dragRotate: true,
      pitchWithRotate: true,
      touchPitch: true,
      scrollZoom: true,
    });
    mapRef.current = map;

    const resizeObserver = new ResizeObserver(() => {
      map.resize();
      setContainerWidth(containerRef.current?.clientWidth ?? 800);
    });
    resizeObserver.observe(containerRef.current);
    setContainerWidth(containerRef.current.clientWidth);

    const onPointClick = (event: MapLayerMouseEvent) => {
      const feature = event.features?.[0];
      const id = feature?.properties?.id;
      if (typeof id !== "string") return;
      const match = findLocationById(locationsRef.current, id);
      if (match) selectLocationRef.current(match);
    };

    const onClusterClick = (event: MapLayerMouseEvent) => {
      const feature = event.features?.[0];
      const clusterId = feature?.properties?.cluster_id;
      const source = map.getSource(TOURISM_SOURCE_ID) as GeoJSONSource | undefined;
      if (typeof clusterId !== "number" || !source || feature?.geometry.type !== "Point") {
        return;
      }
      const coordinates = feature.geometry.coordinates as [number, number];
      source.getClusterExpansionZoom(clusterId, (err, zoom) => {
        if (!err && typeof zoom === "number") {
          map.easeTo({ center: coordinates, zoom });
        }
      });
      return;
    };

    const setHover = (id: string | null) => {
      if (hoverIdRef.current) {
        map.setFeatureState(
          { source: TOURISM_SOURCE_ID, id: hoverIdRef.current },
          { hover: false },
        );
      }
      hoverIdRef.current = id;
      if (id) {
        map.setFeatureState({ source: TOURISM_SOURCE_ID, id }, { hover: true });
      }
      map.getCanvas().style.cursor = id ? "pointer" : "";
    };

    const onMouseMove = (event: MapLayerMouseEvent) => {
      const id = event.features?.[0]?.properties?.id;
      setHover(typeof id === "string" ? id : null);
    };

    map.on("load", () => {
      void (async () => {
        polishTourismStyle(map);
        await registerCategoryImages(map);
        addTourismLayers(map);
        setMapReady(true);
      })();
    });

    map.on("click", UNCLUSTERED_LAYER_ID, onPointClick);
    map.on("click", CLUSTER_LAYER_ID, onClusterClick);
    map.on("mousemove", UNCLUSTERED_LAYER_ID, onMouseMove);
    map.on("mouseleave", UNCLUSTERED_LAYER_ID, () => setHover(null));
    map.on("move", () => updateSelectedAnchorRef.current());
    map.on("click", (event) => {
      const layers = [UNCLUSTERED_LAYER_ID, CLUSTER_LAYER_ID].filter((id) =>
        Boolean(map.getLayer(id)),
      );
      const hits = layers.length
        ? map.queryRenderedFeatures(event.point, { layers })
        : [];
      if (hits.length === 0) clearSelectionRef.current();
    });

    return () => {
      resizeObserver.disconnect();
      userMarkerRef.current?.remove();
      map.remove();
      mapRef.current = null;
      setMapReady(false);
    };
  }, [token]);

  useEffect(() => {
    const map = mapRef.current;
    if (!mapReady || !map?.getSource(TOURISM_SOURCE_ID)) return;
    const source = map.getSource(TOURISM_SOURCE_ID) as GeoJSONSource;
    source.setData(locationsToGeoJSON(visibleLocations));
    if (selectedId && !visibleLocations.some((item) => item.id === selectedId)) {
      clearSelection();
    }
  }, [mapReady, visibleLocations, selectedId, clearSelection]);

  useEffect(() => {
    selectedIdRef.current = selectedId;
    updateSelectedAnchor();
    const map = mapRef.current;
    if (!mapReady || !map?.getLayer(UNCLUSTERED_LAYER_ID)) return;
    map.setFilter(UNCLUSTERED_LAYER_ID, [
      "all",
      ["!", ["has", "point_count"]],
      ["!=", ["get", "id"], selectedId ?? ""],
    ]);
  }, [selectedId, selectedLocation, updateSelectedAnchor, mapReady]);

  const handleRecenter = useCallback(() => {
    mapRef.current?.flyTo({
      center: [KAPAN_CENTER.longitude, KAPAN_CENTER.latitude],
      zoom: KAPAN_INITIAL_ZOOM,
      pitch: 42,
      bearing: -16,
      essential: true,
      duration: 1000,
    });
  }, []);

  const handleMyLocation = useCallback(() => {
    if (!navigator.geolocation) return;
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const map = mapRef.current;
        if (!map) {
          setLocating(false);
          return;
        }
        const lngLat: [number, number] = [
          position.coords.longitude,
          position.coords.latitude,
        ];
        if (!userMarkerRef.current) {
          const element = document.createElement("div");
          element.className =
            "h-4 w-4 rounded-full bg-sky-500 ring-4 ring-white shadow-md";
          userMarkerRef.current = new mapboxgl.Marker({ element })
            .setLngLat(lngLat)
            .addTo(map);
        } else {
          userMarkerRef.current.setLngLat(lngLat);
        }
        map.flyTo({ center: lngLat, zoom: 14.5, essential: true });
        setLocating(false);
      },
      () => setLocating(false),
      { enableHighAccuracy: true, timeout: 8000 },
    );
  }, []);

  const handleFullscreen = useCallback(() => {
    const node = containerRef.current?.parentElement;
    if (!node) return;
    if (document.fullscreenElement) {
      void document.exitFullscreen();
    } else {
      void node.requestFullscreen();
    }
  }, []);

  if (!token) {
    return <TokenMissingNotice />;
  }

  return (
    <div className="relative h-full min-h-[520px] w-full overflow-hidden bg-zinc-200">
      <div ref={containerRef} className="absolute inset-0" />

      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex flex-col gap-3 p-3 md:p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div className="rounded-2xl bg-white/90 px-4 py-3 shadow-lg backdrop-blur-md md:max-w-sm">
            <p className="text-[11px] font-bold tracking-[0.22em] text-orange-600 uppercase">
              {t("eyebrow")}
            </p>
            <h1 className="text-lg font-black tracking-tight text-zinc-900 md:text-xl">
              {t("title")}
            </h1>
          </div>
          <MapSearch
            locations={locations}
            onSelect={(location) => {
              if (category !== "all" && location.category !== category) {
                setCategory("all");
              }
              selectLocation(location);
            }}
          />
        </div>
        <MapFilters
          value={category}
          onChange={setCategory}
          visibleCategories={MAP_LOCATION_CATEGORIES}
        />
      </div>

      <div className="pointer-events-none absolute right-3 bottom-28 z-20 md:right-4 md:bottom-8">
        <MapControls
          onZoomIn={() => mapRef.current?.zoomIn({ duration: 250 })}
          onZoomOut={() => mapRef.current?.zoomOut({ duration: 250 })}
          onRecenter={handleRecenter}
          onMyLocation={handleMyLocation}
          onFullscreen={handleFullscreen}
          locating={locating}
        />
      </div>

      {selectedLocation && anchor && (
        <div
          className="pointer-events-none absolute z-20"
          style={{ left: anchor.x, top: anchor.y }}
        >
          <div className="-translate-x-1/2 -translate-y-full">
            <MapMarker
              category={selectedLocation.category}
              state="selected"
              title={selectedLocation.name}
            />
          </div>
        </div>
      )}

      <MapPopup
        location={selectedLocation}
        isMobile={isMobile}
        anchor={anchor}
        containerWidth={containerWidth}
        onClose={clearSelection}
      />
    </div>
  );
}
