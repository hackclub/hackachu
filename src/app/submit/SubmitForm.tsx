"use client"

import { useState } from "react"

export default function SubmitForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus("submitting")

    const formData = new FormData(event.currentTarget)

    const res = await fetch("/api/submit", {
      method: "POST",
      body: formData,
    })

    setStatus(res.ok ? "success" : "error")
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <label className="flex flex-col gap-1">
        Screenshot
        <input type="file" name="screenshot" accept="image/*" required />
      </label>

      <label className="flex flex-col gap-1">
        Code URL
        <input type="url" name="codeUrl" required className="border rounded px-2 py-1" />
      </label>

      <label className="flex flex-col gap-1">
        Playable URL
        <input type="url" name="playableUrl" required className="border rounded px-2 py-1" />
      </label>

      <label className="flex flex-col gap-1">
        Description
        <textarea name="description" required className="border rounded px-2 py-1" />
      </label>

      <label className="flex flex-col gap-1">
        GitHub username
        <input type="text" name="githubUsername" required className="border rounded px-2 py-1" />
      </label>

      <label className="flex flex-col gap-1">
        Hours spent
        <input type="number" name="hoursSpent" required min={0} step="0.5" className="border rounded px-2 py-1" />
      </label>

      <label className="flex flex-col gap-1">
        Prize you want
        <input
          type="text"
          name="prize"
          required
          placeholder="e.g. surging sparks booster pack, sick watch..."
          className="border rounded px-2 py-1"
        />
      </label>

      <button type="submit" disabled={status === "submitting"} className="border rounded px-4 py-2 mt-4">
        {status === "submitting" ? "Submitting..." : "Submit"}
      </button>

      {status === "success" && <p>Submitted successfully.</p>}
      {status === "error" && <p>Something went wrong. Please try again.</p>}
    </form>
  )
}
