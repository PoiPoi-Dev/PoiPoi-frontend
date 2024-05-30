"use client";

import { useEffect, useState } from "react";
import { sample } from "../_api/sample";
import { PoiCard } from "../_components/PoiCard";

const BASE_URL: string | undefined = process.env.NEXT_PUBLIC_BASE_URL;

export default function Home(): JSX.Element {
  // USE STATE
  const [message, setMessage] = useState<string>("");

  // USE EFFECT
  useEffect((): void => {
    console.log("url", BASE_URL);
    console.log(sample);
    void handleFetch();
  }, []);

  useEffect(() => {
    console.log(message);
  }, [message]);

  // FUNCTION
  async function handleFetch() {
    try {
      if (!BASE_URL) throw new Error("BASE_URL is not defined");
      const response: Response = await fetch(BASE_URL, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const res: Promise<string> = response.text();
      setMessage(await res);
    } catch (err) {
      console.error(err);
    }
  }

  // RETURN
  return (
    <main className="flex h-screen flex-col items-center justify-between">
      <PoiCard />
    </main>
  );
}
