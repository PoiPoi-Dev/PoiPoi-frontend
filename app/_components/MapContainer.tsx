"use client";

import { useEffect, useState } from "react";
import Map from "react-map-gl/maplibre";
import { sample } from "../_api/sample";
import { Pin } from "../_utils/global";
import MarkerContainer from "./MarkerContainer";
import MapContextProvider from "./MapContextProvider";
import MapControls from "./MapControls";
// import TagFilterDropdown from "./TagFilterDropdown";
import DistanceHintButton from "./DistanceHintButton";
import HintButton from "./HintButton";
import PoidexButton from "./PoidexButton";
import PoidexModal from "./PoidexModal";
import SubmitGuessButton from "./SubmitGuessButton";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

function MapInner() {
  // USE STATE
  const [poiData, setPoiData] = useState<Pin[]>([]);
  const [showPopup, setShowPopup] = useState<number | undefined>(undefined);
  // const [filteredPins, setFilteredPins] = useState(sample.pin);
  // const [filteredPins, setFilteredPins] = useState(sample.pin);
  const [showPoidex, setShowPoidex] = useState(false);
  const [selectedPoi, setSelectedPoi] = useState<Pin | null>(null);
  const [selectedPoiId, setSelectedPoiId] = useState<number | undefined>(
    undefined
  );
  const [longitude] = useState<number>(139.7454); // Default camera map when user opens the app
  const [latitude] = useState<number>(35.6586);
  const [viewPort, setViewPort] = useState({
    longitude: longitude,
    latitude: latitude,
    zoom: 14,
  });

  // USE EFFECT
  useEffect(() => {
    void handleFetchPoi();
  }, []);

  // HANDLER FUNCTION
  const handleFetchPoi = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/poi`);
      const data: Pin[] = (await response.json()) as Pin[];
      setPoiData(data);
    } catch (error) {
      console.log(error);
    }
  };
  // const handleFilter = (selectedTags: string[]) => {
  //   if (selectedTags.length === 0) {
  //     setFilteredPins(sample.pin);
  //   } else {
  //     const filtered = sample.pin.filter((pin) =>
  //       selectedTags.every((tag) => pin.tags.includes(tag))
  //     );
  //     setFilteredPins(filtered);
  //   }
  // };

  const handlePoiClick = (poi: Pin) => {
    setSelectedPoi(poi);
  };

  const handleClosePoidex = () => {
    setShowPoidex(false);
    setSelectedPoi(null); // Reset selectedPoi when closing PoidexModal
  };

  // RETURN
  return (
    <div className="relative overflow-hidden inset-0 bg-mapBg">
      {/* THIS SHOULD BE MOVED TO OTHER PLACE */}
      <div className="absolute top-4 left-4 z-10 flex gap-2">
        {/* <TagFilterDropdown onFilter={handleFilter} /> */}
        <PoidexButton onClick={() => setShowPoidex(true)} />
        <HintButton poi_id={selectedPoiId} />
      </div>

      {/* MAP CANVAS */}
      <Map
        {...viewPort}
        onMove={(evt) => setViewPort(evt.viewState)}
        style={{ width: "100vw", height: "100vh" }}
        reuseMaps
        dragRotate={false}
        mapStyle={`https://api.protomaps.com/styles/v2/light.json?key=${process.env.NEXT_PUBLIC_PROTOMAPS_API_KEY}`}
      >
        {/* FOR V1 DEVELOPMENT */}
        {poiData.map((pin: Pin): JSX.Element => {
          return (
            <MarkerContainer
              key={pin.poi_id}
              pin={pin}
              showPopup={showPopup}
              setShowPopup={setShowPopup}
              setSelectedPoiId={setSelectedPoiId}
            />
          );
        })}

        {/* V0 DEVELOPMENT w/ FILTER FEATURE */}
        {/* {sample.map((pin: Pin): JSX.Element => {
          return (
            <MarkerContainer
              key={pin.id}
              pin={pin}
              showPopup={showPopup}
              setShowPopup={setShowPopup}
              setSelectedPoiId={setSelectedPoiId}
            />
          );
        })} */}
        
        {/* {filteredPins.map((pin: Pin): JSX.Element => {
          return (
            <MarkerContainer
              key={pin.id}
              pin={pin}
              showPopup={showPopup}
              setShowPopup={setShowPopup}
              setSelectedPoiId={setSelectedPoiId}
            />
          );
        })} */}
        <DistanceHintButton pins={sample} />
        <SubmitGuessButton pins={sample.pin}/>
        <MapControls />
      </Map>
      {showPoidex ? (
        <PoidexModal
          pins={poiData}
          onClose={handleClosePoidex}
          onPoiClick={handlePoiClick}
          selectedPoi={selectedPoi}
          goBack={() => setSelectedPoi(null)}
        />
      ) : null}
    </div>
  );
}

const MapContainer = () => (
  <MapContextProvider>
    <MapInner />
  </MapContextProvider>
);

export default MapContainer;
