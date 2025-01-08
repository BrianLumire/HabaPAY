import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIconShadow from "leaflet/dist/images/marker-shadow.png";

// Fix for default marker icon in React-Leaflet
const DefaultIcon = L.icon({
  iconUrl: markerIcon.src, // Use the `src` property
  shadowUrl: markerIconShadow.src, // Use the `src` property
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

L.Marker.prototype.options.icon = DefaultIcon;

const Map = () => {
  // Coordinates for the center of Kenya
  const kenyaCoordinates: [number, number] = [-0.0236, 37.9062]; // Latitude, Longitude

  // Bounds for Kenya
  const kenyaBounds = new L.LatLngBounds(
    [-4.6769, 33.9089], // Southwest coordinates
    [5.0333, 41.8996] // Northeast coordinates
  );

  return (
    <div style={{ position: "relative", height: "500px", width: "100%" }}>
      <MapContainer
        center={kenyaCoordinates} // Center the map on Kenya
        zoom={6} // Zoom level
        style={{ height: "100%", width: "100%" }}
        maxBounds={kenyaBounds} // Restrict the map to Kenya
        minZoom={6} // Prevent zooming out too far
      >
        {/* Add a tile layer (map tiles) */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Add markers for major cities in Kenya */}
        <Marker position={[-1.2864, 36.8172]}>
          <Popup>Nairobi, Kenya</Popup>
        </Marker>
        <Marker position={[-0.1022, 34.7617]}>
          <Popup>Kisumu, Kenya</Popup>
        </Marker>
        <Marker position={[-3.2175, 40.1191]}>
          <Popup>Mombasa, Kenya</Popup>
        </Marker>
        <Marker position={[0.5276, 35.2697]}>
          <Popup>Eldoret, Kenya</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;