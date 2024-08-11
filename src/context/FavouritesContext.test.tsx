import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { FavouritesProvider, useFavourites } from './FavouritesContext';
import { FlickrPhoto } from '../types/flickr';
import { fetchImageById } from '../utils/flickrApi';
import { useEffect } from 'react';

type Mock = ReturnType<typeof vi.fn>;

vi.mock('../utils/flickrApi', () => ({
  fetchImageById: vi.fn(),
}));

describe('FavouritesProvider', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should initialize favourites from local storage', async () => {
    const mockImage: FlickrPhoto = {
      id: '1',
      title: 'Test Image',
      src: 'http://example.com/test.jpg',
      server: 'server1',
      secret: 'secret1',
    };

    localStorage.setItem('favourites', JSON.stringify(['1']));
    (fetchImageById as Mock).mockResolvedValueOnce(mockImage);

    const TestComponent = () => {
      const { favourites } = useFavourites();
      return <div>{favourites.length}</div>;
    };

    render(
      <FavouritesProvider>
        <TestComponent />
      </FavouritesProvider>,
    );

    expect(await screen.findByText('1')).toBeInTheDocument();
  });

  it('should add a favourite', async () => {
    const mockImage: FlickrPhoto = {
      id: '2',
      title: 'New Image',
      src: 'http://example.com/new.jpg',
      server: 'server2',
      secret: 'secret2',
    };

    (fetchImageById as Mock).mockResolvedValueOnce(mockImage);

    const TestComponent = () => {
      const { addFavourite, favourites } = useFavourites();

      useEffect(() => {
        const add = async () => {
          await addFavourite('2');
        };
        add();
      }, [addFavourite]);

      return <div>{favourites.length}</div>;
    };

    render(
      <FavouritesProvider>
        <TestComponent />
      </FavouritesProvider>,
    );

    expect(await screen.findByText('1')).toBeInTheDocument();
  });

  it('should remove a favourite', async () => {
    const mockImage: FlickrPhoto = {
      id: '3',
      title: 'Remove Image',
      src: 'http://example.com/remove.jpg',
      server: 'server3',
      secret: 'secret3',
    };

    localStorage.setItem('favourites', JSON.stringify(['3']));
    (fetchImageById as Mock).mockResolvedValueOnce(mockImage);

    const TestComponent = () => {
      const { removeFavourite, favourites } = useFavourites();

      act(() => {
        removeFavourite('3');
      });

      return <div>{favourites.length}</div>;
    };

    render(
      <FavouritesProvider>
        <TestComponent />
      </FavouritesProvider>,
    );

    expect(await screen.findByText('0')).toBeInTheDocument();
  });
});
