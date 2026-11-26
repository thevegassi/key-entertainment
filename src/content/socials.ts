/** Единый список соцсетей и мессенджеров: футер и /contacts. Иконки — из набора брендбука (components/icons). */
export type Social = { id: string; href: string; label: string; icon: string };

export const SOCIALS: Social[] = [
  { id: 'whatsapp', href: 'https://wa.me/77010520606', label: 'WhatsApp', icon: 'TablerIconBrandWhatsapp' },
  { id: 'telegram', href: 'https://t.me/keyentkz', label: 'Telegram', icon: 'TablerIconBrandTelegram' },
  { id: 'vk', href: 'https://vk.com/keyentertainment', label: 'VK', icon: 'TablerIconBrandVk' },
  { id: 'instagram', href: 'https://instagram.com/keyentertainment.kz', label: 'Instagram', icon: 'TablerIconBrandInstagram' },
  { id: 'youtube', href: 'https://www.youtube.com/@keyentkz', label: 'YouTube', icon: 'TablerIconBrandYoutube' },
  { id: 'yandex-music', href: 'https://music.yandex.kz/label/632686', label: 'Яндекс Музыка', icon: 'TablerIconMusic' },
];
