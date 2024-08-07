import React from 'react';
import { FlickrPhoto } from '../../types/flickr';
import styles from './ImageItem.module.css';
import useFavourites from '../../hooks/useFavourites';
import FavouriteIcon from '../../assets/fav.svg';

interface ImageItemProps {
  image: FlickrPhoto;
}

const ImageItem: React.FC<ImageItemProps> = ({ image }) => {
  const { favourites, addFavourite, removeFavourite } = useFavourites();
  const isFavourite = favourites.some((fav) => fav.id === image.id);

  const toggleFavourite = () => {
    if (isFavourite) {
      removeFavourite(image.id);
    } else {
      addFavourite(image.id);
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={image.src} alt={image.title} loading="lazy" />
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
