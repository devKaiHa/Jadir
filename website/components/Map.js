"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});

const Map = ({ location = { latitude: 33.5138, longitude: 36.2765 } }) => {
  const [mounted, setMounted] = useState(false);
  const [mapReady, setMapReady] = useState(false);
  const [L, setL] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    setMounted(true);

    import("leaflet").then((leaflet) => {
      delete leaflet.Icon.Default.prototype._getIconUrl;
      leaflet.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
        shadowUrl:
          "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
      });
      setL(leaflet);
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove(); // تنظيف الخريطة عند الخروج
        mapRef.current = null;
      }
    };
  }, []);

  if (!mounted || !L) {
    return (
      <div
        style={{
          height: "400px",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Loading map...
      </div>
    );
  }

  const position = [location.latitude, location.longitude];
  const redIcon = new L.Icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  return (
    <div style={{ height: "400px", width: "100%", position: "relative" }}>
      <MapContainer
        key={`${location.latitude}-${location.longitude}`}
        center={position}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
        whenCreated={(map) => {
          mapRef.current = map;
          setMapReady(true);
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {mapReady && (
          <Marker position={position} icon={redIcon}>
            <Popup>موقعنا هنا</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default Map;
