import { Layer, Source } from "react-map-gl/maplibre";

type Props = {
  locationArray: [number, number][];
};

/**
 * function to render polyline between user location and guess location
 * @param userLatitude
 * @param userLongitude
 * @param guessLatitude
 * @param guessLongitude
 * @returns line element as JSX.component
 */
function GuessPolyline({ locationArray }: Props): JSX.Element {
  const [userLongitude, userLatitude] = locationArray[0];
  const [guessLongitude, guessLatitude] = locationArray[1];

  const lineData = {
    type: "Feature",
    properties: {},
    geometry: {
      type: "LineString",
      coordinates: [
        [userLongitude, userLatitude],
        [guessLongitude, guessLatitude],
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
          "line-color": "rgba(3, 170, 238, 0.5)",
          "line-width": 5,
        }}
      />
    </Source>
  );
}

export default GuessPolyline;
