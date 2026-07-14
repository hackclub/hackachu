## Why

The custom submission form (`SubmitForm.tsx` + `/api/submit/route.ts`) duplicates validation, file upload, and Airtable-write logic that Fillout already handles natively. Hack Club's own Fillout form (`g5DGvPB1GPus` on `forms.hackclub.com`) can own the entire submission end-to-end — validation, screenshot upload, and the Airtable write — eliminating a maintenance surface and a code path that touches Airtable credentials directly.

## What Changes

- Replace `SubmitForm.tsx`'s inline HTML form with a "Submit Project" button that opens the Fillout form in a popup/slider overlay (via `@fillout/react`), rather than embedding Fillout inline/always-visible.
- Prefill the Fillout form with Hack Club OAuth identity (name, email, address, birthday) by passing them as inherited URL parameters when opening the embed.
- **BREAKING**: Remove `/api/submit/route.ts` entirely — Fillout submits directly to Airtable, so this app no longer receives or processes submission data.
- **BREAKING**: Remove the custom form fields (screenshot, code URL, playable URL, description, GitHub username, hours spent, prize) from this app's UI — those now live in the Fillout form itself, configured on Fillout's side (out of scope for this change).
- Gate the `/submit` page/button behind an active OAuth session, since prefill data depends on it — unauthenticated visitors are redirected to login rather than seeing an unprefilled button.
- Add `@fillout/react` as a new dependency.

## Capabilities

### New Capabilities
- `project-submission`: Covers how a logged-in user submits their hackathon project — the click-to-open Fillout embed, identity prefill, and login gating. Replaces the previous (unspecced) custom-form behavior.

### Modified Capabilities
(none — no existing specs exist for the prior custom-form behavior)

## Impact

- **Removed**: `src/app/api/submit/route.ts` (and its Airtable POST/attachment-upload logic).
- **Modified**: `src/app/submit/SubmitForm.tsx` (rewritten to render a trigger button + Fillout embed instead of a native `<form>`), `src/app/submit/page.tsx` (adds session check/redirect).
- **Possibly modified**: `src/app/lib/hackclub.ts` (`getIdentity`) — retained only if still used elsewhere (e.g. dashboard); otherwise its only caller disappears with the deleted route.
- **New dependency**: `@fillout/react`.
- **Env vars no longer read by this route**: `AIRTABLE_BASE_ID`, `AIRTABLE_TABLE_NAME`, `AIRTABLE_PAT` (may still be needed elsewhere — verify before removing from deployment config).
