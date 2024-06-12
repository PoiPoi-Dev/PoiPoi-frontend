import { Popover, PopoverContent } from "@radix-ui/react-popover";
import PoiPopup from "./PoiPopup";
import { Pin } from "../_utils/global";
import { Coordinates } from "../_utils/coordinateMath";

const PopoverCard = ({
  poiData,
  selectedPoiId,
  setShowPopup,
  setGuessPoiPosition,
  userCoordinates,
  setScore
}: {
  poiData: Pin[];
  selectedPoiId: number;
  setShowPopup: (arg0: boolean) => void;
  setGuessPoiPosition?: (arg0: Coordinates | null) => void;
  userCoordinates?: Coordinates | null;
  setScore: (arg0: number|null) => void;
}) => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen">
      <Popover defaultOpen>
        <PopoverContent>
          {setShowPopup && setGuessPoiPosition && userCoordinates && (
            <PoiPopup
              id={selectedPoiId}
              setShowPopup={setShowPopup}
              setGuessPoiPosition={setGuessPoiPosition}
              payload={poiData.filter((pin) => pin.poi_id === selectedPoiId)[0]}
              userCoordinates={userCoordinates}
              setScore={setScore}
            />
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default PopoverCard;
