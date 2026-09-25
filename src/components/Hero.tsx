import React from 'react';
import { siteContent } from '../content/site';

export const Hero: React.FC = () => {
  return (
    <section className="bg-bg py-14 pt-14 pb-16 md:pt-20 md:pb-24 flex items-center justify-center">
      <div className="w-full max-w-6xl mx-auto px-6 md:px-8">
        <div className="max-w-[46rem] mx-auto text-center flex flex-col items-center">
          <span className="text-overline text-fg-muted mb-4 block">AI-AGENT BUILD SHOP</span>
          
          <h1 className="text-display text-fg mb-6">
            {siteContent.hero.valueProp}
          </h1>
          
          <p className="text-lead text-fg-muted mb-10 max-w-[65ch]">
            {siteContent.about.body[0]}
          </p>
          
          <a
            href={`mailto:${siteContent.brand.contactEmail}`}
            className="bg-brand-600 text-on-accent hover:bg-brand-700 active:scale-[0.98] transition-all duration-150 rounded-full px-6 py-3 text-body font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-bg w-full max-w-xs md:w-auto"
          >
            {siteContent.hero.ctaLabel}
          </a>
        </div>
      </div>
    </section>
  );
};
