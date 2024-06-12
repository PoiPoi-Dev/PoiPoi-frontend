import { useContext, useEffect, useRef, useState } from "react";
import { Drawer, DrawerContent, DrawerTrigger } from "./ui/drawer";
import {
  Coordinates,
  GetDistanceFromCoordinatesToMeters,
} from "../_utils/coordinateMath";
import { Button } from "./ui/button";
import { ImportantPinContext } from "./useContext/ImportantPinContext";
import { Pin } from "../_utils/global";

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
  const importantPinContext = useContext(ImportantPinContext);
  const [distanceToPin, setDistancePin] = useState<number>(0);
  const [hint, setHint] = useState<string>(''); 
  const drawerRef = useRef<HTMLButtonElement>(null); // Ref for the Done button
  const thresholdDistance = 20;

  useEffect(() => {
    if (!importantPinContext || !importantPinContext.guessedPin) return;
    handleDistanceToPin(importantPinContext.guessedPin, userCoordinates);
  }, [importantPinContext?.guessedPin]);

  const handleDistanceToPin = (guessedPin: Pin, userCoordinates: Coordinates) => {
    const pinCoordinates: Coordinates = {
      longitude: guessedPin.exact_longitude,
      latitude: guessedPin.exact_latitude,
    };

    const distance = GetDistanceFromCoordinatesToMeters(userCoordinates, pinCoordinates);
    setDistancePin(distance);
  };

  const handleSubmitHint = async () => {
    const hintData = {
      poi_id: importantPinContext?.guessedPin?.poi_id,
      content: hint,
    };
    console.log(hintData)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posthint`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(hintData),
      });

      if (response.status === 201) {
        alert('Hint submitted successfully! Now get out there and find more POIS!');
        drawerRef.current?.click(); // Simulate clicking the Done button
      } else {
        const responseData = await response.json() as { message?: string };
        alert(`Failed to submit hint: ${responseData.message || 'Unknown error'}`);
      }
    } catch (error) {
      alert(`Error submitting hint: ${(error as Error).message}`);
    }
  };

  const handleSubmitClick = () => {
    handleSubmitHint().catch(console.error);
  };

  return (
    <div className="absolute bottom-60 flex w-screen justify-center items-center">
      <Drawer>
        <DrawerTrigger asChild>
          <Button>Next</Button>
        </DrawerTrigger>
       
          <p>
          You guessed {GetDistanceFromCoordinatesToMeters(
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
        {distanceToPin < thresholdDistance ? (
            <>
              <h2>{`Nice Guessing! How about leaving a hint for someone else?`}</h2>
              <p>{`(Be sure to be helpful! But don't just give it away!)`}</p>
              <input
                type="text"
                value={hint} 
                onChange={(e) => setHint(e.target.value)}
                className="border p-2 mt-2 w-full"
              />
              <div className="mt-4 flex justify-end">
                <Button onClick={handleSubmitClick} className="mr-2">
                  Submit Hint
                </Button>
              </div>
            </>
          ) : (
            <>
              <h2>{`Good effort! Try to get within 20 meters next time!`}</h2>
              <p>{`(You'll be able to leave a hint if you're close enough!)`}</p>
            </>
          )}
          <Button ref={drawerRef} onClick={() => setGuessPoiPosition(null)}>Done</Button>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default GuessDistanceModal;
