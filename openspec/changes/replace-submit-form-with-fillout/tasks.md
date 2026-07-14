## 1. Dependency

- [ ] 1.1 Add `@fillout/react` to `package.json` and install
- [ ] 1.2 Check Fillout's current docs for the popup/slider embed component name, props, and how it accepts prefill parameters (do not assume from memory)

## 2. Identity prefill plumbing

- [ ] 2.1 In `/submit/page.tsx` (server component), read the session cookie and redirect unauthenticated visitors to the OAuth login flow
- [ ] 2.2 Call `getIdentity()` for authenticated visitors and pass the relevant fields (name, email, address, birthday) as props into the client component
- [ ] 2.3 Confirm with whoever owns the Fillout form configuration which parameter names map to which fields, and build the parameter map accordingly

## 3. Rewrite the submit UI

- [ ] 3.1 Rewrite `SubmitForm.tsx` to accept identity props and render a "Submit Project" trigger button instead of a native `<form>`
- [ ] 3.2 Wire the button to open the Fillout popup/slider embed (form id `g5DGvPB1GPus`, domain `forms.hackclub.com`) with the identity parameters applied
- [ ] 3.3 Remove the now-unused form-state logic (status tracking, FormData construction, fetch to `/api/submit`)

## 4. Remove the old backend

- [ ] 4.1 Delete `src/app/api/submit/route.ts`
- [ ] 4.2 Confirm `getIdentity()` in `src/app/lib/hackclub.ts` is still referenced (by the new `/submit/page.tsx` call site) and not orphaned
- [ ] 4.3 Flag `AIRTABLE_BASE_ID`, `AIRTABLE_TABLE_NAME`, `AIRTABLE_PAT` as unused by this app going forward; leave a note for whoever manages deployment env config to confirm and remove them (do not remove env config from this task — out of scope/no access from this repo)

## 5. Verification

- [ ] 5.1 Run the app locally, log in via Hack Club OAuth, land on `/submit`
- [ ] 5.2 Confirm unauthenticated access to `/submit` redirects to login
- [ ] 5.3 Click "Submit Project" and confirm the Fillout popup/slider opens
- [ ] 5.4 Confirm identity fields (name, email, address, birthday) appear prefilled in the opened Fillout form
- [ ] 5.5 Submit a test entry through Fillout and confirm it lands in Airtable without touching this app's server
