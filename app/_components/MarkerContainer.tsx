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
      "circle-color": "rgba(203, 92, 255, 0.3)",
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
    pin.search_radius,
    pin.search_latitude
  );

  const handleClick = () => {
    setShowPopup(pin.poi_id);
    setSelectedPoiId(pin.poi_id);
  };

  return (
    <>
      {pin.is_completed ? (
        <Marker
          key={pin.exact_latitude}
          longitude={pin.exact_longitude}
          latitude={pin.exact_latitude}
          rotationAlignment="map"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            opacity: 1,
            zIndex: 50,
          }}
          offset={[0, 0]}
          anchor="center"
        >
          {/* Pin icon */}
          <IoMdCheckmarkCircle size={48} onClick={handleClick} />

          {/* Popup */}
          {showPopup === pin.poi_id && (
            <div className="fixed top-0 left-0 w-screen h-screen">
              <Popover defaultOpen>
                <PopoverContent className="">
                  <PoiPopup
                    setShowPopup={setShowPopup}
                    id={pin.poi_id}
                    payload={pin}
                  />
                </PopoverContent>
              </Popover>
            </div>
          )}
        </Marker>
      ) : (
        <Marker
          key={pin.search_latitude}
          longitude={pin.search_longitude}
          latitude={pin.search_latitude}
          rotationAlignment="map"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            opacity: 1,
            zIndex: 50,
          }}
          offset={[0, 0]}
          anchor="center"
        >
          {/* Pin icon */}
          <PiSealQuestion size={32} onClick={handleClick} />

          {/* Exact Pin (For dev) **THIS SHOULD BE DELETED LATER** */}
          <Marker
            key={pin.exact_latitude}
            longitude={pin.exact_longitude}
            latitude={pin.exact_latitude}
            rotationAlignment="map"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              opacity: 1,
              zIndex: 50,
            }}
            offset={[0, 0]}
            anchor="center"
          />

          {/* Seach Zone Radius */}
          {!pin.is_completed && (
            <Source
              id={pin.title}
              type="geojson"
              data={geojson(pin.search_latitude, pin.search_longitude)}
            >
              <Layer {...generateLayerStyle} />
            </Source>
          )}

          {/* Popup */}
          {showPopup === pin.poi_id && (
            <div className="fixed top-0 left-0 w-screen h-screen">
              <Popover defaultOpen>
                <PopoverContent className="">
                  <PoiPopup
                    setShowPopup={setShowPopup}
                    id={pin.poi_id}
                    payload={pin}
                  />
                </PopoverContent>
              </Popover>
            </div>
          )}
        </Marker>
      )}
    </>
  );
}

export default MarkerContainer;
