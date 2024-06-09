import { render, screen } from '@testing-library/react';
import { describe, expect, test, vitest } from 'vitest';
import { GameLevel } from './GameLevel';

const onGameLevelMock = vitest.fn();

describe('GameLevel test', () => {
  test('presence of game level', () => {
    render(<GameLevel onGameLevelMock={onGameLevelMock} />);
    const gameLevelHtml = screen.getByTestId('game-level');
    expect(gameLevelHtml).toBeInTheDocument();
  });

  test('Take snapShot of game level', () => {
    render(<GameLevel onGameLevelMock={onGameLevelMock} />);
    const gameLevelHtml = screen.getByTestId('game-level');
    expect(gameLevelHtml).toMatchSnapshot();
  });

  test('have three level of game', () => {
    render(<GameLevel onGameLevelMock={onGameLevelMock} />);
    const gameLevelInput = screen.getAllByRole('radio');
    expect(gameLevelInput.length).toBe(3);
  });

  test('game Level has their own correct value', () => {
    render(<GameLevel onGameLevelMock={onGameLevelMock} />);
    const gameLevelInput = screen.getAllByRole('radio');
    expect(+gameLevelInput[0].value).toBe(4);
    expect(+gameLevelInput[1].value).toBe(8);
    expect(+gameLevelInput[2].value).toBe(12);
  });
});
