import React from 'react';
import { siteContent } from '../content/site';

export const HowItWorks: React.FC = () => {
  return (
    <section id="how" aria-labelledby="how-heading" className="bg-bg py-16 md:py-24">
      <div className="w-full max-w-6xl mx-auto px-6 md:px-8">
        <h2 id="how-heading" className="text-h2 text-fg mb-10 md:mb-12 text-center md:text-left">
          {siteContent.howItWorks.heading}
        </h2>
        
        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {siteContent.howItWorks.steps.map((step) => (
            <li 
              key={step.step}
              className="bg-surface border border-border rounded-xl p-6 flex flex-col"
            >
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center font-mono font-semibold text-accent bg-accent/10 border border-accent/20 mb-4"
                aria-hidden="true"
              >
                {step.step.toString().padStart(2, '0')}
              </div>
              <h3 className="text-h3 text-fg mb-2">{step.name}</h3>
              <p className="text-body text-fg-muted">{step.blurb}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};
