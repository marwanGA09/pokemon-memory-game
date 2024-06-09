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
    screen.debug(gameLevelInput);
    expect(gameLevelInput.length).toBe(3);
  });
});
