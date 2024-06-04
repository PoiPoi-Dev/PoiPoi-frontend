"use client";

import Link from "next/link";

export default function Home(): JSX.Element {
  // RETURN
  return (
    <main className="text-white flex min-h-screen flex-col items-center justify-start p-24">
      <Link
        href="/map"
        className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-slate-400 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        target="_blank"
        rel="noopener noreferrer"
      >
        <h2 className="mb-3 text-2xl font-semibold">
          Map{" "}
          <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
            -&gt;
          </span>
        </h2>
        <p className="m-0 max-w-[30ch] text-sm opacity-50">
          Check out the map of the world here.
        </p>
      </Link>
      
    </main>
  );
}
