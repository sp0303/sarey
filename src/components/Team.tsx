import React from 'react';
import { siteContent, TeamIcon } from '../content/site';

const icons: Record<TeamIcon, React.ReactElement> = {
  analyst: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M3 3v18h18" />
      <path d="M18 20V10" />
      <path d="M12 20V4" />
      <path d="M6 20v-6" />
    </svg>
  ),
  architect: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M3 21l9-18 9 18H3z" />
      <path d="M10 21v-4a2 2 0 114 0v4" />
      <path d="M12 7v.01" />
    </svg>
  ),
  designer: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M12 22a10 10 0 1110-10 1 1 0 01-1 1h-3a1 1 0 00-1 1v1a2 2 0 01-2 2h-3z" />
      <circle cx="7" cy="14" r="1" />
      <circle cx="7" cy="10" r="1" />
      <circle cx="11" cy="7" r="1" />
      <circle cx="15" cy="10" r="1" />
    </svg>
  ),
  developer: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  qa: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M12 2l3 3h4v4l3 3-3 3v4h-4l-3 3-3-3H6v-4L3 12l3-3V6h4L12 2z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
  security: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M12 8v4" />
      <path d="M12 16h.01" />
    </svg>
  ),
  curator: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M12 3l1.5 6.5L20 11l-6.5 1.5L12 19l-1.5-6.5L4 11l6.5-1.5z" />
      <path d="M18 19l1 3 3-1-3-1-1-3z" />
      <path d="M5 4l.5 2 2-.5-2-.5L5 2z" />
    </svg>
  ),
  devops: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M8 8a4 4 0 100 8c3 0 5-8 8-8a4 4 0 110 8c-3 0-5-8-8-8z" />
    </svg>
  ),
};

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
              className="bg-bg border border-border rounded-xl p-6 h-full transition-colors duration-150 hover:border-accent hover:shadow-card-hover dark:hover:shadow-none dark:hover:bg-surface/50 flex flex-col"
            >
              <div 
                className="w-12 h-12 rounded-lg mb-5 bg-accent/10 text-accent flex items-center justify-center" 
                aria-hidden="true"
              >
                {icons[role.icon]}
              </div>
              <h3 className="text-h3 text-fg">{role.name}</h3>
              <p className="text-small text-accent font-medium mb-3">{role.role}</p>
              <p className="text-body text-fg-muted mt-auto">{role.capability}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
