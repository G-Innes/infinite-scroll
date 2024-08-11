import { useEffect, useCallback } from 'react';

// Infinite scroll custom hook, type void as hook & callback dont return any value
const useInfiniteScroll = (callback: () => void): void => {
  // memoized event handler for better performance
  const handleScroll = useCallback(() => {
    // check if user at the bottom of the page
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    ) {
      return;
    }
    callback();
  }, [callback]);

  // setup/teardown event listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);
};

export default useInfiniteScroll;
