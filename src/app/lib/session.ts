import "server-only"
import { EncryptJWT, jwtDecrypt } from "jose"

const encodedKey = Buffer.from(process.env.SESSION_SECRET!, "hex")

type SessionPayload = {
  access_token: string
  refresh_token?: string
  expires_at: number
}

export async function encryptSession(payload: SessionPayload) {
  return new EncryptJWT(payload)
    .setProtectedHeader({ alg: "dir", enc: "A256GCM" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .encrypt(encodedKey)
}

export async function decryptSession(session: string | undefined = "") {
  try {
    const { payload } = await jwtDecrypt<SessionPayload>(session, encodedKey)
    return payload
  } catch {
    return null
  }
}
