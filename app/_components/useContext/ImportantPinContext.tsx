"use client"
import { createContext, useState } from "react";
import { Pin } from "./../../_utils/global";

interface ImportantPinContextValues {
  trackingPin: Pin | null;
  setTrackingPin: (e: Pin | null) => void;
  guessedPin: Pin | null;
  setGuessedPin: (e: Pin | null) => void;
}

export const ImportantPinContext = createContext<ImportantPinContextValues | undefined>(undefined);

interface TrackingPinProviderProps {
  children: React.ReactNode;
}

const ImportantPinContextProvider = ({ children }: TrackingPinProviderProps) => {
  const [trackingPin, setTrackingPin] = useState<Pin | null>(null);
  const [guessedPin, setGuessedPin] = useState<Pin | null>(null);

  return <ImportantPinContext.Provider value={{trackingPin, setTrackingPin, guessedPin, setGuessedPin}}>
    {children}
  </ImportantPinContext.Provider>
}

export default ImportantPinContextProvider;