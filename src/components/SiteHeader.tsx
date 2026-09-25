import React, { useEffect, useState } from 'react';
import { siteContent } from '../content/site';

export const SiteHeader: React.FC = () => {
  const [isDark, setIsDark] = useState<boolean>(false);

  useEffect(() => {
    // Read initial state set by the inline script
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

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
        
        <div className="flex items-center gap-4 md:gap-6">
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
          
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
              className="flex items-center justify-center min-w-[44px] min-h-[44px] text-fg-muted hover:text-fg transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded-full"
            >
              {isDark ? (
                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5"></circle>
                  <line x1="12" y1="1" x2="12" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="23"></line>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                  <line x1="1" y1="12" x2="3" y2="12"></line>
                  <line x1="21" y1="12" x2="23" y2="12"></line>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
              ) : (
                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
              )}
            </button>
            <a
              href={`mailto:${siteContent.brand.contactEmail}`}
              className="bg-brand-600 text-on-accent hover:bg-brand-700 active:scale-[0.98] transition-all duration-150 rounded-full px-5 py-2 text-small focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-bg whitespace-nowrap"
            >
              {siteContent.hero.ctaLabel}
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
};
