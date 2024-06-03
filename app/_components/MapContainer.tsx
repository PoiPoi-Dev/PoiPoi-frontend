"use client";

import * as React from "react";
import { useState } from "react";
import Map from "react-map-gl/maplibre";
import { sample } from "../_api/sample";
import { Pin } from "../_utils/global";
import MapContextProvider from "./MapContextProvider";
import MapControls from "./MapControls";
import MarkerContainer from "./MarkerContainer";

function MapInner() {
  const [showPopup, setShowPopup] = useState<number | undefined>(undefined);

  // Default camera map when user open the app
  const [longitude] = useState<number>(139.80241);
  const [latitude] = useState<number>(35.56762);
  const [viewPort, setViewPort] = useState({
    longitude: longitude,
    latitude: latitude,
    zoom: 10,
  });

  return (
    <div className="absolute overflow-hidden inset-0 bg-mapBg">
      <Map
        {...viewPort}
        onMove={(evt) => setViewPort(evt.viewState)}
        style={{ width: "100vw", height: "100vh" }}
        reuseMaps
        dragRotate={false}
        mapStyle={`https://api.protomaps.com/styles/v2/light.json?key=${process.env.NEXT_PUBLIC_PROTOMAPS_API_KEY}`}
      >
        {sample.pin.map((pin: Pin): JSX.Element => {
          return (
            <MarkerContainer
              key={pin.id}
              pin={pin}
              showPopup={showPopup}
              setShowPopup={setShowPopup}
            />
          );
        })}

        {/* Controller */}
        <MapControls />
      </Map>
    </div>
  );
}

const MapContainer = () => (
  <MapContextProvider>
    <MapInner />
  </MapContextProvider>
);

export default MapContainer;
