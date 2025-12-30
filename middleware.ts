import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(_req: NextRequest) {
  // TEMP: bypass middleware so the site can deploy without Supabase/Auth configured
  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};
