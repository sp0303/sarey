import React from 'react';
import { siteContent, TeamIcon } from '../content/site';

// Clean, consistent Lucide icons (ISC licensed) — one per role.
const svg = (children: React.ReactNode): React.ReactElement => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    {children}
  </svg>
);

const icons: Record<TeamIcon, React.ReactElement> = {
  // clipboard-list
  analyst: svg(<>
    <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
    <path d="M12 11h4" /><path d="M12 16h4" /><path d="M8 11h.01" /><path d="M8 16h.01" />
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
  </>),
  // drafting-compass
  architect: svg(<>
    <circle cx="12" cy="5" r="2" />
    <path d="m3 21 8.02-14.26" /><path d="m12.99 6.74 1.93 3.44" />
    <path d="M19 12c-3.87 4-10.13 4-14 0" />
    <path d="m21 21-2.16-3.84" />
  </>),
  // pen-tool
  designer: svg(<>
    <path d="M15.707 21.293a1 1 0 0 1-1.414 0l-1.586-1.586a1 1 0 0 1 0-1.414l5.586-5.586a1 1 0 0 1 1.414 0l1.586 1.586a1 1 0 0 1 0 1.414z" />
    <path d="m18 13-1.375-6.874a1 1 0 0 0-.746-.776L3.235 2.028a1 1 0 0 0-1.207 1.207L5.35 15.879a1 1 0 0 0 .776.746L13 18" />
    <path d="m2.3 2.3 7.286 7.286" />
    <circle cx="11" cy="11" r="2" />
  </>),
  // code-xml
  developer: svg(<>
    <path d="m18 16 4-4-4-4" /><path d="m6 8-4 4 4 4" /><path d="m14.5 4-5 16" />
  </>),
  // badge-check
  qa: svg(<>
    <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
    <path d="m9 12 2 2 4-4" />
  </>),
  // shield-check
  security: svg(<>
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    <path d="m9 12 2 2 4-4" />
  </>),
  // sparkles
  curator: svg(<>
    <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .962 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.962 0z" />
    <path d="M20 3v4" /><path d="M22 5h-4" /><path d="M4 17v2" /><path d="M5 18H3" />
  </>),
  // infinity
  devops: svg(<>
    <path d="M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4Zm0 0c2 2.67 4 4 6 4a4 4 0 0 0 0-8c-2 0-4 1.33-6 4Z" />
  </>),
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
              <div className="relative w-16 h-16 mb-5">
                <img
                  src={role.avatar}
                  alt={`${role.name}, ${role.role}`}
                  width={64}
                  height={64}
                  loading="lazy"
                  className="w-16 h-16 rounded-full object-cover bg-accent/10 ring-1 ring-border"
                />
                <span
                  className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-accent text-white flex items-center justify-center ring-2 ring-bg [&>svg]:w-4 [&>svg]:h-4"
                  aria-hidden="true"
                >
                  {icons[role.icon]}
                </span>
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
