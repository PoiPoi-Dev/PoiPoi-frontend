import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Pin } from "../_utils/global";
import {
  Coordinates,
  GetDistanceFromCoordinatesToMeters,
} from "../_utils/coordinateMath";


interface SubmitGuessButtonProps {
  pins: Pin[];
}

/**
 * TODO: Manage Button states based on closest pin's search radius.
 * This can done by constantly checking the user coordinates.
 * Manage how frequent this call is made.
 **/

function SubmitGuessButton({
  pins,
}: SubmitGuessButtonProps): React.JSX.Element {
  const [trackingPin, setTrackingPin] = useState<Pin | null>(null);
  const [distanceToPin, setDistanceToPin] = useState<number>(0);
  const [isActiveState, setIsActiveState] = useState<boolean>(false);

  useEffect(() => {
    const id = navigator.geolocation.watchPosition((position) => {
      handleTrackingPinAndDistanceToPin(position.coords);
    });
    return () => navigator.geolocation.clearWatch(id);
  });

  useEffect(() => {
    if (!trackingPin) return;
    setIsActiveState(isWithinSearchZone());
  }, [trackingPin, distanceToPin]);


  const handleTrackingPinAndDistanceToPin = (
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
      //Change based on new schema
      if(pin.is_completed){
        continue;
      }
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

  const handleSubmitGuessOnClick = () => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      console.log(`user location is lat: ${latitude}, long: ${longitude}`)
      console.log(`user is ${distanceToPin} away from the poi`)
    },
    error => {
      console.error('Error getting location:', error);
    },
    {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    }
  )
  };

  const handleButtonTextRender = ():string => {
   return "Submit your answer?";
  }

  return (
    <div
    className="fixed bottom-20 left-0 w-full h-20 flex justify-center items-center"
    style={{ visibility: isActiveState ? "visible" : "hidden" }}>
      <Button className="w-full h-full" disabled={!isActiveState} onClick={handleSubmitGuessOnClick}>
        {handleButtonTextRender()}
      </Button>
    </div>
  );

}

export default SubmitGuessButton;
