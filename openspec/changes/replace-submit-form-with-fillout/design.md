## Context

`/submit` currently renders `SubmitForm.tsx`, a client-side `<form>` that POSTs `FormData` to `/api/submit/route.ts`. That route reads the session cookie, calls `getIdentity()` (Hack Club OAuth) to fetch name/email/address/birthday, merges it with the submitted fields, writes a record to Airtable, then separately base64-uploads the screenshot as an Airtable attachment.

Fillout (`forms.hackclub.com`, form id `g5DGvPB1GPus`) is being adopted to own the entire submission surface — its own field validation, file upload, and a native Airtable write — configured on Fillout's side, out of scope here. This app's job shrinks to: gate access behind login, open the Fillout embed on click, and hand it prefill data.

## Goals / Non-Goals

**Goals:**
- Replace the custom form UI with a button that opens the Fillout form in a popup/slider overlay.
- Prefill the Fillout form with Hack Club identity data already available via the existing OAuth session.
- Remove the now-redundant submission backend and its direct Airtable credential usage.
- Keep `/submit` gated behind an authenticated session, consistent with today's behavior (unauthenticated POSTs currently 401).

**Non-Goals:**
- Configuring the Fillout form itself (fields, Airtable mapping, file upload field) — that's managed in Fillout's dashboard, not this repo.
- Preserving a server-side record of submissions in this app (Fillout/Airtable is the source of truth going forward).
- Building a webhook receiver for Fillout submissions — explicitly ruled out per proposal ("Fillout owns submission end-to-end").

## Decisions

**1. Popup/slider embed via `@fillout/react`, not the raw `standard` snippet.**
The pasted snippet (`data-fillout-embed-type="standard"`) is an always-visible inline iframe. The desired UX is click-to-open, so implementation uses `@fillout/react`'s popup or slider embed component instead. The exact component/prop names should be confirmed against Fillout's current docs at implementation time rather than assumed — API surface for these libraries isn't reliably stable across versions.

**2. Identity prefill happens server-side, then passed to the client as plain props.**
`page.tsx` (a server component) checks the session, calls `getIdentity()`, and passes the relevant fields (name, email, address, birthday) as props into the client component that renders the Fillout trigger button. The client component builds the parameter map Fillout expects (`data-fillout-inherit-parameters` reads from the URL, so parameters are appended to the page's own URL or passed via the embed component's parameter prop, whichever `@fillout/react` supports) — this keeps the OAuth access token itself off the client.

**3. `getIdentity()` and `src/app/lib/hackclub.ts` are kept, not deleted.**
The proposal's impact section flagged this as conditional. Confirmed: `getIdentity` currently has exactly one caller (`/api/submit/route.ts`, being deleted), but the new design adds a new caller (`/submit/page.tsx`, for prefill data) — so the helper survives, just with its call site moved.

**4. `/api/submit/route.ts` is deleted outright, not stubbed or redirected.**
No other code references it (confirmed via grep — only self-references within the file). `AIRTABLE_BASE_ID`, `AIRTABLE_TABLE_NAME`, `AIRTABLE_PAT` become unused by this app; flag for removal from deployment env config in a separate, non-code step (out of scope for this change — a human should confirm nothing else reads them before removing them from the hosting platform).

**5. Login gating: redirect, not conditional render.**
`/submit/page.tsx` redirects unauthenticated visitors to `/api/auth/login` (mirroring the existing OAuth flow) rather than rendering an unprefilled button. Matches today's implicit requirement (the old route hard-401'd without a session) and avoids a confusing partially-functional state.

## Risks / Trade-offs

- **Fillout's popup/slider component API is unverified from here** → Mitigation: implementer checks `@fillout/react`'s current docs before wiring the embed; this design doesn't hardcode a prop name.
- **Losing server-side visibility into submissions** (this app no longer sees who submitted or when) → Accepted trade-off per explicit user direction; Airtable via Fillout remains the system of record.
- **Prefill parameter names must match Fillout's configured field mapping exactly**, and that mapping lives outside this repo → Mitigation: implementer coordinates with whoever owns the Fillout form to confirm parameter names before wiring them up; mismatched names silently fail to prefill rather than erroring.
- **Removing env vars from deployment config is a manual, out-of-band step** → Mitigation: called out explicitly in tasks so it isn't silently forgotten, but not automated here since this repo doesn't manage deployment config.

## Migration Plan

1. Add `@fillout/react` dependency.
2. Rewrite `SubmitForm.tsx` to render the trigger button + Fillout embed, accepting identity props.
3. Update `/submit/page.tsx` to fetch identity server-side and redirect unauthenticated visitors.
4. Delete `/api/submit/route.ts`.
5. Manually verify end-to-end in dev: log in, land on `/submit`, click button, confirm Fillout form opens with prefilled fields.
6. Coordinate with whoever manages hosting env vars to remove `AIRTABLE_*` if confirmed unused elsewhere.

No rollback complexity beyond standard git revert — no data migration involved since Fillout/Airtable state is independent of this app's deploy.

## Open Questions

- Exact `@fillout/react` component and prop names for popup/slider embed + parameter passing.
- Exact Fillout field parameter names for identity prefill (owned by whoever configured the Fillout form).
