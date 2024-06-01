"use client";

import Image from "next/image";
import * as React from "react";
import { useState } from "react";
import Map, { Marker } from "react-map-gl/maplibre";
import { PoiCard } from "./PoiCard";
import { sample } from "../_api/sample";
import PoiPopup from "./PoiPopup";
import { Dialog, DialogContent, DialogTrigger } from "@radix-ui/react-dialog";

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
      {sample.pin.map((pin) => {
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
            <Image src="/PinIcon.png" alt="pin" width={32} height={32} />
            {showPopup === pin.id && (
              <Dialog>
                <DialogTrigger aria-expanded="true"></DialogTrigger>
                <DialogContent>
                  <PoiCard id={pin.id} />
                </DialogContent>
              </Dialog>
            )}
          </Marker>
        );
      })}
    </Map>
  );
}

export default MapContainer;
