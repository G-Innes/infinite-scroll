import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { FlickrPhoto } from '../types/flickr';
import { fetchImageById } from '../utils/flickrApi';

interface FavouritesContextType {
  favourites: FlickrPhoto[];
  addFavourite: (id: string) => Promise<void>;
  removeFavourite: (id: string) => void;
}

const FavouritesContext = createContext<FavouritesContextType | undefined>(
  undefined,
);

export const FavouritesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [favourites, setFavourites] = useState<FlickrPhoto[]>([]);

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

  return (
    <FavouritesContext.Provider
      value={{ favourites, addFavourite, removeFavourite }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};

export const useFavourites = () => {
  const context = useContext(FavouritesContext);
  if (!context) {
    throw new Error('useFavourites must be used within a FavouritesProvider');
  }
  return context;
};
