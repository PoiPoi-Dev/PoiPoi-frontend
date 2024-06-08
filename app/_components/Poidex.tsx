import { useState } from "react";
import { Button } from "./ui/button";
import PoidexModal from "./PoidexModal";
import { Pin } from "../_utils/global";

interface PoidexProps {
  pins: Pin[]
}

const Poidex = ({pins}:PoidexProps):React.JSX.Element => {
  const [showPoidex, setShowPoidex] = useState<boolean>(false);
  const [selectedPoi, setSelectedPoi] = useState<Pin | null> (null);

  const handleClosePoidex = () => {
    setShowPoidex(false);
    setSelectedPoi(null);
  }

  const handlePoiClick = (poi:Pin) => {
    setSelectedPoi(poi);
  }

  return (
    <>
    <Button onClick={():void => void setShowPoidex(true)}>Open Poidex</Button>

    {showPoidex ? (
      <PoidexModal
          pins={pins}
          onClose={handleClosePoidex}
          onPoiClick={handlePoiClick}
          selectedPoi={selectedPoi}
          goBack={() => setSelectedPoi(null)}
        />
      ) : null }    
    </>
  )
}

export default Poidex;