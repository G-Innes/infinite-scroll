import { useEffect, useState, useCallback } from 'react';
import { FlickrPhoto } from '../types/flickr';
import { fetchImagesByPage } from '../utils/flickrApi';

// Helper function to remove duplicate images by ID
const removeDuplicateImages = (images: FlickrPhoto[]): FlickrPhoto[] => {
  const uniqueImages = Array.from(new Set(images.map((image) => image.id))).map(
    (id) => images.find((image) => image.id === id)!,
  );
  return uniqueImages;
};

// Type guard to check if an error is an instance of Error
const isError = (error: unknown): error is Error => error instanceof Error;

// Custom hook to fetch images from Flickr API
const useFetchImages = (page: number) => {
  const [images, setImages] = useState<FlickrPhoto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadMoreImages = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const newImages = await fetchImagesByPage(page);
      setImages((prevImages) =>
        removeDuplicateImages([...prevImages, ...newImages]),
      );
    } catch (err: unknown) {
      setError(isError(err) ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  }, [page]);

  // Effect to load images when page changes
  useEffect(() => {
    loadMoreImages();
  }, [page, loadMoreImages]);

  // Return state and function from the hook
  return { images, loading, error, loadMoreImages };
};

export default useFetchImages;
