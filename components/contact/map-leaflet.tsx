"use client";

import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";

const ContactMapLeaflet = () => {
  const zoomLevel = 16;

  return (
    <MapContainer
      center={[21.039, 105.8185]}
      zoom={zoomLevel}
      scrollWheelZoom={false}
      className="h-96 w-full md:h-full md:min-h-[450px] z-0 rounded-md"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker
        position={[21.039, 105.8185]}
        icon={
          new Icon({
            iconUrl: "/images/marker.png",
            shadowUrl: "/images/marker-shadow.png",
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            shadowSize: [40, 65],
            shadowAnchor: [12, 65],
          })
        }
      >
        <Popup>
          Wine House <br /> Tầng 4, 442 Đội Cấn, Ba Đình.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default ContactMapLeaflet;
