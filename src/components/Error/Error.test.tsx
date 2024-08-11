import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import ErrorComponent from './Error';
import { isError } from '../../types/error';

vi.mock('./Error.module.css', () => ({
  default: {
    error: 'error',
  },
}));

vi.mock('../../types/error', () => ({
  isError: vi.fn(),
}));

describe('Error Component', () => {
  it('should display the error message when an Error object is passed', () => {
    const error = new Error('Test error message');
    (isError as unknown as vi.Mock).mockReturnValue(true);
    const { getByText } = render(<ErrorComponent error={error} />);
    expect(getByText('Error: Test error message')).toBeInTheDocument();
  });

  it('should display a default message when an unknown error is passed', () => {
    const error = { message: 'Unknown error' };
    (isError as unknown as vi.Mock).mockReturnValue(false);

    const { getByText } = render(<ErrorComponent error={error} />);
    expect(getByText('Error: An unknown error occurred')).toBeInTheDocument();
  });
});
