import React, { useState } from 'react';
import { siteContent } from '../content/site';
import { FaqItem } from './FaqItem';

export const Faq: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setOpenId((currentId) => (currentId === id ? null : id));
  };

  return (
    <section id="faq" aria-labelledby="faq-heading" className="bg-surface py-16 md:py-24">
      <div className="w-full max-w-3xl mx-auto px-6 md:px-8">
        <span className="text-overline text-fg-muted block mb-3">FAQ</span>
        <h2 id="faq-heading" className="text-h2 text-fg mb-10">
          {siteContent.faq.heading}
        </h2>
        
        <div className="border-t border-border">
          {siteContent.faq.entries.map((entry) => (
            <FaqItem
              key={entry.id}
              entry={entry}
              isOpen={openId === entry.id}
              onToggle={handleToggle}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
