import { useContext, useEffect, useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
// import {
//   Drawer,
//   DrawerContent,
//   DrawerDescription,
//   DrawerFooter,
//   DrawerHeader,
//   DrawerTitle,
//   DrawerTrigger,
// } from "./ui/drawer";
// import DrawerCloseButton from "./ui/drawerCloseButton";
import { Pin } from "../_utils/global";
import { ImportantPinContext } from "./useContext/ImportantPinContext";
import { useMap } from "react-map-gl/maplibre";

interface MainQuestProps {
  closestNotCompletedPin: Pin|null
}

const MainQuest = ({closestNotCompletedPin: closestPin}:MainQuestProps) => {
  const trackingPinContext = useContext(ImportantPinContext);
  const [pinToPanTo, setPinToPanTo] = useState<Pin|null>(null);
  const [isTracking, setIsTracking] = useState<boolean>(false);
  const {current: map} = useMap();

  useEffect(() => {
    console.log(trackingPinContext?.trackingPin);
    if (!trackingPinContext || !trackingPinContext.trackingPin){
      setIsTracking(false);
      setPinToPanTo(closestPin);
      return;
    } 
    if (!closestPin) {
      setPinToPanTo(null);
      return;
    }
    setPinToPanTo(trackingPinContext.trackingPin);
    setIsTracking(true);
  },[trackingPinContext?.trackingPin, closestPin])

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

  const handleRenderMainQuestText = (pin: Pin):string => {
    if (isTracking) return `Tracking the ${pin.title} POI`;
    return `The closest POI is ${pin.title}`;
  }

  return (
      <div className="box h-fit w-screen" onClick={() => {
        if (pinToPanTo)
          handlePanMapToTrackingPin(pinToPanTo)
      }}>
        <div className="fixed top-4 left-4 z-50 bg-white rounded-full h-12 w-auto px-5 mx-auto flex items-center justify-center shadow-2xl gap-4 cursor-pointer">
          <FaLocationDot size={24} className="text-primary" />
          {(!pinToPanTo) ? 
            "No pin to go to!"
           : handleRenderMainQuestText(pinToPanTo)}
        </div>
      </div>
  );
};

export default MainQuest;
