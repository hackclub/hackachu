## Why

New visitors currently see the homepage's whimsical comic-strip pitch and then hit a single "join now." link straight to Hack Club's external auth — with no explanation of the actual program rules (prize tiers, hour thresholds, game requirements, AI policy) anywhere on the site. That information only exists in a Slack thread, making the jump from "vibes" to "sign up" feel abrupt and leaving prospective trainers to commit before they understand what they're committing to.

## What Changes

- Add a new animated, stateful onboarding wizard to the homepage, triggered by a new CTA button at the bottom of the existing page (hero, comic strip, and footer are untouched).
- The wizard is a 4-screen, single-page sequence driven by client-side state/animation (no new route): **Welcome** → **The Loot** (prize tiers) → **Trainer Rules** (quest cards) → **Ready to Start** (booster catalog + final CTA).
- Prize tiers are finalized as 5 / 15 / 40 cumulative hours (4 booster packs / plushie-merch / booster box or watch), superseding the earlier 5 / 10 / 25 figures from the original Slack announcement.
- Navigation: Back / Next controls with keyboard shortcuts (`A` = next, `B` = back, `Option+S` = start), plus a menu control to jump between screens.
- The wizard **always replays in full** on every homepage visit — no "seen it" skip state is persisted.
- The final screen's "Start Adventure" CTA links out to `https://auth.hackclub.com/join/hackachu`, same destination as today's "join now." link.
- A new **login** button is added directly below the wizard's trigger CTA, linking straight to `/dashboard` for trainers who are already part of the program, bypassing the wizard entirely.
- New visual language scoped only to the wizard: bold slab-serif headlines, hard black drop-shadows, red/cream/olive block palette, and game-menu chrome (EXP bars, quest-card layout, speaker-tagged dialogue boxes) — distinct from the homepage's existing pastel pixel-art styling.
- Frontend only. No backend, auth, or data-persistence changes.

## Capabilities

### New Capabilities
- `onboarding-wizard`: The 4-screen animated onboarding sequence living on the homepage — its screens, content, navigation/keyboard controls, and always-replay behavior.

### Modified Capabilities
- None. The existing homepage content and behavior are unchanged; this only adds new elements (trigger button, login button, wizard) alongside it.

## Impact

- Affected code: `src/app/page.tsx` and `src/app/page.module.css` (new trigger + login buttons appended at the bottom), plus new component(s) for the wizard itself (e.g. under `src/components/`).
- No changes to `/dashboard`, `TrainerDashboard`, backend routes, or auth flow — the login button and final CTA both link to existing external/internal destinations.
- No new dependencies expected beyond what's already used for animation in the codebase (e.g. existing `fancy/physics` or CSS animations already present in `page.module.css`).
