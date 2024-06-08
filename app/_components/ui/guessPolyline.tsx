import { Coordinates } from "@/app/_utils/coordinateMath";
import { Layer, Source } from "react-map-gl/maplibre";

type Props = {
  userLocation: Coordinates | null;
  guessPoiLocation: Coordinates | null;
};

/**
 * function to render polyline between user location and guess location
 * @param userLatitude
 * @param userLongitude
 * @param guessLatitude
 * @param guessLongitude
 * @returns line element as JSX.component
 */
function GuessPolyline({ userLocation, guessPoiLocation }: Props): JSX.Element {
  const lineData = {
    type: "Feature",
    properties: {},
    geometry: {
      type: "LineString",
      coordinates: [
        [userLocation?.longitude, userLocation?.latitude],
        [guessPoiLocation?.longitude, guessPoiLocation?.latitude],
      ],
    },
  };

  return (
    <Source id="polylineLayer" type="geojson" data={lineData}>
      <Layer
        id="lineLayer"
        type="line"
        source="my-data"
        layout={{
          "line-join": "round",
          "line-cap": "round",
        }}
        paint={{
          "line-color": "rgba(0, 0, 0, 1)",
          "line-width": 5,
        }}
      />
    </Source>
  );
}

export default GuessPolyline;
