import MapContainer from "../_components/MapContainer";
import { AuthProvider } from "../_components/useContext/AuthContext";
import Link from "next/link";
import { BsQuestionDiamondFill } from "react-icons/bs";
import { ButtonIconCircle } from "../_components/ui/MenuIconCircle";


export default function Home(): JSX.Element {
  return (
    <div className="absolute inset-0 bg-mapBg">
      <AuthProvider>
        <MapContainer />
        <Link className="fixed bottom-20 left-5" href="/how-to-play">
          <ButtonIconCircle text="Tutorial">
          <BsQuestionDiamondFill size={24}/>
          </ButtonIconCircle>
        </Link>
      </AuthProvider>
    </div>
  );
}
