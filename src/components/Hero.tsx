import React from 'react';
import { siteContent } from '../content/site';
import { HeroArt } from './HeroArt';

export const Hero: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-bg py-20 md:py-32 flex items-center min-h-[85vh]">
      {/* ---- comic / cinematic background (decorative) ---- */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        {/* Layer A - ambient glow */}
        <div
          className="absolute -top-24 left-1/2 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full blur-3xl motion-safe:animate-[aurora-drift_18s_ease-in-out_infinite]"
          style={{ background: 'radial-gradient(circle at 50% 50%, rgba(220,38,38,0.40), transparent 62%)' }}
        />
        <div
          className="absolute top-16 -left-24 h-[28rem] w-[28rem] rounded-full blur-3xl motion-safe:animate-[aurora-drift_24s_ease-in-out_infinite_reverse]"
          style={{ background: 'radial-gradient(circle at 50% 50%, rgba(234,88,12,0.32), transparent 60%)' }}
        />

        {/* Layer A - Background motif with radial fade */}
        <div 
          className="absolute inset-0 opacity-[0.16] dark:opacity-[0.24] md:scale-110 lg:opacity-10 lg:dark:opacity-10"
          style={{
            WebkitMaskImage: 'radial-gradient(circle at 50% 50%, transparent 20%, #000 60%)',
            maskImage: 'radial-gradient(circle at 50% 50%, transparent 20%, #000 60%)',
          }}
        >
          <HeroArt />
        </div>
      </div>

      <div className="relative w-full max-w-6xl mx-auto px-6 md:px-8">
        <div className="grid lg:grid-cols-[1.05fr_.95fr] lg:gap-12 items-center text-center lg:text-left">
          {/* Left Col (Text) */}
          <div className="flex flex-col items-center lg:items-start max-w-[34rem] mx-auto lg:mx-0">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 backdrop-blur px-4 py-1.5 text-overline text-fg-muted mb-8">
              <span className="h-1.5 w-1.5 rounded-full bg-accent motion-safe:animate-[crest-pulse_3.5s_ease-in-out_infinite]" />
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
          
          {/* Right Col (Layer B foreground panel) */}
          <div className="hidden lg:block relative aspect-square w-full max-w-[460px] mx-auto rounded-2xl border-[3px] border-fg/80 overflow-hidden shadow-xl bg-[radial-gradient(circle_at_50%_40%,rgb(var(--color-accent)/0.14),transparent_70%)] bg-surface">
            <HeroArt />
          </div>
        </div>
      </div>
    </section>
  );
};
