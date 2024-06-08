import { useState } from 'react';
import { Footer } from './Footer';
import { GameBoard } from './GameBoard';
import { ScoreBoard } from './ScoreBoard';
import { GameLevel } from './GameLevel';
import { ResultDisplay } from './ResultDisplay';
export default function App() {
  const [gameLevel, setGameLevel] = useState(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameEnd, setGameEnd] = useState(false);
  const [highScoreFlag, setHighScoreFlag] = useState(false);
  function handleHighScore() {
    setHighScore((previous) => {
      setHighScoreFlag(score > previous);
      return score > previous ? score : previous;
    });
  }
  return (
    <div className="app">
      {gameEnd ? (
        <ResultDisplay
          score={score}
          highScore={highScore}
          onGameEnd={setGameEnd}
          onScore={setScore}
          onHighScore={handleHighScore}
          onGameLevel={setGameLevel}
          highScoreFlag={highScoreFlag}
        />
      ) : gameLevel ? (
        <>
          <ScoreBoard score={score} highScore={highScore} />
          <GameBoard
            gameLevel={gameLevel}
            score={score}
            onScore={setScore}
            onGameEnd={setGameEnd}
            onHighScore={handleHighScore}
          />{' '}
        </>
      ) : (
        <GameLevel onGameLevel={setGameLevel} />
      )}{' '}
      <Footer />
    </div>
  );
}
