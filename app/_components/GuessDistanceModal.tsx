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
}: {
  guessPoiPosition: Coordinates;
  setGuessPoiPosition: (arg0: Coordinates | null) => void;
  userCoordinates: Coordinates;
}) => {
  return (
    <div className="absolute bottom-60 flex w-screen justify-center items-center">
      <Drawer>
        <DrawerTrigger asChild>
          <Button>Next</Button>
        </DrawerTrigger>
        <DrawerContent>
          <Button onClick={() => setGuessPoiPosition(null)}>Done</Button>
          <p>
            distance:
            {GetDistanceFromCoordinatesToMeters(
              userCoordinates,
              guessPoiPosition
            ) > 1000
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
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default GuessDistanceModal;
