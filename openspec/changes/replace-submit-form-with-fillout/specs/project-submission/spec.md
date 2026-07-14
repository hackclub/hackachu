## ADDED Requirements

### Requirement: Login-gated access to the submit page
The `/submit` page SHALL require an active Hack Club OAuth session to be viewed. Visitors without a valid session SHALL be redirected to the login flow instead of seeing the submission button.

#### Scenario: Authenticated visitor
- **WHEN** a user with a valid session cookie navigates to `/submit`
- **THEN** the page renders the "Submit Project" button

#### Scenario: Unauthenticated visitor
- **WHEN** a user without a valid session cookie navigates to `/submit`
- **THEN** the user is redirected to the OAuth login flow instead of seeing the submission button

### Requirement: Click-to-open Fillout embed
The `/submit` page SHALL display a "Submit Project" button that opens the Fillout form (`g5DGvPB1GPus` on `forms.hackclub.com`) in a popup or slider overlay when clicked, rather than embedding the form inline and always-visible.

#### Scenario: Opening the embed
- **WHEN** an authenticated user clicks the "Submit Project" button
- **THEN** the Fillout form opens in a popup/slider overlay on top of the current page

### Requirement: Identity prefill
When opening the Fillout embed, the system SHALL pass the authenticated user's Hack Club identity (name, email, address, birthday) as prefill parameters, sourced from the existing OAuth session server-side.

#### Scenario: Prefilled fields
- **WHEN** an authenticated user opens the Fillout embed
- **THEN** the Fillout form's corresponding fields are pre-populated with the user's name, email, address, and birthday from their Hack Club identity

### Requirement: No server-side submission handling
The system SHALL NOT receive, process, or store submission data (screenshot, code URL, playable URL, description, GitHub username, hours spent, prize) on this application's backend. Fillout SHALL handle validation, file upload, and the Airtable write directly.

#### Scenario: Submission bypasses this app's backend
- **WHEN** a user completes and submits the Fillout form
- **THEN** the submission data is sent directly from Fillout to Airtable, without passing through any route in this application
