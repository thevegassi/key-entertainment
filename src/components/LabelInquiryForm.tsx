'use client';

import { useState, type CSSProperties } from 'react';
import { trackGoal } from '@/lib/analytics';
import { useTranslations } from 'next-intl';

const darkInput: CSSProperties = {
  background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(255,255,255,0.18)',
  borderRadius: '8px',
  padding: '14px 16px',
  color: '#fff',
  fontSize: '0.9rem',
  fontFamily: 'inherit',
  width: '100%',
};

export default function LabelInquiryForm() {
  const t = useTranslations();
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch('https://formsubmit.co/ajax/info@keyent.kz', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        setStatus('done');
        trackGoal('lead_form_submit');
        trackGoal('lead_label');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  if (status === 'done') {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <p style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--accent)' }}>✓</p>
        <p style={{ marginTop: '12px', color: 'rgba(255,255,255,0.65)' }}>{t('val_sending')}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="contact-form contact-form--dark"
      style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', maxWidth: '640px', margin: '0 auto', textAlign: 'left' }}
    >
      <input type="hidden" name="_subject" value="Заявка — Label / Демо" />
      <input type="hidden" name="_captcha" value="false" />
      <input type="text" name="Псевдоним" placeholder="Artist Name" required style={darkInput} />
      <input type="email" name="Email" placeholder="mail@example.com" required style={darkInput} />
      <input type="url" name="Ссылка на трек" placeholder="SoundCloud / Drive / YouTube" style={{ ...darkInput, gridColumn: 'span 2' }} />
      <textarea name="Кратко о себе" rows={4} placeholder={t('label_form_about_ph')} style={{ ...darkInput, gridColumn: 'span 2' }} />
      {status === 'error' && <p style={{ color: '#ff8585', fontSize: '0.85rem', gridColumn: 'span 2' }}>{t('val_error')}</p>}
      <button type="submit" disabled={status === 'sending'} className="submit-btn">
        {status === 'sending' ? t('val_sending') : t('label_form_submit')}
      </button>
    </form>
  );
}
