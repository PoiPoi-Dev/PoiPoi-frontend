import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Pin } from "../_utils/global";
import { Coordinates, GetDistanceFromCoordinatesToMeters } from "../_utils/coordinateMath";
import { getAuthService } from "@/config/firebaseconfig";

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
 * Solution: relevant data is now passed by props
 **/

function SubmitGuessButton({
  trackingPin,
  userCoordinates,
  distanceToTrackingPin,
}: SubmitGuessButtonProps): React.JSX.Element {
  const [isActiveState, setIsActiveState] = useState<boolean>(false);

  const isWithinSearchRadius = (distance: number, pin:Pin) => {
    return distance < pin.search_radius
  }

  useEffect(() => {
    if (distanceToTrackingPin === null) return;

    if (trackingPin)
      setIsActiveState(isWithinSearchRadius(distanceToTrackingPin, trackingPin));  

  },[distanceToTrackingPin, trackingPin])

  const postGuess = async (poi_id: number, distance: number):Promise<Response|void> => {
    try {
    const auth = await getAuthService(); //gives auth service
    if (!auth.currentUser) throw 'Not logged in'; //error

    const uid = auth.currentUser.uid;
    const data: {
      distance: number;
      poi_id: number | undefined;
      uid: string;
      search_radius: number | undefined;
      } = {
        distance,
        poi_id,
        uid: uid,
        search_radius: trackingPin?.search_radius,
      };
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
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  const handleSubmitGuessOnClick = async (pin:Pin | null, userCoordinates: Coordinates | null) => {
    try {
      if (!pin) throw 'No pin to track';
      if (!userCoordinates) throw 'No user coordinates'
      const pinCoordinates: Coordinates = {
        longitude: pin.exact_longitude,
        latitude: pin.exact_latitude
      }
      const distanceToPin:number = parseFloat(GetDistanceFromCoordinatesToMeters(userCoordinates, pinCoordinates).toFixed(3));
  
      await postGuess(pin.poi_id, distanceToPin);
      pin.is_completed = true;
      setIsActiveState(false);
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <div
      className="fixed bottom-20 left-0 w-full h-20 flex justify-center items-center"
      style={{ visibility: isActiveState ? "visible" : "hidden" }}
    >
      <Button
        className="w-full h-full"
        disabled={!isActiveState}
        onClick={(): void => void handleSubmitGuessOnClick(trackingPin, userCoordinates)}
      >
        Submit your answer?
      </Button>
    </div>
  );
}

export default SubmitGuessButton;
