import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SiteHeader } from './SiteHeader';

describe('SiteHeader theme toggle', () => {
  beforeEach(() => {
    document.documentElement.classList.remove('dark');
    localStorage.clear();
  });

  it('labels the toggle for the target theme and starts in light', () => {
    render(<SiteHeader />);
    expect(screen.getByRole('button', { name: /switch to dark theme/i })).toBeDefined();
  });

  it('toggles the html class and persists the choice to localStorage', () => {
    render(<SiteHeader />);
    const toggle = screen.getByRole('button', { name: /switch to dark theme/i });

    fireEvent.click(toggle);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(localStorage.getItem('theme')).toBe('dark');
    expect(screen.getByRole('button', { name: /switch to light theme/i })).toBeDefined();

    fireEvent.click(screen.getByRole('button', { name: /switch to light theme/i }));
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(localStorage.getItem('theme')).toBe('light');
  });
});
