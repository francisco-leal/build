import { NextResponse } from "next/server";
import { getSession } from "@/services/authentication/cookie-session";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const user = await getSession();
  if (!user) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  /*
   * Match all request paths except for the ones starting with:
   * - api (API routes)
   * - _next/static (static files)
   * - _next/image (image optimization files)
   * - favicon.ico (favicon file)
   */
  matcher: "/((?!api|_next/static|_next/image|favicon.ico|leaderboard).*)",
};
