import React from 'react';
import { siteContent } from '../content/site';

export const SiteHeader: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-bg/80 backdrop-blur border-b border-border h-16 flex items-center">
      <nav aria-label="Primary" className="w-full max-w-6xl mx-auto px-6 md:px-8 flex items-center justify-between">
        <a 
          href="#main" 
          aria-label="sarey — home"
          className="font-mono font-semibold text-xl tracking-tight text-fg hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-sm"
        >
          sarey<span className="text-accent">.</span>
        </a>
        
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-6">
            {siteContent.footer.links.map((link) => (
              <a 
                key={link.href}
                href={link.href}
                className="text-small text-fg-muted hover:text-fg transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-sm"
              >
                {link.label}
              </a>
            ))}
          </div>
          
          <a
            href={`mailto:${siteContent.brand.contactEmail}`}
            className="bg-brand-600 text-on-accent hover:bg-brand-700 active:scale-[0.98] transition-all duration-150 rounded-full px-5 py-2 text-small focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-bg whitespace-nowrap"
          >
            {siteContent.hero.ctaLabel}
          </a>
        </div>
      </nav>
    </header>
  );
};
