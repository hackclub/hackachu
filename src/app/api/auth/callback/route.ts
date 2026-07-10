import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { encryptSession } from "@/app/lib/session"
// shared with the authorize step — the two must match exactly
import { REDIRECT_URI } from "@/lib/utils"

const BASE_URL = "https://auth.hackclub.com"

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code")

  if (!code) {
    return NextResponse.redirect(new URL("/?error=missing_code", request.url))
  }

  const tokenRes = await fetch(`${BASE_URL}/oauth/token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      code,
      client_id: process.env.HACKCLUB_CLIENT_ID,
      client_secret: process.env.HACKCLUB_SECRET_ID,
      redirect_uri: REDIRECT_URI,
      grant_type: "authorization_code",
    }),
  })

  if (!tokenRes.ok) {
    const body = await tokenRes.text()
    console.error("Hack Club token exchange failed", tokenRes.status, body)
    return NextResponse.redirect(new URL("/?error=token_exchange_failed", request.url))
  }

  const { access_token, refresh_token, expires_in } = await tokenRes.json()

  const session = await encryptSession({
    access_token,
    refresh_token,
    expires_at: Date.now() + expires_in * 1000,
  })

  const cookieStore = await cookies()
  cookieStore.set("session", session, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  })

  return NextResponse.redirect(new URL("/dashboard", request.url))
}
