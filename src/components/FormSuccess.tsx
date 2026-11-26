'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';

/* Состояние «заявка отправлена»: озвучивается скринридером (role=status),
   фокус переходит на сообщение, чтобы клавиатурный пользователь не потерял место. */
export default function FormSuccess({ tone = 'dark' }: { tone?: 'dark' | 'light' }) {
  const t = useTranslations();
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => { ref.current?.focus(); }, []);

  const dark = tone === 'dark';
  return (
    <div
      ref={ref}
      role="status"
      tabIndex={-1}
      style={{
        textAlign: 'center',
        padding: '40px',
        outline: 'none',
        ...(dark ? {} : { background: 'var(--off-white)', borderRadius: 'var(--radius-card)' }),
      }}
    >
      <p aria-hidden="true" style={{ fontSize: '1.6rem', fontWeight: 700, color: dark ? 'var(--accent)' : 'var(--navy-deep)' }}>✓</p>
      <p style={{ marginTop: '12px', fontSize: '1.1rem', fontWeight: 700, color: dark ? '#fff' : 'var(--navy-deep)' }}>{t('val_success_title')}</p>
      <p style={{ marginTop: '8px', color: dark ? 'rgba(255,255,255,0.72)' : 'var(--gray)' }}>{t('val_success_text')}</p>
    </div>
  );
}
