import React from 'react';
import { useFavourites } from '../context/FavouritesContext';
import ImageList from '../components/ImageList/ImageList';
import TextCard from '../components/TextCard/TextCard';

const FavouritesPage: React.FC = () => {
  const { favourites } = useFavourites();

  return (
    <div>
      <TextCard title="Favourites" />
      <ImageList images={favourites} />
    </div>
  );
};

export default FavouritesPage;
