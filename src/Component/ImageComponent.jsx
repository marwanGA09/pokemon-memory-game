import { IsLoading } from './IsLoading';

export function ImageComponent({ img, isLoading, onSelectImage }) {
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
