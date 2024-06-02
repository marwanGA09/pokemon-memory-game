import { useEffect, useRef, useState } from 'react';
import shuffle from '../randomize';
// MAX ID 1020

export default function App() {
  const [gameLevel, setGameLevel] = useState(null);
  return (
    <>
      <ScoreBoard />{' '}
      {gameLevel ? (
        <GameBoard gameLevel={gameLevel} />
      ) : (
        <GameLevel onGameLevel={setGameLevel} />
      )}
    </>
  );
}

function GameLevel({ onGameLevel }) {
  return (
    <>
      <label htmlFor="gameLevel">Game Level</label>
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
    </>
  );
}

function ScoreBoard() {
  return <h4>THis is ScoreBoard</h4>;
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
function GameBoard({ gameLevel }) {
  console.log('game level', gameLevel);
  // console.log('before', initialImage);
  const initialImage =
    gameLevel == 4
      ? defaultImage.slice(8)
      : gameLevel == 8
      ? defaultImage.slice(4)
      : defaultImage.slice();
  console.log('after', initialImage);
  const [highScore, setHighScore] = useState(0);
  const [srcImage, setSrcImage] = useState(initialImage);
  const [selectedImage, setSelectedImage] = useState([]);
  const [score, setScore] = useState(0);

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
      if (selectedImageLength > gameLevel / 2) {
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
          // console.log('onj', obj.id, obj.id != id, { ...obj, selected: true });
          return obj.id != id ? obj : { ...obj, selected: true };
        })
      );
      setScore((score) => score + 1);
    } else {
      alert(`Game over!!! \n scored ${score}`);
      setHighScore((previous) => (score > previous ? score : previous));
      setScore(0);
      setSrcImage(initialImage);
      setSelectedImage([]);
    }
  }

  return (
    <>
      <h4>This is gameBoard</h4>
      <p>Score: {score}</p>
      <p>High Score: {highScore}</p>
      {console.log('srcImage', srcImage)}

      {shuffle(srcImage).map((img) => (
        <ImageComponent
          key={img.id}
          img={img}
          onSelectImage={handleSelectedImage}
        />
      ))}
    </>
  );
}

function ImageComponent({ img, onSelectImage }) {
  // console.log(srcImg);
  return (
    <>
      {img.selected ? <span> 👍 </span> : <span> 👎</span>}
      <img src={img.image} alt="" onClick={() => onSelectImage(img.id)} />
    </>
  );
}
