import { NextRequest } from "next/server"

// Derive the site origin from the incoming request instead of an env var,
// so the OAuth redirect always targets the domain the user is actually on.
export function getRequestOrigin(request: NextRequest): string {
  const host =
    request.headers.get("x-forwarded-host") ??
    request.headers.get("host") ??
    "localhost:3000"
  const proto =
    request.headers.get("x-forwarded-proto") ??
    (host.startsWith("localhost") || host.startsWith("127.") ? "http" : "https")
  return `${proto}://${host}`
}

export function getRedirectUri(request: NextRequest): string {
  return `${getRequestOrigin(request)}/api/auth/callback`
}
