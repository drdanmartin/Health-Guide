# Handoff: Radius Health Guides — Member Companion App

**Target:** iOS + Android native app (React Native / Expo recommended)
**Starting scope:** Read-only guide reader. Active logging, photo capture, and analytics are Phase 2.
**Client:** Radius Chiropractic PLLC · Asheville, NC
**Audience:** Invite-only — active practice members who have purchased a Dahlia Pinnacle Red Light Therapy treatment plan (Silver 60-day or Gold 90-day).

---

## 1. About the Design Files

The files in this bundle are **design references created in HTML**. They are interactive prototypes that show the intended look, content, structure, and information architecture — they are **not production code to copy directly**.

Your job is to **recreate these designs in a proper native mobile codebase**, using the framework's established patterns and libraries. The HTML is high-fidelity — typography, color, spacing, and copy are all final and should be ported faithfully.

### Recommended stack
- **Framework:** Expo (React Native, managed workflow)
- **Navigation:** Expo Router (file-based, type-safe)
- **UI:** Tamagui or NativeWind for the Tailwind-style utility workflow with performant native primitives
- **Auth:** Supabase Auth with magic-link or one-time-password email flows (member invites only, no public signup)
- **Data layer:** Supabase Postgres as the source of truth for members + guide state. ChiroHD EHR is consulted for membership verification at login via a thin server-side proxy.
- **Booking:** Integrate with the practice's existing booking provider — see §10
- **Notifications:** Expo Push (Phase 2)

---

## 2. Fidelity

**High-fidelity (hifi).** The HTML prototypes are visually final:
- All copy is production-ready
- Typography scale, color system, and spacing are locked (see §8)
- Component composition, section order, and information hierarchy are intentional
- Behavioral interactions (toggle, navigation, print) are defined

On mobile, layouts **must** be adapted — the HTML is desktop-optimized. Column grids collapse to stacks, section paddings compress, and hero type scales down. See §6 for per-screen adaptation notes.

---

## 3. User & Auth Model

### Access
- **Invite-only.** No self-signup. No public access.
- Member receives an invitation email after purchasing a treatment plan. Email contains a magic link that provisions the app and links the member record.
- App is only distributed via TestFlight (iOS) and Google Play internal/closed testing initially. Post-MVP, ship to the stores but gate behind server-side membership check.

### Authentication flow
1. User opens app → email input screen
2. Email submitted → server checks ChiroHD for active member with that email + active treatment plan
3. If verified → Supabase sends magic-link email
4. User taps link → app opens → session established → lands on Home

### Authorization
- Every protected screen checks `session.user.plan_status === 'active'`
- If plan has expired (past 60/90 days from start) → read-only mode continues, but show a "Plan complete" banner and upsell to next plan
- Clinic staff have a `role === 'staff'` flag that unlocks an internal debug/content-preview screen

### Member record shape (Supabase `members` table)
```
id               uuid (PK, matches auth.users.id)
chirohd_id       text (external reference)
email            text (unique)
first_name       text
plan_id          enum ('silver_60', 'gold_90')
plan_started_at  timestamptz
plan_ends_at     timestamptz (computed)
ptx_modes        text[]  // which of the 5 modes are active for this member
status           enum ('invited', 'active', 'completed', 'cancelled')
invited_at       timestamptz
activated_at     timestamptz
```

---

## 4. Screens / Views

The HTML prototype has 3 logical views. Native app should have **6 screens** for good mobile UX:

### 4.1 Auth: Email Entry
- Full-bleed background: `assets/pinnacle-hero-main.jpg`, 50% black overlay
- Centered card: Radius lockup logo (white), "Health Guides" subtitle
- Email input with platform-appropriate keyboard
- "Send magic link" primary button (red `#E60023`)
- Footer: "Members only · Already enrolled? Check your email for your invitation"

### 4.2 Auth: Check Your Email
- Confirmation state after magic link sent
- "We sent a sign-in link to {email}"
- "Open Mail app" button (iOS) / "Open Email" chooser (Android)
- "Use a different email" text link

### 4.3 Home — Mode Picker
**Native adaptation of the HTML `home` view.**
- Hero section (collapses to 60vh on mobile): Pinnacle background photo, Radius logo lockup, "Health Guides" display type, member's first name as welcome
- Silver/Gold plan toggle — but locked to the member's purchased plan. Show the other plan as a dimmed card with "Upgrade" CTA that opens a booking deep-link
- Grid of 5 PTx mode cards — stack vertically on mobile, 2-col on tablet/landscape
- Each card: mode number, name, tagline, wavelength spec, "Open guide →" affordance
- Only show mode cards the member has purchased. Others appear dimmed with "Not in your plan" label.

### 4.4 Mode Detail — Sectioned Scroll
**Native adaptation of the HTML `mode` view.**
- Sticky header with back button + mode name + Silver/Gold badge
- Scrollable sections (each gets its own tab or anchor-jump in a secondary nav):
  1. **Mechanism** — hero photo, mode name, tagline, wavelength stats, mechanism paragraph
  2. **Session Protocol** — 5-step card carousel (horizontal swipe on mobile)
  3. **Methylene Blue Callout** — red-bordered card, Amazon link, QR code (see §9)
  4. **Phased Plan** — Silver has 3 phases, Gold has 4. Render as vertical timeline.
  5. **Daily Rhythm** — collapsible blocks (Rise, Breath & Move, Session, Evening)
  6. **Inputs** — 3 cards: Nutrition, Exercise, Supplement emphasis
  7. **Radius Super Stack** — logo + title flush together, table of 6 supplements with timing + role. First row (Methylene Blue) includes purchase link.
  8. **Practice Library** — 5 cards: Breathwork, Chi Gong, Lymphatic, Vagal, Sleep. Four have "Watch guided session" deep-links to YouTube (see §9).
  9. **Contraindications & Disclaimer** — red warning icon, bullet list, full disclaimer text.

### 4.5 Settings / Profile
- Member name, email, plan type, plan dates
- "Book next session" → deep-links to booking system
- "Contact Radius" → opens email/phone
- Sign out
- App version, privacy policy, terms of use

### 4.6 Booking
See §10.

---

## 5. Navigation Structure

```
┌─ Auth Stack (unauthenticated)
│   ├─ EmailEntry
│   └─ MagicLinkSent
│
└─ Main Tab Bar (authenticated)
    ├─ Home (stack → Mode Detail)
    │   └─ ModeDetail
    ├─ Book  (stack → BookingWebView or native booking)
    └─ Profile (stack → Settings, Contact, About)
```

Tab bar: **Home · Book · Profile**. Red accent on active tab. Dark bar (`#0A0A0B`) consistent with app theme.

---

## 6. Layout Adaptation Notes

| HTML pattern | Mobile adaptation |
|---|---|
| `auto-fit minmax(320px, 1fr)` mode grid | Single column stack, 16px gutter |
| Hero: `78vh` with left-aligned display type | `60vh`, bottom-anchored, type clamped to 48pt max |
| Section padding `96px 28px` | `56px 20px` |
| Supplement table (3-column grid) | Single column cards, stacked: name → timing pill → role |
| 5-step session protocol (horizontal) | Horizontal swiper with page dots, one step per viewport |
| Practice Library (auto-fit 280px) | Single column on phone, 2-col on tablet |
| Sticky top nav with logo + duration toggle | Sticky top nav with back arrow + mode name; toggle moves to Profile screen |

---

## 7. Interactions & Behavior

### Persistence
- Silver/Gold toggle: **not user-changeable** on mobile. It's set by their purchased plan from the server.
- "Current mode" — last opened mode is remembered, used to deep-link from push notifications (Phase 2)
- Scroll position per mode persisted via AsyncStorage or Supabase user_preferences

### Navigation
- Back gesture (iOS swipe-back, Android system back) must work from all detail screens
- Deep linking: `radius://mode/weight-loss`, `radius://book`, `radius://auth?token=...`

### Links out of the app
- YouTube guide video links → open in external browser (iOS: Safari, Android: Chrome), not in-app webview
- Amazon methylene blue purchase link → external browser
- Booking → see §10

### Offline behavior
- Entire guide content is bundled with the app — **must work fully offline** after first successful auth
- Booking and magic-link auth require connection (show offline banner if attempted)

---

## 8. Design Tokens

**Source of truth:** `assets/colors_and_type.css` in this bundle. Port to your theme provider (Tamagui, Restyle, or plain constants).

### Colors
```
--black:          #0A0A0B  (app background)
--bg-raised:      #111113  (elevated surfaces)
--bg-card:        #17171A  (cards)
--bg-hover:       #1D1D21  (hover/pressed states)
--border:         #2A2A30
--border-subtle:  #1A1A1D
--fg-1:           #F4F4F5  (primary text)
--fg-2:           #C4C4CB  (secondary text)
--fg-3:           #8A8A92  (tertiary text)
--accent:         #E60023  (Radius red — primary CTAs, rules, eyebrows)
--accent-hover:   #FF2A3D
--silver:         #B5B5BC  (Silver plan badge)
--gold:           #C9A862  (Gold plan badge)
```

### Typography
- **Display:** `Space Grotesk` 600–700 (used for headings H1–H3, uppercase)
- **Sans:** `Inter` 400–600 (body, nav, eyebrows)
- **Mono:** `JetBrains Mono` 400–500 (specs, wavelengths, labels)
- **Eyebrow tracking:** `0.12em`
- **Display tracking:** `-0.02em` (tight)

### Spacing
Rhythm of 4/8/12/16/24/32/48/64/96. Section padding `96/28` desktop → `56/20` mobile.

### Radii
Mostly **square corners** — this is intentional. Only radii used: `0`, `4` (inputs, pills), `12` (modal sheets).

### Shadows
Minimal. Only on elevated modals: `0 20px 60px -10px rgba(0,0,0,0.8)`.

### Motion
- Duration fast: `150ms` · std: `220ms` · slow: `400ms`
- Easing: `cubic-bezier(0.2, 0.8, 0.2, 1)` (ease-out), `cubic-bezier(0.65, 0, 0.35, 1)` (ease-in-out)
- Use for tab switches, button press, section expand/collapse

---

## 9. External Integrations

### ChiroHD EHR
- **Purpose:** Source of truth for member identity, plan purchased, plan dates
- **Auth:** Server-to-server API key. Do NOT embed in mobile app. Proxy through a Supabase Edge Function or your own backend.
- **Endpoints used:**
  - `GET /members/by-email?email=...` — returns member + active plan
  - `GET /members/{id}/appointments` — returns upcoming sessions (for Book tab)
  - `POST /members/{id}/appointments` — creates a booking

- **Sync job:** Nightly, pull all members with active plans into Supabase `members` table. This lets the app do fast membership checks without hitting ChiroHD on every load.

### Booking
- Integrated in-app per user requirement
- **Preferred:** Native UI that hits ChiroHD appointment API directly
  - Screen: "Select a date" → "Select a time" → "Confirm" → success
  - Shows member's treatment mode, duration (15 min), location
- **Fallback:** If the clinic uses a third-party scheduling tool (Acuity, Cal.com, SimplePractice), embed that tool's booking URL in a trusted in-app browser view with the member's data pre-filled via query params.
- **Push notifications (Phase 2):** 24h and 1h before each booked session

### Methylene Blue purchase
- Hard-coded Amazon search URL in the app: `https://www.amazon.com/s?k=earth+harmony+methylene+blue`
- Shown as a button + QR code image. QR is generated client-side (use `react-native-qrcode-svg`).

### Guided practice videos
- YouTube URLs stored in app config (not user-configurable). Tap → opens in external browser.
- All four currently pointed at creator-owned content. If a URL breaks, content is updated via OTA (Expo Updates).

---

## 10. Content Model

The guide content is **fully static** — bundled with the app, not fetched. This is why it must work offline.

Content lives in `src/shared.js` and `src/modes.js` (see bundled files). Port these to typed TypeScript constants:

```typescript
// content/modes.ts
export type PTxMode = {
  id: 'weight-loss' | 'recovery' | 'pain-relief' | 'skin' | 'cardiovascular';
  number: string;           // '01', '02', ...
  name: string;             // 'Fat Loss', ...
  tagline: string;
  wavelength: string;
  focus: string;
  image: string;            // require() path to bundled asset
  mechanism: string;
  nutrition: string[];
  exercise: string[];
  supplementEmphasis: string[];
  phases: { silver: Phase[]; gold: Phase[] };
};

export type Phase = {
  name: string;             // 'Weeks 1–2 · Prime'
  goal: string;
  keys: string[];
};

export const MODES: PTxMode[] = [ /* port from src/modes.js */ ];
```

```typescript
// content/shared.ts
export const SHARED = {
  cadence: { /* ... */ },
  supplements: Supplement[],
  dailyRhythm: RhythmBlock[],
  practices: { breathwork, chiGong, lymphatic, vagal, sleep },
  nutritionBase: { /* ... */ },
  disclaimer: { short, contraindications, full },
};
```

Content updates ship via Expo OTA Updates. No need to resubmit to stores for copy changes.

---

## 11. Assets

All in this bundle's `assets/` folder:

### Logos
- `logo-lockup.png` — full horizontal lockup, used in header
- `logo-mark.png` — circular mark (source is dirty — do NOT use, see note)
- `logo-radius-super-stack.png` — Super Stack logo, used in Supplement Foundation section
- `logo-radius-super-stack.png` — also use as app launch/splash

### Photography
- `pinnacle-hero-main.jpg` — primary hero, home screen background
- `pinnacle-bed-with-model.jpg`, `pinnacle-bed-open.jpg`, `pinnacle-bed-closeup.jpg`, `pinnacle-bed-open-2.jpg`, `pinnacle-bed-side-view.jpg` — one per PTx mode, used on mode detail headers

### Typography
- `colors_and_type.css` — the complete design token source

### App icon + splash
- Generate from the Radius mark. Black background, red mark. I've provided the lockup; a proper clean SVG mark should be requested from the Radius brand team before shipping.

---

## 12. Trademark & Legal

Every build must include the IP/trademark block from the guide:
- **© 2026 Radius Chiropractic PLLC. All rights reserved.**
- Radius™, Radius Red Light Therapy™, Radius Super Stack™, The Protocol™ are trademarks of Radius Chiropractic PLLC
- Full third-party acknowledgements (Dr. Mercola®, Pure Encapsulations® Renual®, Earth Harmony™, Renue Blue™, Drink HRW™ Rejuvenation™, Toniiq®, Dahlia Health™ Dahlia Pinnacle™, Wim Hof Method®)
- Medical disclaimer — **must be on every session-protocol and supplement screen**, not just the About screen

---

## 13. Phase Roadmap

### Phase 1 — Read-only app (this handoff)
- Auth (invite + magic link)
- Mode browser + full guide content, offline-capable
- Integrated booking
- Profile screen

### Phase 2 — Active logging
- Daily check-in: did you do breathwork / chi gong / cold exposure?
- Session log: timestamp, mode, duration, notes
- Supplement tracking (checkbox list aligned with daily rhythm)
- Photo capture: before/after for Skin mode, stored in Supabase Storage
- Dashboard: streak, compliance %, phase progression
- Staff portal web app to view member compliance

### Phase 3 — Community & intelligence
- Push notifications for ritual reminders
- Messaging to clinic (HIPAA-safe)
- Personalized recommendations based on compliance + outcomes
- Integration with wearables (Oura, Whoop, Apple Health) for biomarker overlay

---

## 14. Files in This Handoff

- `README.md` — this file
- `Health Guide.html` — interactive prototype (main app)
- `Health Guide-print.html` — print-ready version (reference for content export)
- `src/shared.js` — shared content (supplements, daily rhythm, practices, disclaimers)
- `src/modes.js` — per-PTx-mode content (5 modes × 2 plans)
- `src/app-home.jsx` — home screen React components
- `src/app-mode.jsx` — mode detail React components
- `assets/colors_and_type.css` — design tokens (source of truth)
- `assets/` — all photography and logos

---

## 15. Open Questions for the Implementing Team

1. **ChiroHD API access** — confirm the practice's ChiroHD account supports API integration and get sandbox credentials before starting
2. **Apple Developer + Google Play accounts** — need these under Radius Chiropractic PLLC
3. **Push notification strategy** — decide on Phase 2 triggers (session reminders, ritual reminders, plan milestones)
4. **Photo storage & HIPAA** — if Skin-mode before/after photos are implemented in Phase 2, confirm Supabase Storage BAA or move to a HIPAA-compliant provider
5. **Content localization** — is Spanish translation in-scope? If so, stub i18n now

---

**Questions?** Reference the interactive prototype in `Health Guide.html`. Open it in a browser to see the intended desktop experience; adapt to mobile using §6 guidance.
