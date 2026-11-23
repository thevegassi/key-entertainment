import type { CSSProperties, ReactNode } from 'react';

type Props = {
  children: ReactNode;
  eyebrow?: ReactNode;
  on?: 'light' | 'periwinkle' | 'dark';
  center?: boolean;
  style?: CSSProperties;
  headingStyle?: CSSProperties;
};

const RULE_COLOR: Record<NonNullable<Props['on']>, string> = {
  light: 'var(--indigo)',
  periwinkle: '#fff',
  dark: 'var(--accent)',
};

const TEXT_COLOR: Record<NonNullable<Props['on']>, string> = {
  light: 'var(--oxford)',
  periwinkle: 'var(--oxford)',
  dark: '#fff',
};

/* Brandbook SectionHeading: 14x60 accent bar + 30px gap + bold title —
   the signature construct on every interior brandbook page. */
export default function SectionHeading({ children, eyebrow, on = 'light', center = false, style, headingStyle }: Props) {
  const indent = center ? 0 : 14 + 30;
  return (
    <div style={{ marginBottom: 'var(--space-10)', textAlign: center ? 'center' : undefined, ...style }}>
      {eyebrow && (
        <p
          style={{
            fontSize: '0.65rem',
            letterSpacing: '3px',
            fontWeight: 800,
            textTransform: 'uppercase',
            color: on === 'dark' ? 'var(--accent)' : 'var(--navy-deep)',
            marginBottom: 'var(--space-4)',
            marginLeft: indent,
          }}
        >
          {eyebrow}
        </p>
      )}
      <div style={{ display: 'flex', flexDirection: 'row', gap: 'var(--space-7)', alignItems: 'center', justifyContent: center ? 'center' : 'flex-start' }}>
        <div aria-hidden="true" style={{ width: 14, height: 60, background: RULE_COLOR[on], flexShrink: 0, borderRadius: 2 }} />
        <h2
          style={{
            margin: 0,
            fontSize: 'clamp(1.6rem, 4vw, 2.75rem)',
            fontWeight: 900,
            lineHeight: 1,
            color: TEXT_COLOR[on],
            textTransform: 'uppercase',
            ...headingStyle,
          }}
        >
          {children}
        </h2>
      </div>
    </div>
  );
}
