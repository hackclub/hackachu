import { NextRequest, NextResponse } from "next/server"
import { decryptSession } from "@/app/lib/session"
// request.url is the server's internal (localhost) address on this host —
// build absolute redirects from forwarded headers instead
import { getRequestOrigin } from "@/app/lib/origin"

const protectedRoutes = ["/dashboard", "/submit"]

export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.some((route) => path.startsWith(route))

  if (!isProtectedRoute) {
    return NextResponse.next()
  }

  const session = await decryptSession(request.cookies.get("session")?.value)

  if (!session) {
    return NextResponse.redirect(new URL("/", getRequestOrigin(request)))
  }

  const meRes = await fetch("https://auth.hackclub.com/api/v1/me", {
    headers: { Authorization: `Bearer ${session.access_token}` },
  })

  if (!meRes.ok) {
    return NextResponse.redirect(new URL("/", getRequestOrigin(request)))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
}
