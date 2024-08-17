import { useState, useEffect, useCallback } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png",
});

const markers = [
  { position: [28.6139, 77.209], label: "New Delhi" },
  { position: [19.076, 72.8777], label: "Mumbai" },
  { position: [13.0827, 80.2707], label: "Chennai" },
  { position: [22.5726, 88.3639], label: "Kolkata" },
  { position: [12.9716, 77.5946], label: "Bangalore" },
];

function ChangeView({ center }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, 8, {
      duration: 2, // Duration of animation in seconds
    });
  }, [center, map]);
  return null;
}

export default function Map() {
  const [center, setCenter] = useState([20.5937, 78.9629]);

  const handleMarkerClick = useCallback((position) => {
    setCenter(position);
  }, []);

  return (
    <MapContainer
      center={center}
      zoom={5}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <ChangeView center={center} />
      {markers.map((marker, index) => (
        <Marker
          key={index}
          position={marker.position}
          eventHandlers={{
            click: () => handleMarkerClick(marker.position),
          }}
        >
          <Popup>{marker.label}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
