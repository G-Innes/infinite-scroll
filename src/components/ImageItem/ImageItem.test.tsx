import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ImageItem from './ImageItem';
import { useFavourites } from '../../context/FavouritesContext';
import { FlickrPhoto } from '../../types/flickr';

type Mock = ReturnType<typeof vi.fn>;

vi.mock('../../context/FavouritesContext', () => ({
  useFavourites: vi.fn(),
}));

describe('ImageItem', () => {
  const mockImage: FlickrPhoto = {
    id: '1',
    title: 'Sample Image',
    src: 'http://example.com/image.jpg',
    server: 'server',
    secret: 'secret',
  };

  it('should render image and title', () => {
    (useFavourites as Mock).mockReturnValue({
      favourites: [],
      addFavourite: vi.fn(),
      removeFavourite: vi.fn(),
    });

    render(<ImageItem image={mockImage} />);

    expect(screen.getByAltText('Sample Image')).toHaveAttribute(
      'src',
      'http://example.com/image.jpg',
    );
    expect(screen.getByText('Sample Image')).toBeInTheDocument();
  });

  it('should call addFavourite when the image is not a favourite and button is clicked', () => {
    const addFavourite = vi.fn();
    (useFavourites as Mock).mockReturnValue({
      favourites: [],
      addFavourite,
      removeFavourite: vi.fn(),
    });

    render(<ImageItem image={mockImage} />);

    fireEvent.click(screen.getByRole('button'));

    expect(addFavourite).toHaveBeenCalledWith('1');
  });

  it('should call removeFavourite when the image is a favourite and button is clicked', () => {
    const removeFavourite = vi.fn();
    (useFavourites as Mock).mockReturnValue({
      favourites: [mockImage],
      addFavourite: vi.fn(),
      removeFavourite,
    });

    render(<ImageItem image={mockImage} />);

    fireEvent.click(screen.getByRole('button'));

    expect(removeFavourite).toHaveBeenCalledWith('1');
  });
});
