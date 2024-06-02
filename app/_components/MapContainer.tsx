"use client";

import Image from "next/image";
import * as React from "react";
import { useState } from "react";
import Map, { Marker } from "react-map-gl/maplibre";
import { sample } from "../_api/sample";
import PoiPopup from "./PoiPopup";
import { Popover, PopoverContent } from "@radix-ui/react-popover";
import { Pin } from "../_utils/global";
import MapContextProvider from "./MapContextProvider";
import MapControls from "./MapControls";

function MapInner() {
  const [showPopup, setShowPopup] = useState<number | undefined>(undefined);

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
          const {
            id,
            latitude,
            longitude,
            radius,
            title,
            description,
            img_url,
            is_main_attraction,
            tags,
          } = pin;
          const payload = {
            id,
            latitude,
            longitude,
            radius,
            title,
            description,
            img_url,
            is_main_attraction,
            tags,
          };
          return (
            <Marker
              key={pin.latitude}
              longitude={pin.longitude}
              latitude={pin.latitude}
              rotationAlignment="map"
              style={{ position: "absolute", top: 0, left: 0, opacity: 1 }}
              offset={[0, 0]}
              anchor="bottom"
            >
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
              {showPopup === pin.id && (
                <div className="fixed top-0 left-0 w-screen h-screen">
                  <Popover defaultOpen>
                    <PopoverContent className="">
                      <PoiPopup
                        setShowPopup={setShowPopup}
                        id={pin.id}
                        payload={payload}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              )}
            </Marker>
          );
        })}
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
