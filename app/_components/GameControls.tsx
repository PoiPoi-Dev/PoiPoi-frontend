import { Pin } from "../_utils/global"
import Poidex from "./Poidex";
import SubmitGuessButton from "./SubmitGuessButton";

interface GameControlsProps {
  pins: Pin[],
}

const GameControls = ({pins}:GameControlsProps):React.JSX.Element => {
  return (
    <div>
      <SubmitGuessButton pins={pins} />
      <Poidex pins={pins}/>
    </div>
  )
}

export default GameControls;