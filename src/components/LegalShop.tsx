'use client';

import { useState, type CSSProperties, type FormEvent } from 'react';
import { useTranslations } from 'next-intl';

const DOC_KEYS = ['legal_doc1', 'legal_doc2', 'legal_doc3', 'legal_doc4'] as const;
const PRICE = '200 000 ₸';
const PAYMENT_URL = 'https://pay.kaspi.kz/pay/useszub1';

type Errors = { name?: string; email?: string; phone?: string };

const inputStyle: CSSProperties = {
  width: '100%',
  background: 'transparent',
  border: '1px solid var(--hairline)',
  borderRadius: '8px',
  padding: '14px',
  color: 'var(--ink)',
  fontFamily: 'inherit',
  fontSize: '0.9rem',
  outline: 'none',
};

const errorStyle: CSSProperties = {
  color: '#C0392B',
  fontSize: '0.65rem',
  letterSpacing: '1px',
  textTransform: 'uppercase',
  display: 'block',
  marginTop: '4px',
};

export default function LegalShop() {
  const t = useTranslations();
  const [activeDoc, setActiveDoc] = useState<(typeof DOC_KEYS)[number] | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);

  function openCheckout(key: (typeof DOC_KEYS)[number]) {
    setActiveDoc(key);
    setName('');
    setEmail('');
    setPhone('');
    setErrors({});
    setSending(false);
  }

  function closeCheckout() {
    setActiveDoc(null);
  }

  function validate() {
    const next: Errors = {};
    if (!name.trim() || name.trim().length < 2) next.name = t('val_min2');
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) next.email = t('val_email');
    if (!phone.trim() || !/^\+\d{10,12}$/.test(phone.replace(/\s/g, ''))) next.phone = t('val_phone');
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!activeDoc || !validate()) return;
    setSending(true);
    const formData = new FormData();
    formData.append('Документ', t(`${activeDoc}_title`));
    formData.append('Сумма', PRICE);
    formData.append('Имя', name);
    formData.append('Email', email);
    formData.append('Телефон', phone);
    formData.append('_subject', 'Покупка документа');
    formData.append('_captcha', 'false');
    try {
      await fetch('https://formsubmit.co/ajax/info@keyent.kz', {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      });
    } finally {
      window.location.href = PAYMENT_URL;
    }
  }

  return (
    <>
      <div className="legal-solutions-grid">
        {DOC_KEYS.map((key) => (
          <div key={key} className="solution-card">
            <div>
              <h4>{t(`${key}_title`)}</h4>
              <p>{t(`${key}_desc`)}</p>
            </div>
            <div>
              <div className="price-box">{PRICE}</div>
              <button type="button" className="buy-btn" style={{ width: '100%' }} onClick={() => openCheckout(key)}>
                {t('legal_buy')}
              </button>
            </div>
          </div>
        ))}
      </div>

      {activeDoc && (
        <div
          className="modal"
          style={{ display: 'flex' }}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeCheckout();
          }}
        >
          <div className="modal-content" style={{ textAlign: 'left' }}>
            <h3 style={{ fontSize: '1rem', marginBottom: '4px', color: 'var(--oxford)' }}>{t(`${activeDoc}_title`)}</h3>
            <p style={{ color: 'var(--gray)', fontWeight: 700, marginBottom: '24px' }}>{PRICE}</p>

            {sending ? (
              <p style={{ color: 'var(--gray)', textAlign: 'center', padding: '20px 0' }}>{t('legal_loading')}</p>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t('legal_modal_name_ph')}
                    style={inputStyle}
                  />
                  {errors.name && <span style={errorStyle}>{errors.name}</span>}
                </div>
                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('legal_modal_email')}
                    style={inputStyle}
                  />
                  {errors.email && <span style={errorStyle}>{errors.email}</span>}
                </div>
                <div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={t('legal_modal_phone')}
                    style={inputStyle}
                  />
                  {errors.phone && <span style={errorStyle}>{errors.phone}</span>}
                </div>
                <button type="submit" className="submit-btn" style={{ gridColumn: 'auto' }}>
                  {t('legal_pay_btn')}
                </button>
                <button
                  type="button"
                  onClick={closeCheckout}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--gray)',
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                    fontSize: '0.7rem',
                    letterSpacing: '1px',
                    fontFamily: 'inherit',
                    padding: '10px',
                  }}
                >
                  {t('legal_cancel')}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
