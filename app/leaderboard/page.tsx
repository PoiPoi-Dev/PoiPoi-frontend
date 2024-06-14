import { AuthProvider } from "../_components/useContext/AuthContext";
import Leaderboard from "./Leaderboard";

export default function Home(): JSX.Element {
  return (
    <div className="absolute overflow-hidden inset-0 bg-mapBg">
      <AuthProvider>
        <Leaderboard />
      </AuthProvider>
    </div>
  );
}
