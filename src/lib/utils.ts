import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const rawBaseURL = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000"
// tolerate env values missing the scheme or carrying a trailing slash —
// the OAuth provider requires an exact, well-formed redirect_uri
const baseURL = (/^https?:\/\//.test(rawBaseURL) ? rawBaseURL : `https://${rawBaseURL}`).replace(/\/+$/, "")
export const REDIRECT_URI = `${baseURL}/api/auth/callback`
const clientID = "e892d1b53349c746513d28026eb52fab"
export const AUTH_STRING = `https://auth.hackclub.com/oauth/authorize?client_id=${clientID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code&scope=name+email+birthdate+address+verification_status`