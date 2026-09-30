'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

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
      });
      if (res.ok) {
        setStatus('done');
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
        <p style={{ marginTop: '12px', color: '#888' }}>{t('val_sending')}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="contact-form" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <input type="hidden" name="_autoresponse" value="Спасибо за обращение! Мы получили вашу заявку и свяжемся с вами в течение 24 часов. — Key Entertainment" />
      <input type="hidden" name="_captcha" value="false" />
      <input
        type="text"
        name="name"
        placeholder={t('contacts_form_name_ph')}
        required
        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px', padding: '14px 16px', color: '#fff', fontSize: '0.9rem', outline: 'none' }}
      />
      <input
        type="email"
        name="email"
        placeholder={t('contacts_form_email_ph')}
        required
        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px', padding: '14px 16px', color: '#fff', fontSize: '0.9rem', outline: 'none' }}
      />
      <input
        type="tel"
        name="phone"
        placeholder="+7"
        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px', padding: '14px 16px', color: '#fff', fontSize: '0.9rem', outline: 'none' }}
      />
      <textarea
        name="message"
        placeholder={t('contacts_form_msg_ph')}
        rows={5}
        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px', padding: '14px 16px', color: '#fff', fontSize: '0.9rem', resize: 'vertical', outline: 'none' }}
      />
      {status === 'error' && <p style={{ color: '#ff4444', fontSize: '0.85rem' }}>{t('val_error')}</p>}
      <button
        type="submit"
        disabled={status === 'sending'}
        style={{ background: 'var(--accent)', color: '#000', border: 'none', padding: '16px', fontWeight: 800, fontSize: '0.8rem', letterSpacing: '2px', textTransform: 'uppercase', cursor: 'pointer', borderRadius: '2px' }}
      >
        {status === 'sending' ? t('val_sending') : t('contacts_form_submit')}
      </button>
    </form>
  );
}
