import LoginPage from "./LoginPage";
import { AuthProvider } from "../_components/useContext/AuthContext";

export default function Home(): JSX.Element {
  return (
    <AuthProvider>
      <LoginPage />
    </AuthProvider>
  );
}
