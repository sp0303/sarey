import React from 'react';
import { siteContent } from '../content/site';

export const Team: React.FC = () => {
  return (
    <section id="team" aria-labelledby="team-heading" className="bg-surface py-16 md:py-24">
      <div className="w-full max-w-6xl mx-auto px-6 md:px-8">
        <span className="text-overline text-fg-muted block mb-3">THE TEAM</span>
        <h2 id="team-heading" className="text-h2 text-fg mb-10 md:mb-12">
          {siteContent.team.heading}
        </h2>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {siteContent.team.roles.map((role, index) => (
            <li
              key={index}
              className="bg-bg border border-border rounded-xl p-6 h-full transition-all duration-150 hover:-translate-y-1 hover:border-accent hover:shadow-card-hover dark:hover:shadow-none dark:hover:bg-surface/50 flex flex-col"
            >
              <img
                src={role.avatar}
                alt={`${role.name}, ${role.role}`}
                width={72}
                height={72}
                loading="lazy"
                className="w-[72px] h-[72px] rounded-full ring-2 ring-border mb-5"
              />
              <h3 className="text-h3 text-fg">{role.name}</h3>
              <p className="text-small text-accent font-medium mb-3">{role.role}</p>
              <p className="text-body text-fg-muted">{role.capability}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
