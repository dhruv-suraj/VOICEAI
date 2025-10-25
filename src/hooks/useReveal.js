import { useEffect, useRef, useState } from 'react';

/**
 * useReveal provides a ref and a visibility flag that is set to true
 * the first time the target element enters the viewport. This allows
 * components to coordinate scroll-based animations without duplicating
 * IntersectionObserver setup logic.
 */
export default function useReveal(options = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const node = elementRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.15,
        ...options,
      }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [options]);

  return [elementRef, isVisible];
}
