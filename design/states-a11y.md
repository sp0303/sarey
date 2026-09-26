# sarey.tech — State Inventory & Accessibility Spec

Companion to `visual-system.md` and `wireframes.md`. Target: **WCAG 2.2 AA** in
both light and dark. This is a static SPA (no data fetching), so **empty /
loading / error states are N/A** — see §1.

---

## 1. State inventory

### 1.1 Data states — N/A (static page)
There is no async data, no form submission (mailto only), no server. Therefore
**empty, loading, and error states do not apply** to any section. Content is
compiled from `src/content/site.ts` at build time and always present. The
developer should NOT build skeletons, spinners, or error boundaries for content.

### 1.2 Interactive-element states (required)

Applies to: header nav links, CTA buttons (Hero, header, Contact), footer links,
logo-strip links, FAQ item buttons.

| State | Trigger | Visual spec |
|---|---|---|
| **default** | rest | see visual-system tokens per element |
| **hover** | pointer over (pointer devices only) | Links: `fg-muted → fg`. CTA: `brand-600 → brand-700`. Cards w/ links: `border-accent` + `shadow-card-hover` (light) / bg lift (dark). Logo: grayscale→color. `transition-colors duration-150`. |
| **focus-visible** | keyboard focus | **2px solid `focus` ring, 2px offset**: `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-bg`. Applies to ALL interactive elements. Never remove outline without a replacement ring. |
| **active** | mouse down / Space held | CTA: `brand-700`, slight `scale-[0.98]` (skipped under reduced-motion). Links: `accent`. |
| **disabled** | N/A | No disabled controls exist on this page (no forms/submit). Do not add. |

FAQ-specific states below (§3).

### 1.3 FAQ open vs closed
| State | `aria-expanded` | Answer region | Indicator |
|---|---|---|---|
| **closed** (default) | `false` | `hidden` (removed from a11y + tab order) | `+` / chevron pointing right/down-collapsed |
| **open** | `true` | visible, `role="region"` | `−` / chevron rotated (rotation disabled under reduced-motion) |

Single-open accordion: opening one item sets it as the only open id in `Faq`
state; the previously open item returns to closed. Indicator is **redundant** to
`aria-expanded` — meaning is never conveyed by the icon alone.

---

## 2. Accessibility spec

### 2.1 Landmarks & structure (one of each)
- One `<header>` containing one `<nav aria-label="Primary">`.
- One `<main id="main">` wrapping §1–§7.
- One `<footer>` (`contentinfo`) — outside `<main>`.
- Sections use `<section aria-labelledby="...">` tied to their `<h2>` id, or an
  `aria-label`. The optional `Section` primitive should render `<section>` with
  the heading `id`.

### 2.2 Heading hierarchy (exactly one h1, no skips)
```
h1  → Hero value prop (the ONLY h1; the wordmark is not a heading)
h2  → About / How it works / Team / Integrates with–Deployed on / FAQ / Contact
h3  → pipeline step names, team role names, FAQ questions (if wrapped per APG)
```
No level is skipped. The wordmark in header/footer is a link, not a heading.

### 2.3 Skip link
First focusable element in the DOM:
```html
<a href="#main" class="sr-only focus:not-sr-only focus:absolute focus:z-[100]
   focus:top-3 focus:left-3 focus:rounded-lg focus:bg-brand-600 focus:text-on-accent
   focus:px-4 focus:py-2">Skip to content</a>
```
Visually hidden until focused; on focus it appears top-left with the `brand-600`
fill and visible focus ring, and jumps focus to `#main`.

### 2.4 Focus-visible ring (global)
- Use `:focus-visible` (not `:focus`) so mouse clicks don't show the ring but
  keyboard does.
- Ring: `ring-2 ring-focus ring-offset-2 ring-offset-bg`. The `focus` token
  (`#4F46E5` light / `#818CF8` dark) contrasts ≥ 3:1 against both `bg` and
  `surface` (non-text UI contrast requirement, WCAG 1.4.11 — met: indigo vs bg
  ≥ 6:1). Offset uses `ring-offset-bg` so the ring reads on any section band; on
  `surface` bands set `ring-offset-surface` via a section-local class.
- Focus order = DOM order = visual reading order (skip link → header wordmark →
  header links → CTA → hero CTA → … → FAQ buttons in listed order → contact CTA →
  footer links). Do not use positive `tabindex`.

### 2.5 FAQ keyboard model (WAI-ARIA APG accordion)
Each item header is a native `<button type="button">`:
- `aria-expanded="true|false"` reflects open state.
- `aria-controls="<answer region id>"` points to its answer `<div id role="region"
  aria-labelledby="<button id>">`.
- Button has its own stable `id` (from `FaqEntry.id`) so the region can label
  back to it.
- **Enter** and **Space** toggle the item (native `<button>` gives this free —
  do not intercept). **Tab / Shift+Tab** moves between item buttons in order.
  Arrow-key roving is optional (APG lists it as optional for accordions) — not
  required; Tab navigation is sufficient and simpler.
- **Escape** optional: may collapse the open item (nice-to-have, not required).
- Collapsed answers use the `hidden` attribute so they are absent from tab order
  and the accessibility tree.
- Do NOT trap focus; do not auto-scroll on open (or if you do, honor reduced
  motion).

### 2.6 Reduced motion
Global block (also in visual-system.md §5):
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: .001ms !important;
    transition-duration: .001ms !important;
    scroll-behavior: auto !important;
  }
}
```
Effect: accordion opens/closes instantly (no height/rotate animation), anchor
jumps are instant, CTA active-scale is suppressed. State still changes correctly;
only motion is removed.

### 2.7 Logo alt-text guidance (§5, 3 vendor logos)
Alt text comes from `Integration.alt` in the content model. Because logos sit
under nominative "Integrates with / Deployed on" framing, alt must **name the
product + vendor and state the relationship — no endorsement/partnership wording.**
Recommended values (developer sets these in `src/content/site.ts`):

| Logo | Recommended `alt` |
|---|---|
| `claude.svg` | `"Claude by Anthropic — integration"` |
| `antigravity.svg` | `"Antigravity by Google — integration"` |
| `oracle-cloud.svg` | `"Oracle Cloud (OCI) — deployment"` |

- Do NOT use alt like "official partner", "endorsed by", "powered by X" — that
  would imply a relationship not claimed.
- Logos are meaningful (they identify vendors), so they are **not** decorative —
  alt must be non-empty. The role caption text ("Integration"/"Deployment")
  duplicates the relationship visibly so it isn't carried by the logo alone.
- If an official brand SVG cannot be sourced, fall back to a text wordmark of the
  correct name (per task risk #2) — the alt guidance still applies.

### 2.8 Other AA checks
- **Contrast:** every text/bg pair ≥ 4.5:1 in both schemes (ledger in
  visual-system.md §1.2). Verify dark mode independently.
- **Target size (2.5.8):** interactive targets ≥ 24×24px minimum; house standard
  ≥ 44×44px (CTA, nav, FAQ buttons, footer links) — pad accordingly.
- **Link purpose:** footer/nav anchor labels are self-describing; mailto links
  read "Get in touch" (CTA) and the literal email address (Contact) — both clear.
- **Lang:** `<html lang="en">`.
- **No color-only meaning:** section band colors, step number colors, logo
  grayscale, and FAQ chevrons are all backed by text/labels or ARIA state.
- **Reflow (1.4.10):** content usable at 320px equivalent with no horizontal
  scroll (mobile-first grids collapse to 1 column).

---

## 3. Design-QA acceptance checklist (for the QA reviewer post-build)
Check each on the built UI, both light & dark, at 375 / 768 / 1280:
1. Exactly one `<h1>` (hero value prop); h2s per section; no skipped levels.
2. Skip link is first tab stop, hidden until focused, jumps to `#main`.
3. Every interactive element shows the 2px focus-visible ring; focus order = DOM
   order; no positive tabindex.
4. FAQ: Tab reaches each button; Enter/Space toggles; `aria-expanded` +
   `aria-controls` correct; collapsed answers absent from tab order; single-open
   behavior.
5. Hero wordmark + value prop + "Get in touch" mailto CTA above the fold at 375
   and 1280.
6. Logo strip: 3 correct names, meaningful alt (table §2.7), visible
   "Integration/Deployment" captions, no endorsement wording.
7. Contrast spot-check: fg-muted on surface in BOTH schemes ≥ 4.5:1.
8. Reduced-motion on: accordion + anchor jumps instant, no scale animation.
9. No horizontal scroll, no overlap at any tested width; touch targets ≥ 44px.
10. Landmarks: one header/nav, one main, one footer; sections labelled.
