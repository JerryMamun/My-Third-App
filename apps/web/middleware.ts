import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyAccessToken } from "@/lib/auth/jwt";
import { hasPermission } from "@/lib/auth/rbac";

// ═══════════════════════════════════════════════════
// Route Configuration
// ═══════════════════════════════════════════════════

const PUBLIC_ROUTES = [
  "/",
  "/packages",
  "/coverage",
  "/support",
  "/about",
  "/contact",
  "/faq",
  "/api/public",
  "/api/auth/login",
  "/api/auth/register",
  "/api/auth/refresh",
  "/api/auth/forgot-password",
  "/api/auth/reset-password",
  "/api/auth/verify-otp",
];

const CUSTOMER_ROUTES = [
  "/dashboard",
  "/billing",
  "/tickets",
  "/profile",
  "/api/portal",
];

const ADMIN_ROUTES = [
  "/noc",
  "/admin",
  "/customers",
  "/network",
  "/billing/admin",
  "/reports",
  "/api/admin",
  "/api/noc",
];

const STATIC_ASSETS = [
  "/_next",
  "/static",
  "/images",
  "/favicon.ico",
  "/robots.txt",
  "/sitemap.xml",
];

// ═══════════════════════════════════════════════════
// Middleware Handler
// ═══════════════════════════════════════════════════

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip static assets
  if (STATIC_ASSETS.some((prefix) => pathname.startsWith(prefix))) {
    return NextResponse.next();
  }

  // Check if route is public
  if (PUBLIC_ROUTES.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Extract tokens
  const accessToken = request.cookies.get("access_token")?.value;
  const refreshToken = request.cookies.get("refresh_token")?.value;

  // No tokens = redirect to login
  if (!accessToken && !refreshToken) {
    return handleUnauthenticated(request, pathname);
  }

  try {
    // Verify access token
    let payload = await verifyAccessToken(accessToken || "");

    // If access token expired but refresh exists, attempt refresh
    if (!payload && refreshToken) {
      const refreshed = await attemptTokenRefresh(refreshToken, request);
      if (!refreshed) {
        return handleUnauthenticated(request, pathname);
      }
      payload = refreshed.payload;

      // Create response with refreshed cookies
      const response = NextResponse.next();
      response.cookies.set("access_token", refreshed.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 15 * 60, // 15 minutes
      });
      return response;
    }

    if (!payload) {
      return handleUnauthenticated(request, pathname);
    }

    // Check route permissions based on user type
    if (ADMIN_ROUTES.some((route) => pathname.startsWith(route))) {
      if (payload.userType !== "STAFF") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }

      // Check specific permissions for admin routes
      const requiredPermission = getRequiredPermission(pathname);
      if (requiredPermission && !hasPermission(payload.role, requiredPermission)) {
        return NextResponse.redirect(new URL("/noc/unauthorized", request.url));
      }
    }

    if (CUSTOMER_ROUTES.some((route) => pathname.startsWith(route))) {
      if (payload.userType !== "CUSTOMER" && payload.userType !== "STAFF") {
        return NextResponse.redirect(new URL("/", request.url));
      }
    }

    // Add user context to headers for downstream use
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-user-id", payload.sub);
    requestHeaders.set("x-user-type", payload.userType);
    requestHeaders.set("x-user-role", payload.role || "NONE");
    requestHeaders.set("x-session-id", payload.sessionId || "");

    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  } catch (error) {
    console.error("[Middleware] Auth error:", error);
    return handleUnauthenticated(request, pathname);
  }
}

// ═══════════════════════════════════════════════════
// Helper Functions
// ═══════════════════════════════════════════════════

function handleUnauthenticated(request: NextRequest, pathname: string) {
  // API routes return 401
  if (pathname.startsWith("/api/")) {
    return NextResponse.json(
      { error: "Unauthorized", code: "AUTH_REQUIRED" },
      { status: 401 }
    );
  }

  // Admin routes redirect to admin login
  if (ADMIN_ROUTES.some((route) => pathname.startsWith(route))) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Customer routes redirect to customer login
  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("redirect", pathname);
  return NextResponse.redirect(loginUrl);
}

async function attemptTokenRefresh(
  refreshToken: string,
  request: NextRequest
): Promise<{ payload: any; accessToken: string } | null> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
    const response = await fetch(`${apiUrl}/api/v1/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) return null;

    const data = await response.json();
    return {
      payload: data.payload,
      accessToken: data.accessToken,
    };
  } catch {
    return null;
  }
}

function getRequiredPermission(pathname: string): string | null {
  const permissionMap: Record<string, string> = {
    "/noc": "noc:read",
    "/customers": "customers:read",
    "/network": "network:read",
    "/billing/admin": "billing:read",
    "/reports": "reports:read",
    "/api/admin": "admin:api",
    "/api/noc": "noc:api",
  };

  for (const [route, permission] of Object.entries(permissionMap)) {
    if (pathname.startsWith(route)) return permission;
  }
  return null;
}

// ═══════════════════════════════════════════════════
// Matcher Config
// ═══════════════════════════════════════════════════

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
