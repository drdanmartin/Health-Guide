export function Eyebrow({ children, style }) {
  return <div className="eyebrow" style={style}>{children}</div>;
}

export function RedRule({ w = 48, style }) {
  return <div style={{ width: w, height: 1, background: 'var(--accent)', ...style }} />;
}

export function SectionHeader({ eyebrow, title, lede }) {
  return (
    <div style={{ marginBottom: 40 }}>
      {eyebrow && <Eyebrow style={{ marginBottom: 16 }}>{eyebrow}</Eyebrow>}
      <h2 style={{ fontSize: 'clamp(36px, 4.2vw, 64px)', marginBottom: lede ? 20 : 0 }}>{title}</h2>
      {lede && <p className="lede" style={{ maxWidth: '70ch' }}>{lede}</p>}
    </div>
  );
}
