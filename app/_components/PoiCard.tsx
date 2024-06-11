import Image from "next/image";
import { Button } from "./ui/button";
import { useContext, useState } from "react";
import { Pin } from "../_utils/global";
import { AuthContext } from "./useContext/AuthContext";
import { TrackingPinContext } from "./useContext/TrackingPinContext";
import {
  Coordinates,
  GetDistanceFromCoordinatesToMeters,
} from "../_utils/coordinateMath";

export function PoiCard({
  id,
  payload,
  setGuessPoiPosition,
  setShowPopup,
  userCoordinates,
}: {
  id: number;
  payload: Pin;
  setGuessPoiPosition?: (arg0: Coordinates | null) => void;
  setShowPopup?: (arg0: undefined) => void;
  userCoordinates?: Coordinates | null;
}): JSX.Element {
  // USE STATE
  const [collect, setCollect] = useState<boolean | undefined>(
    payload.is_completed
  );
  const user = useContext(AuthContext);
  const trackingPinContext = useContext(TrackingPinContext);
  const { search_latitude, search_longitude } = payload;
  const pinCoordinates: Coordinates = {
    latitude: search_latitude,
    longitude: search_longitude,
  };

  // HANDLERS FUNCTIONS
  const handleCheckUserInSearchZone = (): boolean => {
    if (!userCoordinates) return false;
    return (
      GetDistanceFromCoordinatesToMeters(userCoordinates, pinCoordinates) < payload.search_radius
    );
  };

  // RETURN
  return (
    <section className="relative top-0 flex flex-col bg-gray-300 w-[300px] min-h-[600px] max-h-full rounded-2xl overflow-hidden border-solid border-white border-4 z-[999]">
      {/* IMAGE */}
      <Image
        src={payload.img_url}
        alt={payload.title}
        width={300}
        height={400}
        sizes="(max-width: 300px) 100vw, 300px"
        priority
        className="object-cover h-[460px]"
      />

      <article className="flex-auto max-h-full w-full p-2">
        <h1 className="text-2xl font-bold text-black p-0 m-0 mb-2">
          {payload.title}
        </h1>

        {/* TAG */}
        <div className="flex flex-wrap gap-2 text-sm mb-2">
          {payload.tags.map(
            (tag: string): JSX.Element => (
              <a
                key={tag + id}
                className="rounded-full p-1 bg-blue-500 min-w-[80px] text-center"
              >
                {tag}
              </a>
            )
          )}
        </div>

        {/* COLLECT BUTTON OR DESCRIPTION */}
        {collect && userCoordinates ? (
          <p className="truncate">{payload.description}</p>
        ) : (
          <Button
            id={`${id}`}
            className="w-full mt-4 rounded-lg"
            
            onClick={() => {
              if (user) {
                if (!handleCheckUserInSearchZone()) {
                  if (trackingPinContext) {
                    trackingPinContext.setTrackingPin(payload);
                  }
                } else {
                  setCollect(true);
                  setShowPopup && setShowPopup(undefined);
                  setGuessPoiPosition &&
                    setGuessPoiPosition({
                      latitude: payload.exact_latitude,
                      longitude: payload.exact_longitude,
                    });
                  payload.is_completed = true;
                  }
              } else {
                alert("please login");
              }
            }}
          >
            {!handleCheckUserInSearchZone()
              ? "Too far! Track this pin?"
              : "Guess and collect"}
          </Button>
        )}
      </article>
    </section>
  );
}
