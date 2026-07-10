import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const redirectURL = "http://localhost:3000/api/auth/callback"
const clientID = "e892d1b53349c746513d28026eb52fab"
export const AUTH_STRING = `https://auth.hackclub.com/oauth/authorize?client_id=${clientID}&redirect_uri=${encodeURI(redirectURL)}&response_type=code&scope=name+verification_status`