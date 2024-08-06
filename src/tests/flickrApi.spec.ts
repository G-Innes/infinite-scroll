import { fetchImages } from '../utils/flickrApi';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { FlickrApiResponse } from '../types/flickr';

const mockPhotos = [
  {
    id: '1',
    title: 'Test Photo 1',
    server: '1234',
    secret: 'abcd',
    src: 'https://live.staticflickr.com/1234/1_abcd_w.jpg',
  },
  {
    id: '2',
    title: 'Test Photo 2',
    server: '5678',
    secret: 'efgh',
    src: 'https://live.staticflickr.com/5678/2_efgh_w.jpg',
  },
];

const createMockFetch = (
  ok: boolean,
  status: number,
  statusText: string,
  json: FlickrApiResponse,
) => {
  return vi.fn(() =>
    Promise.resolve({
      ok,
      status,
      statusText,
      json: () => Promise.resolve(json),
      clone: function () {
        return this;
      },
      headers: new Headers(),
      redirected: false,
      type: 'basic' as ResponseType,
      url: '',
      body: null,
      bodyUsed: false,
      arrayBuffer: () => Promise.resolve(new ArrayBuffer(0)),
      blob: () => Promise.resolve(new Blob()),
      formData: () => Promise.resolve(new FormData()),
      text: () => Promise.resolve(''),
    } as Response),
  );
};

describe('fetchImages', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('should fetch images and return formatted data', async () => {
    global.fetch = createMockFetch(true, 200, 'OK', {
      photos: { photo: mockPhotos },
    });

    const page = 1;
    const images = await fetchImages(page);

    expect(images).toEqual(mockPhotos);
  });

  it('should throw an error if the response is not ok', async () => {
    global.fetch = createMockFetch(false, 404, 'Not Found', {
      photos: { photo: [] },
    });

    await expect(fetchImages(1)).rejects.toThrow(
      'Error fetching images: Not Found',
    );
  });

  it('should return an empty array if no photos are found', async () => {
    global.fetch = createMockFetch(true, 200, 'OK', { photos: { photo: [] } });

    const images = await fetchImages(1);

    expect(images).toEqual([]);
  });

  it('should handle malformed data gracefully', async () => {
    const malformedResponse = {
      photos: {
        photo: [
          {
            id: '1',
            title: null,
            server: '1234',
            secret: 'abcd',
            src: 'https://live.staticflickr.com/1234/1_abcd_w.jpg',
          },
        ],
      },
    };

    global.fetch = createMockFetch(true, 200, 'OK', malformedResponse as any);

    const images = await fetchImages(1);

    expect(images).toEqual([
      {
        id: '1',
        title: '',
        server: '1234',
        secret: 'abcd',
        src: 'https://live.staticflickr.com/1234/1_abcd_w.jpg',
      },
    ]);
  });

  it('should handle network errors gracefully', async () => {
    global.fetch = vi.fn(() => Promise.reject(new Error('Network Error')));

    await expect(fetchImages(1)).rejects.toThrow('Network Error');
  });
});
