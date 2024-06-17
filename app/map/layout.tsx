import { Suspense } from "react";
import Loading from "./loading";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="touch-none">
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1"
      ></meta>
      <body className="touch-none">
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </body>
    </html>
  );
}
