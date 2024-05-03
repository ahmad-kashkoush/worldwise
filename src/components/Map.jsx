// Components
import CityMarker from "./CityMarker";
import Button from "./Button";
// Hooks
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGeolocation } from "../hooks/useGeolocation";
import { useUrlPosition } from "../hooks/useUrlPosition";
// Contexts
import { useCities } from "./../contexts/CitiesContext";
// map
import {
  MapContainer,
  TileLayer,
  useMapEvents,
  useMap,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";
import style from "./Map.module.css";

export default function Map() {
  const { cities } = useCities();
  const {
    position: geoPosition,
    isLoading: isGeoLoading,
    getCurrentPosition: getGeoPosition,
  } = useGeolocation();
  const [mapPositions, setMapPositions] = useState([40, 0]);
  const [mapLat, mapLng] = useUrlPosition();
  const navigate = useNavigate();

  useEffect(() => {
    if (mapLat && mapLng) setMapPositions([mapLat, mapLng]);
  }, [mapLat, mapLng]);

  useEffect(() => {
    if (!geoPosition) return;
    setMapPositions([geoPosition.lat, geoPosition.lng]);
    navigate(`form?lat=${geoPosition.lat}&lng=${geoPosition.lng}`);
  }, [geoPosition]);
  return (
    <div className={[style.mapContainer, style.map].join(" ")}>
      <Button type="position" onClick={() => getGeoPosition()}>
        {isGeoLoading ? "Loading...." : "Use your Position"}
      </Button>
      <MapContainer
        className={style.map}
        center={mapPositions}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <CityMarker key={city.id} city={city} />
        ))}
        <ChangeCenter position={mapPositions} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}
function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => {
      // console.log(e);
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}

function ChangeCenter({ position }) {
  const map = useMap();
  if (!position) return;
  map.setView(position);
  return null;
}
