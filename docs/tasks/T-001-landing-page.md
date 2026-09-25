# Task Contract — T-001: sarey.tech landing page

- **task_id:** T-001
- **title:** Build the sarey.tech single-page marketing landing (React + Vite + TS + Tailwind), full SEO + WCAG 2.2 AA
- **assignee:** Antigravity / Gemini developer (`agy -p ... --model gemini-3.1-pro-high`)
- **branch:** `feat/T-001-landing-page`
- **budget:** ~120k tokens (single slice; scaffold + 7 sections + SEO assets). Escalate before exceeding.

## Objective
Deliver the complete, static single-page landing site described in
[docs/scope-landing.md](../scope-landing.md), buildable with `npm install` +
`npm run build` (Vite → `dist/`) and runnable with `npm run dev`. Publishable as
a shareable Artifact preview. No backend, no forms (mailto only), no routing.

## context_refs
- [ADR-001 — stack](../decisions/ADR-001-stack.md)
- [Scope + component tree + content model](../scope-landing.md)
- [AGENTS.md](../../AGENTS.md), [CLAUDE.md](../../CLAUDE.md)

## allowed_paths
Create/modify only within:
```
package.json  package-lock.json
index.html
vite.config.ts  tsconfig.json  tsconfig.node.json
tailwind.config.ts  postcss.config.js
src/**            (main.tsx, App.tsx, index.css, components/**, content/**)
public/**         (robots.txt, sitemap.xml, favicon.svg, logos/**, og-image.*)
.gitignore  README-landing.md (optional notes)
```
Do NOT touch: `docs/**`, `.claude/**`, `.agents/**`, `agents/**`, `AGENTS.md`,
`CLAUDE.md`, or any file under `interfaces_frozen`.

## interfaces_frozen
These names, paths, and shapes are FROZEN — do not rename or alter signatures.

**File / component layout:**
```
src/main.tsx
src/App.tsx
src/index.css
src/content/site.ts                 // exports `siteContent: SiteContent` + all interfaces
src/components/SiteHeader.tsx
src/components/Hero.tsx
src/components/About.tsx
src/components/HowItWorks.tsx
src/components/Team.tsx
src/components/LogoStrip.tsx
src/components/Faq.tsx
src/components/FaqItem.tsx
src/components/Contact.tsx
src/components/SiteFooter.tsx
public/robots.txt
public/sitemap.xml
public/favicon.svg
public/logos/{claude,antigravity,oracle-cloud}.svg
public/og-image.png                 // 1200x630
```

**Content model:** exactly the TypeScript interfaces in
[docs/scope-landing.md](../scope-landing.md#content-model) (`SiteContent`,
`NavLink`, `PipelineStep`, `TeamRole`, `Integration`, `FaqEntry`). Do not change
field names or types.

**FaqItem props (frozen):**
```ts
interface FaqItemProps {
  entry: FaqEntry;
  isOpen: boolean;
  onToggle: (id: string) => void;
}
```

**Fixed identifiers:** brand domain `sarey.tech`; contact `contact@sarey.tech`;
canonical `https://sarey.tech`; pipeline order ideation→architecture→design→build→review→ship;
the 8 team roles and 3 integrations named in the scope doc.

## acceptance (Given/When/Then)
- **G/W/T 1 — Responsive:** Given the page, when viewed at 375 / 768 / 1280 px,
  then no horizontal scroll, no overlap, all sections legible.
- **G/W/T 2 — Hero:** Given a 1280px viewport, when the page loads, then the
  wordmark, one-line value prop, and a "Get in touch" CTA linking to
  `mailto:contact@sarey.tech` are visible above the fold.
- **G/W/T 3 — FAQ:** Given the FAQ, when a question is activated by mouse OR
  keyboard (Enter/Space) and Tab reaches each control, then its answer
  expands/collapses; `aria-expanded` and `aria-controls` reflect state; content
  covers limitations, hallucination controls, and role-based review.
- **G/W/T 4 — Logo strip:** Given §5, when rendered, then Claude, Antigravity,
  and Oracle Cloud appear with correct names and meaningful alt text, under
  "Integrates with / Deployed on" framing (no endorsement claim).
- **G/W/T 5 — WCAG 2.2 AA:** Given the page, then it uses one `<header>`/`<nav>`,
  one `<main>`, `<footer>`; every interactive element has a visible focus state;
  text/background contrast ≥ 4.5:1 in both light and dark; a skip link exists.
- **G/W/T 6 — SEO:** Given `index.html`, then it has a unique `<title>`, meta
  description, canonical `https://sarey.tech`, Open Graph + Twitter card tags,
  and a valid JSON-LD `Organization` script; `public/robots.txt` and
  `public/sitemap.xml` exist and reference the canonical host; favicon present;
  images have `loading="lazy"` + explicit `width`/`height` (no CLS).

## definition_of_done
- `npm install` succeeds; `npm run build` produces `dist/` with no errors;
  `npm run dev` serves the page.
- `tsc --noEmit` passes (strict TypeScript); no `any` in the content model.
- All acceptance G/W/T 1–6 met.
- Dark mode works via `prefers-color-scheme` (Tailwind `darkMode: 'media'`), no
  toggle.
- Dependencies pinned (exact versions) in `package.json`.
- JSON-LD validates as well-formed JSON; OG image path resolves.
- No secrets committed. Conventional Commit messages (`feat: ...`).
- PR opened against `main`, linked to T-001, listing every assumption made.

## Risks / edge cases (handle up front)
1. **Tailwind purge:** set `content` globs to include `./index.html` and
   `./src/**/*.{ts,tsx}` or production classes get stripped.
2. **Vendor logos / trademarks:** use official brand-asset SVGs; nominative
   "Integrates with / Deployed on" only — no logos implying partnership or
   endorsement. If an official asset cannot be sourced, use a text wordmark
   placeholder with correct name and emit a BRIDGE_QUESTION rather than guess.
3. **CLS:** all `<img>` need explicit `width`/`height` (or aspect-ratio box);
   lazy-load below-fold images only (hero/LCP image, if any, eager).
4. **FAQ a11y:** use a real `<button>` inside each item header, `aria-expanded`,
   `aria-controls` → region `id`; do not trap focus; Escape optional.
5. **Contrast in dark mode:** verify both schemes independently, not just light.
6. **Above-the-fold:** value prop + CTA must not depend on a large hero image
   that pushes the CTA down at 375px.
7. **Heading hierarchy:** exactly one `<h1>` (wordmark/value prop), sections use
   `<h2>`; no skipped levels.

## escalation
If anything is ambiguous, underspecified, or you cannot source an official
vendor logo asset: **emit `BRIDGE_QUESTION: <your question>` and STOP.** Do not
guess, do not change `interfaces_frozen`, do not expand scope. Scope questions
route to the BA via the orchestrator.
