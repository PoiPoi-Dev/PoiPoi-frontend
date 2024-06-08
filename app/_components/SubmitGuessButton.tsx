import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Pin } from "../_utils/global";
import {
  Coordinates,
  GetDistanceFromCoordinatesToMeters,
} from "../_utils/coordinateMath";

import { getAuthService } from "@/config/firebaseconfig";
import useGeolocation from "../_hooks/useGeolocation";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

interface SubmitGuessButtonProps {
  trackingPin: Pin | null;
  userCoordinates: Coordinates | null;
  distanceToTrackingPin: number | null;
}

/**
 * TODO: Manage Button states based on closest pin's search radius.
 * This can done by constantly checking the user coordinates.
 * Manage how frequent this call is made.
 **/

function SubmitGuessButton({
  trackingPin,
  userCoordinates,
  distanceToTrackingPin,
}: SubmitGuessButtonProps): React.JSX.Element {
  // const [trackingPin, setTrackingPin] = useState<Pin | null>(null); //arb pin?
  // const [distanceToPin, setDistanceToPin] = useState<number>(0);
  const [isActiveState, setIsActiveState] = useState<boolean>(false);

  const isWithinSearchRadius = (distance: number, pin:Pin) => {
    return distance < pin.search_radius
  }

  useEffect(() => {
    if (distanceToTrackingPin === null) return;

    if (trackingPin)
      setIsActiveState(isWithinSearchRadius(distanceToTrackingPin, trackingPin));  

  },[distanceToTrackingPin, trackingPin])

  // const handleTrackingPinAndDistanceToPin = (
  //   position: GeolocationPosition
  // ) => {
  //   const userCoordinates: Coordinates = ConvertGeolocationPositionToCoordinates(position);
  //   let shortestDistance: number = Number.MAX_SAFE_INTEGER;
  //   let pinToTrack: Pin | null = null;

  //   //Finds the closest pin
  //   for (const pin of pins) {
  //     if (pin.is_completed) {
  //       continue;
  //     }
  //     const pinCoordinates: Coordinates = {
  //       longitude: pin.exact_longitude,
  //       latitude: pin.exact_latitude,
  //     };
  //     const distance: number = GetDistanceFromCoordinatesToMeters(
  //       userCoordinates,
  //       pinCoordinates
  //     );
  //     if (distance < shortestDistance) {
  //       shortestDistance = distance;
  //       pinToTrack = pin;
  //     }
  //   }
  //   setTrackingPin(pinToTrack);
  //   setDistanceToPin(shortestDistance);
    
  //   if (!pinToTrack) return;
  //   setIsActiveState(isWithinSearchRadius(shortestDistance, pinToTrack));
  // };

  useGeolocation(() => console.log('Hello'));

  const postGuess = async (poi_id: number, distance: number) => {
    try {
    const auth = await getAuthService(); //gives auth service
    if (!auth.currentUser) throw 'Not logged in'; //error

    const uid = auth.currentUser.uid;
    const data: {
      distance: number;
      poi_id: number | undefined;
      uid: string;
      } = {
        distance,
        poi_id,
        uid: uid,
      };
      console.log("data", data);
      const response: Response = await fetch(
        `${BASE_URL}/api/user_profiles/completed_poi`,
        {
          credentials: "include",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
    console.log("Response", response);
    } catch (error) {
      console.error(error);
    }
  }

  // const evaluateGuess = async (position: GeolocationPosition) => {
  //   try {
  //   if (!trackingPin) throw 'No pin to track';
  //   const userCoordinates:Coordinates = ConvertGeolocationPositionToCoordinates(position);
  //   const pinCoordinates: Coordinates = {
  //     longitude: trackingPin.exact_longitude,
  //     latitude: trackingPin.exact_latitude
  //   }
  //   const distanceToPin:number = parseFloat(GetDistanceFromCoordinatesToMeters(userCoordinates, pinCoordinates).toFixed(3));

  //   console.log(`user location is lat: ${userCoordinates.latitude}, long: ${userCoordinates.longitude}`);
  //   console.log(`user is ${distanceToPin}m away from the poi`);

  //   await postGuess(trackingPin.poi_id, distanceToPin);
  //   } catch (error) {
  //     console.error("Error", error);
  //   }
  // };

  const handleSubmitGuessOnClick = async () => {
    try {
      if (!trackingPin) throw 'No pin to track';
      if (!userCoordinates) throw 'No user coordinates'
      const pinCoordinates: Coordinates = {
        longitude: trackingPin.exact_longitude,
        latitude: trackingPin.exact_latitude
      }
      const distanceToPin:number = parseFloat(GetDistanceFromCoordinatesToMeters(userCoordinates, pinCoordinates).toFixed(3));
  
      console.log(`user location is lat: ${userCoordinates.latitude}, long: ${userCoordinates.longitude}`);
      console.log(`user is ${distanceToPin}m away from the poi`);
  
      await postGuess(trackingPin.poi_id, distanceToPin);
      trackingPin.is_completed = true;
      setIsActiveState(false);
    } catch (error) {
      console.error("Error", error);
    }
  };

  const handleButtonTextRender = (): string => {
    return "Submit your answer?";
  };

  return (
    <div
      className="fixed bottom-20 left-0 w-full h-20 flex justify-center items-center"
      style={{ visibility: isActiveState ? "visible" : "hidden" }}
    >
      <Button
        className="w-full h-full"
        disabled={!isActiveState}
        onClick={(): void => void handleSubmitGuessOnClick()}
      >
        {handleButtonTextRender()}
      </Button>
    </div>
  );
}

export default SubmitGuessButton;
