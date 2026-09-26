# Hero visual enhancement — build-ready plan (T-001)

**Owner:** UX/UI designer · **Builds into:** `src/components/Hero.tsx` + a few
keyframes in `src/index.css` · **Stack:** React 18 + Vite + TS + Tailwind 3.
**No new runtime deps** — pure CSS + inline SVG only.

**Problem being solved:** the current hero reads as empty white space, especially
in LIGHT mode. The decorative layers (sunburst, aurora, halftone) sit at ~0.10
opacity behind centered text and never resolve into a *figure* the eye can land
on. We fix this by adding a concrete, on-brand **foreground comic artifact** and
by making the background bolder — without touching text contrast, the single
`<h1>`, or the above-the-fold CTA.

> Palette note for the developer: use the **shipped comic-red tokens** in
> `src/index.css` (accent `193 18 31` = `#C1121F` light / `248 113 113` =
> `#F87171` dark; headline gradient `#DC2626 → #EA580C → #B91C1C` light,
> `#EF4444 → #F97316 → #F87171` dark). The indigo/violet values in older parts of
> `design/visual-system.md` are superseded — do NOT use indigo here.

---

## 1. Chosen direction (committed)

**"The Agent Roster" — an animated comic emblem panel: a glowing central hero
crest orbited by five superhero-emblem agent nodes, wired together by pulsing
energy beams, over comic speed-lines + halftone.**

Why this one:
- **On-brand.** It is literally the product — a *multi-vendor AI team* — drawn as
  a superhero roster: one central crest (the studio) energising five orbiting
  role emblems (architect, designer, developer, QA, security). Comic starburst,
  bold ink outlines, halftone and speed-lines deliver the Marvel-inspired feel
  with zero copyrighted IP.
- **Fills the space decisively.** On desktop it becomes a real focal object on the
  right — a bordered comic panel — so the hero stops reading as empty. On
  mobile/tablet the same motif drives a bolder full-bleed background so those
  breakpoints also gain energy without extra height.
- **Cheap + safe.** 100% inline SVG + CSS transforms/opacity/dash. No image
  asset, no three.js/framer-motion, no CLS.

**Alternates considered (not chosen):**
- *A. Full comic superhero figure/illustration* — highest "wow" but needs a real
  illustrated asset (licensing/generation risk) and is hard for a headless dev to
  render crisply in raw SVG. Rejected for buildability.
- *B. Animated gradient-mesh + speed-lines only (background, no figure)* — easy,
  but it is essentially "more of the same" decorative wash and still lacks a
  figure to anchor the eye. Rejected as insufficient for the "too empty"
  complaint.

---

## 2. Layout & responsive behavior

Keep the existing `<section className="relative overflow-hidden bg-bg …
min-h-[85vh]">` shell. Two rendering layers:

- **Layer A — background motif (all breakpoints):** the SVG scene, `aria-hidden`,
  absolutely positioned, `-z-10`, masked with a radial fade so it is stronger
  toward the edges and fades out behind the centered text. This replaces the
  current subtle sunburst/aurora/halftone stack (bolder version — see §4).
- **Layer B — foreground comic panel (desktop `lg:` only):** the same SVG scene
  rendered *solid* inside a bordered comic panel, as the right column of a
  2-column grid.

Grid:

| Breakpoint | Layout | Text | Visual |
|---|---|---|---|
| **375px (mobile)** | single column, centered (unchanged from today) | centered stack: eyebrow → h1 → lead → CTA | Layer A background only, opacity ~0.16 |
| **768px (tablet)** | single column, centered | same, wider measure | Layer A background only, opacity ~0.18, scaled up |
| **1280px (desktop)** | `grid lg:grid-cols-[1.05fr_.95fr] lg:gap-12 lg:text-left` | left column, **left-aligned** (eyebrow, h1, lead, CTA) | Layer B foreground panel in right column; Layer A dimmed to ~0.10 behind |

Rules that protect the fold:
- On `<lg` the DOM/stack is **exactly as today** (centered column) — the panel is
  `hidden lg:block`, so it adds no vertical height and the CTA stays above the
  fold at 375/768 unchanged.
- On `lg` the panel sits *beside* the text (grid column), never below it, so it
  cannot push the CTA down. Panel is `aspect-square w-full max-w-[460px]` and
  self-centers in its cell.
- Left column keeps `max-w-[34rem]` on `lg` so line length stays comfortable.

---

## 3. Exact visual spec (SVG scene)

One reusable markup block, `viewBox="0 0 400 400"`, `preserveAspectRatio="xMidYMid meet"`,
`role="presentation"` / `aria-hidden="true"`, `class="w-full h-full"`.

### 3.1 Composition (center = 200,200)
1. **Speed-lines (back):** 24 thin rays from center outward, `stroke` = ink color
   (see tokens), `stroke-width` 1.5, length from r=70 to r=195, grouped in
   `<g id="rays">`. Comic "action line" burst. Opacity 0.35 light / 0.5 dark.
2. **Halftone field:** a `<rect>` filled with the existing halftone dot pattern
   (reuse the CSS `radial-gradient` dot technique via a `<pattern>` or a masked
   div), radial-fade masked to the panel. Dot color = accent red.
3. **Orbit ring:** dashed circle r=150, `stroke-dasharray="2 10"`, accent red,
   opacity 0.6. This is the track the nodes ride.
4. **Energy beams:** 5 straight lines from crest (200,200) to each node center,
   `stroke-width` 2.5, `stroke` = a `<linearGradient>` red→orange, animated dash
   (§4). These read as power flowing from the studio to each agent.
5. **Central crest (foreground focal point):** a 12-point comic **starburst**
   polygon (r alternating 58/40) filled with a radial gradient
   `#EA580C → #DC2626 → #B91C1C`, ink stroke `stroke-width` 3. Inside it, a bold
   white **energy-bolt / chevron glyph** (`<path>`, the "sarey" spark) at ~64px,
   `fill=#FFFFFF`. A soft radial glow (`<circle>` blurred via `filter` or a
   low-opacity red halo) sits behind the burst.
6. **Five agent-emblem nodes:** circles r=22 evenly spaced on the ring
   (angles 0/72/144/216/288°, offset -90° so one sits top-center). Each: fill
   `surface`, ink stroke `stroke-width` 2.5, and a distinct **monoline white/ink
   glyph** naming its role — keep them simple, single `<path>` each:
   - Architect → compass/triangle-ruler
   - Designer → pen-nib / bezier node
   - Developer → angle-brackets `</>`
   - QA → checkmark-in-shield
   - Security → padlock/shield
   Node fill in dark mode swaps to `surface` dark automatically (tokened, see
   §3.3). These are the "superhero emblem" badges echoing the team avatars.

### 3.2 The comic panel (desktop Layer B only)
Wrap the SVG in:
`class="relative aspect-square w-full max-w-[460px] mx-auto rounded-2xl border-[3px] border-fg/80 overflow-hidden shadow-xl"`
with an inner background:
`bg-[radial-gradient(circle_at_50%_40%,rgb(var(--color-accent)/0.14),transparent_70%)] bg-surface`.
The bold ink border + surface fill is what gives the visual real presence on the
white light-mode page (solving the washout) — the panel has edges, so it never
dissolves into the background.

### 3.3 Color tokens (drive everything from these so both themes work)
Do NOT hard-code the ink/surface as fixed hex — derive from tokens so dark mode
swaps automatically:
- **Ink / outline:** `rgb(var(--color-fg) / 0.85)` → `#0F172A` light, `#F1F5F9`
  dark. Comic outlines stay high-contrast in both themes.
- **Node fill:** `rgb(var(--color-surface))` → `#F1F5F9` / `#151C2C`.
- **Accent red (rays, ring, halftone, glow):** `rgb(var(--color-accent))` →
  `#C1121F` / `#F87171`.
- **Crest gradient (fixed hex, both themes):** stops `#EA580C → #DC2626 →
  `#B91C1C` — matches the headline gradient family; readable on both panel fills.
- **Crest glyph + node glyphs:** `#FFFFFF` on the red crest; node glyphs use ink
  color on the surface fill.

**Light vs dark read:**
- *Light:* white page, ink-outlined panel with a warm red wash; crest is a
  saturated red starburst that pops against white. Rays/halftone at higher opacity
  than today so the motif is clearly visible (fixes "empty").
- *Dark:* deep slate page; the crest glows warmer (`#F87171` halo), ink outlines
  become light, halftone/rays brighten. The blurred red halo does the heavy
  lifting for depth.

No image asset required — **everything is inline SVG generated by the developer.**
If the dev wants a starting glyph reference, reuse the favicon "s" concept from
`visual-system.md §4.2` for the crest spark.

---

## 4. Animation spec

All animations are **`motion-safe:` gated**; the global
`prefers-reduced-motion` block in `src/index.css` already neutralises durations,
so reduced-motion users get the full static composition (see fallback below).

### 4.1 Reuse existing keyframes
- **`orbit-spin`** (exists): rotate the `<g id="orbit-ring-nodes">` group about
  center. `motion-safe:animate-[orbit-spin_60s_linear_infinite]`. Slow, calm.
  Counter-rotate each node group with the same keyframe `reverse` at 60s so the
  emblems stay upright while orbiting.
- **`aurora-drift`** (exists): keep 1–2 background aurora blobs on Layer A for the
  ambient glow (as today, but bump opacity — see §4.4).

### 4.2 New keyframes to ADD to `src/index.css`
```css
/* traveling pulse along the energy beams */
@keyframes beam-dash {
  to { stroke-dashoffset: -32; }
}
/* crest heartbeat + halo breathe */
@keyframes crest-pulse {
  0%, 100% { transform: scale(1);    opacity: 1;    }
  50%      { transform: scale(1.05); opacity: 0.92; }
}
```
Apply:
- Beams: `stroke-dasharray="6 10"` +
  `motion-safe:animate-[beam-dash_1.6s_linear_infinite]` (stagger 4 of them with
  `[animation-delay:...]` of 0/.2/.4/.6/.8s for a lively cross-talk feel).
- Crest group: `motion-safe:animate-[crest-pulse_3.5s_ease-in-out_infinite]`,
  `transform-box:fill-box; transform-origin:center` so it scales about its own
  center.

### 4.3 Easing / timing summary
| Element | Animation | Duration | Easing |
|---|---|---|---|
| Orbit ring + nodes | `orbit-spin` (nodes reversed) | 60s | linear |
| Energy beams | `beam-dash` | 1.6s (staggered) | linear |
| Central crest | `crest-pulse` | 3.5s | ease-in-out |
| Ambient aurora | `aurora-drift` | 18s / 24s | ease-in-out |

Keep it *slow and premium* — nothing faster than the 1.6s beams; no bounce.

### 4.4 Background (Layer A) tuning vs today
Raise visibility so mobile/tablet no longer read empty:
- Sunburst/rays opacity `0.10 → 0.16` light, `→ 0.24` dark.
- Halftone opacity `0.5 → 0.6`, keep the radial fade mask so the center behind
  the text stays clear (protects contrast).
- Keep both aurora blobs; nudge alpha up ~30%.

### 4.5 Reduced-motion fallback (must verify)
With `prefers-reduced-motion: reduce`: ring is static, nodes sit at their default
angles, beams show as **solid** dashes (still connecting crest→nodes), crest is
full-size, halo static. The composition is fully legible and still "rich" — it
just doesn't move. No blank/hidden states.

---

## 5. Accessibility & performance

- **A11y**
  - Entire visual is decorative: root SVG + wrapper carry `aria-hidden="true"`;
    no role/name, not focusable, `pointer-events-none` on Layer A.
  - **Exactly one `<h1>`** remains (the existing headline). The visual adds no
    headings, no text nodes that AT would read.
  - **Text contrast untouched:** text lives in its own column (desktop) or over a
    radial-faded, masked background (mobile) — measured pairs from
    `visual-system.md §1.2` still hold (fg/bg ≥ 16:1; the gradient headline is
    large-text ≥ 3:1). The panel's red wash never sits under body text.
  - No color-only meaning: the emblems carry glyph shapes, not just hue; the motif
    is purely decorative and duplicates no information.
  - Motion fully `motion-safe:` gated + global reduced-motion override.
- **Performance / layout stability**
  - No image request, no font, no JS lib → nothing to block paint; **zero CLS**
    (panel has a fixed `aspect-square` box; background is absolutely positioned).
  - Animate only `transform`, `opacity`, and `stroke-dashoffset` (compositor-/
    cheap). Add `will-change:transform` only on the orbit group and crest.
  - Total added markup is one inline SVG (~2–4 KB) + 2 keyframes. No bundle-size
    concern; no dependency added.

---

## 6. Acceptance criteria (Given/When/Then — for QA)

1. **Not-empty, light mode**
   Given the site in light mode at 1280px,
   When the hero loads,
   Then a bordered comic emblem panel is clearly visible in the right column
   (ink outline + red crest + orbiting emblems), and the left column shows the
   eyebrow, single `<h1>`, lead, and CTA left-aligned.

2. **Both themes strong**
   Given light and dark modes,
   When comparing the hero,
   Then the crest, rays, and nodes are clearly visible in *both* (no washed-out
   state), with ink outlines high-contrast against the panel in each theme.

3. **Single h1 + decorative visual**
   Given a screen-reader / a11y tree,
   When the hero is inspected,
   Then there is exactly one `<h1>`, and the SVG/wrapper are `aria-hidden` with no
   announced text and are not in the tab order.

4. **CTA above the fold**
   Given viewports 375×667, 768×1024, and 1280×800,
   When the hero renders (no scroll),
   Then the "Get in touch" CTA is fully visible without scrolling and no content
   is pushed off-screen.

5. **Motion gating**
   Given `prefers-reduced-motion: reduce`,
   When the hero loads,
   Then nothing animates (ring/crest/beams static) but the full composition is
   still shown; and Given motion allowed, the ring orbits (~60s), beams pulse, and
   the crest breathes.

6. **Contrast preserved**
   Given a contrast check on hero text,
   When measured against its background,
   Then body/lead ≥ 4.5:1 and the large gradient headline ≥ 3:1 in both themes
   (unchanged from the shipped values); the panel red wash never underlies body
   text.

7. **No layout shift / no new deps**
   Given the built bundle and a Lighthouse/CLS check,
   When the hero loads,
   Then CLS attributable to the hero is 0 (panel has fixed aspect box) and no new
   runtime dependency (three.js/framer-motion/image asset) was added.
