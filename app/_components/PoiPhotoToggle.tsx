import { useState, useEffect } from "react";
import { Pin } from "../_utils/global";
import {
  Coordinates,
  isCoordinatesWithinPinSearchZone,
} from "../_utils/coordinateMath";
import Image from "next/image";

interface PoiPhotoToggleProps {
  userCoordinates: Coordinates | null;
  closestNotCompletedPin: Pin | null;
  showPopup: boolean;
  setShowPopup: (arg0: boolean) => void;
  setSelectedPoiId: React.Dispatch<React.SetStateAction<number | undefined>>;
}

const PoiPhotoToggle = ({
  userCoordinates,
  closestNotCompletedPin,
  showPopup,
  setShowPopup,
  setSelectedPoiId,
}: PoiPhotoToggleProps): React.JSX.Element => {
  // USE STATE
  const [pinToDisplay, setPinToDisplay] = useState<Pin | null>(closestNotCompletedPin);
  const [isActiveState, setIsActiveState] = useState<boolean>(false);

  // USE EFFECT

  useEffect(() => {
    setPinToDisplay(closestNotCompletedPin);
  },[closestNotCompletedPin])

  useEffect(() => {
    if (!pinToDisplay || !userCoordinates) {
      setIsActiveState(false);
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

  // RETURN
  return <>{isActiveState ? handleRenderPhoto() : null}</>;
};

export default PoiPhotoToggle;
