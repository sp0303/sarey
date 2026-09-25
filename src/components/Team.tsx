import React from 'react';
import { siteContent } from '../content/site';

export const Team: React.FC = () => {
  return (
    <section id="team" aria-labelledby="team-heading" className="bg-surface py-16 md:py-24">
      <div className="w-full max-w-6xl mx-auto px-6 md:px-8">
        <h2 id="team-heading" className="text-h2 text-fg mb-10 md:mb-12 text-center md:text-left">
          {siteContent.team.heading}
        </h2>
        
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {siteContent.team.roles.map((role, index) => (
            <li 
              key={index}
              className="bg-bg border border-border rounded-xl p-5 h-full transition-colors duration-150 hover:border-accent hover:shadow-card-hover dark:hover:shadow-none dark:hover:bg-surface/50"
            >
              <div className="w-8 h-8 rounded mb-4 bg-accent/10 text-accent flex items-center justify-center font-mono text-xs font-semibold" aria-hidden="true">
                {role.role.charAt(0)}
              </div>
              <h3 className="text-h3 text-fg mb-1">{role.role}</h3>
              <p className="text-body text-fg-muted text-sm">{role.capability}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
