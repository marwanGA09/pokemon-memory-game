export function ResultDisplay({
  score,
  highScore,
  onGameEnd,
  onScore,
  onGameLevel,
  highScoreFlag,
}) {
  // check whether eslint is working
  function add() {}
  function adb() {}
  const c = 4;
  return (
    <div className="result-display">
      <p>Game over 😢</p> <p> Scored {score} 👏 </p>
      {highScoreFlag ? (
        <p>
          Congratulation 🎉🎊 <br /> You scored High
        </p>
      ) : (
        <p> High score {highScore}</p>
      )}{' '}
      <div>
        <button
          onClick={() => {
            onScore(0);
            onGameEnd(false);
          }}
        >
          Restart
        </button>
        <button
          className="back"
          onClick={() => {
            onScore(0);
            onGameEnd(false);
            onGameLevel(null);
          }}
        >
          Back
        </button>{' '}
      </div>
    </div>
  );
}
