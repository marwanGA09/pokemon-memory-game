import PropTypes from 'prop-types';

function ResultDisplay({
  score,
  highScore,
  onGameEnd,
  onScore,
  onGameLevel,
  highScoreFlag,
}) {
  return (
    <div className="result-display">
      <p>Game over 😢</p> <p> Scored {score} 👏 </p>
      {highScoreFlag ? (
        <p>
          Congratulation 🎉🎊 <br /> You scored High
        </p>
      ) : (
        <p> High score {highScore}</p>
      )}
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
        </button>
      </div>
    </div>
  );
}

ResultDisplay.propTypes = {
  score: PropTypes.number,
  highScore: PropTypes.number,
  onGameEnd: PropTypes.func,
  onScore: PropTypes.func,
  onGameLevel: PropTypes.func,
  highScoreFlag: PropTypes.bool,
};

export { ResultDisplay };
