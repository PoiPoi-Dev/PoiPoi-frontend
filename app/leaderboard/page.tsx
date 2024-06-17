import { Suspense } from "react";
import Loading from "../map/loading";
import Leaderboard from "./Leaderboard";
import { revalidatePath } from "next/cache";
revalidatePath("/api/map/leaderboard");

export default function Home(): JSX.Element {
  return (
    <Suspense fallback={<Loading />}>
      <div className="absolute overflow-hidden inset-0 bg-mapBg">
        <Leaderboard />
      </div>
    </Suspense>
  );
}
