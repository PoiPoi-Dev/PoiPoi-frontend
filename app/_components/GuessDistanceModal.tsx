import { Drawer, DrawerContent, DrawerTrigger } from "./ui/drawer";
import {
  Coordinates,
  GetDistanceFromCoordinatesToMeters,
} from "../_utils/coordinateMath";
import { Button } from "./ui/button";

const GuessDistanceModal = ({
  guessPoiPosition,
  setGuessPoiPosition,
  userCoordinates,
  score,
}: {
  guessPoiPosition: Coordinates;
  setGuessPoiPosition: (arg0: Coordinates | null) => void;
  userCoordinates: Coordinates;
  score: number|null;
}) => {
  return (
    <div className="absolute bottom-60 flex w-screen justify-center items-center">
      <Drawer>
        <DrawerTrigger asChild>
          
          <Button>Next</Button>
        </DrawerTrigger>
        <p>You guessed {GetDistanceFromCoordinatesToMeters(
              userCoordinates,
              guessPoiPosition
            ) > 1000
              ? (
                  GetDistanceFromCoordinatesToMeters(
                    userCoordinates,
                    guessPoiPosition
                  ) / 1000
                ).toFixed(2) + "km"
              : GetDistanceFromCoordinatesToMeters(
                  userCoordinates,
                  guessPoiPosition
                ).toFixed(2) + "m"} away from the picture and your score is {score}! Good job!</p>
        <DrawerContent>
          <Button onClick={() => setGuessPoiPosition(null)}>Done</Button>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default GuessDistanceModal;
