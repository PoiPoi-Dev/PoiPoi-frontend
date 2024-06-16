import { useState, useEffect } from "react";
import { Pin } from "../_utils/global";
import {
  Coordinates,
  // GetDistanceFromCoordinatesToMeters,
  isCoordinatesWithinPinSearchZone,
} from "../_utils/coordinateMath";
import Image from "next/image";

interface PoiPhotoToggleProps {
  // pins: Pin[];
  userCoordinates: Coordinates | null;
  closestNotCompletedPin: Pin | null;
  showPopup: boolean;
  setShowPopup: (arg0: boolean) => void;
  setSelectedPoiId: React.Dispatch<React.SetStateAction<number | undefined>>;
}

const PoiPhotoToggle = ({
  // pins,
  userCoordinates,
  closestNotCompletedPin,
  showPopup,
  setShowPopup,
  setSelectedPoiId,
}: PoiPhotoToggleProps): React.JSX.Element => {
  // USE STATE
  const [pinToDisplay, setPinToDisplay] = useState<Pin | null>(closestNotCompletedPin);
  // const [distanceToPin, setDistanceToPin] = useState<number>(0);
  const [isActiveState, setIsActiveState] = useState<boolean>(false);

  // USE EFFECT
  // useEffect(() => {
  //   const id = navigator.geolocation.watchPosition((position) => {
  //     handleTrackingPinAndDistanceToPin(position.coords);
  //   });
  //   return () => navigator.geolocation.clearWatch(id);
  // }, [pins, pinToDisplay?.is_completed]);

  useEffect(() => {
    setPinToDisplay(closestNotCompletedPin);
  },[closestNotCompletedPin])

  useEffect(() => {
    if (!pinToDisplay) {
      setIsActiveState(false);
      return;
    }
    if (!userCoordinates) {
      setIsActiveState(false)
      return;
    }
      setIsActiveState(isCoordinatesWithinPinSearchZone(userCoordinates, pinToDisplay));
  }, [pinToDisplay, userCoordinates]);

  // HANDLER FUNCTION
  const handleRenderPhoto = () => {
    return showPopup ? null : (
      <div className="relative flex flex-col items-center">
        {pinToDisplay && isActiveState && (
          <Image
            src={pinToDisplay.img_url}
            alt={pinToDisplay.title}
            width={300}
            height={400}
            className="fixed right-2.5 bottom-52 object-cover w-16 h-16 border-solid border-2 border-white rounded-xl z-100"
            onClick={() => {
              setSelectedPoiId(pinToDisplay.poi_id);
              setShowPopup(true);
            }}
          />
        )}
      </div>
    );
  };

  // const handleTrackingPinAndDistanceToPin = (
  //   userCoords: GeolocationCoordinates
  // ) => {
  //   const userCoordinates: Coordinates = {
  //     longitude: userCoords.longitude,
  //     latitude: userCoords.latitude,
  //   };
  //   let shortestDistance: number = Number.MAX_SAFE_INTEGER;
  //   let pinToTrack: Pin | null = null;

  //   // Finds the closest pin
  //   for (const pin of pins) {
  //     if (pin.is_completed) {
  //       continue;
  //     }
  //     const pinCoordinates: Coordinates = {
  //       longitude: pin.search_longitude,
  //       latitude: pin.search_latitude,
  //     };
  //     const distance: number = GetDistanceFromCoordinatesToMeters(
  //       userCoordinates,
  //       pinCoordinates
  //     );
  //     if (distance < shortestDistance) {
  //       shortestDistance = distance;
  //       pinToTrack = pin;
  //     }
  //   }
  //   setPinToDisplay(pinToTrack);
  //   setDistanceToPin(shortestDistance);
  // };

  // const isWithinSearchZone = (): boolean => {
  //   if (pinToDisplay) return distanceToPin < pinToDisplay.search_radius;
  //   else return false;
  // };

  // RETURN
  return <>{isActiveState ? handleRenderPhoto() : null}</>;
};

export default PoiPhotoToggle;
