import React, { useState, useCallback } from 'react';
import useFetchImages from '../../hooks/useFetchImages';
import useInfiniteScroll from '../../hooks/useInfiniteScroll';
import ImageList from '../ImageList/ImageList';
import Loader from '../Loader/Loader';
import Error from '../Error/Error';
import styles from './ImageGallery.module.css';

const ImageGallery: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const { images, loading, error } = useFetchImages(page);

  const loadMoreImages = useCallback(() => {
    setPage((prevPage) => prevPage + 1);
  }, []);

  useInfiniteScroll(loadMoreImages);

  return (
    <div className={styles.imageGallery}>
      <ImageList images={images} />
      {loading && <Loader />}
      {error && <Error error={error} />}
    </div>
  );
};

export default ImageGallery;
