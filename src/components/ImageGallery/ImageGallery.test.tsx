import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import ImageGallery from './ImageGallery';
import useFetchImages from '../../hooks/useFetchImages';

vi.mock('../../hooks/useFetchImages');
vi.mock('../../hooks/useInfiniteScroll');

vi.mock('../ImageList/ImageList', () => ({
  default: () => <div data-testid="mock-image-list" />
}));

vi.mock('../Loader/Loader', () => ({
  default: () => <div data-testid="mock-loader" />
}));

vi.mock('../Error/Error', () => ({
  default: ({ error }: { error: Error }) => <div data-testid="mock-error">{error.message}</div>
}));

// Mock the isError function
vi.mock('../../types/error', () => ({
    isError: vi.fn()
  }));

describe('ImageGallery Component', () => {
  it('should render the ImageList component', () => {
    (useFetchImages as unknown as vi.Mock).mockReturnValue({ images: [], loading: false, error: null });

    render(<ImageGallery />);

    expect(screen.getByTestId('mock-image-list')).toBeInTheDocument();
  });

  it('should render the Loader component when loading', () => {
    (useFetchImages as vi.Mock).mockReturnValue({ images: [], loading: true, error: null });

    render(<ImageGallery />);

    expect(screen.getByTestId('mock-loader')).toBeInTheDocument();
  });

  it('should render the Error component when there is an error', () => {
    const error = {message: 'Test error message'};
    (useFetchImages as unknown as vi.Mock).mockReturnValue({ images: [], loading: false, error });

    render(<ImageGallery />);

    expect(screen.getByTestId('mock-error')).toHaveTextContent('Test error message');
  });

});
