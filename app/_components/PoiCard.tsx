import Image from "next/image";
import { Button } from "./ui/button";

export function PoiCard({ id }: { id: number }): JSX.Element {
  return (
    <section
      className="relative top-0 flex flex-col bg-gray-300 w-[300px] min-h-[600px] max-h-full rounded-2xl overflow-hidden border-solid border-white border-4
    "
    >
      <Image
        src="/hachiko.jpg"
        alt="Hachiko Poi Hint"
        width={300}
        height={400}
        sizes="(max-width: 300px) 100vw, 300px"
        priority
        className="object-cover h-[460px]"
      />
      <article className="flex-auto max-h-full w-full p-2">
        <h1 className="text-2xl font-bold text-black p-0 m-0 mb-2">
          Hachiko {id}
        </h1>
        <div className="flex flex-wrap gap-2 text-sm">
          <a className="rounded-full p-1 bg-blue-500 min-w-[80px] text-center">
            Statue
          </a>
          <a className="rounded-full p-1 bg-blue-500 min-w-[80px] text-center">
            Animal
          </a>
          <a className="rounded-full p-1 bg-blue-500 min-w-[80px] text-center">
            Historical
          </a>
          <a className="rounded-full p-1 bg-blue-500 min-w-[80px] text-center">
            Popular
          </a>
        </div>
        <Button className="w-full mt-4 rounded-lg">Button</Button>
      </article>
    </section>
  );
}
