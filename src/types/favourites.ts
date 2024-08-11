import { FlickrPhoto } from './flickr';

 // Type for favourites context
export interface FavouritesContextType {
  favourites: FlickrPhoto[];
  addFavourite: (id: string) => Promise<void>;
  removeFavourite: (id: string) => void;
}
