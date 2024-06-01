import { useEffect, useState } from 'react';
const initialImage = [
  {
    id: 44,
    image:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/44.png',
  },
  {
    id: 45,
    image:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/45.png',
  },
  {
    id: 46,
    image:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/46.png',
  },
  {
    id: 47,
    image:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/47.png',
  },
  {
    id: 48,
    image:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/48.png',
  },
  {
    id: 49,
    image:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/49.png',
  },
  {
    id: 50,
    image:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/50.png',
  },
];
export default function App() {
  return (
    <>
      <h2>HEllo</h2> <ScoreBoard /> <GameBoard />
    </>
  );
}

function ScoreBoard() {
  return <h4>THis is ScoreBoard</h4>;
}

function GameBoard() {
  const [srcImage, setSrcImage] = useState(initialImage);
  useEffect(function () {
    async function fetchPoke() {
      const res = await fetch('https://pokeapi.co/api/v2/pokemon/213/');
      const data = await res.json();
      console.log(data.sprites);
      setSrcImage(data.sprites.front_default);
    }
    // fetchPoke();
  }, []);

  return (
    <>
      <h4>This is gameBoard</h4>
      {srcImage.map((img) => (
        <ImageComponent key={img.id} srcImg={img.image} />
      ))}
    </>
  );
}

function ImageComponent({ srcImg }) {
  console.log(srcImg);
  return <img src={srcImg} alt="" />;
}
