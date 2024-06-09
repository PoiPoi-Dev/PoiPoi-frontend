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
}: {
  id: number;
  payload: Pin;
  setShowPopup: (arg0: undefined) => void;
  setGuessPoiPosition: (arg0: Coordinates | null) => void;
}): JSX.Element {
  // RETURN
  return (
    <main className="flex h-screen flex-col items-center justify-between">
      <Dialog defaultOpen>
        <DialogTrigger />
        <DialogContent onClick={() => setShowPopup(undefined)}>
          <PoiCard
            id={id}
            payload={payload}
            setGuessPoiPosition={setGuessPoiPosition}
            setShowPopup={setShowPopup}
          />
        </DialogContent>
      </Dialog>
    </main>
  );
}
