import Image from "next/image";
import { Button } from "./ui/button";
import { useState } from "react";
import { Pin } from "../_utils/global";

export function PoiCard({
  payload,
}: {
  id: number;
  payload: Pin;
}): JSX.Element {
  // USE STATE
  const [collect, setCollect] = useState<boolean | undefined>(
    payload.is_completed
  );

  // EFFECT

  // FUNCTION

  // RETURN
  return (
    <section className="relative top-0 flex flex-col bg-gray-300 w-[300px] min-h-[600px] max-h-full rounded-2xl overflow-hidden border-solid border-white border-4 z-[999]">
      <Image
        src={payload.img_url}
        alt={payload.title}
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
        {/* <div className="flex flex-wrap gap-2 text-sm mb-2">
          {payload.tags.map(
            (tag: string): JSX.Element => (
              <a
                key={tag + id}
                className="rounded-full p-1 bg-blue-500 min-w-[80px] text-center"
              >
                {tag}
              </a>
            )
          )}
        </div> */}
        {collect ? (
          <p className="truncate">{payload.description}</p>
        ) : (
          <Button
            className="w-full mt-4 rounded-lg"
            onClick={() => {
              setCollect(true);
              payload.is_completed = true;
            }}
          >
            Collect
          </Button>
        )}
      </article>
    </section>
  );
}
