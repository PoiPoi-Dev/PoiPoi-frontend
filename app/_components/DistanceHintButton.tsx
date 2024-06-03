import { useState } from "react";
import { Button } from "./ui/button";
import { Pin } from "../_utils/global";
import {
  Coordinates,
  GetDistanceFromCoordinatesToMeters,
} from "../_utils/coordinateMath";

interface DistanceHintButtonProps {
  pins: Pin[];
}

/**
 * TODO: Manage Button states based on closest pin's search radius.
 * This can done by constantly checking the user coordinates.
 * Manage how frequent this call is made.
**/

function DistanceHintButton({
  pins,
}: DistanceHintButtonProps): React.JSX.Element {
  const [trackingPin, setTrackingPin] = useState<Pin | null>(null);
  const [distanceToPin, setDistanceToPin] = useState<number>(0);

  const handleDistanceHintOnClick = () => {
    console.log("Button clicked");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userCoordinates: Coordinates = {
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
        };
        console.log(userCoordinates);
        let shortestDistance: number = Number.MAX_SAFE_INTEGER;
        let pinToTrack: Pin | null = null;

        //Finds the closest pin
        for (const pin of pins) {
          const pinCoordinates: Coordinates = {
            longitude: pin.longitude,
            latitude: pin.latitude,
          };
          const distance: number = GetDistanceFromCoordinatesToMeters(
            userCoordinates,
            pinCoordinates
          );
          if (distance < shortestDistance) {
            console.log(distance, )
            shortestDistance = distance;
            pinToTrack = pin;
          }
        }
        setTrackingPin(pinToTrack);
        setDistanceToPin(shortestDistance);
      },
      (error) => {
        console.error(error);
      }
    );
  };
  return (
    <div className="fixed right-0 bottom-10 w-auto h-auto">
      <Button onClick={handleDistanceHintOnClick}>
        distance to POI: {Math.trunc(distanceToPin)} m
      </Button>
    </div>
  );
}

export default DistanceHintButton;
