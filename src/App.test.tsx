import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App smoke test', () => {
  it('renders all section headings', () => {
    render(<App />);
    
    // Hero heading (h1)
    expect(screen.getByRole('heading', { level: 1, name: /A multi-vendor AI team/i })).toBeDefined();
    
    // Other section headings (h2)
    expect(screen.getByRole('heading', { level: 2, name: /We are the Agent Foundry/i })).toBeDefined();
    expect(screen.getByRole('heading', { level: 2, name: /How it works/i })).toBeDefined();
    expect(screen.getByRole('heading', { level: 2, name: /Team/i })).toBeDefined();
    expect(screen.getByRole('heading', { level: 2, name: /INTEGRATES WITH \/ DEPLOYED ON/i })).toBeDefined();
    expect(screen.getByRole('heading', { level: 2, name: /Frequently asked questions/i })).toBeDefined();
    expect(screen.getByRole('heading', { level: 2, name: /Let's build something/i })).toBeDefined();
  });
});
