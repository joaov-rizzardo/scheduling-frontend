// middleware.ts
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import * as AuthTokens from "@/common/auth-tokens";
import { InvalidRefreshToken } from "./errors/invalid-refresh-token";
import { TokenExpiredChecker } from "./common/token-expired-checker";
import { AuthService } from "./services/http/auth-service";

const unprotectedRoutes = ["/signin", "/signup"];

export async function middleware(request: NextRequest) {
  const unprotectedRoute = unprotectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );
  if (unprotectedRoute) return NextResponse.next();
  const accessToken = await AuthTokens.get("access");
  if (accessToken && !TokenExpiredChecker.isNearingExpiration(accessToken)) {
    return NextResponse.next();
  }
  try {
    const refreshToken = await AuthTokens.get("refresh");
    if (!refreshToken) throw new InvalidRefreshToken();
    const { accessToken } = await AuthService.refresh(refreshToken);
    const response = NextResponse.next();
    response.cookies.set("access-token", accessToken);
    return response;
  } catch (error) {
    const response = NextResponse.redirect(new URL("/signin", request.url));
    response.cookies.delete("access-token");
    response.cookies.delete("refresh-token");
    return response;
  }
}

export const config = {
  matcher: [
    {
      source: "/((?!_next/static|_next/image|assets|favicon.ico).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "next-action" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
