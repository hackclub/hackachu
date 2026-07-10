## ADDED Requirements

### Requirement: Homepage wizard trigger
The homepage SHALL display a CTA button at the bottom of the page, below the existing footer content, that opens the onboarding wizard. The existing hero, comic-strip, and footer content SHALL remain unchanged.

#### Scenario: Visitor opens the wizard
- **WHEN** a visitor clicks the "start adventure" / onboarding CTA button on the homepage
- **THEN** the onboarding wizard opens on the same page (no navigation to a new URL) and displays the first screen ("Welcome")

### Requirement: Homepage login shortcut
The homepage SHALL display a login button directly below the wizard trigger CTA, always visible regardless of wizard state, that links to `/dashboard`.

#### Scenario: Returning trainer bypasses the wizard
- **WHEN** a visitor clicks the "login" button on the homepage
- **THEN** the browser navigates to `/dashboard` without opening or requiring interaction with the onboarding wizard

### Requirement: Four-screen wizard sequence
The onboarding wizard SHALL consist of exactly four screens presented in a fixed order: Welcome, The Loot, Trainer Rules, and Ready to Start.

#### Scenario: Screen order
- **WHEN** the wizard is opened and the visitor repeatedly triggers "next"
- **THEN** the screens are shown in the order Welcome → The Loot → Trainer Rules → Ready to Start, and no further "next" action is available past the final screen

#### Scenario: Welcome screen content
- **WHEN** the "Welcome" screen is displayed
- **THEN** it shows a Prof. Hacker dialogue introduction inviting the trainer to view the rules

#### Scenario: The Loot screen content
- **WHEN** the "The Loot" screen is displayed
- **THEN** it shows three cumulative prize tiers: 5 hours (4x booster packs), 15 hours (plushie or merch), and 40 hours (booster box or sick watch), each labeled with its hour threshold and reward, and a note that prizes are cumulative across milestones

#### Scenario: Trainer Rules screen content
- **WHEN** the "Trainer Rules" screen is displayed
- **THEN** it shows quest cards covering: building a card game or RPG of any theme, AI being allowed but requiring honest/non-slop use, and a requirement for original/creative work, alongside a restatement of the three prize tiers from "The Loot"

#### Scenario: Ready to Start screen content
- **WHEN** the "Ready to Start" screen is displayed
- **THEN** it shows a preview of available booster packs and a final "Start Adventure" call-to-action

### Requirement: Wizard navigation controls
The wizard SHALL support moving between screens via visible Back and Next controls, and closing back to the homepage from the first screen via Back.

#### Scenario: Advancing screens
- **WHEN** the visitor activates "Next" on any screen except the last
- **THEN** the wizard advances to the next screen in the sequence with an animated transition

#### Scenario: Returning to a previous screen
- **WHEN** the visitor activates "Back" on any screen except the first
- **THEN** the wizard returns to the previous screen in the sequence with an animated transition

#### Scenario: Closing the wizard from the first screen
- **WHEN** the visitor activates "Back" on the "Welcome" screen
- **THEN** the wizard closes and the homepage returns to its pre-wizard state (trigger CTA visible)

### Requirement: Wizard keyboard shortcuts
While the wizard is open, the wizard SHALL respond to keyboard shortcuts equivalent to its Back, Next, and Start controls, and SHALL stop responding to those shortcuts once closed.

#### Scenario: Keyboard next/back
- **WHEN** the wizard is open and the visitor presses the designated "next" key or the designated "back" key
- **THEN** the wizard performs the same action as clicking the corresponding Next or Back button

#### Scenario: Keyboard jump to start
- **WHEN** the wizard is open and the visitor presses the designated "start" shortcut
- **THEN** the wizard jumps directly to the "Ready to Start" screen

#### Scenario: Shortcuts inactive when closed
- **WHEN** the wizard is closed
- **THEN** pressing the wizard's designated keyboard shortcuts has no effect on the page

### Requirement: Wizard screen jump menu
The wizard SHALL provide a menu control that allows jumping directly to any of the four screens.

#### Scenario: Jumping via menu
- **WHEN** the visitor opens the menu control and selects a screen
- **THEN** the wizard displays the selected screen directly, without requiring sequential Next/Back navigation

### Requirement: Wizard final call-to-action
The "Ready to Start" screen's primary action SHALL link out to the Hack Club join URL.

#### Scenario: Starting the adventure
- **WHEN** the visitor activates "Start Adventure" on the final wizard screen
- **THEN** the browser navigates to `https://auth.hackclub.com/join/hackachu`

### Requirement: Wizard always replays
The wizard SHALL NOT persist any "seen" or "completed" state across page loads or sessions. Every time the wizard is opened, it SHALL start at the "Welcome" screen.

#### Scenario: Repeat visit after completing the wizard
- **WHEN** a visitor has previously opened and closed or completed the wizard, and then reloads or revisits the homepage
- **THEN** the homepage shows the wizard trigger CTA in its default (closed) state, with no skip or "already seen" behavior

#### Scenario: Reopening after closing mid-sequence
- **WHEN** a visitor closes the wizard partway through (e.g. from "Trainer Rules") and then reopens it via the trigger CTA
- **THEN** the wizard opens starting from the "Welcome" screen, not from where it was left
