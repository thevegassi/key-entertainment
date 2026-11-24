'use client';

import { useState } from 'react';
import { trackGoal } from '@/lib/analytics';

const field = {
  width: '100%', padding: '14px 16px', background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(255,255,255,0.2)', color: '#fff', fontSize: '1rem', fontFamily: 'inherit',
} as const;

/** Единственное целевое действие лендинга. Цели: lead_form_submit + lp_submit (+ slug в параметрах). */
export default function LandingForm({ slug, goal, cta, submitted }: { slug: string; goal: string; cta: string; submitted: string }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    const form = e.currentTarget;
    try {
      const data = new FormData(form);
      data.append('_subject', `Заявка с лендинга ${slug}`);
      const res = await fetch('https://formsubmit.co/ajax/info@keyent.kz', { method: 'POST', body: data, headers: { Accept: 'application/json' } });
      if (!res.ok) throw new Error('bad status');
      trackGoal('lead_form_submit', { landing: slug });
      trackGoal(goal as 'lp_submit', { landing: slug });
      setStatus('done');
      form.reset();
    } catch {
      setStatus('error');
    }
  }

  if (status === 'done') return <p role="status" style={{ color: 'var(--accent)', fontSize: '1.1rem' }}>{submitted}</p>;

  return (
    <form className="contact-form" onSubmit={onSubmit} style={{ display: 'grid', gap: '14px', maxWidth: '460px' }}>
      <input name="name" required minLength={2} autoComplete="name" placeholder="Имя / Name" aria-label="Name" style={field} />
      <input name="phone" type="tel" required autoComplete="tel" placeholder="+7" aria-label="Phone" style={field} />
      <input type="text" name="_honey" tabIndex={-1} autoComplete="off" style={{ display: 'none' }} />
      <button type="submit" disabled={status === 'sending'} className="btn-cta" style={{ padding: '16px', background: 'var(--accent)', color: '#000', fontWeight: 900, border: 0, cursor: 'pointer', fontSize: '1rem' }}>
        {cta}
      </button>
      {status === 'error' && <p role="alert" style={{ color: '#ff6b6b' }}>Error. info@keyent.kz</p>}
    </form>
  );
}
