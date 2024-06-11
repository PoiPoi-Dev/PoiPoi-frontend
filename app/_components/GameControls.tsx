import { MdLeaderboard } from "react-icons/md";
import { MdAccountCircle } from "react-icons/md";
import { ButtonIconCircle } from "./ui/MenuIconCircle";
import { FaMapLocationDot } from "react-icons/fa6";
import Poidex from "./Poidex";
// import SubmitGuessButton from "./SubmitGuessButton";
import { Coordinates } from "../_utils/coordinateMath";

import { Pin } from "../_utils/global";

interface GameControlsProps {
  pins: Pin[];
  trackingPin: Pin | null;
  userCoordinates: Coordinates | null;
  distanceToTrackingPin: number | null;
}

const GameControls = ({
  pins,
}: // trackingPin,             //For future use by other game controls
// userCoordinates,
// distanceToTrackingPin,
GameControlsProps): React.JSX.Element => {
  return (
    <div className="flex justify-between min-w-[360px] max-w-full">
      <ButtonIconCircle text="Menu" onClick={() => alert("leaderboard")}>
        <FaMapLocationDot size={24} />
      </ButtonIconCircle>

      <Poidex pins={pins} />

      <ButtonIconCircle text="leaderboard" onClick={() => alert("leaderboard")}>
        <MdLeaderboard size={24} />
      </ButtonIconCircle>

      <ButtonIconCircle text="account" onClick={() => alert("account")}>
        <MdAccountCircle size={24} />
      </ButtonIconCircle>
    </div>
  );
};

export default GameControls;
