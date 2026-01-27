"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useTranslations } from "next-intl";

// Fix for default marker icon in Next.js/Leaflet
const iconUrl =
    "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png";
const iconRetinaUrl =
    "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png";
const shadowUrl =
    "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png";

const customIcon = L.icon({
    iconUrl: iconUrl,
    iconRetinaUrl: iconRetinaUrl,
    shadowUrl: shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

export default function SyunikMap() {


    /**
     * 
     * Syunik Map Component
     * 
     * Features:
     * 
     * 1. Displays Syunik region on a map
     * 2. Shows popups with information about each location
     * 3. Uses custom markers with icons
     * 4. Supports dark mode
     * 
     * 
     */

    const position: [number, number] = [39.35, 46.15]; // Approximate center of Syunik
    const t = useTranslations('map_popups');

    return (
        <div className="h-[500px] w-full rounded-2xl overflow-hidden z-0">
            <MapContainer
                center={position}
                zoom={9}
                scrollWheelZoom={false}
                className="h-full w-full z-0"
                style={{ zIndex: 0 }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* Kapan */}
                <Marker position={[39.2077, 46.4068]} icon={customIcon}>
                    <Popup>
                        <b>{t('kapan.name')}</b> <br /> {t('kapan.desc')}
                    </Popup>
                </Marker>

                {/* Goris */}
                <Marker position={[39.5130, 46.3335]} icon={customIcon}>
                    <Popup>
                        <b>{t('goris.name')}</b> <br /> {t('goris.desc')}
                    </Popup>
                </Marker>

                {/* Tatev */}
                <Marker position={[39.3792, 46.2503]} icon={customIcon}>
                    <Popup>
                        <b>{t('tatev.name')}</b> <br /> {t('tatev.desc')}
                    </Popup>
                </Marker>

                {/* Meghri */}
                <Marker position={[38.902, 46.244]} icon={customIcon}>
                    <Popup>
                        <b>{t('meghri.name')}</b> <br /> {t('meghri.desc')}
                    </Popup>
                </Marker>

                {/* Sisian */}
                <Marker position={[39.518, 46.026]} icon={customIcon}>
                    <Popup>
                        <b>{t('sisian.name')}</b> <br /> {t('sisian.desc')}
                    </Popup>
                </Marker>

                {/* Qajaaran */}
                <Marker position={[39.154, 46.152]} icon={customIcon}>
                    <Popup>
                        <b>{t('qajaran.name')}</b> <br /> {t('qajaran.desc')}
                    </Popup>
                </Marker>

                {/* Agarak */}
                <Marker position={[38.880, 46.252]} icon={customIcon}>
                    <Popup>
                        <b>{t('agarak.name')}</b> <br /> {t('agarak.desc')}
                    </Popup>
                </Marker>


            </MapContainer>
        </div>
    );
}
