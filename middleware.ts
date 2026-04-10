import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

const AUTH_ROUTES = new Set(["/login", "/signup", "/forgot-password"]);
const MARKETING_ROUTES = new Set([
  "/",
  "/about",
  "/safety",
  "/privacy",
  "/terms",
  "/contact",
]);

function isAppRoute(pathname: string) {
  return pathname.startsWith("/dashboard");
}

function isAdminRoute(pathname: string) {
  return pathname === "/admin" || pathname.startsWith("/admin/");
}

function isOnboardingRoute(pathname: string) {
  return pathname === "/onboarding";
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const { supabase, response } = await updateSession(request);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const needsAuth =
    isAppRoute(pathname) || isAdminRoute(pathname) || isOnboardingRoute(pathname);

  if (!user && needsAuth) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (user && AUTH_ROUTES.has(pathname)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!user && !MARKETING_ROUTES.has(pathname) && !AUTH_ROUTES.has(pathname)) {
    if (!pathname.startsWith("/_next") && pathname !== "/favicon.ico") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
