"use client";

import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

type Props = {
  coords: [number, number];
  name: string; // <-- add city name prop
};

export default function CityMap({ coords, name }: Props) {
  return (
    <div className="relative h-full w-full rounded-3xl overflow-hidden">
      {/* City Name Title */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-black/60 text-white px-4 py-1 rounded-lg text-lg font-bold">
        {name}
      </div>

      {/* Map */}
      <MapContainer
        center={coords}
        zoom={11}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </div>
  );
}
