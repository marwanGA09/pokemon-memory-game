export function ScoreBoard({ score, highScore }) {
  return (
    <div className="score-board">
      <h3>Memory Game</h3>
      <p>
        Score: <span>{score}</span>
      </p>
      <p>
        High Score: <span className="high-score">{highScore}</span>
      </p>
    </div>
  );
}
