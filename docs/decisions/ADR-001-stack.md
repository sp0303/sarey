# ADR-001: Frontend stack for the sarey.tech landing page

- Status: Accepted
- Date: 2026-09-25
- Deciders: Architect (Claude), BA (approved at GATE 1)
- Supersedes: none

## Context

We need a single-page marketing landing page for **sarey.tech** (the "Agent
Foundry" build shop). Requirements: full SEO (semantic HTML5, meta/OG/Twitter
tags, JSON-LD, robots.txt, sitemap.xml, canonical), WCAG 2.2 AA, dark mode via
`prefers-color-scheme`, Lighthouse-friendly performance, responsive at
375/768/1280 px. No backend, no forms (mailto only), no routing, no CMS, no
analytics in this pass. First delivery is a shareable Artifact preview; OCI
deploy is deferred.

The stack was **decided at ideation and is fixed**: React + Vite + TypeScript +
Tailwind CSS. This ADR records that decision, the alternatives considered, and
the consequences the developer must respect.

## Decision

Build with **React 18 + Vite 5 + TypeScript 5 + Tailwind CSS 3**, output a
static single-page app.

- **Vite** for dev server + static build (`vite build` → `dist/`), fast and
  zero-config for a static SPA.
- **React + TypeScript** for typed, componentized sections. Content lives in a
  single typed content module so copy is data, not markup.
- **Tailwind CSS** for utility styling, dark mode (`darkMode: 'media'` to honor
  `prefers-color-scheme`), and consistent spacing/contrast tokens.
- **SEO**: static tags are authored directly in `index.html` (title, meta
  description, canonical, OG, Twitter, JSON-LD Organization, favicon). Because
  the content is fixed and single-page, static tags in `index.html` are
  sufficient — no runtime head manager (e.g. react-helmet) is needed. `robots.txt`
  and `sitemap.xml` are static files in `public/`.

## Alternatives considered

1. **Astro / static HTML** — arguably better for a content site with less JS.
   Rejected: the decided stack is React+Vite; team tooling and future OCI deploy
   assume this. Cost of divergence outweighs the marginal perf gain for one page.
2. **Next.js** — SSR/SSG and a head API, but heavier, opinionated routing, and
   overkill for a single static page with no backend. Rejected.
3. **react-helmet-async for head tags** — useful when tags are dynamic per
   route. Rejected: single page + fixed content means static `index.html` tags
   are simpler, faster, and less error-prone.
4. **CSS Modules / plain CSS** instead of Tailwind — rejected to keep with the
   decided stack and to get dark-mode + design tokens cheaply.

## Consequences

- Positive: fast build, typed components, SEO tags are trivially auditable
  because they are static in one file; easy to publish as an Artifact preview.
- Positive: `darkMode: 'media'` satisfies the `prefers-color-scheme` requirement
  with no toggle UI to build or test.
- Negative / watch-outs:
  - JSON-LD and OG tags are duplicated conceptually with on-page content; keep
    them consistent (org name, URL) — single source in `index.html`.
  - Tailwind purge/content globs must include all `.tsx` files or classes get
    stripped from the production build.
  - No runtime head manager means any future multi-page move (OUT of scope) will
    require revisiting this ADR.
- Standards: SemVer + Conventional Commits; dependencies pinned in
  `package.json`; no secrets in repo; images lazy-loaded with explicit
  width/height to avoid layout shift (CLS).
