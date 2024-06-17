import LoginPage from "./LoginPage";
import { AuthProvider } from "../_components/useContext/AuthContext";

export default function Home(): JSX.Element {
  return (
    <html lang="en">
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1"
      ></meta>
      <body>
        <AuthProvider>
          <LoginPage />
        </AuthProvider>
      </body>
    </html>
  );
}
