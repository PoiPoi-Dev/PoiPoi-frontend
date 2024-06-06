import LoginPage from "./LoginPage";
import { AuthProvider } from "../_components/useContext/AuthContext";

export default function Home(): JSX.Element {
  return (
      <div className="absolute overflow-hidden inset-0 bg-mapBg">
        <AuthProvider>
          <LoginPage />
        </AuthProvider>
      </div>
  );
}