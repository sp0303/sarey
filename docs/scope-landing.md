# Scope — sarey.tech landing page

Single-page marketing site for the Agent Foundry build shop. Companion to
[ADR-001](decisions/ADR-001-stack.md) and task
[T-001](tasks/T-001-landing-page.md).

## Scope boundary

### In (this pass)
- One static SPA (React + Vite + TS + Tailwind), 7 sections in fixed order.
- Full SEO: semantic landmarks, unique title + meta description, Open Graph +
  Twitter card, canonical `https://sarey.tech`, JSON-LD Organization, robots.txt,
  sitemap.xml, favicon, alt text, heading hierarchy.
- Dark mode via `prefers-color-scheme` (no toggle).
- Responsive at 375 / 768 / 1280 px; WCAG 2.2 AA (landmarks, focus, contrast).
- FAQ accordion, fully keyboard accessible.
- "Get in touch" CTA = `mailto:contact@sarey.tech`.
- Logo strip: Claude (Anthropic), Antigravity (Google), Oracle Cloud (OCI),
  nominative "Integrates with / Deployed on" framing, no endorsement claim.
- Delivered as a shareable Artifact preview.

### Out (non-goals)
- Backend, API, server. Form submission (mailto only). CMS, blog.
- Multi-page routing, auth, analytics/tracking.

### Deferred (later pass, not now)
- OCI deployment + CI pipeline.
- Contact form with real submission.
- Additional pages / blog / case studies.
- Manual dark-mode toggle.

## Component sketch (component tree)

```
App
├── <a href="#main"> Skip-to-content link
├── SiteHeader            (nav landmark; wordmark + anchor nav)
└── main#main
    ├── Hero              (§1  wordmark, value prop, mailto CTA)
    ├── About             (§2  who we are / what we do)
    ├── HowItWorks        (§3  pipeline steps, ordered list)
    ├── Team              (§4  agent role cards)
    ├── LogoStrip         (§5  Claude / Antigravity / OCI)
    ├── Faq               (§6  accordion; uses FaqItem)
    │   └── FaqItem[]     (button + region, aria-expanded/controls)
    └── Contact           (§7  mailto CTA + email)
└── SiteFooter           (contentinfo landmark)
```

Shared primitives (optional, developer's discretion but keep names if created):
`Section` wrapper (renders `<section>` with heading id), `Container` (max-width).

All copy is imported from a single content module — components are presentational
and receive data via props or read from the content module directly.

## Content model

One typed content module (`src/content/site.ts`) exporting a `siteContent`
object. Shapes (frozen — see task `interfaces_frozen`):

```ts
export interface NavLink { label: string; href: string }        // in-page anchors

export interface PipelineStep { step: number; name: string; blurb: string }

export interface TeamRole {
  role: string;         // job title, e.g. "Architect"
  name: string;         // persona name, e.g. "Arjun"
  capability: string;   // one-line capability
  icon: TeamIcon;       // icon id -> inline SVG in Team component
}
export type TeamIcon =
  | 'analyst' | 'architect' | 'designer' | 'developer'
  | 'qa' | 'security' | 'curator' | 'devops';

export interface Integration {
  name: string;              // "Claude", "Antigravity", "Oracle Cloud"
  vendor: string;            // "Anthropic", "Google", "Oracle"
  role: 'integration' | 'deployment';
  logoSrc: string;           // path under /public/logos
  alt: string;               // meaningful alt text incl. vendor
  href: string;              // vendor site
}

export interface FaqEntry { id: string; question: string; answer: string }

export interface SiteContent {
  brand: { wordmark: string; domain: string; contactEmail: string };
  hero: { valueProp: string; ctaLabel: string };
  about: { heading: string; body: string[] };            // paragraphs
  howItWorks: { heading: string; steps: PipelineStep[] }; // 6 steps
  team: { heading: string; roles: TeamRole[] };           // 8 roles
  integrations: {
    heading: string;                                      // "Integrates with / Deployed on"
    items: Integration[];                                 // 3 items
  };
  faq: { heading: string; entries: FaqEntry[] };
  contact: { heading: string; body: string; ctaLabel: string };
  footer: { copyright: string; links: NavLink[]; credit: string }; // credit = "A Sharat Patnayakuni's product"
}
```

### Fixed content values (developer must use these)
- Pipeline (6 steps, in order): ideation → architecture → design → build →
  review → ship.
- Team (8 roles, one-line capability each): Business Analyst, Architect,
  UX/UI Designer, Developer, QA Reviewer, Security Engineer, Skill Curator,
  DevOps.
- Integrations (3): Claude (Anthropic, integration), Antigravity (Google,
  integration), Oracle Cloud (Oracle, deployment).
- FAQ must cover, at minimum: limitations of AI-agent builds; how hallucination
  is reduced (multi-vendor cross-review, task contracts, tests, human gates);
  role-based separation (author ≠ reviewer; reviewer is a different vendor);
  data/security.
