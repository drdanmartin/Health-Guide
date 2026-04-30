import { Eyebrow } from './primitives';

export function TopNav({ view, onHome, durationLabel }) {
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: 'rgba(10,10,11,0.85)', backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border-subtle)',
    }}>
      <div style={{
        maxWidth: 'var(--page-max)', margin: '0 auto',
        padding: '20px 28px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div onClick={onHome} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 14 }}>
          <img src="/assets/logo-mark-clean.png" alt="Radius" style={{ height: 28, width: 'auto' }} />
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, letterSpacing: '-0.01em', textTransform: 'uppercase', lineHeight: 1 }}>
              Radius
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--fg-3)', letterSpacing: '0.04em', marginTop: 2 }}>
              Health Guides
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          {view === 'mode' && (
            <button onClick={onHome} style={{
              background: 'transparent', border: '1px solid var(--border)',
              color: 'var(--fg-2)', padding: '8px 16px',
              fontSize: 11, letterSpacing: 'var(--tr-eyebrow)', textTransform: 'uppercase',
              cursor: 'pointer',
            }}>
              ← All Protocols
            </button>
          )}
          {durationLabel && (
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-3)' }}>
              <Eyebrow>Plan</Eyebrow>
              <div style={{ marginTop: 4, color: 'var(--fg-1)' }}>{durationLabel}</div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export function DurationToggle({ duration, setDuration }) {
  const btn = (plan) => {
    const active = duration === plan;
    const labels = {
      accelerator: { line1: 'ACCELERATOR', line2: '4× / wk · 45-day' },
      silver:      { line1: 'SILVER',      line2: '2× / wk · 60-day' },
      gold:        { line1: 'GOLD',        line2: '2× / wk · 90-day' },
    };
    const { line1, line2 } = labels[plan];
    return (
      <button
        onClick={() => setDuration(plan)}
        style={{
          flex: 1,
          background: active ? 'var(--accent)' : 'var(--bg-card)',
          color: active ? 'var(--white)' : 'var(--fg-2)',
          border: '1px solid ' + (active ? 'var(--accent)' : 'var(--border)'),
          padding: '14px 18px',
          fontFamily: 'var(--font-sans)',
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: 'var(--tr-eyebrow)',
          textTransform: 'uppercase',
          cursor: 'pointer',
          transition: 'all var(--dur-fast) var(--ease-out)',
          textAlign: 'left',
        }}>
        <div style={{ fontWeight: 700, fontSize: 13, lineHeight: 1, marginBottom: 6 }}>{line1}</div>
        <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 400, fontSize: 10, letterSpacing: '0.04em', textTransform: 'none', opacity: active ? 0.9 : 0.7 }}>{line2}</div>
      </button>
    );
  };
  return (
    <div style={{ display: 'flex', gap: 1, background: 'var(--border)', maxWidth: 640 }}>
      {btn('accelerator')}
      {btn('silver')}
      {btn('gold')}
    </div>
  );
}
