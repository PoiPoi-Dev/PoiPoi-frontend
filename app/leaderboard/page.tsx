import Leaderboard from "./Leaderboard";
("use client");

export default function Home(): JSX.Element {
  return (
    <div className="absolute overflow-hidden inset-0 bg-mapBg">
      <Leaderboard />
    </div>
  );
}
