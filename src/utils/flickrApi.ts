// src/utils/flickrApi.ts
import { FlickrPhoto } from '../types/flickr';

const API_KEY = import.meta.env.VITE_FLICKR_API_KEY as string;
const BASE_URL =
  'https://www.flickr.com/services/rest/?method=flickr.photos.search';

export const fetchImagesByPage = async (
  page: number,
): Promise<FlickrPhoto[]> => {
  const params = new URLSearchParams({
    api_key: API_KEY,
    format: 'json',
    nojsoncallback: '1',
    page: page.toString(),
    per_page: '10',
    text: 'animals',
  });

  const response = await fetch(`${BASE_URL}&${params.toString()}`);
  if (!response.ok) {
    throw new Error(`Error fetching images: ${response.statusText}`);
  }

  const data = await response.json();
  return data.photos.photo.map((photo: any) => ({
    id: photo.id,
    title: photo.title,
    src: `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_w.jpg`,
    server: photo.server,
    secret: photo.secret,
  }));
};

export const fetchImageById = async (id: string): Promise<FlickrPhoto> => {
  const API_KEY = import.meta.env.VITE_FLICKR_API_KEY as string;
  const BASE_URL =
    'https://www.flickr.com/services/rest/?method=flickr.photos.getInfo';

  const params = new URLSearchParams({
    api_key: API_KEY,
    format: 'json',
    nojsoncallback: '1',
    photo_id: id,
  });

  const response = await fetch(`${BASE_URL}&${params.toString()}`);
  if (!response.ok) {
    throw new Error(`Error fetching image: ${response.statusText}`);
  }

  const data = await response.json();
  return {
    id: data.photo.id,
    title: data.photo.title._content,
    server: data.photo.server,
    secret: data.photo.secret,
    src: `https://live.staticflickr.com/${data.photo.server}/${data.photo.id}_${data.photo.secret}_w.jpg`,
  };
};
