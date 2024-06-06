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
}: {
  id: number;
  payload: Pin;
  setShowPopup: (arg0: undefined) => void;
}): JSX.Element {
  // RETURN
  return (
    <main className="flex h-screen flex-col items-center justify-between">
      <Dialog defaultOpen>
        <DialogTrigger />
        <DialogContent onClick={() => setShowPopup(undefined)}>
          <PoiCard id={id} payload={payload} />
        </DialogContent>
      </Dialog>
    </main>
  );
}
