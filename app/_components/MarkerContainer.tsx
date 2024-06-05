import * as React from "react";
import { Layer, Marker, Source, LayerProps } from "react-map-gl/maplibre";
import PoiPopup from "./PoiPopup";
import { Popover, PopoverContent } from "@radix-ui/react-popover";
import { MarkerContainerProps } from "../_utils/global";
import { PiSealQuestion } from "react-icons/pi";
import { IoMdCheckmarkCircle } from "react-icons/io";

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

const layerStyle = (
  pinTitle: string,
  radius: number,
  latitude: number
): LayerProps => {
  return {
    id: pinTitle,
    type: "circle",
    paint: {
      "circle-radius": [
        "interpolate",
        ["exponential", 2],
        ["zoom"],
        0,
        0,
        20,
        metersToPixelsAtMaxZoom(radius, latitude),
      ],
      "circle-color": "#007cbf",
      "circle-opacity": 0.5,
    },
    source: "",
  };
};

function MarkerContainer({
  pin,
  showPopup,
  setShowPopup,
  setSelectedPoiId,
}: MarkerContainerProps): JSX.Element {
  const generateLayerStyle: LayerProps = layerStyle(
    pin.title,
    pin.radius,
    pin.latitude
  );


  const handleClick = () => {
    setShowPopup(pin.id);
    setSelectedPoiId(pin.id);
  };

  return (
    <Marker
      key={pin.latitude}
      longitude={pin.longitude}
      latitude={pin.latitude}
      rotationAlignment="map"
      style={{ position: "absolute", top: 0, left: 0, opacity: 1, zIndex: 999 }}
      offset={[0, 0]}
      anchor="center"
    >
      {/* Pin icon */}
      {pin.collect ? (
        <IoMdCheckmarkCircle size={48} onClick={handleClick} />
      ) : (
        <PiSealQuestion size={32} onClick={handleClick} />
      )}

      {/* Radius */}
      {!pin.collect && (
        <Source
          id={pin.title}
          type="geojson"
          data={geojson(pin.latitude, pin.longitude)}
        >
          <Layer {...generateLayerStyle} />
        </Source>
      )}

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