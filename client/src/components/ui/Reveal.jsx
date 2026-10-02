import { useEffect, useRef } from 'react';

import { cn } from '@/utils/cn';

const supportsObserver = typeof window !== 'undefined' && 'IntersectionObserver' in window;

/**
 * Fades its content up once, the first time it scrolls into view (`.reveal` in
 * styles/index.css). Library-free so the plain portfolio stays light; reduced-motion
 * users get the content immediately. Only opacity/transform change — no layout shift.
 */
export function Reveal({ as: Tag = 'div', delay = 0, className, style, children, ...props }) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;
    if (!supportsObserver) {
      element.setAttribute('data-revealed', '');
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        entry.target.setAttribute('data-revealed', '');
        observer.disconnect();
      },
      { rootMargin: '0px 0px -12% 0px' },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={cn('reveal', className)}
      style={{ '--reveal-delay': `${delay}ms`, ...style }}
      {...props}
    >
      {children}
    </Tag>
  );
}
