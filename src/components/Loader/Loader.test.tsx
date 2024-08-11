import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ImageList from '../ImageList/ImageList';
import { FlickrPhoto } from '../../types/flickr';

vi.mock('../ImageItem/ImageItem', () => ({
  __esModule: true,
  default: (props: any) => (
    <div data-testid={`image-item-${props.image.id}`}>{props.image.title}</div>
  ),
}));

describe('ImageList', () => {
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

  it('should render ImageItem components for each image', () => {
    render(<ImageList images={mockImages} />);

    expect(screen.getByTestId('image-item-1')).toHaveTextContent('Image 1');
    expect(screen.getByTestId('image-item-2')).toHaveTextContent('Image 2');
  });

  it('should render no ImageItem components when images are empty', () => {
    render(<ImageList images={[]} />);

    expect(screen.queryByTestId('image-item-1')).toBeNull();
    expect(screen.queryByTestId('image-item-2')).toBeNull();
  });
});
