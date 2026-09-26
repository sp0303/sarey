# sarey.tech — Wireframes & Layout Spec

Layout for all 7 sections + header/footer at **desktop 1280px** and **mobile
375px** (768px tablet behavior noted per section). Uses tokens from
`visual-system.md`. Content max width = `max-w-6xl` (1152px), gutters `px-6`
mobile / `px-8` desktop. Section rhythm = `py-16` mobile / `py-24` desktop.

Component/file names below match `interfaces_frozen` exactly — do not rename.

---

## SiteHeader (nav landmark) — sticky top

Desktop (1280):
```
┌──────────────────────────────────────────────────────────────────────┐
│  sarey.        About   How it works   Team   FAQ        [ Get in touch ]│
└──────────────────────────────────────────────────────────────────────┘
```
- `<header>` → `<nav aria-label="Primary">`. Height ~64px, `bg/80` with
  `backdrop-blur`, bottom `border-border`. Sticky (`sticky top-0 z-50`).
- Left: wordmark link (`#main`). Right: anchor links (`About #about`,
  `How it works #how`, `Team #team`, `FAQ #faq`) then the CTA button
  (`brand-600` fill, `rounded-full`, `px-5 py-2`) → `mailto:contact@sarey.tech`.
- Links are `fg-muted`, hover `fg`, current-section optional (not required for
  static; do not rely on color alone if added).

Mobile (375):
```
┌────────────────────────────────┐
│  sarey.            [Get in touch]│
└────────────────────────────────┘
```
- Drop the anchor links (in-page nav is reachable by scroll + the footer link
  list). Keep wordmark + CTA only — no hamburger/menu needed for a one-pager.
  This avoids a JS menu and keeps the header keyboard-trivial.
- 768px tablet: same as desktop (links fit); if tight, hide `How it works` label
  first. Keep at least CTA + wordmark.

Above all content: **skip link** `<a href="#main">Skip to content</a>`, visually
hidden until focused (see states-a11y.md).

---

## §1 Hero — `Hero` (`bg`, id anchor top of `#main`)

Desktop (1280): centered single column, max-w ~`46rem`, vertically generous.
```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                        │
│                    ⟨overline⟩  AI-AGENT BUILD SHOP                      │
│                                                                        │
│        A multi-vendor AI team that ships production software.          │   ← h1 (display)
│                                                                        │
│     We design, build, review, and ship — with cross-vendor            │   ← lead, fg-muted
│     review baked in so quality is not left to chance.                  │
│                                                                        │
│                   [  Get in touch  ]                                   │   ← CTA brand-600
│                                                                        │
└──────────────────────────────────────────────────────────────────────┘
```
- Content centered (`text-center`, `mx-auto`). Order: eyebrow overline → **h1**
  (the value prop is the single `<h1>`; wordmark lives in header) → `lead`
  paragraph → CTA.
- CTA: `brand-600` fill, `rounded-full`, `px-6 py-3`, `text-on-accent`, hover
  `brand-700`. Links `mailto:contact@sarey.tech`. **Above the fold at 375 & 1280.**
- No large hero raster image (avoids CLS and pushing CTA below fold on mobile).
  Optional decorative background: a very subtle CSS radial/grid at low opacity,
  `aria-hidden`, must not reduce text contrast.
- Vertical padding `pt-20 pb-24` desktop; `pt-14 pb-16` mobile.

Mobile (375): same single centered column; h1 uses clamp min (36px), CTA
full-width-ish (`w-full max-w-xs`), all above the fold on a 375×667 screen.

---

## §2 About — `About` (`surface` band, `id="about"`)

Desktop: two-column — heading/eyebrow left (`col-span-1`), body paragraphs right
(`col-span-1`, `max-w-[65ch]`). `grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-12`.
```
┌───────────────────────┬────────────────────────────────────────────────┐
│ WHO WE ARE            │  Paragraph 1 …………………………………………………………………………     │
│ We are the            │  ……………………………………………………………………………………………         │
│ Agent Foundry.  (h2)  │                                                  │
│                       │  Paragraph 2 …………………………………………………………………………     │
└───────────────────────┴────────────────────────────────────────────────┘
```
- Left column: `overline` + `<h2>`. Right: `about.body[]` mapped to `<p>` with
  `body` type, `space-y-4`, `fg` for lead sentence and `fg-muted` for supporting.
- Mobile (375): stacks to one column, heading above body, `gap-6`.
- 768: same two-column (or stack if cramped — `md:` breakpoint governs).

---

## §3 How it works — `HowItWorks` (`bg`, `id="how"`)

An **ordered pipeline** of 6 steps: ideation → architecture → design → build →
review → ship. Semantics: an `<ol>` (ordered list conveys sequence to AT).

Desktop (1280): 3 columns × 2 rows, `grid grid-cols-1 sm:grid-cols-2
lg:grid-cols-3 gap-6`. Each step is an `<li>` card.
```
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│ (01) Ideation │  │ (02) Architect│  │ (03) Design   │
│ blurb ………     │  │ blurb ………     │  │ blurb ………     │
└──────────────┘  └──────────────┘  └──────────────┘
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│ (04) Build    │  │ (05) Review   │  │ (06) Ship     │
│ blurb ………     │  │ blurb ………     │  │ blurb ………     │
└──────────────┘  └──────────────┘  └──────────────┘
```
- Card: `surface` bg (since section is `bg`), `border-border`, `rounded-xl`,
  `p-6`. Step number badge: `rounded-full`, mono, `accent` text on faint accent
  tint or bordered circle — number is decorative; the visible step **name** (h3)
  and the `<ol>` order carry the sequence (not color/number alone).
- `PipelineStep.step` renders as the badge; `.name` as `<h3>`; `.blurb` as `<p>`
  `fg-muted`.
- Mobile (375): single column, `gap-4`, order preserved top-to-bottom.
- 768: two columns.

---

## §4 Team — `Team` (`surface` band, `id="team"`) — responsive card grid

8 agent role cards: Business Analyst, Architect, UX/UI Designer, Developer, QA
Reviewer, Security Engineer, Skill Curator, DevOps.

Grid: **4 columns desktop → 2 columns tablet → 1 column mobile.**
`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6`.
```
Desktop (1280): 4 × 2
┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐
│ Business│ │Architect│ │ UX/UI   │ │Developer│
│ Analyst │ │         │ │Designer │ │         │
│ capbty… │ │ capbty… │ │ capbty… │ │ capbty… │
└────────┘ └────────┘ └────────┘ └────────┘
┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐
│  QA     │ │Security │ │ Skill   │ │ DevOps  │
│Reviewer │ │Engineer │ │Curator  │ │         │
│ capbty… │ │ capbty… │ │ capbty… │ │ capbty… │
└────────┘ └────────┘ └────────┘ └────────┘
```
- Card as `<li>` inside a `<ul>` (a list of roles, not a sequence): `bg` (section
  is `surface`), `border-border`, `rounded-xl`, `p-5`, `h-full` for equal height.
- Content: small role glyph/initial in an accent-tinted rounded square (optional,
  `aria-hidden`), `TeamRole.role` as `<h3>`, `TeamRole.capability` as one-line
  `<p>` `fg-muted`.
- Hover (pointer): `border-accent` + `shadow-card-hover` (light) / `bg` shift
  (dark). Non-interactive cards (no link) → no focus target unless a link added.
- Mobile (375): single column stack, `gap-4`. 768: 2 columns.

---

## §5 Logo strip — `LogoStrip` (`bg`, no separate anchor required)

Nominative framing only — "Integrates with / Deployed on". No endorsement claim.
3 items: Claude (Anthropic, integration), Antigravity (Google, integration),
Oracle Cloud (Oracle, deployment).

Desktop (1280): centered heading, then a single horizontal row of 3 logos,
evenly spaced, grayscale-neutral. Group by role via two labeled clusters OR one
row with role captions under each logo (use captions so meaning is not layout-only).
```
              INTEGRATES WITH / DEPLOYED ON        ← h2 (small caps overline-style)
   ┌───────────┐        ┌───────────┐        ┌───────────┐
   │  Claude    │        │ Antigravity│        │Oracle Cloud│   ← logo SVG
   └───────────┘        └───────────┘        └───────────┘
    Integration          Integration           Deployment      ← small caption (fg-muted)
```
- Layout: `flex flex-wrap items-center justify-center gap-10`. Each item is an
  `<a href={vendor site}>` wrapping the logo `<img>` + caption.
- Logos: `<img>` from `public/logos/{claude,antigravity,oracle-cloud}.svg`, fixed
  `width`/`height` (e.g. `height={32}` with intrinsic width) to prevent CLS,
  `loading="lazy"` (below fold). Render at reduced opacity/`grayscale`, full color
  on hover/focus (decorative treatment only). Meaningful `alt` per Integration.alt.
- The `role` field ('integration' | 'deployment') drives the caption text; do not
  encode role by position alone — always show the caption.
- Mobile (375): logos wrap to a vertical stack (`flex-col`) or 1-per-row,
  centered, `gap-8`, captions under each.

---

## §6 FAQ — `Faq` + `FaqItem[]` (`surface` band, `id="faq"`) — accordion

Single-column, centered, `max-w-3xl mx-auto`. Covers (min): limitations of
AI-agent builds; hallucination controls (multi-vendor cross-review, task
contracts, tests, human gates); role-based separation (author ≠ reviewer,
different vendor); data/security.

```
                     Frequently asked questions        ← h2
┌──────────────────────────────────────────────────────────┐
│  What are the limits of AI-agent builds?             [ + ] │  ← FaqItem header (button)
├──────────────────────────────────────────────────────────┤
│  How do you reduce hallucination?                    [ + ] │
├──────────────────────────────────────────────────────────┤
│  Who reviews the code?                               [ − ] │  ← open
│  ┌────────────────────────────────────────────────────┐   │
│  │ Answer text … region, revealed …                   │   │
│  └────────────────────────────────────────────────────┘   │
├──────────────────────────────────────────────────────────┤
│  How is my data handled?                             [ + ] │
└──────────────────────────────────────────────────────────┘
```
- Each `FaqItem` = a header row that is a real `<button>` spanning full width,
  `question` as visible label (h3-styled text, NOT necessarily a heading element —
  if headings are wanted wrap the button in an `<h3>` per ARIA APG), plus a `+/−`
  or chevron indicator (`aria-hidden`, rotates on open; icon is redundant to
  `aria-expanded`, never the sole signal).
- Answer = a `<div role="region">` referenced by the button's `aria-controls`,
  `id` matching; hidden when collapsed (`hidden` attr, not just height 0, so
  collapsed answers are removed from tab/AT order).
- Interaction owned by `Faq` (holds open-id state); `FaqItem` receives
  `{ entry, isOpen, onToggle }` (frozen props). Toggle behavior: clicking an open
  item may keep others open OR single-open — **single-open accordion** is the
  spec (activating one collapses the previously open one) for a cleaner one-pager.
- Divider `border-border` between items; open item gets subtle `bg` inset for the
  answer. Full keyboard model in states-a11y.md.
- Mobile (375): identical single column, full-width buttons, `py-4` touch targets
  (≥44px tall).

---

## §7 Contact — `Contact` (`bg`, `id` optional) + `SiteFooter`

Contact: centered call-to-action panel.
```
┌──────────────────────────────────────────────────────────────────────┐
│                     Let's build something.            ← h2             │
│      Tell us the idea; we'll bring the team.          ← lead, fg-muted │
│                                                                        │
│                   [  Get in touch  ]                  ← CTA brand-600  │
│                   contact@sarey.tech                  ← plain mailto link│
└──────────────────────────────────────────────────────────────────────┘
```
- CTA → `mailto:contact@sarey.tech`. Below it, the email shown as a secondary
  text link (also mailto) so the address is visible, not hidden behind a button.
- Optionally wrap in a `surface` rounded-2xl panel with `border-border` for
  emphasis, centered `max-w-2xl`.

SiteFooter (`contentinfo`):
```
┌──────────────────────────────────────────────────────────────────────┐
│  sarey.        About  How it works  Team  FAQ         © 2026 sarey.tech │
└──────────────────────────────────────────────────────────────────────┘
```
- `<footer>` landmark, `border-t border-border`, `py-10`. Left: wordmark. Center/
  right: `footer.links[]` anchor nav (`small`, `fg-muted`, hover `fg`) +
  `footer.copyright`.
- Mobile (375): stack — wordmark, then link list (wrap), then copyright,
  centered, `gap-4`.

---

## Global responsive rules
- Breakpoints: base = 375 (mobile-first), `sm:` 640, `md:` 768, `lg:` 1024,
  `xl:` 1280. Test explicitly at 375 / 768 / 1280.
- No horizontal scroll at any width: no fixed pixel widths wider than viewport,
  images `max-w-full h-auto` (except logos with fixed intrinsic size that still
  fit), grids collapse per section rules above.
- Touch targets ≥ 44×44px (CTA, nav links, FAQ buttons, footer links).
