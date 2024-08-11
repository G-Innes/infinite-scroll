import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { FlickrPhoto } from '../types/flickr';
import { isError } from '../types/error';
import { FavouritesContextType } from '../types/favourites';
import { fetchImageById } from '../utils/flickrApi';
import { useCallback } from 'react';

const LOCAL_STORAGE_KEY = 'favourites';

// Create context for favourites with initial value of undefined
const FavouritesContext = createContext<FavouritesContextType | undefined>(
  undefined,
);

// FavouritesProvider component to wrap the app with
export const FavouritesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [favourites, setFavourites] = useState<FlickrPhoto[]>([]);

  // Load favourites from local storage on mount
  useEffect(() => {
    const loadFavourites = async (): Promise<void> => {
      try {
        const savedFavourites: string[] = JSON.parse(
          localStorage.getItem(LOCAL_STORAGE_KEY) || '[]',
        );
        if (savedFavourites.length > 0) {
          const fetchedImages = await Promise.all(
            savedFavourites.map((id: string) => fetchImageById(id)),
          );
          setFavourites(fetchedImages);
        }
      } catch (error: unknown) {
        console.error(
          'Error loading favourites from local storage',
          isError(error) ? error.message : 'An unknown error occurred',
        );
      }
    };
    loadFavourites();
  }, []);

  // Add a favourite image by ID
  const addFavourite = useCallback(async (id: string) => {
    try {
      const image = await fetchImageById(id);
      setFavourites((prevFavourites) => {
        if (prevFavourites.some((fav) => fav.id === id)) {
          return prevFavourites;
        }
        const newFavourites = [...prevFavourites, image];
        localStorage.setItem(
          'favourites',
          JSON.stringify(newFavourites.map((img) => img.id)),
        );
        return newFavourites;
      });
    } catch (error: unknown) {
      console.error(
        'Error loading favourites from local storage',
        isError(error) ? error.message : 'An unknown error occurred',
      );
    }
  }, []);

  // Remove a favourite image by ID
  const removeFavourite = useCallback((id: string) => {
    try {
      setFavourites((prevFavourites) => {
        const newFavourites = prevFavourites.filter((fav) => fav.id !== id);
        localStorage.setItem(
          'favourites',
          JSON.stringify(newFavourites.map((img) => img.id)),
        );
        return newFavourites;
      });
    } catch (error: unknown) {
      console.error(
        'Error loading favourites from local storage',
        isError(error) ? error.message : 'An unknown error occurred',
      );
    }
  }, []);

  // Provide the context value to the app
  return (
    <FavouritesContext.Provider
      value={{ favourites, addFavourite, removeFavourite }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};

// Custom hook to use the favourites context
export const useFavourites = () => {
  const context = useContext(FavouritesContext);
  if (!context) {
    throw new Error('useFavourites must be used within a FavouritesProvider');
  }
  return context;
};
