import type { CSSProperties, ReactNode } from 'react';

type Props = {
  children: ReactNode;
  eyebrow?: ReactNode;
  on?: 'light' | 'periwinkle' | 'dark';
  center?: boolean;
  style?: CSSProperties;
  headingStyle?: CSSProperties;
};

const TEXT_COLOR: Record<NonNullable<Props['on']>, string> = {
  light: 'var(--oxford)',
  periwinkle: 'var(--oxford)',
  dark: '#fff',
};

/* SectionHeading по деке Figma: без декоративной планки, крупный Inter 700,
   трекинг −0.05em, заглавные. Лайм — только на тёмном фоне. */
export default function SectionHeading({ children, eyebrow, on = 'light', center = false, style, headingStyle }: Props) {
  return (
    <div style={{ marginBottom: 'var(--space-10)', textAlign: center ? 'center' : undefined, ...style }}>
      {eyebrow && (
        <p
          style={{
            fontSize: '0.65rem',
            letterSpacing: '3px',
            fontWeight: 700,
            textTransform: 'uppercase',
            color: on === 'dark' ? 'var(--accent)' : 'var(--navy-deep)',
            marginBottom: 'var(--space-4)',
          }}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className="deck-display"
        style={{
          margin: 0,
          fontSize: 'clamp(1.8rem, 4.4vw, 3.4rem)',
          color: TEXT_COLOR[on],
          ...headingStyle,
        }}
      >
        {children}
      </h2>
    </div>
  );
}
