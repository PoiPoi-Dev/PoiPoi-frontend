import Image from "next/image";
import { Button } from "./ui/button";
import { useContext, useState } from "react";
import { User } from "firebase/auth";
import { Pin } from "../_utils/global";
import { AuthContext } from "./useContext/AuthContext";
import { ImportantPinContext } from "./useContext/ImportantPinContext";
import {
  Coordinates,
  GetDistanceFromCoordinatesToMeters,
} from "../_utils/coordinateMath";
import { Badge } from "./ui/badge";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export function PoiCard({
  id,
  payload,
  setGuessPoiPosition,
  setShowPopup,
  userCoordinates,
  setScore,
}: {
  id: number;
  payload: Pin;
  setGuessPoiPosition?: (arg0: Coordinates | null) => void;
  setShowPopup?: (arg0: boolean) => void;
  userCoordinates: Coordinates | null;
  setScore: (arg0: number|null) => void;
  
}): JSX.Element {
  // USE STATE
  const [collect, setCollect] = useState<boolean | undefined>(
    payload.is_completed
  );
  const user = useContext(AuthContext);
  const importantPinContext = useContext(ImportantPinContext);
  const { search_latitude, search_longitude } = payload;
  const pinCoordinates: Coordinates = {
    latitude: search_latitude,
    longitude: search_longitude,
  };
  //hint useStates
  const [isOpen, setIsOpen] = useState(false);
  const [hints, setHints] = useState<string[] | undefined[]>([]);
  // HANDLERS FUNCTIONS
  const handleCheckUserInSearchZone = (): boolean => {
    if (!userCoordinates) return false;
    return (
      GetDistanceFromCoordinatesToMeters(userCoordinates, pinCoordinates) <
      payload.search_radius
    );
  };

  const PostGuess = async (
    user: User,
    pin: Pin,
    distance: number
  ): Promise<Response | void> => {
    try {
      if (!user) throw "Not logged in"; //error
      if (!pin) throw "Can not get pin";

      const uid = user.uid;
      const { poi_id, search_radius } = pin;
      const data: {
        distance: number;
        poi_id: number | undefined;
        uid: string;
        search_radius: number | undefined;
      } = {
        distance,
        poi_id,
        uid: uid,
        search_radius,
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
      const JSONresponse = response.json() as Promise<Response>;
      return JSONresponse;
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmitGuessOnClick = async (
    user: User,
    pin: Pin | null,
    userCoordinates: Coordinates | null
  ) => {
    try {
      if (!user) throw "Not logged in";
      if (!pin) throw "No pin to track";
      if (!userCoordinates) throw "No user coordinates";

      const pinCoordinates: Coordinates = {
        longitude: pin.exact_longitude,
        latitude: pin.exact_latitude,
      };
      const distanceToPin: number = parseFloat(
        GetDistanceFromCoordinatesToMeters(
          userCoordinates,
          pinCoordinates
        ).toFixed(3)
      );

      const score = await PostGuess(user, payload, distanceToPin);
      if (typeof score === "number") {
        setScore(score);
      } else {
        console.log("Unexpected response:", score);
      }
      updatePoi();
    } catch (error) {
      console.error("Error", error);
    }
  };

  const updatePoi = () => {
    setCollect(true);
    setShowPopup && setShowPopup(false);
    setGuessPoiPosition &&
      setGuessPoiPosition({
        latitude: payload.exact_latitude,
        longitude: payload.exact_longitude,
      });
    payload.is_completed = true;
    if (!importantPinContext) return;
    importantPinContext.setGuessedPin(payload);
  };

  //handle hints
  const handleGetHintOnClick = async (
    user: User,
    pin: Pin | null,
    userCoordinates: Coordinates | null
  ) => {
    try {
      if (!user) throw "Not logged in";
      if (!pin) throw "No pin to track";
      if (!userCoordinates) throw "No user coordinates";

      await getHints(user, payload);
      updatePoiHint();
    } catch (error) {
      console.error("Error", error);
    }
  };
  //update POI but for hints?
  const updatePoiHint = () => {
    setIsOpen(!isOpen);
  };

  //get hints
  const getHints = async (user: User, pin: Pin): Promise<Response | void> => {
    try {
      if (!user) throw "Not logged in"; //error
      if (!pin) throw "Can not get hint";

      const { poi_id } = pin;
      const response: Response = await fetch(`${BASE_URL}/api/hints/${poi_id}`);
      const data: {
        content: string;
        poi_id: number;
        user_id: number;
        hint_id: number;
      }[] = (await response.json()) as {
        content: string;
        poi_id: number;
        user_id: number;
        hint_id: number;
      }[];
      const arrayOfContent: string[] |undefined[] = new Array(data.length);
      for (let i = 0; i < data.length; i++) {
        arrayOfContent[i] = data[i].content;
      }
      setHints(arrayOfContent);
      //return response;
    } catch (error) {
      console.error(error);
    }
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
              <Badge key={tag + id}>{tag}</Badge>
            )
          )}
        </div>

        {/* COLLECT BUTTON OR DESCRIPTION */}
        {collect && userCoordinates ? (
          <p className="truncate">{payload.description}</p>
        ) : (
        <div>
          <Button
            id={`${id}`}
            className="w-full mt-4 rounded-lg"
            
            onClick={(): void => {
              if (!user) {
                alert("please login");
                return;
              }
            
              if (handleCheckUserInSearchZone()) {
                void handleSubmitGuessOnClick(user, payload, userCoordinates);
                return;
              }
            
              if (importantPinContext) {
                importantPinContext.setTrackingPin(payload);
                setShowPopup && setShowPopup(false);
              }
            }}
            
          >
            {!handleCheckUserInSearchZone()
              ? "Too far! Track this pin?"
              : "Guess and collect"}
          </Button>

          
            <Button
              id={`${id}`}
              className="w-full mt-4 rounded-lg"
              onClick={(): void => {
                if (!user) {
                  alert("please login");
                  return;
                }
              
              if (handleCheckUserInSearchZone()) {
                void handleGetHintOnClick(user, payload, userCoordinates);
                return;
              }
            
              if (importantPinContext) {
                importantPinContext.setTrackingPin(payload);
                setShowPopup && setShowPopup(false);
              }
            }}
            >
              {!handleCheckUserInSearchZone()
                ? "Hints only available within zone"
                : "Hint"}
            </Button>
            {isOpen && (
              <div className="absolute bg-white border rounded shadow-lg mt-2 p-2 z-10 top-0">
                {hints.map((hint, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <span>{index + 1}</span>
                    <p>{hint}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

        )}
      </article>
    </section>
  );
}
