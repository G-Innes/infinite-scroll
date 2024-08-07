import { useState, useEffect } from 'react';
import { FlickrPhoto } from '../types/flickr';
import { fetchImageById } from '../utils/flickrApi';

const useFavourites = () => {
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

  return { favourites, addFavourite, removeFavourite };
};

export default useFavourites;
