import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Pin } from "../_utils/global";
import {
  Coordinates,
  GetDistanceFromCoordinatesToMeters,
} from "../_utils/coordinateMath";
import Image from "next/image";

interface PoiPhotoToggleProps {
  pins: Pin[];
}

const PoiPhotoToggle = ({ pins }: PoiPhotoToggleProps): React.JSX.Element => {
  const [trackingPin, setTrackingPin] = useState<Pin | null>(null);
  const [distanceToPin, setDistanceToPin] = useState<number>(0);
  const [isActiveState, setIsActiveState] = useState<boolean>(false);
  const [showPhoto, setShowPhoto] = useState<boolean>(true);

  useEffect(() => {
    const id = navigator.geolocation.watchPosition((position) => {
      handleTrackingPinAndDistanceToPin(position.coords);
    });
    return () => navigator.geolocation.clearWatch(id);
  }, [pins]);

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

    // Finds the closest pin
    for (const pin of pins) {
      if (pin.is_completed) {
        continue;
      }
      const pinCoordinates: Coordinates = {
        longitude: pin.search_longitude,
        latitude: pin.search_latitude,
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

  return (
    <div
      className="fixed inset-0 flex items-end justify-center pointer-events-none z-50 bottom-0 pb-40"
      style={{ bottom: "40px" }}
    >
      {isActiveState && (
        <div
          className={`relative flex flex-col items-center ${
            showPhoto ? "bg-white p-4 border rounded shadow-lg" : ""
          } pointer-events-auto`}
        >
          {showPhoto && trackingPin && (
            <Image
              src={trackingPin.img_url}
              alt={trackingPin.title}
              width={300}
              height={400}
              sizes="(max-width: 300px) 100vw, 300px"
              className="object-cover h-[460px] border-8 border-white mb-2"
            />
          )}
          <Button
            className="mt-2 absolute bottom-0 z-[999]"
            onClick={() => setShowPhoto(!showPhoto)}
          >
            {showPhoto ? "Show Map" : "Show Photo"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default PoiPhotoToggle;
