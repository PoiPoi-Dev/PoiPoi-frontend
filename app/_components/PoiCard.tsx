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
import { Toaster, toast } from "sonner";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export function PoiCard({
  id,
  payload,
  setShowPopup,
  userCoordinates,
  setScore,
}: {
  id: number;
  payload: Pin;
  setShowPopup?: (arg0: boolean) => void;
  userCoordinates: Coordinates | null;
  setScore: (arg0: number | null) => void;
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
    payload.is_completed = true;
    if (!importantPinContext) return;
    if (importantPinContext.trackingPin?.poi_id == payload.poi_id) {
      importantPinContext.setTrackingPin(null);
    }
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
      toastHintCycle();
    } catch (error) {
      console.error("Error", error);
    }
  };

  //cycle thru hints in toast
  const toastHintCycle = (i: number = 0) => {
    toast("Hint:", {
      description: hints[i],
      action: {
        label: "next hint",
        onClick: () => {
          const nextIndex = (i + 1) % hints.length; // Calculate the index of the next hint
          toastHintCycle(nextIndex);
        },
      },
    });
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
      const arrayOfContent: string[] | undefined[] = new Array(data.length);
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
    <section className="relative top-0 flex flex-col bg-gray-300 w-[300px] h-[640px] rounded-2xl overflow-hidden border-solid border-white border-4 z-[999]">
      {/* IMAGE */}
      <Image
        src={payload.img_url}
        alt={payload.title}
        width={300}
        height={400}
        priority
        className={`object-cover ${
          collect
            ? "min-h-[400px] max-h-[400px]"
            : "min-h-[500px] max-h-[500px]"
        }`}
      />

      <article className="flex flex-col w-full h-full p-2 overflow-y-scroll no-scrollbar">
        <div className="h-fit w-full whitespace-nowrap overflow-x-scroll no-scrollbar">
          <h1 className="text-2xl w-full align-baseline font-bold text-black p-0 m-0 mb-2">
            {payload.title}
          </h1>
        </div>

        {/* TAG */}
        {payload.tags.length > 0 && (
          <div className="flex w-full whitespace-nowrap overflow-x-scroll no-scrollbar h-[30px] gap-2 text-sm mb-2">
            {payload.tags.map(
              (tag: string): JSX.Element => (
                <Badge key={tag + id}>{tag}</Badge>
              )
            )}
          </div>
        )}

        {/* COLLECT BUTTON OR DESCRIPTION */}
        {collect && userCoordinates ? (
          <p className="h-auto flex-1 overflow-y-scroll no-scrollbar">
            {payload.description}
          </p>
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
            <Toaster position="top-center" closeButton />
            <Button
              id={`${id}`}
              className="w-full mt-4 rounded-lg"
              onClick={(): void => {
                if (!user) {
                  alert("please login");
                  return;
                }
                if (!handleCheckUserInSearchZone()) {
                  if (importantPinContext) {
                    importantPinContext.setTrackingPin(payload);
                    setShowPopup && setShowPopup(false);
                  }
                } else {
                  //may be empty bc still fetching from handleGetHintOnClick
                  void handleGetHintOnClick(user, payload, userCoordinates);
                }
              }}
            >
              {!handleCheckUserInSearchZone()
                ? "Hints only available within zone"
                : "Hint"}
            </Button>
          </div>
        )}
      </article>
    </section>
  );
}
