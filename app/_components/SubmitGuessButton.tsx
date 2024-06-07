import { useState, useEffect, useContext } from "react";
import { Button } from "./ui/button";
import { Pin } from "../_utils/global";
import {
  Coordinates,
  GetDistanceFromCoordinatesToMeters,
} from "../_utils/coordinateMath";

import { getAuthService } from "@/config/firebaseconfig";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

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
  const [trackingPin, setTrackingPin] = useState<Pin | null>(null); //arb pin?
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
      if (pin.is_completed) {
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
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        console.log(`user location is lat: ${latitude}, long: ${longitude}`);
        console.log(
          `user is ${parseFloat(distanceToPin.toFixed(3))}m away from the poi`
        );

        try {
          const auth = await getAuthService(); //gives auth service
          if (!auth.currentUser) return; //error
          const uid = auth.currentUser.uid;
          console.log(`user id is ${uid}`);
          const playerGuess = parseFloat(distanceToPin.toFixed(3));
          const data: {
            distance: number;
            poi_id: number | undefined;
            uid: string;
          } = {
            distance: playerGuess,
            poi_id: trackingPin?.poi_id,
            uid: uid,
          };
          console.log("data", data);
          const response: Response = await fetch(
            `${BASE_URL}/api/user_profiles/completed_poi`,
            {
              method: "POST",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            }
          );
          //checking the tracking pin id against all POIs
          for (let pin of pins) {
            if (pin.poi_id === trackingPin?.poi_id) {
              trackingPin.is_completed = true;
            }
            console.log(pin);
          }
          console.log("response", response);
        } catch (error) {
          console.error("Error", error);
        }
      },
      (error) => {
        console.error("Error getting location:", error);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
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
        onClick={handleSubmitGuessOnClick}
      >
        {handleButtonTextRender()}
      </Button>
    </div>
  );
}

export default SubmitGuessButton;
