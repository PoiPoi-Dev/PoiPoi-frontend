import { Coordinates } from "../_utils/coordinateMath";
import { Pin } from "../_utils/global";
import { PoiCard } from "./PoiCard";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/app/_components/ui/dialog";

export default function PoiPopup({
  id,
  payload,
  setShowPopup,
  setGuessPoiPosition,
  userCoordinates,
  setScore
}: {
  id: number;
  payload: Pin;
  setShowPopup: (arg0: boolean) => void;
  setGuessPoiPosition: (arg0: Coordinates | null) => void;
  userCoordinates: Coordinates | null;
  setScore: (arg0: number|null) => void;
}): JSX.Element {
  // RETURN
  return (
    <main className="flex h-screen flex-col items-center justify-between">
      <Dialog defaultOpen>
        <DialogTrigger />
        <DialogContent onClick={() => setShowPopup(false)}>
          <PoiCard
            id={id}
            payload={payload}
            setGuessPoiPosition={setGuessPoiPosition}
            setShowPopup={setShowPopup}
            userCoordinates={userCoordinates}
            setScore={setScore}
          />
        </DialogContent>
      </Dialog>
    </main>
  );
}
