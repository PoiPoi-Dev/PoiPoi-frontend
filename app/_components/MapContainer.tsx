"use client";

import Image from "next/image";
import * as React from "react";
import { useState } from "react";
import Map, { Layer, Marker, Source } from "react-map-gl/maplibre";
import { sample } from "../_api/sample";
import PoiPopup from "./PoiPopup";
import { Popover, PopoverContent } from "@radix-ui/react-popover";
import { Pin } from "../_utils/global";
import MapContextProvider from "./MapContextProvider";
import MapControls from "./MapControls";

const geojson = (lat: number, long: number) => {
  return {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: { type: "Point", coordinates: [long, lat] },
        properties: null,
      },
    ],
  };
};

const metersToPixelsAtMaxZoom = (meters: number, latitude: number) =>
  meters / 0.075 / Math.cos((latitude * Math.PI) / 180);

const layerStyle = (pinTitle: string, radius: number, latitude: number) => {
  return {
    id: pinTitle,
    type: "circle",
    paint: {
      "circle-radius": {
        stops: [
          [0, 0],
          [20, metersToPixelsAtMaxZoom(radius, latitude)],
        ],
        base: 2,
      },
      "circle-color": "#007cbf",
      "circle-opacity": 0.5,
    },
    source: "",
  };
};

function MapInner() {
  const [showPopup, setShowPopup] = useState<number | undefined>(undefined);
  const [longitude] = useState<number>(139.80241);
  const [latitude] = useState<number>(35.56762);
  const [viewPort, setViewPort] = useState({
    longitude: longitude,
    latitude: latitude,
    zoom: 10,
  });

  React.useEffect(() => {
    console.log(showPopup);
  }, [showPopup]);

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
            <Marker
              key={pin.latitude}
              longitude={pin.longitude}
              latitude={pin.latitude}
              rotationAlignment="map"
              style={{ position: "absolute", top: 0, left: 0, opacity: 1 }}
              offset={[0, 0]}
              anchor="center"
            >
              {/* Pin icon */}
              <Image
                src="/PinIcon.png"
                alt="pin"
                width={32}
                height={32}
                className="relative z-10"
                onClick={() => {
                  setShowPopup(pin.id);
                }}
              />

              {/* Source */}
              <Source
                id={pin.title}
                type="geojson"
                data={geojson(pin.latitude, pin.longitude)}
              >
                <Layer {...layerStyle(pin.title, pin.radius, pin.latitude)} />
              </Source>

              {/* Popup */}
              {showPopup === pin.id && (
                <div className="fixed top-0 left-0 w-screen h-screen">
                  <Popover defaultOpen>
                    <PopoverContent className="">
                      <PoiPopup
                        setShowPopup={setShowPopup}
                        id={pin.id}
                        payload={pin}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              )}
            </Marker>
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
