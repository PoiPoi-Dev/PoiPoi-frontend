import {
  Coordinates,
  GetDistanceFromCoordinatesToMeters,
} from "../_utils/coordinateMath";
import { Button } from "./ui/button";

const GuessDistanceModal = ({
  guessPoiPosition,
  setGuessPoiPosition,
  userCoordinates,
}: {
  guessPoiPosition: Coordinates;
  setGuessPoiPosition: (arg0: Coordinates | null) => void;
  userCoordinates: Coordinates;
}) => {
  return (
    <div className="absolute bottom-6 flex w-screen justify-center items-center">
      <Button onClick={() => setGuessPoiPosition(null)}>Next</Button>
      <p>
        distance:
        {GetDistanceFromCoordinatesToMeters(userCoordinates, guessPoiPosition) >
        1000
          ? (
              GetDistanceFromCoordinatesToMeters(
                userCoordinates,
                guessPoiPosition
              ) / 1000
            ).toFixed(2) + "km."
          : GetDistanceFromCoordinatesToMeters(
              userCoordinates,
              guessPoiPosition
            ).toFixed(2) + "m."}
      </p>
    </div>
  );
};

export default GuessDistanceModal;
