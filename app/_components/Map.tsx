"use client"
import { useEffect, useRef, useState } from "react"

import maplibregl from "maplibre-gl";
// import { Protocol } from "pmtiles";

export default function Map ():JSX.Element {
  const mapContainer = useRef(null);
  const map = useRef<maplibregl.Map>();
  const [longitude] = useState<number>(140.892582);
  const [latitude] = useState<number>(36.403631);

  const [zoom] = useState<number>(5);

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
      style: `https://demotiles.maplibre.org/style.json`,
      center: [longitude, latitude],
      zoom: zoom,
    });
  }, [longitude, latitude, zoom]);

  return (
    <div className="relative">
      <div className="absolute h-full " ref={mapContainer}/>
    </div>
  )
}