"use client"
import { useEffect, useRef, useState } from "react"

import maplibregl from "maplibre-gl";
// import { Protocol } from "pmtiles";

export default function Map ():JSX.Element {
  const mapContainer = useRef(null);
  const map = useRef<maplibregl.Map>();
  const [longitude] = useState<number>(139.69241);
  const [latitude] = useState<number>(35.666762);

  const [zoom] = useState<number>(8);

  useEffect(() => {
    if (map.current) return;

    // const protocol = new Protocol();
    // maplibregl.addProtocol("pmtiles", protocol.tile);

    // const styleSpecification:maplibregl.StyleSpecification = {
    //   version: 8,
    //   "sources": {
    //     "protomaps": {
    //       "type": "vector",
    //       "url": `https://api.protomaps.com/styles/v2/light.json?key=${process.env.NEXT_PUBLIC_PROTOMAPS_API_KEY}`,
    //     }
    //   },
    //   layers: [
    //     {
    //         "id": "coastline",
    //         "source": "protomaps",
    //         "source-layer": "countries",
    //         "type": "line",
    //         "paint": {"line-color": "#198EC8"}
    //     }
    //   ],
    // };

    map.current = new maplibregl.Map({
      container: mapContainer.current as unknown as HTMLElement,
      style: `https://api.protomaps.com/styles/v2/light.json?key=${process.env.NEXT_PUBLIC_PROTOMAPS_API_KEY}`,
      center: [longitude, latitude],
      zoom: zoom,
    });
  }, [longitude, latitude, zoom]);

  return (
    <div className="relative h-screen w-screen">
      <div className="absolute h-full w-full" ref={mapContainer}/>
    </div>
  )
}