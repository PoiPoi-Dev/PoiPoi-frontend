import { useState } from "react";
import { Button } from "./ui/button";
import { Pin } from "../_utils/global";
import {
  Coordinates,
  DegreesToMeters,
  GetDistanceFromCoordinatesToMeters,
} from "../_utils/coordinateMath";

interface DistanceHintButtonProps {
  pins: Pin[];
}

function DistanceHintButton({
  pins,
}: DistanceHintButtonProps): React.JSX.Element {
  const [trackingPin, setTrackingPin] = useState<Pin | null>(null);
  const [distanceToPin, setDistanceToPin] = useState<number | null>(null);

  const handleDistanceHintOnClick = () => {
    console.log("Button clicked");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userCoordinates: Coordinates = {
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
        };
        console.log(userCoordinates);
        let shortestDistance: number = Math.max();
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
          console.log(distance);
          if (distance < shortestDistance) {
            shortestDistance = distance;
            pinToTrack = pin;
          }
        }

        setTrackingPin(pinToTrack);
        const distanceInMeters = DegreesToMeters(shortestDistance);
        setDistanceToPin(distanceInMeters);
      },
      (error) => {
        console.error(error);
      }
    );
  };
  return (
    <div className="fixed right-0 bottom-10 w-auto h-auto">
      <Button onClick={handleDistanceHintOnClick}>
        distance to POI: {distanceToPin}
      </Button>
    </div>
  );
}

export default DistanceHintButton;
