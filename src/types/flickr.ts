export interface FlickrPhoto {
  id: string;
  title: string;
  server: string;
  secret: string;
  src: string;
}

export interface FlickrPhotosResponse {
  photos: {
    photo: {
      id: string;
      title: string;
      server: string;
      secret: string;
    }[];
  };
}
export interface FlickrPhotoInfoResponse {
  photo: {
    id: string;
    title: {
      _content: string;
    };
    server: string;
    secret: string;
  } | null;
}
