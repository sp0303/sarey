import React from 'react';
import { siteContent } from '../content/site';

export const Contact: React.FC = () => {
  return (
    <section aria-labelledby="contact-heading" className="bg-bg py-16 md:py-24 flex items-center justify-center">
      <div className="w-full max-w-6xl mx-auto px-6 md:px-8">
        <div className="relative max-w-3xl mx-auto text-center overflow-hidden rounded-3xl border border-border bg-surface px-8 py-14 md:px-14 md:py-20">
          {/* aurora glow echo of the hero */}
          <div className="pointer-events-none absolute inset-0 -z-0" aria-hidden="true">
            <div
              className="absolute -top-24 left-1/2 h-[26rem] w-[26rem] -translate-x-1/2 rounded-full blur-3xl motion-safe:animate-[aurora-drift_20s_ease-in-out_infinite]"
              style={{ background: 'radial-gradient(circle at 50% 50%, rgba(220,38,38,0.25), transparent 62%)' }}
            />
            <div className="absolute inset-0 bg-grid-dots text-fg-muted opacity-[0.12]" />
          </div>

          <div className="relative">
            <h2 id="contact-heading" className="text-h2 mb-4">
              <span className="text-gradient">{siteContent.contact.heading}</span>
            </h2>

            <p className="text-lead text-fg-muted mb-8 max-w-xl mx-auto">
              {siteContent.contact.body}
            </p>

            <a
              href={`mailto:${siteContent.brand.contactEmail}`}
              className="inline-block bg-brand-600 text-on-accent hover:bg-brand-700 active:scale-[0.98] transition-all duration-150 rounded-full px-8 py-3.5 text-body font-medium shadow-lg shadow-accent/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
            >
              {siteContent.contact.ctaLabel}
            </a>

            <p className="mt-5 text-small text-fg-muted">
              or write to{' '}
              <a
                href={`mailto:${siteContent.brand.contactEmail}`}
                className="text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-surface rounded-sm"
              >
                {siteContent.brand.contactEmail}
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
