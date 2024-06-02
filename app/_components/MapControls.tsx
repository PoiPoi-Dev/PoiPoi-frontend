import { NavigationControl, GeolocateControl } from "react-map-gl/maplibre";

const MapControls = ():React.JSX.Element => {
  return (
  <>
    <NavigationControl position="top-right"/>
    <GeolocateControl position="top-right" />
  </>
  )
}

export default MapControls;