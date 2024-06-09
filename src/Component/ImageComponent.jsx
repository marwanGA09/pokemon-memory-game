import { IsLoading } from './IsLoading';
import PropTypes from 'prop-types';

function ImageComponent({ img, isLoading, onSelectImage }) {
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

ImageComponent.propTypes = {
  img: PropTypes.object,
  isLoading: PropTypes.bool,
  onSelectImage: PropTypes.func,
};

export { ImageComponent };
