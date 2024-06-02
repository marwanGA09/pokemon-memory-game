import { useEffect, useRef, useState } from 'react';
import shuffle from '../randomize';
// MAX ID 1020

function ResultDisplay({
  score,
  highScore,
  onGameEnd,
  onHighScore,
  onScore,
  onGameLevel,
}) {
  return (
    <div>
      <p>Game over!!!</p> <p>scored {score}</p> <p>High score {highScore}</p>
      <button
        onClick={() => {
          onScore(0);
          // onHighScore();
          onGameEnd(false);
        }}
      >
        restart
      </button>
      <button
        onClick={() => {
          onScore(0);
          // onHighScore();
          onGameEnd(false);
          onGameLevel(null);
        }}
      >
        Back
      </button>
    </div>
  );
}

export default function App() {
  const [gameLevel, setGameLevel] = useState(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameEnd, setGameEnd] = useState(false);
  function handleHighScore() {
    setHighScore((previous) => (score > previous ? score : previous));
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
          />
        </>
      ) : (
        <GameLevel onGameLevel={setGameLevel} />
      )}{' '}
      <Footer />
    </div>
  );
}

function GameLevel({ onGameLevel }) {
  return (
    <div className="main-page">
      <h2>Memory Game!</h2>
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

function ScoreBoard({ score, highScore }) {
  return (
    <div className="score-board">
      <h3>Memory Game</h3>
      <p>Score: {score}</p>
      <p>High Score: {highScore}</p>
    </div>
  );
}

let defaultImage = [
  {
    id: 1,
    image:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    selected: false,
  },
  {
    id: 4,
    image:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png',
    selected: false,
  },
  {
    id: 8,
    image:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/8.png',
    selected: false,
  },
  {
    id: 12,
    image:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/12.png',
    selected: false,
  },
  {
    id: 16,
    image:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/16.png',
    selected: false,
  },
  {
    id: 20,
    image:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/20.png',
    selected: false,
  },
  {
    id: 24,
    image:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/24.png',
    selected: false,
  },
  {
    id: 28,
    image:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/28.png',
    selected: false,
  },
  {
    id: 32,
    image:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/32.png',
    selected: false,
  },
  {
    id: 36,
    image:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/36.png',
    selected: false,
  },
  {
    id: 40,
    image:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/40.png',
    selected: false,
  },
  {
    id: 44,
    image:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/44.png',
    selected: false,
  },
];
function GameBoard({ gameLevel, score, onScore, onGameEnd, onHighScore }) {
  console.log('game level', gameLevel);
  // console.log('before', initialImage);
  const initialImage =
    gameLevel == 4
      ? defaultImage.slice(8)
      : gameLevel == 8
      ? defaultImage.slice(4)
      : defaultImage.slice();
  console.log('after', initialImage);

  const [srcImage, setSrcImage] = useState(initialImage);
  const [selectedImage, setSelectedImage] = useState([]);
  const imageAddressID = useRef(48);
  const selectedImageLength = selectedImage.length;

  // let needFetch
  useEffect(
    function () {
      console.log('useEffected is run');
      async function fetchPoke() {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${imageAddressID.current}/`
        );
        const data = await res.json();
        // console.log(data.sprites);
        // setSrcImage(data.sprites.front_default);
        setSrcImage((s) => [
          ...s
            .slice()
            .sort((a, b) => {
              return b.selected - a.selected;
            })
            .slice(1),
          {
            id: imageAddressID.current,
            image: data.sprites.front_default,
            selected: false,
          },
        ]);
      }
      console.log(selectedImageLength);
      if (selectedImageLength > gameLevel - 1) {
        fetchPoke();
        // console.log('befor', imageAddressID.current);
        imageAddressID.current += 3;
        // console.log('img aft', imageAddressID.current);
      }
    },
    [selectedImageLength, gameLevel]
  );

  function handleSelectedImage(id) {
    if (!selectedImage.includes(id)) {
      setSelectedImage((s) => [...s, id]);
      setSrcImage((img) =>
        img.map((obj) => {
          return obj.id != id ? obj : { ...obj, selected: true };
        })
      );
      onScore((score) => score + 1);
    } else {
      // alert(`Game over!!! \n scored ${score}`);
      onHighScore();
      setSrcImage(initialImage);
      setSelectedImage([]);
      onGameEnd(true);
    }
  }

  return (
    <div
      className="game-boards"
      // style={{
      //   gridTemplateColumns: `repeat(${
      //     gameLevel == 4 ? 1 : gameLevel == 8 ? 2 : 3
      //   }, min-content)`,
      // }}
    >
      {shuffle(srcImage).map((img) => (
        <ImageComponent
          key={img.id}
          img={img}
          onSelectImage={handleSelectedImage}
        />
      ))}
    </div>
  );
}

function ImageComponent({ img, onSelectImage }) {
  // console.log(srcImg);
  return (
    <>
      {/* {img.selected ? <span> 👍 </span> : <span> 👎</span>} */}
      <img src={img.image} alt="" onClick={() => onSelectImage(img.id)} />
    </>
  );
}

function Footer() {
  return (
    <div className="footer">
      <p>By Adem KG</p>
      <div className="links">
        <a href="#">G</a>
        <a href="#">L</a>
        <a href="#">T</a>
      </div>
    </div>
  );
}
