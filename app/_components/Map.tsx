"use client";

import Image from "next/image";
import * as React from "react";
import { useState } from "react";
import Map, { Marker, ScaleControl } from "react-map-gl/maplibre";
import { PoiCard } from "./PoiCard";

function MapContainer() {
  const [showPopup, setShowPopup] = useState<number | undefined>(undefined);

  const [longitude] = useState<number>(139.69241);
  const [latitude] = useState<number>(35.666762);

  const [viewState, setViewState] = React.useState({
    longitude: longitude,
    latitude: latitude,
    zoom: 8,
  });

  return (
    <Map
      {...viewState}
      onMove={(evt) => setViewState(evt.viewState)}
      style={{ width: "100vw", height: "100vh", position: "relative" }}
      mapStyle={`https://api.protomaps.com/styles/v2/light.json?key=${process.env.NEXT_PUBLIC_PROTOMAPS_API_KEY}`}
    >
      <ScaleControl />
      <Marker
        longitude={longitude}
        latitude={latitude}
        rotationAlignment="map"
        style={{ position: "absolute", top: 0, left: 0, opacity: 1 }}
        offset={[0, 0]}
        onClick={() => setShowPopup(1)}
      >
        <Image src="/next.svg" alt="pin" width={64} height={64} />
        {showPopup === 1 && (
          <div className="z-50">
            <PoiCard id={1} />
            <button onClick={() => setShowPopup(undefined)}>close</button>
          </div>
        )}
      </Marker>

      <Marker
        longitude={longitude + 0.01}
        latitude={latitude + 0.01}
        rotationAlignment="map"
        style={{ position: "absolute", top: 0, left: 0, opacity: 1 }}
        offset={[0, 0]}
        onClick={() => setShowPopup(2)}
      >
        <Image src="/vercel.svg" alt="pin" width={64} height={64} />
        {showPopup === 2 && (
          <div className="z-50">
            <PoiCard id={2} />
            <button onClick={() => setShowPopup(undefined)}>close</button>
          </div>
        )}
      </Marker>
    </Map>
  );
}

export default MapContainer;
