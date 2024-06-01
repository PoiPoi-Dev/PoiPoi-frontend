"use client";

import Image from "next/image";
import * as React from "react";
import { useState } from "react";
import Map, { Marker } from "react-map-gl/maplibre";
import { sample } from "../_api/sample";
import PoiPopup from "./PoiPopup";
import { Popover, PopoverContent } from "@radix-ui/react-popover";
import { Pin } from "../_utils/global";

function MapContainer() {
  const [showPopup, setShowPopup] = useState<number | undefined>(undefined);

  const [longitude] = useState<number>(139.80241);
  const [latitude] = useState<number>(35.56762);

  const [viewPort, setViewPort] = React.useState({
    longitude: longitude,
    latitude: latitude,
    zoom: 9,
  });

  return (
    <Map
      {...viewPort}
      onMove={(evt) => setViewPort(evt.viewState)}
      style={{ width: "100vw", height: "100vh", position: "relative" }}
      mapStyle={`https://api.protomaps.com/styles/v2/light.json?key=${process.env.NEXT_PUBLIC_PROTOMAPS_API_KEY}`}
    >
      {sample.pin.map((pin: Pin): JSX.Element => {
        const { id, latitude, longitude, radius, title, description, img_url, is_main_attraction, tags } = pin;
        const payload = { id, latitude, longitude, radius, title, description, img_url, is_main_attraction, tags };
        return (
          <Marker
            key={pin.latitude}
            longitude={pin.longitude}
            latitude={pin.latitude}
            rotationAlignment="map"
            style={{ position: "absolute", top: 0, left: 0, opacity: 1 }}
            offset={[0, 0]}
            anchor="bottom"
            onClick={() => setShowPopup(pin.id)}
          >
            <Image
              src="/PinIcon.png"
              alt="pin"
              width={32}
              height={32}
              className="relative z-10"
            />
            {showPopup === pin.id && (
              <Popover defaultOpen>
                <PopoverContent className="absolute bg-transparent left-[50%] top-[50%] grid w-fit max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg">
                  <PoiPopup id={pin.id} payload={payload} />
                </PopoverContent>
              </Popover>
            )}
          </Marker>
        );
      })}
    </Map>
  );
}

export default MapContainer;
