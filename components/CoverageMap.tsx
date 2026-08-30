"use client";

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Circle, CircleMarker, Popup } from "react-leaflet";

const SHOP_POSITION: [number, number] = [46.77, 23.591];

const FREE_ZONE_RADIUS_METERS = 6000;
const EXTENDED_ZONE_RADIUS_METERS = 12000;

export default function CoverageMap() {
  return (
    <div>
      <div className="overflow-hidden rounded-lg border border-gray-200">
        <MapContainer
          center={SHOP_POSITION}
          zoom={11}
          scrollWheelZoom={false}
          style={{ height: "24rem", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributori'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Circle
            center={SHOP_POSITION}
            radius={EXTENDED_ZONE_RADIUS_METERS}
            pathOptions={{
              color: "#a78620",
              fillColor: "#c9a227",
              fillOpacity: 0.12,
              weight: 2,
              dashArray: "6 6",
            }}
          />

          <Circle
            center={SHOP_POSITION}
            radius={FREE_ZONE_RADIUS_METERS}
            pathOptions={{
              color: "#0c1fd8",
              fillColor: "#2448ff",
              fillOpacity: 0.18,
              weight: 2,
            }}
          />

          <CircleMarker
            center={SHOP_POSITION}
            radius={7}
            pathOptions={{
              color: "#ffffff",
              fillColor: "#0c1fd8",
              fillOpacity: 1,
              weight: 2,
            }}
          >
            <Popup>
              Ochelari Cluj
              <br />
              Strada Eroilor 42, Cluj-Napoca
            </Popup>
          </CircleMarker>
        </MapContainer>
      </div>

      <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600">
        <li className="flex items-center gap-2">
          <span className="inline-block h-3 w-3 rounded-full bg-brand-500" />
          Zonă cu deplasare gratuită (până la 6 km de la magazin)
        </li>
        <li className="flex items-center gap-2">
          <span className="inline-block h-3 w-3 rounded-full bg-gold-400" />
          Zonă extinsă, cu taxă de deplasare (până la 12 km)
        </li>
      </ul>
    </div>
  );
}
