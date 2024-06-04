import Image from "next/image";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";

export function PoiCard({
  id, // will be used for vaidate the card and mark in future implementation.
  payload,
}: {
  id: number;
  payload: {
    id: number;
    collect: boolean;
    latitude: number;
    longitude: number;
    radius: number;
    title: string;
    description: string;
    img_url: string;
    is_main_attraction: boolean;
    tags: string[];
  };
}): JSX.Element {
  // USE STATE
  const [collect, setCollect] = useState<boolean>(payload.collect);

  // EFFECT
  useEffect(() => {}, []);

  // FUNCTION

  // RETURN
  return (
    <section
      className="relative top-0 flex flex-col bg-gray-300 w-[300px] min-h-[600px] max-h-full rounded-2xl overflow-hidden border-solid border-white border-4 z-[999]
    "
    >
      <Image
        src={payload.img_url}
        alt="Hachiko Poi Hint"
        width={300}
        height={400}
        sizes="(max-width: 300px) 100vw, 300px"
        priority
        className="object-cover h-[460px]"
      />
      <article className="flex-auto max-h-full w-full p-2">
        <h1 className="text-2xl font-bold text-black p-0 m-0 mb-2">
          {payload.title}
        </h1>
        <div className="flex flex-wrap gap-2 text-sm">
          {payload.tags.map((tag: string): JSX.Element => {
            return (
              <a
                key={tag + id}
                className="rounded-full p-1 bg-blue-500 min-w-[80px] text-center"
              >
                {tag}
              </a>
            );
          })}
        </div>
        {collect ? (
          <p>{payload.description}</p>
        ) : (
          <Button
            className="w-full mt-4 rounded-lg"
            onClick={() => {
              setCollect(true);
              payload.collect = true;
            }}
          >
            Collect
          </Button>
        )}
      </article>
    </section>
  );
}
