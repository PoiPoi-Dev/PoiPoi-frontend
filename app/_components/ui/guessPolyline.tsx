import { Layer, Source } from "react-map-gl/maplibre";

type Props = {
  locationArray: [number | undefined, number | undefined][];
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
  const [userLongitude, userLatitude]: [
    number | undefined,
    number | undefined
  ] = locationArray[0];
  const [guessLongitude, guessLatitude]: [
    number | undefined,
    number | undefined
  ] = locationArray[1];

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
          "line-color": "rgba(0, 0, 0, 1)",
          "line-width": 5,
        }}
      />
    </Source>
  );
}

export default GuessPolyline;
