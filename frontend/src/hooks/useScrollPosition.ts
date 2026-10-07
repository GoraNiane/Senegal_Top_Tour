import { useState, useEffect } from 'react';

/**
 * Hook to track window scroll position, scroll direction, and threshold crossings
 */
export function useScrollPosition(threshold: number = 40) {
  const [scrollY, setScrollY] = useState<number>(0);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      setIsScrolled(currentScrollY > threshold);

      if (currentScrollY > lastScrollY) {
        setScrollDirection('down');
      } else if (currentScrollY < lastScrollY) {
        setScrollDirection('up');
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return { scrollY, isScrolled, scrollDirection };
}
