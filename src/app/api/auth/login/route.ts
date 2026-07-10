import { NextRequest, NextResponse } from "next/server"
import { getRedirectUri } from "@/app/lib/origin"

export function GET(request: NextRequest) {
  const params = new URLSearchParams({
    client_id: process.env.HACKCLUB_CLIENT_ID!,
    redirect_uri: getRedirectUri(request),
    response_type: "code",
    scope: "name email birthdate address verification_status",
  })

  return NextResponse.redirect(
    `https://auth.hackclub.com/oauth/authorize?${params}`
  )
}
