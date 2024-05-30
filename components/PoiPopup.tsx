import { PoiCard } from "../components/PoiCard";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export default function Home(): JSX.Element {
  // RETURN
  return (
    <main className="flex h-screen flex-col items-center justify-between">
      <Dialog>
        <DialogTrigger>ICON HERE</DialogTrigger>
        <DialogContent>
          <PoiCard />
        </DialogContent>
      </Dialog>
    </main>
  );
}
