"use client";

import { useEffect, useState, useContext } from "react";
import Map from "react-map-gl/maplibre";
import { Pin } from "../_utils/global";
import MarkerContainer from "./MarkerContainer";
import MapContextProvider from "./MapContextProvider";
import MapControls from "./MapControls";
import { AuthContext } from "./useContext/AuthContext";
import { getAuthService } from "@/config/firebaseconfig";
import GameControls from "./GameControls";
import {
  ConvertGeolocationPositionToCoordinates,
  Coordinates,
  GetDistanceFromCoordinatesToMeters,
} from "../_utils/coordinateMath";
import useGeolocation from "../_hooks/useGeolocation";
import FilterButton from "./FilterButton";
import GuessPolyline from "./ui/guessPolyline";
import PopoverCard from "./PopoverCard";
import GuessDistanceModal from "./GuessDistanceModal";
import PoiPhotoToggle from "./PoiPhotoToggle";
import ImportantPinContextProvider, {ImportantPinContext} from "./useContext/ImportantPinContext";
import MainQuest from "./MainQuest";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

function MapInner() {
  // USE STATE
  const [poiData, setPoiData] = useState<Pin[]>([]);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [guessPoiPosition, setGuessPoiPosition] = useState<Coordinates| null>(
    null
  );
  // const [filteredPins, setFilteredPins] = useState(sample.pin);
  const [selectedPoiId, setSelectedPoiId] = useState<number | undefined>(
    undefined
  );
  const [filters, setFilters] = useState<string[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [userCoordinates, setUserCoordinates] = useState<Coordinates|null>(null);
  const [closestNotCompletedPin, setClosestNotCompletedPin] = useState<Pin|null> (null);
  const [distanceToTrackingPin, setDistanceToTrackingPin] = useState<number|null> (null);

  const [score, setScore] = useState<number|null>(null);
  
  // const [isTrackingTheClosestPin, setIsTrackingTheClosestPin] = useState<boolean> (true);

  // Default camera map when user opens the app
  const longitude: number = 139.72953967417234;
  const latitude: number = 35.66060121205606;
  const [viewPort, setViewPort] = useState({
    longitude: longitude,
    latitude: latitude,
    zoom: 14,
  });

  const user = useContext(AuthContext);
  const importantPinContext = useContext(ImportantPinContext);
  
  // USE EFFECT
  useEffect(() => {
    user ? void handleFetchPoiByUid() : void handleFetchPoiByAnonymous();
    void handleFetchFilters();
  }, [user]);

  useEffect(() => {
    console.log(importantPinContext?.trackingPin);
  },[importantPinContext?.trackingPin])


  useEffect(() => {
    if (!closestNotCompletedPin || !userCoordinates) return;
    handleDistanceToClosestPin(userCoordinates, closestNotCompletedPin);
  }, [closestNotCompletedPin, userCoordinates]);

  // HANDLER FUNCTION
  const handleFetchPoiByUid = async () => {
    try {
      const auth = await getAuthService();
      if (!auth.currentUser) throw "No current user";
      const uid: string = auth.currentUser.uid;

      const response = await fetch(`${BASE_URL}/api/poi/status`, {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: uid }),
      });
      const data: Pin[] = (await response.json()) as Pin[];
      setPoiData(data);
    } catch (error) {
      console.log(error);
      setPoiData([]);
    }
  };

  const handleFetchPoiByAnonymous = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/poi/`, {
        credentials: "include",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data: Pin[] = (await response.json()) as Pin[];
      setPoiData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFetchFilters = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/tag`);
      const data: string[] = (await response.json()) as string[];
      setFilters(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDistanceToClosestPin = (
    userCoordinates: Coordinates,
    pin: Pin
  ) => {
    const pinCoordinates: Coordinates = {
      longitude: pin.search_longitude,
      latitude: pin.search_latitude,
    };
    const distance = GetDistanceFromCoordinatesToMeters(
      userCoordinates,
      pinCoordinates
    );
    setDistanceToTrackingPin(distance);
  };

  /**
   * Sets the user's coordinates
   * @param position
   */
  const handleSetUserCoordinates = (position: GeolocationPosition) => {
    const userCoord: Coordinates =
      ConvertGeolocationPositionToCoordinates(position);
    setUserCoordinates(userCoord);
  };

  /**
   * Sets closestNotCompletedPin to the closes pin BY POSITION
   * Currently does not account for filters
   * @param position
   */
  const handleSetClosestNotCompletedPin = (position: GeolocationPosition) => {
    const userCoordinates: Coordinates = {
      longitude: position.coords.longitude,
      latitude: position.coords.latitude,
    };

    let shortestDistance: number = Number.MAX_SAFE_INTEGER;
    let closestPin: Pin | null = null;

    for (const pin of poiData) {
      if (pin.is_completed) continue;

      const pinCoordinates: Coordinates = {
        longitude: pin.search_longitude,
        latitude: pin.search_latitude,
      };

      const distance: number = GetDistanceFromCoordinatesToMeters(
        userCoordinates,
        pinCoordinates
      );

      if (distance < shortestDistance) {
        shortestDistance = distance;
        closestPin = pin;
      }
    }
    setClosestNotCompletedPin(closestPin);
  };

  useGeolocation(handleSetUserCoordinates);
  useGeolocation(handleSetClosestNotCompletedPin);

  // RETURN
  return (
    <div className="relative overflow-hidden inset-0 bg-mapBg">
      {/* GAME UI */}
      <div className="absolute top-0 left-0 z-50 w-screen pt-4 gap-4 flex flex-col">
        {/* HEADER CONTROLLER */}
        <div className="flex flex-col gap-4 w-full">
          <FilterButton
            filters={filters}
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
          />
          {/* <HintButton poi_id={selectedPoiId} /> */}
        </div>

        {/* ISLAND CONTROLLER */}
        <PoiPhotoToggle
          pins={poiData}
          setShowPopup={setShowPopup}
          setSelectedPoiId={setSelectedPoiId}
          showPopup={showPopup}
        />

        {/* FOOTER CONTROLLER */}
        <div className="fixed bottom-0 left-0 w-full flex gap-2 h-16 bg-white rounded-t-3xl justify-center items-end">
          <GameControls
            pins={poiData}
            trackingPin={closestNotCompletedPin}
            userCoordinates={userCoordinates}
            distanceToTrackingPin={distanceToTrackingPin}
          />
        </div>
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
        {poiData
          .filter((pin) =>
            selectedFilters.length === 0
              ? true
              : selectedFilters.every((tag) => pin.tags.includes(tag))
          )
          .map((pin: Pin): JSX.Element => {
            return (
              <MarkerContainer
                key={pin.poi_id}
                pin={pin}
                setShowPopup={setShowPopup}
                setSelectedPoiId={setSelectedPoiId}
              />
            );
          })}

        {/* Popup */}
        {showPopup && selectedPoiId && (
          <PopoverCard
            poiData={poiData}
            selectedPoiId={selectedPoiId}
            setShowPopup={setShowPopup}
            setGuessPoiPosition={setGuessPoiPosition}
            userCoordinates={userCoordinates}
            setScore={setScore}
          />
        )}

        {/* GUESS MODEL */}
        {userCoordinates && guessPoiPosition !== null && (
          <>
            <GuessPolyline
              userLocation={userCoordinates}
              guessPoiLocation={guessPoiPosition}
            />
            <GuessDistanceModal
              guessPoiPosition={guessPoiPosition}
              setGuessPoiPosition={setGuessPoiPosition}
              userCoordinates={userCoordinates}
              score={score}
            />
          </>
        )}
        <MainQuest closestNotCompletedPin={closestNotCompletedPin}/>
        <MapControls/>
      </Map>
    </div>
  );
}

const MapContainer = () => (
  <ImportantPinContextProvider>
    <MapContextProvider>
      <MapInner />
    </MapContextProvider>
  </ImportantPinContextProvider>
);

export default MapContainer;
