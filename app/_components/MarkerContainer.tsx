import Image from "next/image";
import * as React from "react";
import { Layer, Marker, Source, LayerProps } from "react-map-gl/maplibre";
import PoiPopup from "./PoiPopup";
import { Popover, PopoverContent } from "@radix-ui/react-popover";
import { Pin } from "../_utils/global";

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

const layerStyle = (pinTitle: string, radius: number, latitude: number) : LayerProps => {
  return {
    id: pinTitle,
    type: "circle",
    paint: {
      "circle-radius": ["interpolate",["exponential", 2],["zoom"],0, 0,   20, metersToPixelsAtMaxZoom(radius, latitude)],
      "circle-color": "#007cbf",
      "circle-opacity": 0.5,
    },
    source: "",
  };
};

interface MarkerContainerProps {
  pin: Pin;
  showPopup: number | undefined;
  setShowPopup: React.Dispatch<React.SetStateAction<number | undefined>>;
}



function MarkerContainer({
  pin,
  showPopup,
  setShowPopup,
}: MarkerContainerProps): JSX.Element {

  const generateLayerStyle:LayerProps = layerStyle(pin.title, pin.radius, pin.latitude);

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
        <Layer {...generateLayerStyle} />
      </Source>

      {/* Popup */}
      {showPopup === pin.id && (
        <div className="fixed top-0 left-0 w-screen h-screen">
          <Popover defaultOpen>
            <PopoverContent className="">
              <PoiPopup setShowPopup={setShowPopup} id={pin.id} payload={pin} />
            </PopoverContent>
          </Popover>
        </div>
      )}
    </Marker>
  );
}

export default MarkerContainer;
