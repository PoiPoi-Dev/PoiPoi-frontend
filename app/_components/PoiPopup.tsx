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
  payload: {
    id: number;
    latitude: number;
    longitude: number;
    radius: number;
    title: string;
    description: string;
    img_url: string;
    is_main_attraction: boolean;
    tags: string[];
  };
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
