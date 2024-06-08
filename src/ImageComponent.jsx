import { IsLoading } from './IsLoading';

export function ImageComponent({ img, onSelectImage, isLoading }) {
  // console.log(srcImg);
  return (
    <>
      {isLoading ? (
        <IsLoading />
      ) : (
        <img
          src={img.image}
          alt="pokemon card"
          onClick={() => onSelectImage(img.id)}
        />
      )}
    </>
  );
}
