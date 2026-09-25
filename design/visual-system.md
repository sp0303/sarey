# sarey.tech — Visual System

Build-ready design system for T-001. Stack is fixed: React + Vite + TS + Tailwind,
dark mode via `prefers-color-scheme` (`darkMode: 'media'`, no toggle).
This document does not touch any `interfaces_frozen` name or path — it only tells
the developer what values to put inside `src/index.css`, `tailwind.config.ts`, and
component classes.

Design intent: **clean, modern, trustworthy engineering studio.** Calm neutrals,
a single confident indigo accent, generous whitespace, no gradients-as-decoration,
no color-only meaning.

---

## 1. Color tokens

### 1.1 Implementation approach (do this exactly)

Use **CSS custom properties defined in `src/index.css`**, switched by the
`prefers-color-scheme` media query, then **mapped to named Tailwind colors** in
`tailwind.config.ts`. This keeps component classes identical in both schemes
(`bg-bg`, `text-fg`, `border-border`, …) while the values swap automatically.

`src/index.css`:

```css
:root {
  /* Light (default) */
  --color-bg:            #FFFFFF; /* page background */
  --color-surface:       #F1F5F9; /* cards / raised panels */
  --color-border:        #E2E8F0; /* hairlines, card borders */
  --color-fg:            #0F172A; /* text-primary */
  --color-fg-muted:      #475569; /* text-muted / secondary */
  --color-accent:        #4F46E5; /* brand indigo (links, icons, text accents) */
  --color-accent-hover:  #4338CA; /* accent hover/active */
  --color-on-accent:     #FFFFFF; /* text/icon ON an accent fill */
  --color-focus:         #4F46E5; /* focus-visible ring */
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-bg:           #0B1120; /* near-black slate */
    --color-surface:      #151C2C; /* cards */
    --color-border:       #273449; /* hairlines */
    --color-fg:           #F1F5F9; /* text-primary */
    --color-fg-muted:     #94A3B8; /* text-muted */
    --color-accent:       #818CF8; /* brighter indigo for dark bg */
    --color-accent-hover: #A5B4FC;
    --color-on-accent:    #FFFFFF; /* white on the indigo-600 button fill */
    --color-focus:        #818CF8;
  }
}
```

`tailwind.config.ts` (inside `theme.extend.colors`):

```ts
colors: {
  bg:            'var(--color-bg)',
  surface:       'var(--color-surface)',
  border:        'var(--color-border)',
  fg:            'var(--color-fg)',
  'fg-muted':    'var(--color-fg-muted)',
  accent:        'var(--color-accent)',
  'accent-hover':'var(--color-accent-hover)',
  'on-accent':   'var(--color-on-accent)',
  focus:         'var(--color-focus)',
  // Fixed brand-fill for the CTA button — SAME hex in both schemes so the
  // white-on-indigo contrast is guaranteed. Do NOT map this to --color-accent.
  'brand-600':   '#4F46E5',
  'brand-700':   '#4338CA',
}
```

> Set `borderColor.DEFAULT` and a base `body { background: var(--color-bg);
> color: var(--color-fg); }` so nothing renders unstyled before Tailwind classes
> apply.

### 1.2 Contrast ledger (WCAG 2.2 AA — normal text needs ≥ 4.5:1)

**Light mode**

| Foreground | Background | Ratio | Use | Pass |
|---|---|---|---|---|
| `#0F172A` fg | `#FFFFFF` bg | **17.8:1** | body/headings | AAA |
| `#0F172A` fg | `#F1F5F9` surface | **16.3:1** | text on cards | AAA |
| `#475569` fg-muted | `#FFFFFF` bg | **7.4:1** | secondary text | AAA |
| `#475569` fg-muted | `#F1F5F9` surface | **6.8:1** | muted on cards | AAA |
| `#4F46E5` accent | `#FFFFFF` bg | **6.3:1** | links, text accents | AA |
| `#4F46E5` accent | `#F1F5F9` surface | **5.7:1** | accent on cards | AA |
| `#FFFFFF` on-accent | `#4F46E5` brand-600 | **6.3:1** | CTA button label | AA |
| `#E2E8F0` border | `#FFFFFF` bg | 1.2:1 | non-text (borders exempt) | n/a |

**Dark mode**

| Foreground | Background | Ratio | Use | Pass |
|---|---|---|---|---|
| `#F1F5F9` fg | `#0B1120` bg | **16.9:1** | body/headings | AAA |
| `#F1F5F9` fg | `#151C2C` surface | **14.6:1** | text on cards | AAA |
| `#94A3B8` fg-muted | `#0B1120` bg | **7.3:1** | secondary text | AAA |
| `#94A3B8` fg-muted | `#151C2C` surface | **6.3:1** | muted on cards | AA |
| `#818CF8` accent | `#0B1120` bg | **6.3:1** | links, text accents | AA |
| `#818CF8` accent | `#151C2C` surface | **5.4:1** | accent on cards | AA |
| `#FFFFFF` on-accent | `#4F46E5` brand-600 | **6.3:1** | CTA button label | AA |
| `#273449` border | `#0B1120` bg | 1.6:1 | non-text (borders exempt) | n/a |

Every text/background pair used for content meets **≥ 4.5:1 in both schemes.**
The CTA button uses the fixed `brand-600` fill in both modes precisely so its
white label never drops below 4.5:1 (a lighter indigo-500 fill would fail at
~4.47:1 — do not use it for a filled button with white text).

**Rule:** never use `accent` as a large filled background with white text; use it
only as text/icon/border. For filled buttons use `brand-600`/`brand-700`.

---

## 2. Typography

### 2.1 Families (Google Fonts)

- **Display + body:** `Inter` (weights 400, 500, 600, 700). Neutral, modern,
  excellent legibility, variable-friendly.
- **Wordmark + step numbers / mono accents:** `JetBrains Mono` (weight 600) — a
  subtle "engineering studio" signal used sparingly (wordmark, pipeline step
  numbers, code-like tags). Optional; if omitted, fall back to Inter 700.

Load in `index.html` `<head>` (preconnect + one stylesheet link). Provide a full
fallback stack so first paint is never blank:

```css
--font-sans: 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
--font-mono: 'JetBrains Mono', ui-monospace, 'SFMono-Regular', Menlo, Consolas, monospace;
```

Map to `fontFamily.sans` / `fontFamily.mono` in `tailwind.config.ts`.

### 2.2 Type scale (responsive via `clamp`)

Define as `fontSize` entries `[size, { lineHeight, letterSpacing, fontWeight }]`.

| Token | Element | clamp(min → max) | Line-height | Weight | Tracking |
|---|---|---|---|---|---|
| `display` | Hero value prop / h1 | `clamp(2.25rem, 1.6rem + 3.2vw, 3.75rem)` (36→60px) | 1.05 | 700 | -0.02em |
| `h2` | Section headings | `clamp(1.75rem, 1.4rem + 1.6vw, 2.5rem)` (28→40px) | 1.15 | 700 | -0.015em |
| `h3` | Card titles / step names | `clamp(1.125rem, 1.05rem + 0.4vw, 1.375rem)` (18→22px) | 1.25 | 600 | -0.01em |
| `lead` | Hero sub / About intro | `clamp(1.125rem, 1.05rem + 0.4vw, 1.375rem)` (18→22px) | 1.5 | 400 | 0 |
| `body` | Paragraphs, answers | `1rem` (16px) fixed | 1.6 | 400 | 0 |
| `small` | Footer, captions, labels | `0.875rem` (14px) fixed | 1.5 | 500 | 0.01em |
| `overline` | Section eyebrow labels | `0.75rem` (12px) | 1.4 | 600 | 0.08em (uppercase) |

- Max paragraph measure: `max-w-[65ch]` for About/answer body text.
- Never set body below 16px. `small` (14px) is the floor and only for
  meta/labels.

---

## 3. Spacing, layout, radius, shadow

### 3.1 Spacing scale
Use Tailwind's default 4px-based scale. House rhythm uses these steps:
`4, 8, 12, 16, 24, 32, 48, 64, 96 px` → `1, 2, 3, 4, 6, 8, 12, 16, 24`.

### 3.2 Container / max width
- **Content max width:** `max-w-6xl` (1152px), centered, with horizontal padding
  `px-6` (24px) mobile → `px-8` (32px) ≥768px.
- Full-bleed section backgrounds (e.g. alternating `surface` band) span 100% width;
  the inner `Container` caps content at 1152px. This is the optional `Container`
  primitive named in scope.

### 3.3 Section vertical rhythm
- Section padding: `py-16` (64px) mobile → `py-24` (96px) desktop (`md:py-24`).
- Heading-to-content gap: `mt-4` after eyebrow, `mt-10`/`mt-12` heading→grid.
- Alternate section backgrounds for scannability: Hero `bg`, About `surface`,
  HowItWorks `bg`, Team `surface`, LogoStrip `bg`, FAQ `surface`, Contact `bg`.
  (Color-only alternation is decorative; every section also has an `<h2>` — meaning
  never depends on the band color.)

### 3.4 Border radius
| Token | Value | Use |
|---|---|---|
| `rounded-lg` | 8px | inputs, small tags |
| `rounded-xl` | 12px | cards (Team, FAQ items, steps) |
| `rounded-2xl` | 16px | large panels, hero container if used |
| `rounded-full` | 9999px | CTA button, step number badges |

### 3.5 Shadow tokens
Keep shadows quiet; in dark mode rely on `border` + `surface` contrast, not heavy
shadow.

```ts
boxShadow: {
  card:      '0 1px 2px 0 rgb(15 23 42 / 0.04), 0 1px 3px 0 rgb(15 23 42 / 0.08)',
  'card-hover': '0 4px 12px -2px rgb(15 23 42 / 0.12)',
}
```
- Light: cards use `shadow-card`, hover `shadow-card-hover`.
- Dark: cards use `border border-border` and **no** shadow (`dark:shadow-none`),
  hover lifts via `border-accent` + slight `bg` change instead of shadow.

---

## 4. Wordmark & favicon

### 4.1 Wordmark ("sarey")
Purely typographic — no external logo asset needed.

- Text: lowercase `sarey`.
- Font: `JetBrains Mono` 600 (fallback Inter 700), tracking `-0.02em`.
- Color: `fg`, with the trailing dot/period accent rendered in `accent`:
  visually `sarey` in `fg` + a `.` in `accent` (e.g. `sarey.` where the dot is a
  `<span class="text-accent">.</span>`). The dot nods to the `.tech` domain and is
  decorative only — the accessible name is still just the brand word.
- Header size: `text-xl` (20px) 600. Hero h1 uses the `display` scale (see §5 of
  wireframes) with the value prop as the actual h1 text; the wordmark in the hero
  is a styled visual lockup, not a second h1.
- In the header, the wordmark is a link to `#main`/top (`aria-label="sarey — home"`).

### 4.2 favicon.svg concept
A 32×32 (viewBox `0 0 32 32`) square:
- Background: rounded-rect (`rx="7"`) filled `#4F46E5` (brand-600 — fixed hex so it
  reads on both light and dark browser chrome).
- Mark: a white lowercase `s` in JetBrains Mono / bold geometric sans, centered,
  or a simplified "s" glyph as a `<path>`.
- No `prefers-color-scheme` needed inside the favicon; the indigo tile works on
  both. Keep it a single self-contained `.svg` at `public/favicon.svg`.

Reference sketch (developer may refine the glyph):
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" role="img" aria-label="sarey">
  <rect width="32" height="32" rx="7" fill="#4F46E5"/>
  <text x="16" y="22" text-anchor="middle" font-family="'JetBrains Mono',monospace"
        font-size="20" font-weight="700" fill="#FFFFFF">s</text>
</svg>
```

---

## 5. Motion (system-wide)
- Transitions on interactive elements: `transition-colors`/`transition-shadow`,
  `duration-150`, `ease-out`. Accordion height/opacity `duration-200`.
- Respect reduced motion globally (also see states-a11y.md):
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: .001ms !important;
    transition-duration: .001ms !important; scroll-behavior: auto !important; }
}
```
- `html { scroll-behavior: smooth; }` for anchor nav — overridden to `auto` by the
  reduced-motion block above.
