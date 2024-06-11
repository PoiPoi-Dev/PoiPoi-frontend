"use client"
import { createContext, useState } from "react";
import { Pin } from "./../../_utils/global";

interface TrackingPinContextValues {
  trackingPin: Pin | null
  setTrackingPin: (e: Pin | null) => void
}

export const TrackingPinContext = createContext<TrackingPinContextValues | undefined>(undefined);

interface TrackingPinProviderProps {
  children: React.ReactNode;
}

const TrackingPinContextProvider = ({ children }: TrackingPinProviderProps) => {
  const [trackingPin, setTrackingPin] = useState<Pin | null>(null);

  return <TrackingPinContext.Provider value={{trackingPin, setTrackingPin}}>
    {children}
  </TrackingPinContext.Provider>
}

export default TrackingPinContextProvider;