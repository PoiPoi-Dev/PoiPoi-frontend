import { Popover, PopoverContent } from "@radix-ui/react-popover";
import PoiPopup from "./PoiPopup";
import { Pin } from "../_utils/global";
import { Coordinates } from "../_utils/coordinateMath";

const PopoverCard = ({
  poiData,
  selectedPoiId,
  setShowPopup,
  setGuessPoiPosition,
  userCoordinates
}: {
  poiData: Pin[];
  selectedPoiId: number;
  setShowPopup: (arg0: undefined) => void;
  setGuessPoiPosition: (arg0: Coordinates | null) => void;
  userCoordinates: Coordinates | null
}) => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen">
      <Popover defaultOpen>
        <PopoverContent>
          <PoiPopup
            id={selectedPoiId}
            setShowPopup={setShowPopup}
            setGuessPoiPosition={setGuessPoiPosition}
            payload={poiData.filter((pin) => pin.poi_id === selectedPoiId)[0]}
            userCoordinates={userCoordinates}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default PopoverCard;
