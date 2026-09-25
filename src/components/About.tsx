import React from 'react';
import { siteContent } from '../content/site';

export const About: React.FC = () => {
  return (
    <section id="about" aria-labelledby="about-heading" className="bg-surface py-16 md:py-24">
      <div className="w-full max-w-6xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-6 md:gap-12">
          <div className="col-span-1">
            <span className="text-overline text-fg-muted block mb-4">WHO WE ARE</span>
            <h2 id="about-heading" className="text-h2 text-fg">
              {siteContent.about.heading}
            </h2>
          </div>
          
          <div className="col-span-1 max-w-[65ch] space-y-4">
            {siteContent.about.body.map((paragraph, index) => (
              <p 
                key={index} 
                className={`text-body ${index === 0 ? 'text-fg font-medium' : 'text-fg-muted'}`}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
