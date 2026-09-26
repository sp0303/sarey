import React from 'react';
import { FaqEntry } from '../content/site';

interface FaqItemProps {
  entry: FaqEntry;
  isOpen: boolean;
  onToggle: (id: string) => void;
}

export const FaqItem: React.FC<FaqItemProps> = ({ entry, isOpen, onToggle }) => {
  return (
    <div className="border-b border-border last:border-b-0">
      <h3>
        <button
          type="button"
          id={`faq-btn-${entry.id}`}
          aria-expanded={isOpen}
          aria-controls={`faq-region-${entry.id}`}
          onClick={() => onToggle(entry.id)}
          className="w-full flex items-center justify-between py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-surface rounded-sm"
        >
          <span className="text-h3 text-fg pr-4">{entry.question}</span>
          <span
            aria-hidden="true"
            className="flex-shrink-0 text-accent transition-transform duration-200"
            style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </span>
        </button>
      </h3>
      <div
        id={`faq-region-${entry.id}`}
        role="region"
        aria-labelledby={`faq-btn-${entry.id}`}
        hidden={!isOpen}
        className={`pb-5 pt-1 px-2 ${isOpen ? 'bg-bg/50 rounded-b-md' : ''}`}
      >
        <p className="text-body text-fg-muted max-w-[65ch]">{entry.answer}</p>
      </div>
    </div>
  );
};
