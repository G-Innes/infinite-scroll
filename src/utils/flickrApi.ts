import {
  FlickrPhoto,
  FlickrPhotosResponse,
  FlickrPhotoInfoResponse,
} from '../types/flickr';

const API_KEY = import.meta.env.VITE_FLICKR_API_KEY as string;
const BASE_URL = 'https://www.flickr.com/services/rest/';

// Function for fetching data from Flickr API
// Generic used to allow for different return types
const fetchData = async <T>(params: URLSearchParams): Promise<T> => {
  const response = await fetch(`${BASE_URL}?${params.toString()}`);
  if (!response.ok) {
    throw new Error(`Error fetching data: ${response.statusText}`);
  }
  return response.json();
};

// Function to fetch images by page number
export const fetchImagesByPage = async (
  page: number,
): Promise<FlickrPhoto[]> => {
  const params = new URLSearchParams({
    method: 'flickr.photos.search',
    api_key: API_KEY,
    format: 'json',
    nojsoncallback: '1',
    page: page.toString(),
    per_page: '6',
    text: 'vintage fashion',
  });

  // Call fetchData with the expected response type
  const data: FlickrPhotosResponse = await fetchData(params);
  return data.photos.photo.map((photo) => ({
    id: photo.id,
    title: photo.title,
    src: `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_w.jpg`,
    server: photo.server,
    secret: photo.secret,
  }));
};

// Function to fetch image details by photo ID
export const fetchImageById = async (id: string): Promise<FlickrPhoto> => {
  const params = new URLSearchParams({
    method: 'flickr.photos.getInfo',
    api_key: API_KEY,
    format: 'json',
    nojsoncallback: '1',
    photo_id: id,
  });

  // Call fetchData with the expected response type
  const data: FlickrPhotoInfoResponse = await fetchData(params);
  if (!data.photo) {
    throw new Error(`Photo with ID ${id} not found`);
  }

  const photo = data.photo;
  return {
    id: photo.id,
    title: photo.title._content,
    src: `https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_w.jpg`,
    server: photo.server,
    secret: photo.secret,
  };
};
