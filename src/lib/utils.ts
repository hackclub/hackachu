import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// the login route builds the real authorize URL from the request's own
// origin, so the redirect never depends on env vars (and can't point at
// localhost unless you're actually on localhost)
export const AUTH_STRING = "/api/auth/login"