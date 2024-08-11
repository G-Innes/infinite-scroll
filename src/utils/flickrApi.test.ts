import { describe, it, expect, vi } from 'vitest';
import { fetchImagesByPage, fetchImageById } from './flickrApi';
import {
  FlickrPhoto,
  FlickrPhotosResponse,
  FlickrPhotoInfoResponse,
} from '../types/flickr';

// Mock the global fetch function
const mockFetch = vi.fn();
global.fetch = mockFetch as any;

describe('fetchFunctions', () => {
  afterEach(() => {
    vi.clearAllMocks(); // Clear mocks after each test
  });

  describe('fetchImagesByPage', () => {
    it('should fetch images by page number and return formatted data', async () => {
      // Mock response data
      const mockResponse: FlickrPhotosResponse = {
        photos: {
          photo: [
            {
              id: '1',
              title: 'Photo 1',
              server: 'server1',
              secret: 'secret1',
            },
            {
              id: '2',
              title: 'Photo 2',
              server: 'server2',
              secret: 'secret2',
            },
          ],
        },
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const images = await fetchImagesByPage(1);

      expect(images).toEqual([
        {
          id: '1',
          title: 'Photo 1',
          src: 'https://live.staticflickr.com/server1/1_secret1_w.jpg',
          server: 'server1',
          secret: 'secret1',
        },
        {
          id: '2',
          title: 'Photo 2',
          src: 'https://live.staticflickr.com/server2/2_secret2_w.jpg',
          server: 'server2',
          secret: 'secret2',
        },
      ]);

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('flickr.photos.search'),
      );
    });

    it('should throw an error if fetch fails', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        statusText: 'Not Found',
      });

      await expect(fetchImagesByPage(1)).rejects.toThrow(
        'Error fetching data: Not Found',
      );
    });
  });

  describe('fetchImageById', () => {
    it('should fetch image details by ID and return formatted data', async () => {
      // Mock response data
      const mockResponse: FlickrPhotoInfoResponse = {
        photo: {
          id: '1',
          title: {
            _content: 'Photo 1',
          },
          server: 'server1',
          secret: 'secret1',
        },
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const image = await fetchImageById('1');

      expect(image).toEqual({
        id: '1',
        title: 'Photo 1',
        src: 'https://live.staticflickr.com/server1/1_secret1_w.jpg',
        server: 'server1',
        secret: 'secret1',
      });

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('flickr.photos.getInfo'),
      );
    });

    it('should throw an error if the photo is not found', async () => {
      const mockResponse: FlickrPhotoInfoResponse = { photo: null };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      await expect(fetchImageById('1')).rejects.toThrow(
        'Photo with ID 1 not found',
      );
    });

    it('should throw an error if fetch fails', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        statusText: 'Not Found',
      });

      await expect(fetchImageById('1')).rejects.toThrow(
        'Error fetching data: Not Found',
      );
    });
  });
});
