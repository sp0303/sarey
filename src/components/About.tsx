import React from 'react';
import { siteContent } from '../content/site';

const svg = (children: React.ReactNode): React.ReactElement => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    {children}
  </svg>
);

const values: { icon: React.ReactElement; title: string; body: string }[] = [
  {
    // shield-check
    icon: svg(<><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /><path d="m9 12 2 2 4-4" /></>),
    title: 'Cross-vendor review',
    body: 'The author and the reviewer are never the same vendor — so quality is verified, not assumed.',
  },
  {
    // layers / scoped agents
    icon: svg(<><path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" /><path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12" /><path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17" /></>),
    title: 'Scoped agents',
    body: 'Specialised agents each own a single job — analysis, architecture, design, build, review, security.',
  },
  {
    // rocket / production-grade
    icon: svg(<><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" /></>),
    title: 'Production-grade',
    body: 'Task contracts, automated tests, and human gates keep every release reliable and reviewable.',
  },
];

export const About: React.FC = () => {
  return (
    <section id="about" aria-labelledby="about-heading" className="bg-surface py-16 md:py-24">
      <div className="w-full max-w-6xl mx-auto px-6 md:px-8">
        <div className="max-w-3xl">
          <span className="text-overline text-fg-muted block mb-3">WHO WE ARE</span>
          <h2 id="about-heading" className="text-h2 text-fg mb-4">
            {siteContent.about.heading}
          </h2>
          <p className="text-lead text-fg-muted">
            {siteContent.about.body[0]}
          </p>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-10 md:mt-12">
          {values.map((v) => (
            <li
              key={v.title}
              className="bg-bg border border-border rounded-xl p-6 transition-all duration-150 hover:-translate-y-1 hover:border-accent hover:shadow-card-hover dark:hover:shadow-none"
            >
              <span className="w-11 h-11 rounded-lg bg-accent/10 text-accent flex items-center justify-center mb-4" aria-hidden="true">
                {v.icon}
              </span>
              <h3 className="text-h3 text-fg mb-2">{v.title}</h3>
              <p className="text-body text-fg-muted">{v.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
