## 1. Component scaffolding

- [x] 1.1 Create `src/components/OnboardingWizard.tsx` with a closed/open state (`step: 0 | 1 | 2 | 3 | null`) and screen sequence array `["welcome", "loot", "rules", "start"]`
- [x] 1.2 Create `src/components/OnboardingWizard.module.css` establishing the new visual system (slab-serif headline styles, hard black drop-shadow utility, red/cream/olive color values, game-menu chrome primitives: dialogue box, quest card, EXP bar)
- [x] 1.3 Add the wizard trigger CTA button and the login button (linking to `/dashboard`) to `src/app/page.tsx` — implemented as a self-contained `<OnboardingWizard />` launcher; note: a second trigger was added directly in the hero section (see deviation note below), which the original task text did not anticipate
- [x] 1.4 Mount `<OnboardingWizard />` in `page.tsx`, controlled by the trigger button's open state

## 2. Screen content

- [x] 2.1 Build the "Welcome" screen: Prof. Hacker dialogue intro inviting the visitor to view the rules, with Next control
- [x] 2.2 Build "The Loot" screen: three cumulative prize tier cards (5hrs → 4 booster packs, 15hrs → plushie/merch, 40hrs → booster box or watch) plus a "prizes are cumulative" note
- [x] 2.3 Build "Trainer Rules" screen: quest cards for card-game-or-RPG (any theme), AI-allowed-no-slop, and original/creative-work requirements, plus a restated summary of the three prize tiers
- [x] 2.4 Build "Ready to Start" screen: booster pack preview list and final "Start Adventure" CTA linking to `https://auth.hackclub.com/join/hackachu`

## 3. Navigation and controls

- [x] 3.1 Implement Next/Back button behavior per screen, including closing the wizard when Back is pressed on the "Welcome" screen
- [x] 3.2 Implement the menu control for jumping directly to any of the four screens
- [x] 3.3 Implement animated transitions between screens using CSS keyframes (opacity/translate), matching the existing homepage's `fadeIn`/`dropIn`/`riseIn`/`popIn` pattern, and respect `prefers-reduced-motion`
- [x] 3.4 Implement keyboard shortcuts while the wizard is open (`A` = next, `B` = back, `Option+S` = jump to "Ready to Start"), attaching/detaching the listener on open/close

## 4. Replay behavior

- [x] 4.1 Verify no state (localStorage, cookies, query params) persists wizard progress or completion across page loads
- [x] 4.2 Verify reopening the wizard — whether after a full completion or an early close — always starts at the "Welcome" screen

## 5. Verification

- [x] 5.1 Manually walk through the full screen sequence (Welcome → Loot → Rules → Start) via mouse and via keyboard shortcuts (verified headless via Playwright)
- [x] 5.2 Verify the login button navigates to `/dashboard` without opening the wizard
- [x] 5.3 Verify the final "Start Adventure" CTA links to `https://auth.hackclub.com/join/hackachu`
- [x] 5.4 Verify existing homepage comic-strip/footer are visually and functionally unchanged — **deviation**: the hero section was directly edited (outside this task flow) to add a second, larger wizard trigger between the trainer and pokeball images; verified it renders without layout overlap, but this contradicts the original "hero unchanged" requirement (see note below)
- [x] 5.5 Check responsive behavior on small screens (mirroring the homepage's existing `@media (max-width: 700px)` handling)

## Deviation note

The homepage now has **two** wizard entry points instead of the one originally specced:
- A larger `<OnboardingWizard isButtonBigger={true} />` inside the hero section (added directly in the editor, not through this task list)
- The original `<OnboardingWizard />` below the footer

Both were confirmed working and visually non-overlapping. The `onboarding-wizard` spec's "Homepage wizard trigger" requirement (single CTA, hero/comic-strip/footer unchanged) is now stale relative to the implementation and should be updated to describe both entry points if this is the intended final design.
