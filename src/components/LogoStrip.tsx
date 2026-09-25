import React from 'react';
import { siteContent } from '../content/site';

export const LogoStrip: React.FC = () => {
  return (
    <section aria-labelledby="integrations-heading" className="bg-bg py-16 md:py-24">
      <div className="w-full max-w-6xl mx-auto px-6 md:px-8 text-center">
        <h2 id="integrations-heading" className="text-overline text-fg-muted mb-10 md:mb-12">
          {siteContent.integrations.heading}
        </h2>
        
        <div className="flex flex-col md:flex-row flex-wrap items-center justify-center gap-8 md:gap-10">
          {siteContent.integrations.items.map((item, index) => (
            <a 
              key={index}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-lg p-2"
            >
              <img 
                src={item.logoSrc} 
                alt={item.alt}
                width={160}
                height={32}
                loading="lazy"
                className="h-8 w-auto object-contain opacity-70 grayscale transition-all duration-150 group-hover:opacity-100 group-hover:grayscale-0 group-focus-visible:opacity-100 group-focus-visible:grayscale-0"
              />
              <span className="text-small text-fg-muted capitalize">
                {item.role}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
