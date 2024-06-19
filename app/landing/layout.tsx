import { Baloo_2 } from "next/font/google";
import "../globals.css";

const baloo = Baloo_2({
  subsets: ["latin"],
  weight: "500",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-secondary">
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1"
      ></meta>
      <body className={baloo.className}>{children}</body>
    </html>
  );
}
