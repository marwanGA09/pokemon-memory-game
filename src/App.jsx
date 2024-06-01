import { useEffect, useRef, useState } from 'react';
import shuffle from '../randomize';
// MAX ID 1020

const initialImage = [
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
  const [selectedImage, setSelectedImage] = useState([]);
  const imageAddressID = useRef(44);
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
        console.log(data.sprites);
        // setSrcImage(data.sprites.front_default);
        setSrcImage((s) => [
          ...s.slice(1),
          { id: imageAddressID.current, image: data.sprites.front_default },
        ]);
      }
      if (selectedImage.length > 5) {
        fetchPoke();
        console.log('befor', imageAddressID.current);
        imageAddressID.current += 3;
        console.log('img aft', imageAddressID.current);
      }
    },
    [selectedImageLength]
  );

  function handleSelectedImage(id) {
    // console.log(id);
    setSelectedImage((s) => [...s, id]);
    setSrcImage((img) =>
      img.map((obj) => {
        // console.log('onj', obj.id, obj.id != id, { ...obj, selected: true });
        return obj.id != id ? obj : { ...obj, selected: true };
      })
    );
  }

  return (
    <>
      <h4>This is gameBoard</h4>
      {console.log(srcImage)}
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
