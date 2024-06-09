import * as React from "react";
import { Layer, Marker, Source, LayerProps } from "react-map-gl/maplibre";
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
      "circle-color": "rgba(255, 216, 61, 0.3)",
      "circle-opacity": 1,
    },
    source: "",
  };
};

function MarkerContainer({
  pin,
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

  const styleTop: number = 0;
  const styleLeft: number = 0;
  const styleOpacity: number = 1;
  const styleZIndex: number = 40;

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
            top: styleTop,
            left: styleLeft,
            opacity: styleOpacity,
            zIndex: styleZIndex,
          }}
          offset={[0, 0]}
          anchor="center"
        >
          {/* Pin icon */}
          <IoMdCheckmarkCircle
            size={48}
            className="text-primary"
            onClick={handleClick}
          />
        </Marker>
      ) : (
        <Marker
          key={pin.search_latitude}
          longitude={pin.search_longitude}
          latitude={pin.search_latitude}
          rotationAlignment="map"
          style={{
            position: "absolute",
            top: styleTop,
            left: styleLeft,
            opacity: styleOpacity,
            zIndex: styleZIndex,
          }}
          offset={[0, 0]}
          anchor="center"
        >
          {/* Pin icon */}
          <PiSealQuestion
            size={32}
            className="text-primary"
            onClick={handleClick}
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
        </Marker>
      )}
    </>
  );
}

export default MarkerContainer;
