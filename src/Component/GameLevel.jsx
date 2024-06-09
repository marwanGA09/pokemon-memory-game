export function GameLevel({ onGameLevel }) {
  return (
    <div data-testid="game-level" className="main-page">
      <h2>Pokemon Memory Game</h2>
      <p className="description">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe beatae
        recusandae accusamus expedita fuga repellendus deserunt ad molestiae,
        soluta odit dolorum commodi dignissimos nesciunt quo tempore vitae
        ducimus, dolore corrupti.
      </p>
      <p>
        {' '}
        <strong className="play-now">Play Now </strong>
      </p>
      <div>
        <label htmlFor="easy">Easy</label>
        <input
          type="radio"
          value={4}
          name="gameLevel"
          id="easy"
          onChange={(e) => onGameLevel(e.target.value)}
        />
        <label htmlFor="medium">Medium</label>
        <input
          type="radio"
          value={8}
          name="gameLevel"
          id="medium"
          onChange={(e) => onGameLevel(e.target.value)}
        />
        <label htmlFor="hard">Hard</label>
        <input
          type="radio"
          value={12}
          name="gameLevel"
          id="hard"
          onChange={(e) => onGameLevel(e.target.value)}
        />
      </div>
    </div>
  );
}
