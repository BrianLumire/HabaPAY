"use client";
import React from "react";
import { MapContainer, TileLayer, Polygon, Tooltip } from "react-leaflet"; // Import necessary components from react-leaflet
import { LatLngExpression } from "leaflet"; // Correct type for LatLng

// Sample coordinates for one of Kenya's counties (e.g., Nairobi) - this should be replaced with actual county data
const kenyaCountyData = {
  name: "Nairobi",
  coordinates: [
    [1.2868, 36.8219], // Coordinates of Nairobi (this is just a sample; use actual county boundaries)
  ],
  users: 500, // Example of user data in this county
};

const Map = () => {
  return (
    <div className="w-full h-full"> {/* Ensure the container fills its parent */}
      <MapContainer
        center={[1.2868, 36.8219]} // Default center of the map (for Nairobi)
        zoom={6} // Initial zoom level
        style={{ height: "100%", width: "100%" }} // Make the map fill the container
      >
        {/* Tile Layer (Map Background) */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" // Using OpenStreetMap as the map tile source
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Example of a Polygon (Kenya County) */}
        <Polygon positions={kenyaCountyData.coordinates as LatLngExpression[]} pathOptions={{ color: "blue" }}>
          <Tooltip>
            <div>
              <p>{kenyaCountyData.name}</p>
              <p>Users: {kenyaCountyData.users}</p>
            </div>
          </Tooltip>
        </Polygon>
      </MapContainer>
    </div>
  );
};

export default Map;
