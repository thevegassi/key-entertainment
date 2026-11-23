/** Единые цели для Метрики и GA4. Имена целей создаются в кабинете Метрики как «JavaScript-событие». */
export type Goal =
  | 'lead_form_submit'      // любая успешно отправленная форма
  | 'lead_distribution' | 'lead_label' | 'lead_booking' | 'lead_pr' | 'lead_legal' | 'lead_contact'
  | 'click_phone' | 'click_whatsapp' | 'click_telegram' | 'click_email'
  | 'lp_submit';             // рекламный лендинг

type W = Window & {
  ym?: (id: number, action: string, goal: string, params?: object) => void;
  gtag?: (...a: unknown[]) => void;
};

export function trackGoal(goal: Goal, params: Record<string, string> = {}) {
  if (typeof window === 'undefined') return;
  const w = window as W;
  const id = Number(process.env.NEXT_PUBLIC_YM_ID);
  try {
    if (id && w.ym) w.ym(id, 'reachGoal', goal, params);
    if (w.gtag) w.gtag('event', goal, params);
  } catch { /* аналитика не должна ломать форму */ }
}
