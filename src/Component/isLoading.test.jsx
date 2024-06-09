import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { IsLoading } from './IsLoading';

describe('isLoading test', () => {
  test('found in the document', () => {
    render(<IsLoading />);
    const imageComponent = screen.getByRole('img');
    // screen.debug(imageComponent);
    expect(imageComponent).toBeInTheDocument();
  });

  test('Take snap shot', () => {
    render(<IsLoading />);
    expect(screen.getByRole('img')).toMatchSnapshot();
  });
});
