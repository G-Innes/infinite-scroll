import React from 'react';
import ImageItem from '../ImageItem/ImageItem';
import { FlickrPhoto } from '../../types/flickr';
import styles from './ImageList.module.css';

interface ImageListProps {
  images: FlickrPhoto[];
}

const ImageList: React.FC<ImageListProps> = ({ images }) => {
  return (
    <div className={styles.imageList}>
      {images.map((image) => (
        <ImageItem key={image.id} image={image} />
      ))}
    </div>
  );
};

export default ImageList;
