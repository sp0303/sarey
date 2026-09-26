import React from 'react';
import { siteContent } from '../content/site';

export const LogoStrip: React.FC = () => {
  return (
    <section aria-labelledby="integrations-heading" className="bg-bg py-16 md:py-24">
      <div className="w-full max-w-6xl mx-auto px-6 md:px-8 text-center">
        <h2 id="integrations-heading" className="text-overline text-fg-muted mb-10 md:mb-12">
          {siteContent.integrations.heading}
        </h2>

        <div className="flex flex-col md:flex-row flex-wrap items-stretch justify-center gap-6 md:gap-8">
          {siteContent.integrations.items.map((item, index) => (
            <a
              key={index}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.alt}
              className="group flex flex-col items-center gap-4 rounded-2xl border border-border bg-surface px-8 py-8 min-w-[220px] transition-all duration-150 hover:-translate-y-1 hover:border-accent/60 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            >
              <img
                src={item.logoSrc}
                alt=""
                height={44}
                loading="lazy"
                className="h-11 w-auto max-w-[130px] object-contain"
              />
              <div className="flex flex-col items-center gap-1">
                <span className="text-base font-semibold text-fg">
                  {item.name}
                </span>
                <span className="text-small text-fg-muted">
                  {item.vendor} &middot; <span className="capitalize">{item.role}</span>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
