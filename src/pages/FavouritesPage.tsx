import React from 'react';
import useFavourites from '../hooks/useFavourites';
import ImageList from '../components/ImageList/ImageList';

const FavouritesPage: React.FC = () => {
  const { favourites } = useFavourites();

  return (
    <div>
      <h1>My Favourites</h1>
      <ImageList images={favourites} />
    </div>
  );
};

export default FavouritesPage;
