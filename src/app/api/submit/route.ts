import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { decryptSession } from "@/app/lib/session"
import { getIdentity } from "@/app/lib/hackclub"

const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID
const AIRTABLE_TABLE_NAME = process.env.AIRTABLE_TABLE_NAME
const AIRTABLE_PAT = process.env.AIRTABLE_PAT

export async function POST(request: NextRequest) {
  const cookieStore = await cookies()
  const session = await decryptSession(cookieStore.get("session")?.value)

  if (!session) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 })
  }

  const identity = await getIdentity(session.access_token)

  if (!identity) {
    return NextResponse.json({ error: "identity_lookup_failed" }, { status: 502 })
  }

  const address = identity.addresses?.find((a) => a.primary) ?? identity.addresses?.[0]

  const formData = await request.formData()

  const fields = {
    "Code URL": formData.get("codeUrl"),
    "Playable URL": formData.get("playableUrl"),
    "First Name": identity.first_name,
    "Last Name": identity.last_name,
    "Email": identity.primary_email,
    "Description": formData.get("description"),
    "GitHub Username": formData.get("githubUsername"),
    "Address (Line 1)": address?.line_1,
    "Address (Line 2)": address?.line_2,
    "City": address?.city,
    "State / Province": address?.state,
    "Country": address?.country,
    "ZIP / Postal Code": address?.postal_code,
    "Birthday": identity.birthday,
    "Optional - Override Hours Spent": Number(formData.get("hoursSpent")),
    "Prize": formData.get("prize"),
    // "Slack ID": identity?.slack_id,
  }

  const createRes = await fetch(
    `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE_NAME!)}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${AIRTABLE_PAT}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fields }),
    }
  )

  if (!createRes.ok) {
    const body = await createRes.text()
    console.error("Airtable create record failed", createRes.status, body)
    return NextResponse.json({ error: "submission_failed" }, { status: 502 })
  }

  const record = await createRes.json()

  const screenshot = formData.get("screenshot")

  if (screenshot instanceof File) {
    const buffer = Buffer.from(await screenshot.arrayBuffer())
    const base64 = buffer.toString("base64")

    const uploadRes = await fetch(
      `https://content.airtable.com/v0/${AIRTABLE_BASE_ID}/${record.id}/Screenshot/uploadAttachment`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${AIRTABLE_PAT}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contentType: screenshot.type,
          filename: screenshot.name,
          file: base64,
        }),
      }
    )

    if (!uploadRes.ok) {
      const body = await uploadRes.text()
      console.error("Airtable screenshot upload failed", uploadRes.status, body)
      return NextResponse.json(
        { id: record.id, warning: "screenshot_upload_failed" },
        { status: 207 }
      )
    }
  }

  return NextResponse.json({ id: record.id }, { status: 201 })
}
