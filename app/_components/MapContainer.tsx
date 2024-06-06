"use client";

import * as React from "react";
import { useState } from "react";
import Map from "react-map-gl/maplibre";
import { sample } from "../_api/sample";
import { Pin } from "../_utils/global";
import MarkerContainer from "./MarkerContainer";
import MapContextProvider from "./MapContextProvider";
import MapControls from "./MapControls";
// import TagFilterDropdown from "./TagFilterDropdown";
// import PoidexButton from "./PoidexButton";
import PoidexModal from "./PoidexModal";
import DistanceHintButton from "./DistanceHintButton";
import HintButton from "./HintButton";

function MapInner() {
  const [showPopup, setShowPopup] = useState<number | undefined>(undefined);
  // const [filteredPins, setFilteredPins] = useState(sample.pin);
  const [showPoidex, setShowPoidex] = useState(false);
  const [selectedPoi, setSelectedPoi] = useState<Pin | null>(null);
  const [selectedPoiId, setSelectedPoiId] = useState<number | undefined>(
    undefined
  );

  // Default camera map when user opens the app
  const [longitude] = useState<number>(139.7454);
  const [latitude] = useState<number>(35.6586);
  const [viewPort, setViewPort] = useState({
    longitude: longitude,
    latitude: latitude,
    zoom: 14,
  });

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

  return (
    <div className="relative overflow-hidden inset-0 bg-mapBg">
      {/* <div className="absolute top-4 left-4 z-10">
        <TagFilterDropdown onFilter={handleFilter} />
        <div className="mt-11">
          <PoidexButton onClick={() => setShowPoidex(true)} />
        </div>
      </div> */}
      <HintButton poi_id={selectedPoiId} />
      <Map
        {...viewPort}
        onMove={(evt) => setViewPort(evt.viewState)}
        style={{ width: "100vw", height: "100vh" }}
        reuseMaps
        dragRotate={false}
        mapStyle={`https://api.protomaps.com/styles/v2/light.json?key=${process.env.NEXT_PUBLIC_PROTOMAPS_API_KEY}`}
      >
        {sample.map((pin: Pin): JSX.Element => {
          return (
            <MarkerContainer
              key={pin.id}
              pin={pin}
              showPopup={showPopup}
              setShowPopup={setShowPopup}
              setSelectedPoiId={setSelectedPoiId}
            />
          );
        })}
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
        <MapControls />
      </Map>
      {showPoidex ? (
        <PoidexModal
          pins={sample}
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
