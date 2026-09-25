import React from 'react';
import { siteContent } from '../content/site';

export const SiteFooter: React.FC = () => {
  return (
    <footer className="border-t border-border pt-10 pb-6 bg-bg">
      <div className="w-full max-w-6xl mx-auto px-6 md:px-8 flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
        <a 
          href="#main" 
          aria-label="sarey — home"
          className="font-mono font-semibold text-xl tracking-tight text-fg hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-sm"
        >
          sarey<span className="text-accent">.</span>
        </a>
        
        <div className="flex flex-wrap justify-center gap-6">
          {siteContent.footer.links.map((link) => (
            <a 
              key={link.href}
              href={link.href}
              className="text-small text-fg-muted hover:text-fg transition-colors duration-150 p-2 -m-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-sm min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
      
      <div className="w-full max-w-6xl mx-auto px-6 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-border/50 pt-6">
        <div className="text-small text-fg-muted text-center md:text-left">
          {siteContent.footer.copyright}
        </div>
        <div className="text-small text-fg-muted text-center md:text-right">
          {siteContent.footer.credit}
        </div>
      </div>
    </footer>
  );
};
