import { useState, useEffect } from "react";
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
  const [isActiveState, setIsActiveState] = useState<boolean>(false);
  const [isShowingDistance, setIsShowingDistance] = useState<boolean>(false);

  useEffect(() => {
    const id = navigator.geolocation.watchPosition((position) => {
      handleDistanceHintButtonState(position.coords);
    });
    return () => navigator.geolocation.clearWatch(id);
  });

  useEffect(() => {
    if (!trackingPin) return;
    setIsActiveState(isWithinSearchZone());
  }, [trackingPin, distanceToPin]);

  useEffect(() => {
    if (!isActiveState) setIsShowingDistance(false);
  }, [isActiveState]);

  const handleDistanceHintButtonState = (
    userCoords: GeolocationCoordinates
  ) => {
    const userCoordinates: Coordinates = {
      longitude: userCoords.longitude,
      latitude: userCoords.latitude,
    };
    let shortestDistance: number = Number.MAX_SAFE_INTEGER;
    let pinToTrack: Pin | null = null;

    //Finds the closest pin
    for (const pin of pins) {
      const pinCoordinates: Coordinates = {
        longitude: pin.exact_longitude,
        latitude: pin.exact_latitude,
      };
      const distance: number = GetDistanceFromCoordinatesToMeters(
        userCoordinates,
        pinCoordinates
      );
      if (distance < shortestDistance) {
        shortestDistance = distance;
        pinToTrack = pin;
      }
    }
    setTrackingPin(pinToTrack);
    setDistanceToPin(shortestDistance);
  };

  const isWithinSearchZone = (): boolean => {
    if (trackingPin) return distanceToPin < trackingPin.search_radius;
    else return false;
  };

  const handleDistanceHintOnClick = () => {
    setIsShowingDistance(true);
  };

  const handleButtonTextRender = (): string => {
    if (!isActiveState) return "Not in Search Zone!";
    if (isShowingDistance)
      return `distance to POI: ${Math.trunc(distanceToPin)} m`;
    else return `Want distance to POI?`;
  };

  return (
    <div className="fixed right-0 bottom-10 w-auto h-auto">
      <Button disabled={!isActiveState} onClick={handleDistanceHintOnClick}>
        {handleButtonTextRender()}
      </Button>
    </div>
  );
}

export default DistanceHintButton;
