import { NextRequest, NextResponse, userAgent } from "next/server";

export function middleware(req: NextRequest) {
  console.log("working?");
  const { device } = userAgent(req);

  if (device.type !== "mobile") {
    return NextResponse.redirect(new URL("/landing", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/map", "/leaderboard", "/login"],
};
