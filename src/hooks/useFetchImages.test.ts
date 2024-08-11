import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import useFetchImages from './useFetchImages';
import { fetchImagesByPage } from '../utils/flickrApi';
import { FlickrPhoto } from '../types/flickr';

vi.mock('../utils/flickrApi', () => ({
  fetchImagesByPage: vi.fn(),
}));

describe('useFetchImages', () => {
  const mockImages: FlickrPhoto[] = [
    {
      id: '1',
      title: 'Image 1',
      src: 'http://example.com/image1.jpg',
      server: 'server1',
      secret: 'secret1',
    },
    {
      id: '2',
      title: 'Image 2',
      src: 'http://example.com/image2.jpg',
      server: 'server2',
      secret: 'secret2',
    },
  ];

  it('should initially load with loading state', () => {
    (fetchImagesByPage as vi.Mock).mockResolvedValue([]);

    const { result } = renderHook(() => useFetchImages(1));

    expect(result.current.images).toEqual([]);
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeNull();
  });

  it('should fetch images and update state', async () => {
    (fetchImagesByPage as vi.Mock).mockResolvedValue(mockImages);

    const { result } = renderHook(() => useFetchImages(1));

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(result.current.images).toEqual(mockImages);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should handle errors during fetch', async () => {
    (fetchImagesByPage as vi.Mock).mockRejectedValue(new Error('Fetch error'));

    const { result } = renderHook(() => useFetchImages(1));

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(result.current.images).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe('Fetch error');
  });

  it('should remove duplicate images', async () => {
    const imagesWithDuplicates: FlickrPhoto[] = [
      ...mockImages,
      {
        id: '1',
        title: 'Image 1',
        src: 'http://example.com/image1.jpg',
        server: 'server1',
        secret: 'secret1',
      },
    ];

    (fetchImagesByPage as vi.Mock).mockResolvedValue(imagesWithDuplicates);

    const { result } = renderHook(() => useFetchImages(1));

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(result.current.images).toEqual(mockImages);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });
});
