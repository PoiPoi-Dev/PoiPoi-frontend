import { Suspense } from "react";
import Loading from "../map/loading";
import Leaderboard from "./Leaderboard";

export default function Home(): JSX.Element {
  return (
    <Suspense fallback={<Loading />}>
      <div className="absolute overflow-hidden inset-0 bg-mapBg">
        <Leaderboard />
      </div>
    </Suspense>
  );
}
