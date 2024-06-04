"use client";

import * as React from "react";
import { useState } from "react";
import Map from "react-map-gl/maplibre";
import { sample } from "../_api/sample";
import { Pin } from "../_utils/global";
import MarkerContainer from "./MarkerContainer";
import MapContextProvider from "./MapContextProvider";
import MapControls from "./MapControls";
import TagFilterDropdown from "./TagFilterDropdown";
import MarkerContainer from "./MarkerContainer";
import DistanceHintButton from "./DistanceHintButton";

function MapInner() {
  const [showPopup, setShowPopup] = useState<number | undefined>(undefined);
  const [filteredPins, setFilteredPins] = useState(sample.pin);

  // Default camera map when user open the app
  const [longitude] = useState<number>(139.80241);
  const [latitude] = useState<number>(35.56762);
  const [viewPort, setViewPort] = useState({
    longitude: longitude,
    latitude: latitude,
    zoom: 10,
  });

  const handleFilter = (selectedTags: string[]) => {
    if (selectedTags.length === 0) {
      setFilteredPins(sample.pin);
    } else {
      const filtered = sample.pin.filter((pin) =>
        selectedTags.every((tag) => pin.tags.includes(tag))
      );
      setFilteredPins(filtered);
    }
  };

  return (
    <div className="absolute overflow-hidden inset-0 bg-mapBg">
      <TagFilterDropdown onFilter={handleFilter} />
      <Map
        {...viewPort}
        onMove={(evt) => setViewPort(evt.viewState)}
        style={{ width: "100vw", height: "100vh" }}
        reuseMaps
        dragRotate={false}
        mapStyle={`https://api.protomaps.com/styles/v2/light.json?key=${process.env.NEXT_PUBLIC_PROTOMAPS_API_KEY}`}
      >
        {filteredPins.map((pin: Pin): JSX.Element => {
          return (
            <MarkerContainer
              key={pin.id}
              pin={pin}
              showPopup={showPopup}
              setShowPopup={setShowPopup}
            />
          );
        })}
        <DistanceHintButton pins={sample.pin}/>
        <MapControls />
      </Map>
    </div>
  );
}

const MapContainer = () => (
  <MapContextProvider>
    <MapInner />
  </MapContextProvider>
);

export default MapContainer;
