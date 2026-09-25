import React from 'react';
import { siteContent } from '../content/site';
import { HeroGraphic } from './HeroGraphic';

export const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-bg py-14 pt-14 pb-16 md:pt-20 md:pb-24 flex items-center justify-center">
      {/* ---- animated background layers (decorative) ---- */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        {/* aurora gradient blobs */}
        <div
          className="absolute -top-24 left-1/2 h-[38rem] w-[38rem] -translate-x-1/2 rounded-full blur-3xl motion-safe:animate-[aurora-drift_16s_ease-in-out_infinite]"
          style={{ background: 'radial-gradient(circle at 50% 50%, rgba(99,102,241,0.28), transparent 62%)' }}
        />
        <div
          className="absolute top-10 -left-20 h-[26rem] w-[26rem] rounded-full blur-3xl motion-safe:animate-[aurora-drift_20s_ease-in-out_infinite_reverse]"
          style={{ background: 'radial-gradient(circle at 50% 50%, rgba(168,85,247,0.22), transparent 60%)' }}
        />
        <div
          className="absolute top-24 -right-16 h-[24rem] w-[24rem] rounded-full blur-3xl motion-safe:animate-[aurora-drift_18s_ease-in-out_infinite]"
          style={{ background: 'radial-gradient(circle at 50% 50%, rgba(56,189,248,0.18), transparent 60%)' }}
        />
        {/* dotted grid with radial fade */}
        <div className="absolute inset-0 bg-grid-dots text-fg-muted opacity-[0.18]" />
      </div>

      <div className="relative w-full max-w-6xl mx-auto px-6 md:px-8">
        <div className="max-w-[46rem] mx-auto text-center flex flex-col items-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 backdrop-blur px-4 py-1.5 text-overline text-fg-muted mb-6">
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
            className="bg-brand-600 text-on-accent hover:bg-brand-700 active:scale-[0.98] transition-all duration-150 rounded-full px-6 py-3 text-body font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-bg w-full max-w-xs md:w-auto shadow-lg shadow-accent/20"
          >
            {siteContent.hero.ctaLabel}
          </a>

          <div className="mt-14 md:mt-16 w-full">
            <HeroGraphic />
          </div>
        </div>
      </div>
    </section>
  );
};
