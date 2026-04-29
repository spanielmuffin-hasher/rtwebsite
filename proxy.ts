import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { ProxyConfig } from "next/server";

// Protects /admin with HTTP Basic Auth.
// Set ADMIN_USERNAME and ADMIN_PASSWORD in .env.local (never .env.example).
// The browser caches credentials for the session — no custom UI needed.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  // If ADMIN_PASSWORD is not set, block access entirely to avoid open admin.
  const requiredPassword = process.env.ADMIN_PASSWORD;
  const requiredUsername = process.env.ADMIN_USERNAME ?? "admin";

  if (!requiredPassword) {
    return new NextResponse(
      "Admin panel is disabled. Set ADMIN_PASSWORD in environment variables.",
      { status: 503 }
    );
  }

  const authHeader = request.headers.get("authorization");

  if (authHeader?.startsWith("Basic ")) {
    try {
      const base64 = authHeader.slice(6);
      const decoded = atob(base64);
      const colonIndex = decoded.indexOf(":");
      if (colonIndex !== -1) {
        const username = decoded.slice(0, colonIndex);
        const password = decoded.slice(colonIndex + 1);

        if (username === requiredUsername && password === requiredPassword) {
          return NextResponse.next();
        }
      }
    } catch {
      // malformed base64 — fall through to 401
    }
  }

  return new NextResponse("Unauthorized — Admin access required.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Rotaract Crystals Admin", charset="UTF-8"',
    },
  });
}

export const config: ProxyConfig = {
  matcher: "/admin/:path*",
};
