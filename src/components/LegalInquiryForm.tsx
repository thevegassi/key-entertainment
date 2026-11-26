'use client';

import { useState, type CSSProperties } from 'react';
import { trackGoal } from '@/lib/analytics';
import FormSuccess from '@/components/FormSuccess';
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

export default function LegalInquiryForm() {
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
        trackGoal('lead_legal');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  if (status === 'done') return <FormSuccess tone="dark" />;

  return (
    <form onSubmit={handleSubmit} className="contact-form contact-form--dark" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <input type="hidden" name="_subject" value="Заявка — Legal" />
      <input type="hidden" name="_captcha" value="false" />
      <input type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ display: 'none' }} />
      <input type="text" name="Имя" placeholder={t('legal_form_name_ph')} autoComplete="name" aria-label={t('legal_form_name_ph')} required style={darkInput} />
      <input type="email" name="Email" placeholder="example@mail.com" autoComplete="email" aria-label="Email" spellCheck={false} required style={darkInput} />
      <input type="text" name="Тема" placeholder={t('legal_form_subject_ph')} autoComplete="off" aria-label={t('legal_form_subject_ph')} style={darkInput} />
      <textarea name="Сообщение" rows={4} placeholder={t('legal_form_msg_ph')} autoComplete="off" aria-label={t('legal_form_msg_ph')} style={darkInput} />
      {status === 'error' && <p role="alert" style={{ color: '#ff8585', fontSize: '0.85rem' }}>{t('val_error')}</p>}
      <button
        type="submit"
        disabled={status === 'sending'}
        className="submit-btn"
        style={{ gridColumn: 'auto' }}
      >
        {status === 'sending' ? t('val_sending') : t('legal_form_submit')}
      </button>
    </form>
  );
}
