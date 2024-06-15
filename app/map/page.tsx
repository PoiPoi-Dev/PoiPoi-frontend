import MapContainer from "../_components/MapContainer";
import { AuthProvider } from "../_components/useContext/AuthContext";
import Link from "next/link";
import { BsQuestionCircleFill } from "react-icons/bs";

export default function Home(): JSX.Element {
  return (
    <div className="absolute inset-0 bg-mapBg">
      <AuthProvider>
        <MapContainer />
        <Link className="fixed top-56 right-2.5 z-[50]" href="/how-to-play">
          <BsQuestionCircleFill
            size={30}
            className="text-white bg-primary rounded-full shadow-2xl"
          />
        </Link>
      </AuthProvider>
    </div>
  );
}
