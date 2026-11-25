import icons from './icon-data';

type Props = {
  name: string;
  size?: number;
  style?: React.CSSProperties;
  className?: string;
};

export default function Icon({ name, size = 32, style, className }: Props) {
  const d = icons[name];
  if (!d) return null;
  return (
    <svg
      width={size}
      height={size}
      viewBox={d.viewBox}
      fill="none"
      aria-hidden="true"
      focusable="false"
      style={style}
      className={className}
      // body is static design-system data transcribed from the brandbook
      // Figma file — geometry and fills only, never user input.
      dangerouslySetInnerHTML={{ __html: d.body }}
    />
  );
}
