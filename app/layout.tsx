import type { Metadata } from "next";
import { Baloo_2 } from "next/font/google";
import "./globals.css";

const baloo = Baloo_2({
  subsets: ["latin"],
  weight: "500",
});

export const metadata: Metadata = {
  title: "PoiPoi",
  description:
    " immersive web game that challenges players to identify locations within Tokyo using visual clues from carefully curated images.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={baloo.className}>{children}</body>
    </html>
  );
}
