type Props = {
  from: string;
  to: string;
  flip?: boolean;
};

/* A diagonal seam between two section grounds — breaks the flat horizontal
   banding that comes from stacking solid-colour sections edge to edge. */
export default function SectionDivider({ from, to, flip = false }: Props) {
  return (
    <div style={{ background: from, lineHeight: 0 }} aria-hidden="true">
      <svg
        viewBox="0 0 1440 64"
        preserveAspectRatio="none"
        style={{ display: 'block', width: '100%', height: '44px' }}
      >
        <polygon points={flip ? '0,64 1440,0 1440,64' : '0,0 1440,64 0,64'} fill={to} />
      </svg>
    </div>
  );
}
