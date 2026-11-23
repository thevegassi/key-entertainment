import type { CSSProperties, ReactNode } from 'react';
import Icon from './icons/Icon';

type Props = {
  icon: string;
  label: ReactNode;
  children: ReactNode;
  style?: CSSProperties;
  on?: 'light' | 'periwinkle';
};

/* Brandbook ServiceCard: icon + label row, then body copy. 12px radius,
   24px padding, no border, no shadow — per guidelines/cards-elevation. */
export default function ServiceCard({ icon, label, children, style, on = 'light' }: Props) {
  const ink = on === 'periwinkle' ? 'var(--navy-deep)' : 'var(--navy-deep)';
  return (
    <div
      className="service-card"
      style={{
        borderRadius: 'var(--radius-card)',
        background: on === 'periwinkle' ? '#fff' : 'var(--off-white)',
        padding: '28px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        ...style,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Icon name={icon} size={26} style={{ color: 'var(--navy-deep)', flexShrink: 0 }} />
        <h3 style={{ fontSize: '0.85rem', letterSpacing: '0.5px', fontWeight: 800, color: ink, margin: 0 }}>{label}</h3>
      </div>
      <p style={{ color: 'var(--gray)', fontSize: '0.85rem', lineHeight: 1.7, margin: 0 }}>{children}</p>
    </div>
  );
}
