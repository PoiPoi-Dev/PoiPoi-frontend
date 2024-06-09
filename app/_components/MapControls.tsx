import { NavigationControl, GeolocateControl } from "react-map-gl/maplibre";

const MapControls = (): React.JSX.Element => {
  return (
    <>
      <NavigationControl position="top-right" />
      <GeolocateControl position="bottom-right" trackUserLocation={true} />
    </>
  );
};

export default MapControls;
