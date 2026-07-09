## Context

The homepage (`src/app/page.tsx` + `src/app/page.module.css`) is a single static page: hero → 7 comic-strip dialogue boxes → footer with a "join now." link to `https://auth.hackclub.com/join/hackachu`, a "trainer dashboard." link to `/dashboard`, and static release-date text. It uses a pastel pixel-art aesthetic (`--font-gb`, `#fff`/`#131313`, gameboy dialog boxes).

This change adds a self-contained onboarding wizard beneath that content, on the same route, with its own distinct visual language (bold slab-serif, hard drop-shadows, red/cream/olive palette, game-menu chrome). It does not touch the existing hero/comic-strip/footer markup or styling.

## Goals / Non-Goals

**Goals:**
- Explain the program's real rules (prize tiers, hour thresholds, game/AI requirements) before a visitor reaches the external Hack Club auth link.
- Keep the wizard on the homepage — no new route, no page navigation — driven entirely by client-side state and CSS/JS animation.
- Give returning trainers a fast, wizard-free path to `/dashboard` via a dedicated login button.
- Support both pointer and keyboard navigation (Next/Back/Start shortcuts) to match the "game menu" framing.

**Non-Goals:**
- No backend, auth, or data-persistence work. No API calls, no database, no session tracking.
- No "seen it" skip logic — replay-every-visit is the explicit, deliberate behavior.
- No changes to `/dashboard`, `TrainerDashboard`, or the existing homepage hero/comic-strip/footer.
- No real user progress data feeding the wizard (e.g. EXP bars are static/decorative, not tied to an authenticated user's actual hours).

## Decisions

**1. Wizard lives in a new client component (`src/components/OnboardingWizard.tsx` + module CSS), mounted at the bottom of `page.tsx`.**
Keeps `page.tsx` changes minimal (append a trigger button + login button + `<OnboardingWizard />`), isolates the new visual system from the existing homepage CSS, and matches the existing project pattern of one component + one `*.module.css` per unit (see `TrainerDashboard`, `Pokeball`).

**2. State machine: local `useState` for `step: 0 | 1 | 2 | 3 | null`, `null` = closed/not started.**
Four fixed screens, no branching logic, no need for a router or global state library. Alternative considered: encode step in the URL (`?step=`) for shareability/back-button support — rejected because the spec explicitly treats this as a homepage animation, not a navigable set of pages, and "always replay" already means there's nothing durable to bookmark.

**3. Screen sequence is a fixed array: `["welcome", "loot", "rules", "start"]`.**
Next/Back move the index by 1 and clamp at bounds; the menu control jumps directly to an index. `Option+S` on any step jumps straight to the final "start" screen (matches the mockup's global shortcut, acting as a "skip to CTA" affordance) — Back (`B`) on step 0 closes the wizard back to the homepage trigger button.

**4. Transitions are CSS-driven (opacity/translate keyframes per step), consistent with the existing homepage's own `fadeIn`/`dropIn`/`riseIn`/`popIn` keyframe pattern in `page.module.css`.**
No animation library needed; matches project convention (`prefers-reduced-motion` handling already exists on the homepage and should be mirrored here).

**5. Keyboard shortcuts are bound only while the wizard is open** (`A` = next, `B` = back, `Option+S` = jump to start screen), removed on close/unmount to avoid intercepting keys elsewhere on the homepage.

**6. Content (copy, prize numbers, quest text) is hardcoded in the component**, not fetched or CMS-driven — same approach as the existing homepage's hardcoded dialogue strings.

**7. "Always replay" means no `localStorage`/cookie/skip-state of any kind is written or read for this feature.**
Every homepage load starts with the wizard closed (as today) and, when the trigger button is clicked, always opens at step 0. This is a deliberate product decision from the proposal, not an oversight.

**8. Login button placement: rendered directly below the wizard trigger CTA, always visible (not conditional on wizard state), linking to `/dashboard` via existing `next/link`.**
Consistent with how the current footer already links to `/dashboard` — this change relocates/adds that entry point near the new CTA rather than removing the footer's existing link.

## Risks / Trade-offs

- **Visual inconsistency between homepage and wizard** (pastel pixel-art vs. bold slab-serif/red-cream-olive) → Mitigated by intentionally scoping the new palette/typography to the wizard's own CSS module so it reads as a distinct "opening a menu" moment rather than a broken mismatch, matching the reference mockups.
- **Keyboard shortcuts could conflict with browser/OS shortcuts** (e.g. some `Option+` combos) → Mitigated by scoping the listener to only fire while the wizard is mounted/open, and treating shortcuts as an enhancement on top of always-clickable Back/Next/Start buttons.
- **"Always replay" may frustrate repeat visitors who just want to log in** → Mitigated by the dedicated login button sitting right next to the trigger, giving returning trainers a one-click bypass.
- **Static EXP bars/quest progress in "Trainer Rules" screen could be misread as real per-user data** → Mitigated by treating them purely as decorative game-menu chrome per Goals/Non-Goals; copy should avoid implying personalized tracking.

## Open Questions

- Final visual asset needs (fonts, icons for quest cards, booster-pack art) aren't specified — implementation may need placeholder assets until final art is provided.
