import { useState } from "react";
import PoidexModal from "./PoidexModal";
import { Pin } from "../_utils/global";
import { BsCollectionFill } from "react-icons/bs";
import { ButtonIconCircle } from "./ui/MenuIconCircle";

interface PoidexProps {
  pins: Pin[];
}

const Poidex = ({ pins }: PoidexProps): React.JSX.Element => {
  const [showPoidex, setShowPoidex] = useState<boolean>(false);
  const [selectedPoi, setSelectedPoi] = useState<Pin | null>(null);

  const handleClosePoidex = () => {
    setShowPoidex(false);
    setSelectedPoi(null);
  };

  const handlePoiClick = (poi: Pin) => {
    setSelectedPoi(poi);
  };

  return (
    <>
      <ButtonIconCircle
        text="collection"
        onClick={(): void => void setShowPoidex(true)}
      >
        <BsCollectionFill size={24} />
      </ButtonIconCircle>

      {showPoidex ? (
        <PoidexModal
          pins={pins}
          onClose={handleClosePoidex}
          onPoiClick={handlePoiClick}
          selectedPoi={selectedPoi}
          goBack={() => setSelectedPoi(null)}
        />
      ) : null}
    </>
  );
};

export default Poidex;
