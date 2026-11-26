import Icon from '@/components/icons/Icon';
import { SOCIALS } from '@/content/socials';

/* Соцсети иконками: название — в aria-label и title (подсказка), а не текстом.
   tone="dark" — на Oxford (футер), tone="light" — на белом/светло-сером (контакты). */
export default function SocialLinks({ tone = 'dark', size = 40 }: { tone?: 'dark' | 'light'; size?: number }) {
  return (
    <ul className={`social-links social-links--${tone}`} style={{ ['--social-size' as string]: `${size}px` }}>
      {SOCIALS.map(({ id, href, label, icon }) => (
        <li key={id}>
          <a href={href} target="_blank" rel="noopener noreferrer" className="social-link" aria-label={label} title={label}>
            <Icon name={icon} size={Math.round(size * 0.45)} />
          </a>
        </li>
      ))}
    </ul>
  );
}
