import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Faq } from './Faq';

describe('Faq accordion', () => {
  beforeEach(() => render(<Faq />));

  it('renders all questions collapsed by default', () => {
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
    buttons.forEach((b) => expect(b.getAttribute('aria-expanded')).toBe('false'));
  });

  it('expands and collapses an item on click, updating aria-expanded', () => {
    const first = screen.getAllByRole('button')[0];
    expect(first.getAttribute('aria-expanded')).toBe('false');

    fireEvent.click(first);
    expect(first.getAttribute('aria-expanded')).toBe('true');
    const regionId = first.getAttribute('aria-controls')!;
    expect(document.getElementById(regionId)?.hasAttribute('hidden')).toBe(false);

    fireEvent.click(first);
    expect(first.getAttribute('aria-expanded')).toBe('false');
    expect(document.getElementById(regionId)?.hasAttribute('hidden')).toBe(true);
  });

  it('is single-open: opening a second item closes the first', () => {
    const [first, second] = screen.getAllByRole('button');
    fireEvent.click(first);
    fireEvent.click(second);
    expect(first.getAttribute('aria-expanded')).toBe('false');
    expect(second.getAttribute('aria-expanded')).toBe('true');
  });
});
