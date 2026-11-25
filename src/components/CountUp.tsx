'use client';

import { useEffect, useRef } from 'react';

type Props = {
  /** Итоговое значение вида "10+", "30M+", "1000+". Серверный HTML содержит его целиком (SEO, no-JS). */
  value: string;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
};

/* Счётчик при первом появлении в экране. Только текст, без движения элементов.
   При prefers-reduced-motion остаётся итоговое значение. */
export default function CountUp({ value, duration = 1400, className, style }: Props) {
  const ref = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    const match = value.match(/^(\d+)(.*)$/);
    if (!el || !match) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (typeof IntersectionObserver === 'undefined') return;

    const target = Number(match[1]);
    const suffix = match[2];
    let raf = 0;

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3); // ease-out-cubic
          el.textContent = `${Math.round(target * eased)}${suffix}`;
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        el.textContent = `0${suffix}`;
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, duration]);

  return (
    <p ref={ref} className={className} style={style} aria-label={value}>
      {value}
    </p>
  );
}
