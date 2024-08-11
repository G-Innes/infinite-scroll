import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import useInfiniteScroll from './useInfiniteScroll';

describe('useInfiniteScroll', () => {
  it('should call callback when scrolled to the bottom of the page', () => {
    const callback = vi.fn();

    const originalOffsetHeight = Object.getOwnPropertyDescriptor(
      document.documentElement,
      'offsetHeight',
    )?.get;

    Object.defineProperty(document.documentElement, 'offsetHeight', {
      configurable: true,
      get: () => 2000,
    });

    window.innerHeight = 1000;
    document.documentElement.scrollTop = 1000;

    renderHook(() => useInfiniteScroll(callback));

    document.documentElement.scrollTop = 1000;
    window.dispatchEvent(new Event('scroll'));

    expect(callback).toHaveBeenCalledTimes(1);

    Object.defineProperty(document.documentElement, 'offsetHeight', {
      configurable: true,
      get: originalOffsetHeight,
    });
  });

  it('should not call callback when scrolled but not at the bottom', () => {
    const callback = vi.fn();

    const originalOffsetHeight = Object.getOwnPropertyDescriptor(
      document.documentElement,
      'offsetHeight',
    )?.get;

    Object.defineProperty(document.documentElement, 'offsetHeight', {
      configurable: true,
      get: () => 2000,
    });

    window.innerHeight = 1000;
    document.documentElement.scrollTop = 0;

    renderHook(() => useInfiniteScroll(callback));

    document.documentElement.scrollTop = 500;
    window.dispatchEvent(new Event('scroll'));

    expect(callback).not.toHaveBeenCalled();

    Object.defineProperty(document.documentElement, 'offsetHeight', {
      configurable: true,
      get: originalOffsetHeight,
    });
  });
});
