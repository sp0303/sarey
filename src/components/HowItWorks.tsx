import React from 'react';
import { siteContent } from '../content/site';

const svg = (children: React.ReactNode): React.ReactElement => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    {children}
  </svg>
);

// One icon per pipeline step, in order.
const stepIcons: React.ReactElement[] = [
  // 1 Ideation — lightbulb
  svg(<><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.8.8 1.3 1.5 1.5 2.5" /><path d="M9 18h6" /><path d="M10 22h4" /></>),
  // 2 Architecture — compass
  svg(<><circle cx="12" cy="12" r="10" /><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" /></>),
  // 3 Design — pen-tool
  svg(<><path d="m12 19 7-7 3 3-7 7-3-3z" /><path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" /><path d="m2 2 7.586 7.586" /><circle cx="11" cy="11" r="2" /></>),
  // 4 Build — code
  svg(<><path d="m18 16 4-4-4-4" /><path d="m6 8-4 4 4 4" /><path d="m14.5 4-5 16" /></>),
  // 5 Review — badge-check
  svg(<><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" /><path d="m9 12 2 2 4-4" /></>),
  // 6 Ship — rocket
  svg(<><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" /></>),
];

export const HowItWorks: React.FC = () => {
  const steps = siteContent.howItWorks.steps;
  return (
    <section id="how" aria-labelledby="how-heading" className="bg-bg py-16 md:py-24">
      <div className="w-full max-w-6xl mx-auto px-6 md:px-8">
        <span className="text-overline text-fg-muted block mb-3">THE PIPELINE</span>
        <h2 id="how-heading" className="text-h2 text-fg mb-10 md:mb-12">
          {siteContent.howItWorks.heading}
        </h2>

        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {steps.map((step, i) => (
            <li key={step.step} className="relative">
              <div className="h-full bg-surface border border-border rounded-xl p-6 flex flex-col transition-all duration-150 hover:-translate-y-1 hover:border-accent hover:shadow-card-hover dark:hover:shadow-none">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-10 h-10 rounded-lg bg-brand-600 text-white flex items-center justify-center" aria-hidden="true">
                    {stepIcons[i]}
                  </span>
                  <span className="font-mono text-small font-semibold text-accent">
                    STEP {step.step.toString().padStart(2, '0')}
                  </span>
                </div>
                <h3 className="text-h3 text-fg mb-2">{step.name}</h3>
                <p className="text-body text-fg-muted">{step.blurb}</p>
              </div>
              {/* connector chevron between steps (desktop) */}
              {i !== steps.length - 1 && (
                <span
                  aria-hidden="true"
                  className="hidden lg:flex absolute top-1/2 -right-3 -translate-y-1/2 z-10 text-border [&:where(.group)]:text-accent"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};
