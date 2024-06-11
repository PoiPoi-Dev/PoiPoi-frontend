import { Pin } from "../_utils/global";
import Poidex from "./Poidex";
// import SubmitGuessButton from "./SubmitGuessButton";
import { Coordinates } from "../_utils/coordinateMath";

interface GameControlsProps {
  pins: Pin[];
  trackingPin: Pin | null;
  userCoordinates: Coordinates | null;
  distanceToTrackingPin: number | null;
}

const GameControls = ({
  pins,
  trackingPin,
  userCoordinates,
  distanceToTrackingPin,
}: GameControlsProps): React.JSX.Element => {
  return (
    <div>
      {/* <SubmitGuessButton
       trackingPin={trackingPin}
       userCoordinates={userCoordinates}
       distanceToTrackingPin={distanceToTrackingPin}
       /> */}
      <Poidex pins={pins} />
    </div>
  );
};

export default GameControls;