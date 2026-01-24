import { useEffect, useRef } from 'react';

export function useScrollUpAnimation(className = 'slide-up') {
  const ref = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      ref.current.forEach((el) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          el.classList.add(className);
        }
      });
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [className]);

  return ref;
}
