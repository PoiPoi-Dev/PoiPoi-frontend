import { MdLeaderboard } from "react-icons/md";
import { MdAccountCircle } from "react-icons/md";
import { ButtonIconCircle } from "./ui/MenuIconCircle";
import { FaMapLocationDot } from "react-icons/fa6";
import Poidex from "./Poidex";
// import SubmitGuessButton from "./SubmitGuessButton";
import { Coordinates } from "../_utils/coordinateMath";

import { Pin } from "../_utils/global";
import Link from "next/link";

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
      <Link href={"/map"}>
        <ButtonIconCircle text="Map">
          <FaMapLocationDot size={24} />
        </ButtonIconCircle>
      </Link>

      <Poidex pins={pins} />

      <Link href="/leaderboard">
        <ButtonIconCircle text="leaderboard">
          <MdLeaderboard size={24} />
        </ButtonIconCircle>
      </Link>

      <Link href={"/login"}>
        <ButtonIconCircle text="account" onClick={() => alert("account")}>
          <MdAccountCircle size={24} />
        </ButtonIconCircle>
      </Link>
    </div>
  );
};

export default GameControls;
