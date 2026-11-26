'use client';

import { useState, type CSSProperties } from 'react';
import { trackGoal } from '@/lib/analytics';
import { useTranslations } from 'next-intl';

const lightInput: CSSProperties = {
  background: 'var(--off-white)',
  border: '1px solid var(--hairline)',
  borderRadius: '8px',
  padding: '14px 16px',
  color: 'var(--ink)',
  fontSize: '0.9rem',
  fontFamily: 'inherit',
  width: '100%',
};

export default function ContactForm() {
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
        trackGoal('lead_contact');
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
      <div style={{ textAlign: 'center', padding: '40px', background: 'var(--off-white)', borderRadius: 'var(--radius-card)' }}>
        <p style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--navy-deep)' }}>✓</p>
        <p style={{ marginTop: '12px', color: 'var(--gray)' }}>{t('val_sending')}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="contact-form" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <input type="hidden" name="_autoresponse" value="Спасибо за обращение! Мы получили вашу заявку и свяжемся с вами в течение 24 часов. — Key Entertainment" />
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="_subject" value="Заявка — Контакты" />
      <input type="text" name="Имя" placeholder={t('contacts_form_name_ph')} autoComplete="name" aria-label={t('contacts_form_name_ph')} required style={lightInput} />
      <input type="email" name="Email" placeholder={t('contacts_form_email_ph')} autoComplete="email" aria-label="Email" spellCheck={false} required style={lightInput} />
      <input type="tel" name="Телефон" placeholder="+7" autoComplete="tel" aria-label="Phone" inputMode="tel" style={lightInput} />
      <textarea name="Сообщение" placeholder={t('contacts_form_msg_ph')} autoComplete="off" aria-label={t('contacts_form_msg_ph')} rows={5} style={lightInput} />
      {status === 'error' && <p style={{ color: '#c0392b', fontSize: '0.85rem' }}>{t('val_error')}</p>}
      <button type="submit" disabled={status === 'sending'} className="submit-btn" style={{ gridColumn: 'auto' }}>
        {status === 'sending' ? t('val_sending') : t('contacts_form_submit')}
      </button>
    </form>
  );
}
