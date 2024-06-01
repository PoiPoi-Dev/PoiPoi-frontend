import { PoiCard } from "./PoiCard";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/app/_components/ui/dialog";

export default function PoiPopup({ id }: { id: number }): JSX.Element {
  // RETURN
  return (
    <main className="flex h-screen flex-col items-center justify-between">
      <Dialog defaultOpen>
        <DialogTrigger></DialogTrigger>
        <DialogContent>
          <PoiCard id={id} />
        </DialogContent>
      </Dialog>
    </main>
  );
}
