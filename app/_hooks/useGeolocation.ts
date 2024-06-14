import { useEffect } from "react";


type Callback = (position: GeolocationPosition) => void;

export const useGeolocation = (callback: Callback) => {

  useEffect(()=> {
    const id = navigator.geolocation.watchPosition((position:GeolocationPosition) => {
      callback(position);
    }, 
    (error) => { 
      console.error(error);
  },
    {
      enableHighAccuracy:true
    }
  );      

    return () => navigator.geolocation.clearWatch(id);
  },[callback]);
}

export default useGeolocation;