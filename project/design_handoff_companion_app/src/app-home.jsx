/* Radius Health Guides — main app */
const { useState, useEffect, useRef } = React;

// ============================================================
// Small primitives
// ============================================================
const Eyebrow = ({ children, style }) => (
  <div className="eyebrow" style={style}>{children}</div>
);

const RedRule = ({ w = 48, style }) => (
  <div style={{ width: w, height: 1, background: 'var(--accent)', ...style }} />
);

const SectionHeader = ({ eyebrow, title, lede }) => (
  <div style={{ marginBottom: 40 }}>
    {eyebrow && <Eyebrow style={{ marginBottom: 16 }}>{eyebrow}</Eyebrow>}
    <h2 style={{ fontSize: 'clamp(36px, 4.2vw, 64px)', marginBottom: lede ? 20 : 0 }}>{title}</h2>
    {lede && <p className="lede" style={{ maxWidth: '70ch' }}>{lede}</p>}
  </div>
);

// ============================================================
// Top nav / controls
// ============================================================
function TopNav({ duration, setDuration, onHome, view }) {
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
          <img src="assets/logo-lockup.png" alt="Radius Red Light Therapy" style={{ height: 52, width: 'auto' }} />
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, letterSpacing: '0.02em', textTransform: 'uppercase', fontSize: 16, lineHeight: 1, color: 'var(--fg-3)', borderLeft: '1px solid var(--border)', paddingLeft: 18 }}>
            Health Guides
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          {view === 'mode' && (
            <DurationToggle duration={duration} setDuration={setDuration} />
          )}
          <a href="#print" onClick={(e) => { e.preventDefault(); window.open('Health Guide-print.html', '_blank'); }}
             style={{ fontFamily: 'var(--font-sans)', fontSize: 12, letterSpacing: 'var(--tr-eyebrow)', textTransform: 'uppercase', color: 'var(--fg-3)', border: 'none' }}>
            Print
          </a>
        </div>
      </div>
    </header>
  );
}

function DurationToggle({ duration, setDuration }) {
  const btn = (plan) => {
    const active = duration === plan;
    const gold = plan === 'gold';
    return (
      <button
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

// ============================================================
// Home — mode selector
// ============================================================
function Home({ onPick, duration, setDuration }) {
  const modes = Object.values(window.MODES);

  return (
    <div>
      {/* Hero */}
      <section style={{ position: 'relative', minHeight: '88vh', overflow: 'hidden', borderBottom: '1px solid var(--border-subtle)' }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(assets/pinnacle-hero-main.jpg)',
          backgroundSize: 'cover', backgroundPosition: 'center',
          filter: 'brightness(0.75) saturate(1.2) contrast(1.05)',
        }} />
        {/* Bottom-to-top gradient for text legibility at bottom */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(10,10,11,0.2) 0%, rgba(10,10,11,0) 35%, rgba(10,10,11,0.65) 80%, var(--black) 100%)',
        }} />
        {/* Left-edge darkening so eyebrow/caption reads */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(90deg, rgba(10,10,11,0.55) 0%, rgba(10,10,11,0) 35%)',
        }} />
        <div style={{
          position: 'relative', maxWidth: 'var(--page-max)', margin: '0 auto',
          padding: '64px 28px 72px',
          minHeight: '88vh',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        }}>
          {/* Top: eyebrow */}
          <div>
            <Eyebrow>The Dahlia Pinnacle · 5 PTx Protocols</Eyebrow>
          </div>

          {/* Bottom: headline + controls */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 32 }}>
            <h1 className="display-2" style={{ maxWidth: 14, fontSize: 'clamp(56px, 9vw, 152px)' }}>
              Health <br /> Guides.
            </h1>
            <p className="lede" style={{ fontSize: 20, maxWidth: '58ch' }}>
              Five precision protocols. Two plan lengths. One coherent system — from
              the bed, to the supplement box, to the plate, to the bedroom.
            </p>
            <div style={{ marginTop: 8 }}>
              <DurationToggle duration={duration} setDuration={setDuration} />
              <div style={{ fontSize: 12, color: 'var(--fg-3)', marginTop: 10, letterSpacing: '0.04em' }}>
                Choose your plan length — then select a mode below.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mode grid */}
      <section style={{ maxWidth: 'var(--page-max)', margin: '0 auto', padding: '96px 28px' }}>
        <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'space-between', marginBottom: 48, gap: 32, flexWrap: 'wrap' }}>
          <SectionHeader
            eyebrow="01 / Select your protocol"
            title="Five modes. One bed."
            lede="Every plan includes the Radius Super Stack, Drink HRW Rejuvenation H₂ water, Dr. Mercola NAC + Milk Thistle, Pure Encapsulations Renual, and Toniiq® PQQ. The mode you pick changes the emphasis, not the foundation."
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 2, background: 'var(--border-subtle)' }}>
          {modes.map((m) => (
            <ModeCard key={m.id} mode={m} duration={duration} onClick={() => onPick(m.id)} />
          ))}
        </div>
      </section>

      {/* Short disclaimer teaser */}
      <section style={{ borderTop: '1px solid var(--border-subtle)', padding: '48px 28px', background: 'var(--bg-raised)' }}>
        <div style={{ maxWidth: 'var(--page-max)', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 40 }}>
          <Eyebrow>Important</Eyebrow>
          <div>
            <p style={{ color: 'var(--fg-2)', fontSize: 15 }}>{window.SHARED.disclaimer.short}</p>
            <p style={{ color: 'var(--fg-3)', fontSize: 13, marginTop: 12 }}>
              Full contraindications are listed at the end of every mode guide. Do not begin this protocol
              without first consulting your physician, particularly regarding methylene blue.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function ModeCard({ mode, duration, onClick }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: 'var(--bg-card)',
        padding: '40px 32px',
        cursor: 'pointer',
        position: 'relative',
        minHeight: 340,
        display: 'flex', flexDirection: 'column',
        transition: 'background var(--dur-fast) var(--ease-out)',
        backgroundColor: hover ? 'var(--bg-hover)' : 'var(--bg-card)',
      }}>
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        background: 'var(--accent)',
        transform: hover ? 'scaleX(1)' : 'scaleX(0)',
        transformOrigin: 'left',
        transition: 'transform var(--dur-std) var(--ease-out)',
      }} />
      <div style={{
        fontFamily: 'var(--font-display)', color: 'var(--accent)',
        fontSize: 40, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1,
        marginBottom: 24,
      }}>{mode.number}</div>

      <h3 style={{
        fontFamily: 'var(--font-display)', fontSize: 44,
        fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1,
        textTransform: 'uppercase', marginBottom: 12,
      }}>{mode.name}</h3>

      <div style={{ color: 'var(--fg-2)', fontSize: 15, marginBottom: 16, flex: 1 }}>
        {mode.tagline}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', gap: 16, paddingTop: 16, borderTop: '1px solid var(--border-subtle)' }}>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-3)', letterSpacing: '0.04em' }}>
            {mode.wavelength}
          </div>
          <div style={{ fontSize: 12, color: 'var(--fg-3)', marginTop: 4, textTransform: 'uppercase', letterSpacing: 'var(--tr-eyebrow)' }}>
            {duration === 'silver' ? '60-day · Silver' : '90-day · Gold'}
          </div>
        </div>
        <div style={{
          fontFamily: 'var(--font-sans)', fontSize: 11,
          letterSpacing: 'var(--tr-eyebrow)', textTransform: 'uppercase',
          color: hover ? 'var(--accent)' : 'var(--fg-2)',
          transition: 'color var(--dur-fast) var(--ease-out)',
        }}>
          Open guide →
        </div>
      </div>
    </div>
  );
}

// Export primitives for the ModePage file
Object.assign(window, { Eyebrow, RedRule, SectionHeader, TopNav, Home });
