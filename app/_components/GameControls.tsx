import { Pin } from "../_utils/global";
import Poidex from "./Poidex";

interface GameControlsProps {
  pins: Pin[];
}

const GameControls = ({ pins }: GameControlsProps): React.JSX.Element => {
  return (
    <div>
      <Poidex pins={pins} />
    </div>
  );
};

export default GameControls;
