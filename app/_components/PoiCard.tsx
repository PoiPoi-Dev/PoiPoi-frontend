import Image from "next/image";

export function PoiCard(): JSX.Element {
  return (
    <section
      className="flex flex-col bg-gray-300 min-w-[300px] max-w-full min-h-[600px] max-h-full rounded-2xl overflow-hidden border-solid border-white border-4
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
      <article className="flex-auto max-h-full w-full p-4">
        <h1 className="text-2xl font-bold text-black p-0 m-0 mb-2">Title</h1>
        <div className="flex gap-2">
          <a className="rounded-full p-1 bg-blue-500 min-w-[80px] text-center">
            Tag1
          </a>
          <a className="rounded-full p-1 bg-blue-500 min-w-[80px] text-center">
            Tag1
          </a>
          <a className="rounded-full p-1 bg-blue-500 min-w-[80px] text-center">
            Tag1
          </a>
        </div>
      </article>
    </section>
  );
}
