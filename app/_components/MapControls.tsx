import { useEffect, useContext } from "react";
import { NavigationControl, GeolocateControl, useMap } from "react-map-gl/maplibre";
import {ImportantPinContext} from "./useContext/ImportantPinContext";
import { Pin } from "../_utils/global";


const MapControls = (): React.JSX.Element => {

  const trackingPinContext = useContext(ImportantPinContext);
  const {current: map} = useMap();

  useEffect(() => {
    if (!trackingPinContext) return;
    if (!trackingPinContext.trackingPin) return;
    console.table(trackingPinContext.trackingPin);
      handlePanMapToTrackingPin(trackingPinContext.trackingPin);
  },[trackingPinContext?.trackingPin])

  const handlePanMapToTrackingPin = (pin: Pin) => {
    try {
      if (!map) throw "Can't find map";
      map.flyTo({
        center: [pin.search_longitude, pin.search_latitude],
        duration: 1000,
        minZoom: 24,
        zoom: 17
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <NavigationControl position="top-right" />
      <GeolocateControl position="bottom-right" trackUserLocation={true} />
    </>
  );
};

export default MapControls;
