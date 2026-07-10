import "server-only"

type Address = {
  line_1?: string
  line_2?: string
  city?: string
  state?: string
  postal_code?: string
  country?: string
  primary?: boolean
}

type Identity = {
  id: string
  first_name?: string
  last_name?: string
  primary_email?: string
  birthday?: string
  slack_id?: string
  addresses?: Address[]
}

export async function getIdentity(accessToken: string): Promise<Identity | null> {
  const res = await fetch("https://auth.hackclub.com/api/v1/me", {
    headers: { Authorization: `Bearer ${accessToken}` },
  })

  if (!res.ok) {
    return null
  }

  const { identity } = await res.json()
  return identity
}
