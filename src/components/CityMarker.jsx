import { Popup, Marker } from "react-leaflet";

export default function CityMarker({ city }) {
  const {
    position: { lat, lng }, cityName, emoji,
  } = city;
  return (
    <Marker position={[lat, lng]}>
      <Popup>
        {emoji} {cityName}
      </Popup>
    </Marker>
  );
}
