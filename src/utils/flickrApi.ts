import { FlickrPhoto, FlickrApiResponse } from '../types/flickr';

/**
 * Fetches recent images from Flickr API.
 * @param {number} page - The page number to fetch.
 * @returns {Promise<FlickrPhoto[]>} - A promise that resolves to an array of FlickrPhoto objects.
 * @throws {Error} - Throws an error if the fetch fails.
 */

export const fetchImages = async (page: number): Promise<FlickrPhoto[]> => {
  const API_KEY = import.meta.env.VITE_FLICKR_API_KEY as string;
  const BASE_URL =
    'https://www.flickr.com/services/rest/?method=flickr.photos.getRecent';

  const params = new URLSearchParams({
    api_key: API_KEY,
    format: 'json',
    nojsoncallback: '1',
    per_page: '20',
    page: page.toString(),
  });

  const response = await fetch(`${BASE_URL}&${params.toString()}`);

  if (!response.ok) {
    throw new Error(`Error fetching images: ${response.statusText}`);
  }

  const data: FlickrApiResponse = await response.json();

  const images = data.photos.photo.map((photo: FlickrPhoto) => ({
    id: photo.id,
    title: photo.title ?? '',
    server: photo.server,
    secret: photo.secret,
    src: `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_w.jpg`,
  }));

  // Filter out duplicate images by ID
  const uniqueImages = images.filter(
    (image, index, self) =>
      index === self.findIndex((img) => img.id === image.id),
  );

  return uniqueImages;
};
