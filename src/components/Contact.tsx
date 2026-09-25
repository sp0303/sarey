import React from 'react';
import { siteContent } from '../content/site';

export const Contact: React.FC = () => {
  return (
    <section aria-labelledby="contact-heading" className="bg-bg py-16 md:py-24 flex items-center justify-center">
      <div className="w-full max-w-6xl mx-auto px-6 md:px-8">
        <div className="max-w-2xl mx-auto text-center bg-surface border border-border rounded-2xl p-10 md:p-14">
          <h2 id="contact-heading" className="text-h2 text-fg mb-4">
            {siteContent.contact.heading}
          </h2>
          
          <p className="text-lead text-fg-muted mb-8">
            {siteContent.contact.body}
          </p>
          
          <div className="flex flex-col items-center gap-4">
            <a
              href={`mailto:${siteContent.brand.contactEmail}`}
              className="bg-brand-600 text-on-accent hover:bg-brand-700 active:scale-[0.98] transition-all duration-150 rounded-full px-6 py-3 text-body font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
            >
              {siteContent.contact.ctaLabel}
            </a>
            
            <a 
              href={`mailto:${siteContent.brand.contactEmail}`}
              className="text-body text-fg-muted hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-surface rounded-sm"
            >
              {siteContent.brand.contactEmail}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
