import React from 'react';
import { siteContent } from '../content/site';

export const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-bg py-20 md:py-32 flex items-center justify-center min-h-[85vh]">
      {/* ---- comic / cinematic background (decorative) ---- */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        {/* radial sunburst rays behind the headline */}
        <div
          className="absolute left-1/2 top-1/2 h-[120vmax] w-[120vmax] -translate-x-1/2 -translate-y-1/2 opacity-[0.10] motion-safe:animate-[orbit-spin_120s_linear_infinite]"
          style={{
            background:
              'repeating-conic-gradient(from 0deg at 50% 50%, rgba(99,102,241,0.9) 0deg 3deg, transparent 3deg 9deg)',
            WebkitMaskImage: 'radial-gradient(circle at 50% 50%, #000 0%, transparent 60%)',
            maskImage: 'radial-gradient(circle at 50% 50%, #000 0%, transparent 60%)',
          }}
        />
        {/* aurora glow */}
        <div
          className="absolute -top-24 left-1/2 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full blur-3xl motion-safe:animate-[aurora-drift_18s_ease-in-out_infinite]"
          style={{ background: 'radial-gradient(circle at 50% 50%, rgba(99,102,241,0.30), transparent 62%)' }}
        />
        <div
          className="absolute top-16 -left-24 h-[28rem] w-[28rem] rounded-full blur-3xl motion-safe:animate-[aurora-drift_24s_ease-in-out_infinite_reverse]"
          style={{ background: 'radial-gradient(circle at 50% 50%, rgba(168,85,247,0.22), transparent 60%)' }}
        />
        {/* comic halftone dots */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(rgba(99,102,241,0.5) 1.6px, transparent 1.8px)',
            backgroundSize: '18px 18px',
            WebkitMaskImage: 'radial-gradient(ellipse 70% 65% at 50% 42%, #000 25%, transparent 72%)',
            maskImage: 'radial-gradient(ellipse 70% 65% at 50% 42%, #000 25%, transparent 72%)',
            opacity: 0.5,
          }}
        />
      </div>

      <div className="relative w-full max-w-6xl mx-auto px-6 md:px-8">
        <div className="max-w-[48rem] mx-auto text-center flex flex-col items-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 backdrop-blur px-4 py-1.5 text-overline text-fg-muted mb-8">
            <span className="h-1.5 w-1.5 rounded-full bg-accent motion-safe:animate-pulse" />
            AI-AGENT BUILD SHOP
          </span>

          <h1 className="text-display mb-6">
            <span className="text-fg">A multi-vendor AI team </span>
            <span className="text-gradient">that ships production software.</span>
          </h1>

          <p className="text-lead text-fg-muted mb-10 max-w-[65ch]">
            {siteContent.about.body[0]}
          </p>

          <a
            href={`mailto:${siteContent.brand.contactEmail}`}
            className="bg-brand-600 text-on-accent hover:bg-brand-700 active:scale-[0.98] transition-all duration-150 rounded-full px-8 py-3.5 text-body font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-bg w-full max-w-xs md:w-auto shadow-lg shadow-accent/25"
          >
            {siteContent.hero.ctaLabel}
          </a>
        </div>
      </div>
    </section>
  );
};
