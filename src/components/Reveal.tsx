'use client';

import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
  /** Задержка в мс — для ступенчатого появления соседних блоков. */
  delay?: number;
  className?: string;
  style?: CSSProperties;
  as?: 'div' | 'section' | 'p' | 'footer';
};

/* Появление при скролле: только opacity (бренд — «fades, never slides»).
   Без JS или при prefers-reduced-motion контент виден сразу (см. .reveal в globals.css). */
export default function Reveal({ children, delay = 0, className = '', style, as: Tag = 'div' }: Props) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      el.classList.add('is-in');
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      className={`reveal ${className}`.trim()}
      style={{ ...style, ['--reveal-delay' as string]: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
