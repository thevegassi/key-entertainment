import type { CSSProperties, ReactNode } from 'react';
import Icon from './icons/Icon';

type Props = {
  icon: string;
  label: ReactNode;
  children: ReactNode;
  style?: CSSProperties;
  on?: 'light' | 'periwinkle';
};

/* Карточка по деке Figma: #E4EAF6, радиус 20px, без обводки и тени. */
export default function ServiceCard({ icon, label, children, style, on = 'light' }: Props) {
  const ink = on === 'periwinkle' ? 'var(--navy-deep)' : 'var(--navy-deep)';
  return (
    <div
      className="service-card"
      style={{
        borderRadius: 'var(--radius-deck)',
        background: on === 'periwinkle' ? '#fff' : 'var(--card-lavender)',
        padding: '28px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        ...style,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Icon name={icon} size={26} style={{ color: 'var(--navy-deep)', flexShrink: 0 }} />
        <h3 style={{ fontSize: '1.05rem', letterSpacing: '-0.02em', fontWeight: 600, color: ink, margin: 0, textTransform: 'none' }}>{label}</h3>
      </div>
      <p style={{ color: '#3F4A5A', fontSize: '0.92rem', lineHeight: 1.55, letterSpacing: '-0.01em', margin: 0 }}>{children}</p>
    </div>
  );
}
