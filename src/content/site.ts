export interface NavLink { label: string; href: string; }
export interface PipelineStep { step: number; name: string; blurb: string; }
export interface TeamRole { role: string; capability: string; }
export interface Integration {
  name: string;
  vendor: string;
  role: 'integration' | 'deployment';
  logoSrc: string;
  alt: string;
  href: string;
}
export interface FaqEntry { id: string; question: string; answer: string; }
export interface SiteContent {
  brand: { wordmark: string; domain: string; contactEmail: string; };
  hero: { valueProp: string; ctaLabel: string; };
  about: { heading: string; body: string[]; };
  howItWorks: { heading: string; steps: PipelineStep[]; };
  team: { heading: string; roles: TeamRole[]; };
  integrations: { heading: string; items: Integration[]; };
  faq: { heading: string; entries: FaqEntry[]; };
  contact: { heading: string; body: string; ctaLabel: string; };
  footer: { copyright: string; links: NavLink[]; };
}

export const siteContent: SiteContent = {
  brand: {
    wordmark: "sarey",
    domain: "sarey.tech",
    contactEmail: "contact@sarey.tech",
  },
  hero: {
    valueProp: "A multi-vendor AI team that ships production software.",
    ctaLabel: "Get in touch",
  },
  about: {
    heading: "We are the Agent Foundry.",
    body: [
      "We design, build, review, and ship — with cross-vendor review baked in so quality is not left to chance.",
      "By utilizing an orchestration of specialized AI agents, each scoped with distinct capabilities, we accelerate development without compromising architectural integrity."
    ],
  },
  howItWorks: {
    heading: "How it works",
    steps: [
      { step: 1, name: "Ideation", blurb: "Define requirements, boundaries, and scope to anchor the build." },
      { step: 2, name: "Architecture", blurb: "System design, technology selection, and task breakdown." },
      { step: 3, name: "Design", blurb: "Visual systems, states, and accessibility specifications." },
      { step: 4, name: "Build", blurb: "Iterative, component-driven implementation against strict contracts." },
      { step: 5, name: "Review", blurb: "Automated and role-based QA, security audits, and code analysis." },
      { step: 6, name: "Ship", blurb: "Continuous deployment and artifact generation for production." },
    ],
  },
  team: {
    heading: "Team",
    roles: [
      { role: "Business Analyst", capability: "Transforms needs into structured project scopes." },
      { role: "Architect", capability: "Designs scalable systems and task contracts." },
      { role: "UX/UI Designer", capability: "Creates accessible and systemic design languages." },
      { role: "Developer", capability: "Writes strict, testable code to specification." },
      { role: "QA Reviewer", capability: "Verifies acceptance criteria and accessibility." },
      { role: "Security Engineer", capability: "Audits for vulnerabilities and data integrity." },
      { role: "Skill Curator", capability: "Maintains toolsets and integration prompts." },
      { role: "DevOps", capability: "Automates deployments and manages infrastructure." },
    ],
  },
  integrations: {
    heading: "INTEGRATES WITH / DEPLOYED ON",
    items: [
      {
        name: "Claude",
        vendor: "Anthropic",
        role: "integration",
        logoSrc: "/logos/claude.svg",
        alt: "Claude by Anthropic — integration",
        href: "https://anthropic.com",
      },
      {
        name: "Antigravity",
        vendor: "Google",
        role: "integration",
        logoSrc: "/logos/antigravity.svg",
        alt: "Antigravity by Google — integration",
        href: "https://google.com",
      },
      {
        name: "Oracle Cloud",
        vendor: "Oracle",
        role: "deployment",
        logoSrc: "/logos/oracle-cloud.svg",
        alt: "Oracle Cloud (OCI) — deployment",
        href: "https://oracle.com",
      },
    ],
  },
  faq: {
    heading: "Frequently asked questions",
    entries: [
      {
        id: "faq-limits",
        question: "What are the limitations of AI-agent builds?",
        answer: "Agents excel at scoped, well-defined tasks but struggle with unbounded ambiguity. We constrain this by enforcing strict upfront architectural contracts and breaking down problems into deterministic steps."
      },
      {
        id: "faq-hallucination",
        question: "How is hallucination reduced?",
        answer: "We use multi-vendor cross-review, rigid task contracts, deterministic testing, and human gating at critical milestones. The output of one model is systematically verified by another."
      },
      {
        id: "faq-roles",
        question: "Who reviews the code?",
        answer: "We enforce strict role-based separation: the author of the code is never its reviewer. Furthermore, reviews are performed by agents from a different vendor than the writing agent to prevent shared biases."
      },
      {
        id: "faq-security",
        question: "How is my data handled and secured?",
        answer: "Your source code and project data are processed in ephemeral, stateless environments. Our Security Engineer role specifically audits the codebase to ensure no secrets or vulnerabilities are committed, following least-privilege principles."
      },
    ],
  },
  contact: {
    heading: "Let's build something.",
    body: "Tell us the idea; we'll bring the team.",
    ctaLabel: "Get in touch",
  },
  footer: {
    copyright: "© 2026 sarey.tech",
    links: [
      { label: "About", href: "#about" },
      { label: "How it works", href: "#how" },
      { label: "Team", href: "#team" },
      { label: "FAQ", href: "#faq" },
    ],
  },
};
