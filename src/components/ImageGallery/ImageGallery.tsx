import React, { useState, useEffect, useCallback } from 'react';
import { fetchImages } from '../../utils/flickrApi';
import { FlickrPhoto } from '../../types/flickr';
import styles from './ImageGallery.module.css';

/**
 * A component that displays an infinite scrolling image gallery.
 * @returns {JSX.Element} The rendered ImageGallery component.
 */

const ImageGallery: React.FC = () => {
  const [images, setImages] = useState<FlickrPhoto[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadMoreImages = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const newImages = await fetchImages(page);
      setImages((prevImages) => {
        const allImages = [...prevImages, ...newImages];
        const uniqueImages = Array.from(
          new Set(allImages.map((img) => img.id)),
        ).map((id) => allImages.find((img) => img.id === id)!);
        return uniqueImages;
      });
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    loadMoreImages();
  }, [page, loadMoreImages]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight
      )
        return;
      setPage((prevPage) => prevPage + 1);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={styles.imageGallery}>
      {images.map((image) => (
        <img
          key={`${image.id}_${image.secret}`}
          src={image.src}
          alt={image.title}
          className={styles.image}
        />
      ))}
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default ImageGallery;
