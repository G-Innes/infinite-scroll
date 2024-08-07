import { useEffect, useState, useCallback } from 'react';
import { FlickrPhoto } from '../types/flickr';
import { fetchImagesByPage } from '../utils/flickrApi';

const useFetchImages = (page: number) => {
  const [images, setImages] = useState<FlickrPhoto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadMoreImages = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const newImages = await fetchImagesByPage(page);
      setImages((prevImages) => {
        const allImages = [...prevImages, ...newImages];
        const uniqueImages = Array.from(
          new Set(allImages.map((image) => image.id)),
        ).map((id) => allImages.find((image) => image.id === id)!);
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

  return { images, loading, error, loadMoreImages };
};

export default useFetchImages;
