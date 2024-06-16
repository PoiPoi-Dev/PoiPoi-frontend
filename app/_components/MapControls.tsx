import { useEffect, useContext, useRef } from "react";
import { NavigationControl, GeolocateControl, useMap } from "react-map-gl/maplibre";
import {ImportantPinContext} from "./useContext/ImportantPinContext";
import { Pin } from "../_utils/global";

const MapControls = (): React.JSX.Element => {
  // const trackingPinContext = useContext(ImportantPinContext);
  // const {current: map} = useMap();

  const geolocationRef = useRef<maplibregl.GeolocateControl|null>(null);

  useEffect(() => {
    if (!geolocationRef.current) {
      return;
    }
    geolocationRef.current.trigger();
  }, [geolocationRef.current])

  // useEffect(() => {
  //   if (!trackingPinContext) return;
  //   if (!trackingPinContext.trackingPin) return;
  //   console.table(trackingPinContext.trackingPin);
  //     handlePanMapToTrackingPin(trackingPinContext.trackingPin);
  // },[trackingPinContext?.trackingPin])

  // const handlePanMapToTrackingPin = (pin: Pin) => {
  //   try {
  //     if (!map) throw "Can't find map";
  //     map.flyTo({
  //       center: [pin.search_longitude, pin.search_latitude],
  //       duration: 1000,
  //       minZoom: 24,
  //       zoom: 17
  //     });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  const handleGeolocateError = (error: GeolocationPositionError) => {
    console.log("geolocate error detected");
    if (error.code === error.PERMISSION_DENIED) {
      alert("Geolocation permission denied. Please enable geolocation in your browser settings.");
    } 
    if (error.code === error.POSITION_UNAVAILABLE) {
      alert("Geolocation has permission, however position unavailable.");
    }
  };

  return (
    <>
      <NavigationControl position="top-right" />
      <GeolocateControl position="bottom-right" trackUserLocation={true} ref={geolocationRef} onError={handleGeolocateError}/>
    </>
  );
};

export default MapControls;
