"use client"
import { useEffect, useRef, useState } from "react"

import maplibregl, {GeolocateControl} from "maplibre-gl";

export default function Map ():JSX.Element {
  const mapContainer = useRef(null);
  const map = useRef<maplibregl.Map>();
  const [longitude] = useState<number>(139.69241);
  const [latitude] = useState<number>(35.666762);

  const [zoom] = useState<number>(8);

  useEffect(() => {
    if (map.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current as unknown as HTMLElement,
      style: `https://api.protomaps.com/styles/v2/light.json?key=${process.env.NEXT_PUBLIC_PROTOMAPS_API_KEY}`,
      center: [longitude, latitude],
      zoom: zoom,
    });

    map.current.addControl(new GeolocateControl({
      positionOptions: {
          enableHighAccuracy: true
      },
      showUserLocation: true,
      trackUserLocation: true,
    }));

  }, [longitude, latitude, zoom]);
  

  return (
    <div className="relative h-screen w-screen">
      <div className="absolute h-full w-full" ref={mapContainer}/>
    </div>
  )
}