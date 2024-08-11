import React, { useState } from 'react';
import { FlickrPhoto } from '../../types/flickr';
import styles from './ImageItem.module.css';
import { useFavourites } from '../../context/FavouritesContext';
import FavouriteIcon from '../../assets/favorite.png';

interface ImageItemProps {
  image: FlickrPhoto;
}

const ImageItem: React.FC<ImageItemProps> = ({ image }) => {
  const { favourites, addFavourite, removeFavourite } = useFavourites();
  // Check if the image is in the favourites list
  const isFavourite = favourites.some((fav) => fav.id === image.id);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const toggleFavourite = (): void => {
    if (isFavourite) {
      removeFavourite(image.id);
    } else {
      addFavourite(image.id);
    }
  };

  const handleImageLoad = (): void => {
    setIsLoaded(true);
  };

  return (
    <div className={`${styles.card} ${isLoaded ? styles.loaded : ''}`}>
      <div className={styles.imageContainer}>
        <img
          src={image.src}
          alt={image.title}
          onLoad={handleImageLoad}
          className={styles.image}
        />
      </div>
      <div className={styles.cardContent}>
        <h3 className={styles.imageTitle}>{image.title}</h3>
        <button className={styles.favouriteButton} onClick={toggleFavourite}>
          <img
            src={FavouriteIcon}
            alt="Favourite icon"
            className={`${styles.favouriteIcon} ${isFavourite ? styles.filled : ''}`}
          />
        </button>
      </div>
    </div>
  );
};

export default ImageItem;
