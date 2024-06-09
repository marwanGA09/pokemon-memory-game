import { render } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { ScoreBoard } from './ScoreBoard';

describe('test scoreBoard', () => {
  test('snapshot test', () => {
    const { asFragment } = render(<ScoreBoard />);
    expect(asFragment()).toMatchSnapshot();
  });
});
