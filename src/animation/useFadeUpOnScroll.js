import { useEffect, useRef } from 'react';

export function useFadeUpOnScroll(className = 'fade-up') {
  const ref = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      ref.current.forEach((el) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 80) {
          el.classList.add(className);
          el.classList.remove('fade-up-init');
        }
      });
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [className]);

  return ref;
}
