import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { FlickrPhoto } from '../types/flickr';
import { FavouritesContextType } from '../types/favourites';
import { fetchImageById } from '../utils/flickrApi';

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
    const loadFavourites = async () => {
      const savedFavourites = JSON.parse(
        localStorage.getItem('favourites') || '[]',
      );
      if (savedFavourites.length > 0) {
        const fetchedImages = await Promise.all(
          savedFavourites.map((id: string) => fetchImageById(id)),
        );
        setFavourites(fetchedImages);
      }
    };
    loadFavourites();
  }, []);

  // Add a favourite image by ID
  const addFavourite = async (id: string) => {
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
  };

  // Remove a favourite image by ID
  const removeFavourite = (id: string) => {
    setFavourites((prevFavourites) => {
      const newFavourites = prevFavourites.filter((fav) => fav.id !== id);
      localStorage.setItem(
        'favourites',
        JSON.stringify(newFavourites.map((img) => img.id)),
      );
      return newFavourites;
    });
  };

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
