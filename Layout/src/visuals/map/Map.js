import { MapContainer, TileLayer, Marker, GeoJSON } from "react-leaflet";
import countries from "./borders_4326.json"
import "./styles.css";

const getStyle = (feature, layer) => {
  //console.log(feature, layer);
  return {
    color: "#006400",
    weight: 5,
    opacity: 0.65
  };
};

export default function Map() {
  return (
    <div className="map">
      <MapContainer center={[14.56, -60.81]} zoom={4} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://stamen-tiles.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.png"
        />
        <Marker position={[14.56, -60.81]}/>
        <GeoJSON data={countries} />
      </MapContainer>
    </div>
  );
}