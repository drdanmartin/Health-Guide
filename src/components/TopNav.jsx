import { Eyebrow } from './primitives';

export function DurationToggle({ duration, setDuration }) {
  const btn = (plan) => {
    const active = duration === plan;
    const gold = plan === 'gold';
    return (
      <button
        key={plan}
        onClick={() => setDuration(plan)}
        style={{
          fontFamily: 'var(--font-sans)', fontSize: 11,
          letterSpacing: 'var(--tr-eyebrow)', textTransform: 'uppercase',
          padding: '10px 16px',
          background: active ? (gold ? '#C9A862' : '#B5B5BC') : 'transparent',
          color: active ? 'var(--black)' : 'var(--fg-2)',
          border: `1px solid ${active ? (gold ? '#C9A862' : '#B5B5BC') : 'var(--border)'}`,
          cursor: 'pointer',
          fontWeight: 600,
          transition: 'all var(--dur-fast) var(--ease-out)',
        }}>
        {plan === 'silver' ? 'Silver · 60' : 'Gold · 90'}
      </button>
    );
  };
  return (
    <div style={{ display: 'flex', gap: 0 }}>
      {btn('silver')}
      {btn('gold')}
    </div>
  );
}

export function TopNav({ duration, setDuration, onHome, view }) {
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: 'rgba(10,10,11,0.82)',
      backdropFilter: 'blur(14px)',
      WebkitBackdropFilter: 'blur(14px)',
      borderBottom: '1px solid var(--border-subtle)',
    }}>
      <div style={{
        maxWidth: 'var(--page-max)', margin: '0 auto',
        padding: '18px 28px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, cursor: 'pointer' }} onClick={onHome}>
          <img src="/assets/logo-lockup.png" alt="Radius Red Light Therapy" style={{ height: 52, width: 'auto' }} />
          <div style={{
            fontFamily: 'var(--font-display)', fontWeight: 600, letterSpacing: '0.02em',
            textTransform: 'uppercase', fontSize: 16, lineHeight: 1,
            color: 'var(--fg-3)', borderLeft: '1px solid var(--border)', paddingLeft: 18,
          }}>
            Health Guides
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          {view === 'mode' && <DurationToggle duration={duration} setDuration={setDuration} />}
          <a
            href="/Health Guide-print.html"
            target="_blank"
            rel="noopener"
            style={{
              fontFamily: 'var(--font-sans)', fontSize: 12,
              letterSpacing: 'var(--tr-eyebrow)', textTransform: 'uppercase',
              color: 'var(--fg-3)', border: 'none',
            }}>
            Print
          </a>
        </div>
      </div>
    </header>
  );
}
