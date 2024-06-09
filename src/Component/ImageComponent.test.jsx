import { render, screen } from '@testing-library/react';
import { describe, test, expect, vitest } from 'vitest';
import { ImageComponent } from './ImageComponent';
import userEvent from '@testing-library/user-event';

describe('Image component', () => {
  const imageObject = {
    id: 1,
    image:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    selected: false,
  };

  test('Presence of Pokemon image component in the document if isLoading is false', () => {
    render(<ImageComponent img={imageObject} isLoading={false} />);
    const imageElem = screen.getByAltText(/pokemon/i);
    console.log(imageElem.src);
    expect(imageElem).toMatchSnapshot();
    expect(imageElem.src).toBe(imageObject.image);
  });

  test('Presence of IsLoading component in the document if isLoading is true', () => {
    render(<ImageComponent img={imageObject} isLoading={true} />);
    const imageElem = screen.getByAltText(/spinner/i);
    expect(imageElem).toMatchSnapshot();
    expect(imageElem.src).not.toBe(imageObject.image);
  });

  test('calling OnselectImage with correct argument', async () => {
    const onSelectImage = vitest.fn();
    const userInteraction = userEvent.setup();
    render(
      <ImageComponent
        img={imageObject}
        isLoading={false}
        onSelectImage={onSelectImage}
      />
    );
    const imageElem = screen.getByAltText(/pokemon/i);
    await userInteraction.click(imageElem);
    expect(onSelectImage).toBeCalled();
    expect(onSelectImage).toBeCalledWith(imageObject.id);
    expect(onSelectImage).toBeCalledTimes(1);
  });
});
