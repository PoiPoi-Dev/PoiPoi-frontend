import { useContext, useEffect, useState } from "react";
import { FaMapPin } from "react-icons/fa";
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
  closestNotCompletedPin: Pin | null;
}

const MainQuest = ({ closestNotCompletedPin: closestPin }: MainQuestProps) => {
  const trackingPinContext = useContext(ImportantPinContext);
  const [pinToPanTo, setPinToPanTo] = useState<Pin | null>(null);
  const [isTracking, setIsTracking] = useState<boolean>(false);
  const { current: map } = useMap();

  useEffect(() => {
    console.log(trackingPinContext?.trackingPin);
    if (!trackingPinContext || !trackingPinContext.trackingPin) {
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
  }, [trackingPinContext?.trackingPin, closestPin]);

  const handlePanMapToTrackingPin = (pin: Pin) => {
    try {
      if (!map) throw "Can't find map";
      map.flyTo({
        center: [pin.search_longitude, pin.search_latitude],
        duration: 1000,
        minZoom: 24,
        zoom: 17,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleRenderMainQuestText = (pin: Pin): string => {
    if (isTracking) return `Tracking the ${pin.title} POI`;
    return `The closest POI is ${pin.title}`;
  };

  return (
    <div
      className="fixed box-border w-screen h-12 top-4 left-0 z-50 px-20 flex justify-between gap-4"
      onClick={() => {
        if (pinToPanTo) handlePanMapToTrackingPin(pinToPanTo);
      }}
    >
      {/* <div className="w-[48px] h-[48px] shrink-0 rounded-full border-mix p-1">
        <div className="w-full h-full bg-white rounded-full z-50"></div>
      </div> */}

      <div className="rounded-full h-12 w-full flex gap-4 cursor-pointer card border-mix p-1 shrink">
        <div className="flex z-50 bg-white/80 w-full h-full rounded-full justify-center items-center px-4">
          <FaMapPin size={24} className="text-primary mr-4" />
          <h1 className="text-primary-500 text-sm font-semibold truncate">
            {!pinToPanTo
              ? "Select POI to track!"
              : handleRenderMainQuestText(pinToPanTo)}
          </h1>
        </div>
      </div>

      {/* <div className="w-[48px] h-[48px] shrink-0 rounded-full border-mix p-1">
        <div className="w-full h-full bg-white rounded-full z-50"></div>
      </div> */}
    </div>
  );
};

export default MainQuest;
