import LoginPage from "./LoginPage";
import { AuthProvider } from "../_components/useContext/AuthContext";
import Poipoi from "@/public/Poipoi.png";
import Image from "next/image";

export default function Home(): JSX.Element {
  return (
    <>
      <header className="fixed block w-full top-0">
        <Image
          alt="Poipoi Logo"
          src={Poipoi}
          width={200}
          height={200}
          className="object-cover"
        />
      </header>
      <AuthProvider>
        <LoginPage />
      </AuthProvider>
    </>
  );
}
