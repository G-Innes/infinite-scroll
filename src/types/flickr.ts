export interface FlickrPhoto {
  id: string;
  title: string;
  server: string;
  secret: string;
  src: string;
}

export interface FlickrApiResponse {
  photos: {
    photo: FlickrPhoto[];
  };
}
