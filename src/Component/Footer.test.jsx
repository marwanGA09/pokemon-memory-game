import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { Footer } from './Footer';

describe('Footer', () => {
  test('test Presence of footer', () => {
    render(<Footer />);
    const footerElement = screen.getByTestId('footer');
    expect(footerElement).toBeInTheDocument();
  });

  test('test snapshot of footer', () => {
    render(<Footer />);
    const footerElement = screen.getByTestId('footer');
    expect(footerElement).toMatchSnapshot();
  });
});
