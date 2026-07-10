import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const baseURL = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000"
const redirectURL = `${baseURL}/api/auth/callback`
const clientID = "e892d1b53349c746513d28026eb52fab"
export const AUTH_STRING = `https://auth.hackclub.com/oauth/authorize?client_id=${clientID}&redirect_uri=${encodeURI(redirectURL)}&response_type=code&scope=name+email+birthdate+address+verification_status`