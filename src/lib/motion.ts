/** Движение по брендбуку Key: только fade, 180–280ms, cubic-bezier(.2,0,.2,1). Без пружин, bounce и параллакса.
 *  Компоненты animate-ui приходят со spring по умолчанию — после добавления заменяйте transition на эти значения. */
export const BRAND_EASE = [0.2, 0, 0.2, 1] as const;
export const brandTransition = { type: 'tween', duration: 0.28, ease: BRAND_EASE } as const;
export const instantTransition = { duration: 0 } as const;
