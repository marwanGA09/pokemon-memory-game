import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import shuffle from '../../randomize';
import { ImageComponent } from './ImageComponent';
import { defaultImage } from '../defaultImage';

function GameBoard({ gameLevel, onScore, onGameEnd, onHighScore }) {
  const initialImage =
    gameLevel == 4
      ? defaultImage.slice(8)
      : gameLevel == 8
      ? defaultImage.slice(4)
      : defaultImage.slice();

  const [srcImage, setSrcImage] = useState(initialImage);
  const [selectedImage, setSelectedImage] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const imageAddressID = useRef(48);
  const selectedImageLength = selectedImage.length;

  // let needFetch
  useEffect(
    function () {
      // console.log('useEffected is run');
      async function fetchPoke() {
        setIsLoading(true);
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
        setIsLoading(false);
      }
      // console.log(selectedImageLength);
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
      style={{
        gridTemplateColumns: `repeat(${
          gameLevel == 4 ? 1 : gameLevel == 8 ? 2 : 3
        }, min-content)`,
      }}
    >
      {shuffle(srcImage).map((img) => (
        <ImageComponent
          key={img.id}
          img={img}
          onSelectImage={handleSelectedImage}
          isLoading={isLoading}
        />
      ))}
    </div>
  );
}
GameBoard.propTypes = {
  gameLevel: PropTypes.number,
  onScore: PropTypes.func,
  onGameEnd: PropTypes.func,
  onHighScore: PropTypes.func,
};

export { GameBoard };
