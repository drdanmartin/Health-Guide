import { useState } from 'react';
import { SHARED } from '../data/shared';
import { MODES } from '../data/modes';
import { Eyebrow, RedRule, SectionHeader } from './primitives';
import { DurationToggle } from './TopNav';

function PreArrivalBanner() {
  const pa = SHARED.preArrival;
  return (
    <section style={{
      borderTop: '1px solid var(--border-subtle)',
      borderBottom: '1px solid var(--border-subtle)',
      background: 'var(--bg-raised)',
    }}>
      <div style={{ maxWidth: 'var(--page-max)', margin: '0 auto', padding: '72px 28px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 48, marginBottom: 48, alignItems: 'start' }}>
          <div>
            <Eyebrow style={{ marginBottom: 16 }}>{pa.eyebrow}</Eyebrow>
            <RedRule w={48} style={{ marginBottom: 20 }} />
            <h2 style={{ fontSize: 'clamp(32px, 3.6vw, 52px)', margin: 0, lineHeight: 1.05 }}>{pa.title}</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 32, alignItems: 'start' }}>
            <div style={{ borderLeft: '1px solid var(--accent)', paddingLeft: 24 }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 'var(--tr-eyebrow)', textTransform: 'uppercase', color: 'var(--fg-3)', marginBottom: 10 }}>
                Delivery window
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 56, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1, color: 'var(--accent)' }}>
                {pa.shippingWindow}
              </div>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: 11, letterSpacing: 'var(--tr-eyebrow)', textTransform: 'uppercase', color: 'var(--fg-3)', marginTop: 8 }}>
                Days to arrival
              </div>
            </div>
            <div>
              <p style={{ color: 'var(--fg-2)', fontSize: 15, lineHeight: 1.6, margin: 0 }}>{pa.shippingNote}</p>
              <p style={{ color: 'var(--fg-1)', fontSize: 15, lineHeight: 1.6, marginTop: 14, fontWeight: 500 }}>
                <span style={{ color: 'var(--accent)' }}>→ </span>{pa.onArrival}
              </p>
            </div>
          </div>
        </div>

        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', padding: '40px 36px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 48, alignItems: 'start' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 'var(--tr-eyebrow)', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 12, fontWeight: 600 }}>
                Interim / Bridge
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 600, letterSpacing: '-0.01em', lineHeight: 1.1, margin: 0, marginBottom: 16, textTransform: 'uppercase' }}>
                {pa.interim.title}
              </h3>
              <p style={{ color: 'var(--fg-2)', fontSize: 14, lineHeight: 1.6, margin: 0 }}>{pa.interim.lede}</p>
            </div>

            <div style={{ display: 'grid', gap: 1, background: 'var(--border-subtle)' }}>
              {pa.interim.items.map((item, i) => (
                <div key={i} style={{ background: 'var(--bg-card)', padding: '24px 0', display: 'grid', gridTemplateColumns: '40px 1fr', gap: 20, alignItems: 'start' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--fg-3)', paddingTop: 2 }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 600, letterSpacing: '-0.005em', marginBottom: 6, color: 'var(--fg-1)' }}>
                      {item.name}
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: 'var(--tr-eyebrow)', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 8 }}>
                      {item.timing}
                    </div>
                    <div style={{ color: 'var(--fg-2)', fontSize: 14, lineHeight: 1.55 }}>{item.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
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
        background: hover ? 'var(--bg-hover)' : 'var(--bg-card)',
        padding: '40px 32px',
        cursor: 'pointer',
        position: 'relative',
        minHeight: 340,
        display: 'flex', flexDirection: 'column',
        transition: 'background var(--dur-fast) var(--ease-out)',
      }}>
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        background: 'var(--accent)',
        transform: hover ? 'scaleX(1)' : 'scaleX(0)',
        transformOrigin: 'left',
        transition: 'transform var(--dur-std) var(--ease-out)',
      }} />
      <div style={{ fontFamily: 'var(--font-display)', color: 'var(--accent)', fontSize: 40, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1, marginBottom: 24 }}>
        {mode.number}
      </div>
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 44, fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1, textTransform: 'uppercase', marginBottom: 12 }}>
        {mode.name}
      </h3>
      <div style={{ color: 'var(--fg-2)', fontSize: 15, marginBottom: 16, flex: 1 }}>{mode.tagline}</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', gap: 16, paddingTop: 16, borderTop: '1px solid var(--border-subtle)' }}>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-3)', letterSpacing: '0.04em' }}>{mode.wavelength}</div>
          <div style={{ fontSize: 12, color: 'var(--fg-3)', marginTop: 4, textTransform: 'uppercase', letterSpacing: 'var(--tr-eyebrow)' }}>
            {duration === 'silver' ? '60-day · Silver' : '90-day · Gold'}
          </div>
        </div>
        <div style={{ fontFamily: 'var(--font-sans)', fontSize: 11, letterSpacing: 'var(--tr-eyebrow)', textTransform: 'uppercase', color: hover ? 'var(--accent)' : 'var(--fg-2)', transition: 'color var(--dur-fast) var(--ease-out)' }}>
          Open guide →
        </div>
      </div>
    </div>
  );
}

export function Home({ onPick, duration, setDuration }) {
  const modes = Object.values(MODES);

  return (
    <div>
      <section style={{ position: 'relative', minHeight: '88vh', overflow: 'hidden', borderBottom: '1px solid var(--border-subtle)' }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(/assets/pinnacle-hero-main.jpg)',
          backgroundSize: 'cover', backgroundPosition: 'center',
          filter: 'brightness(0.75) saturate(1.2) contrast(1.05)',
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(10,10,11,0.2) 0%, rgba(10,10,11,0) 35%, rgba(10,10,11,0.65) 80%, var(--black) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(10,10,11,0.55) 0%, rgba(10,10,11,0) 35%)' }} />
        <div style={{
          position: 'relative', maxWidth: 'var(--page-max)', margin: '0 auto',
          padding: '64px 28px 72px', minHeight: '88vh',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        }}>
          <div>
            <Eyebrow>The Dahlia Pinnacle · 5 PTx Protocols</Eyebrow>
          </div>
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

      <PreArrivalBanner />

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

      <section style={{ borderTop: '1px solid var(--border-subtle)', padding: '48px 28px', background: 'var(--bg-raised)' }}>
        <div style={{ maxWidth: 'var(--page-max)', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 40 }}>
          <Eyebrow>Important</Eyebrow>
          <div>
            <p style={{ color: 'var(--fg-2)', fontSize: 15 }}>{SHARED.disclaimer.short}</p>
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
