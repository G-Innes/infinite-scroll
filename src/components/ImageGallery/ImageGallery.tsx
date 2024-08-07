import React, { useState } from 'react';
import useFetchImages from '../../hooks/useFetchImages';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import ImageList from '../ImageList/ImageList';
import Loader from '../Loader/Loader';
import Error from '../Error/Error';
import styles from './ImageGallery.module.css';

const ImageGallery: React.FC = () => {
  const [page, setPage] = useState(1);
  const { images, loading, error } = useFetchImages(page);

  useInfiniteScroll(() => setPage((prevPage) => prevPage + 1));

  return (
    <div className={styles.imageGallery}>
      <ImageList images={images} />
      {loading && <Loader />}
      {error && <Error message={error} />}
    </div>
  );
};

export default ImageGallery;
