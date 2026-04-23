import { SHARED } from '../data/shared';
import { Eyebrow, RedRule, SectionHeader } from './primitives';

function Stat({ label, value, accent }) {
  return (
    <div>
      <div style={{ fontSize: 11, letterSpacing: 'var(--tr-eyebrow)', textTransform: 'uppercase', color: 'var(--fg-3)', marginBottom: 6 }}>{label}</div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 16, color: accent || 'var(--fg-1)', fontWeight: 500 }}>{value}</div>
    </div>
  );
}

function Section({ eyebrow, title, children, background }) {
  return (
    <section style={{ background: background || 'transparent', borderTop: background ? 'none' : '1px solid var(--border-subtle)', padding: '96px 28px' }}>
      <div style={{ maxWidth: 'var(--page-max)', margin: '0 auto' }}>
        <SectionHeader eyebrow={eyebrow} title={title} />
        {children}
      </div>
    </section>
  );
}

function InputCard({ title, subtitle, items }) {
  return (
    <div style={{ background: 'var(--bg-card)', padding: '32px 28px' }}>
      <RedRule w={32} style={{ marginBottom: 14 }} />
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '-0.01em', marginBottom: 6, lineHeight: 1.1 }}>{title}</div>
      <div style={{ fontSize: 13, color: 'var(--fg-3)', fontStyle: 'italic', marginBottom: 18 }}>{subtitle}</div>
      <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
        {items.map((it, i) => (
          <li key={i} style={{ display: 'flex', gap: 12, marginBottom: 10, color: 'var(--fg-2)', fontSize: 14, lineHeight: 1.5 }}>
            <span style={{ color: 'var(--accent)', flex: '0 0 auto' }}>—</span><span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ModePage({ modeId, duration, onBack, modes }) {
  const mode = modes[modeId];
  const phases = mode.phases[duration];
  const planLabel = duration === 'silver' ? 'Silver · 60-day' : 'Gold · 90-day';
  const planAccent = duration === 'silver' ? '#B5B5BC' : '#C9A862';

  const sessionSteps = [
    { n: '01', t: '30–45 min before', d: 'Earth Harmony methylene blue as directed. For skin mode: also apply Renue Blue topicals ≥60 min prior, not day-of.' },
    { n: '02', t: 'Arrive & settle', d: 'Rejuvenation H₂ tablet in 16 oz filtered water. Queue delta-wave binaural beats.' },
    { n: '03', t: '15 minutes in-bed', d: `Dahlia Pinnacle, ${mode.name} mode (${mode.wavelength}). Eyes closed, nasal breath.` },
    { n: '04', t: '5 min post-bed', d: 'Vibration-plate therapy — activates lymph, amplifies PBM effect, circulates H₂ water.' },
    { n: '05', t: '30 min after', d: 'Continue sipping H₂ water. Protein-forward meal within 60 minutes if training-adjacent.' },
  ];

  return (
    <div>
      {/* Hero */}
      <section style={{ position: 'relative', minHeight: '72vh', overflow: 'hidden', borderBottom: '1px solid var(--border-subtle)' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${mode.image})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'brightness(0.55) saturate(1.15)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(10,10,11,0.30) 0%, rgba(10,10,11,0.75) 70%, var(--black) 100%)' }} />
        <div style={{ position: 'relative', maxWidth: 'var(--page-max)', margin: '0 auto', padding: '120px 28px 96px' }}>
          <button onClick={onBack} style={{ background: 'transparent', border: '1px solid var(--border)', color: 'var(--fg-2)', padding: '8px 16px', fontSize: 11, letterSpacing: 'var(--tr-eyebrow)', textTransform: 'uppercase', cursor: 'pointer', marginBottom: 48 }}>
            ← All Protocols
          </button>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 28, marginBottom: 20 }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 72, fontWeight: 700, color: 'var(--accent)', lineHeight: 1, letterSpacing: '-0.02em' }}>{mode.number}</div>
            <Eyebrow>PTx Protocol · {planLabel}</Eyebrow>
          </div>
          <h1 className="display-2" style={{ fontSize: 'clamp(64px, 10vw, 156px)', marginBottom: 28 }}>{mode.name}</h1>
          <p className="lede" style={{ fontSize: 22, maxWidth: '54ch' }}>{mode.tagline}</p>
          <div style={{ display: 'flex', gap: 48, marginTop: 48, flexWrap: 'wrap', borderTop: '1px solid var(--border-subtle)', paddingTop: 32 }}>
            <Stat label="Wavelengths" value={mode.wavelength} />
            <Stat label="Cadence" value="2× / week · 15 min" />
            <Stat label="Plan" value={planLabel} accent={planAccent} />
            <Stat label="Duration" value={duration === 'silver' ? '60 days' : '90 days'} />
          </div>
        </div>
      </section>

      {/* Mechanism */}
      <Section eyebrow="Mechanism" title="How this mode works">
        <p style={{ fontSize: 18, color: 'var(--fg-2)', maxWidth: '70ch', lineHeight: 1.6 }}>{mode.mechanism}</p>
        <p style={{ fontSize: 15, color: 'var(--fg-3)', marginTop: 24, maxWidth: '70ch', fontStyle: 'italic' }}>"{mode.mantra}"</p>
      </Section>

      {/* Session protocol */}
      <Section eyebrow="The Session" title="Session-day protocol" background="var(--bg-raised)">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 2, background: 'var(--border-subtle)' }}>
          {sessionSteps.map((step, i) => (
            <div key={i} style={{ background: 'var(--bg-card)', padding: '32px 24px' }}>
              <div style={{ fontFamily: 'var(--font-display)', color: 'var(--accent)', fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 12 }}>{step.n}</div>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: 11, letterSpacing: 'var(--tr-eyebrow)', textTransform: 'uppercase', color: 'var(--fg-3)', marginBottom: 8 }}>{step.t}</div>
              <div style={{ color: 'var(--fg-2)', fontSize: 14, lineHeight: 1.55 }}>{step.d}</div>
            </div>
          ))}
        </div>

        {/* Methylene blue callout */}
        <div style={{ marginTop: 2, background: 'var(--bg-card)', padding: '32px', display: 'grid', gridTemplateColumns: '160px 1fr', gap: 32, alignItems: 'center', borderTop: '1px solid var(--accent)' }}>
          <div style={{ background: 'white', padding: 12, width: 160, height: 160, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img
              src="https://api.qrserver.com/v1/create-qr-code/?data=https%3A%2F%2Fwww.amazon.com%2Fs%3Fk%3Dearth%2Bharmony%2Bmethylene%2Bblue&size=280x280&margin=0"
              alt="QR code: Earth Harmony methylene blue on Amazon"
              style={{ width: '100%', height: '100%', display: 'block' }}
            />
          </div>
          <div>
            <Eyebrow>Pre-session supplement</Eyebrow>
            <h3 style={{ marginTop: 10, marginBottom: 10 }}>Earth Harmony Methylene Blue</h3>
            <p style={{ color: 'var(--fg-2)', fontSize: 15, maxWidth: '56ch', marginBottom: 14 }}>
              Scan to order, or use the link. Take as directed 30–45 minutes before your red-light session.
              Do <strong>NOT</strong> combine with SSRIs, MAOIs, or other serotonergic medications.
              Discuss with primary physician before taking.
            </p>
            <a
              href="https://www.amazon.com/s?k=earth+harmony+methylene+blue"
              target="_blank" rel="noopener"
              style={{ display: 'inline-block', fontFamily: 'var(--font-sans)', fontSize: 11, letterSpacing: 'var(--tr-eyebrow)', textTransform: 'uppercase', color: 'var(--white)', background: 'var(--accent)', padding: '10px 18px', textDecoration: 'none', fontWeight: 600, border: 'none' }}>
              Order on Amazon →
            </a>
          </div>
        </div>
      </Section>

      {/* Phases */}
      <Section eyebrow={duration === 'silver' ? '60-Day · Silver' : '90-Day · Gold'} title="Phased plan">
        <p className="lede" style={{ marginBottom: 48 }}>
          The daily rhythm below repeats throughout. Phases define emphasis — what to add, what to measure, what to progress. Mode-specific inputs (nutrition, exercise, supplements) sit beneath.
        </p>
        <div style={{ display: 'grid', gap: 2, background: 'var(--border-subtle)' }}>
          {phases.map((p, i) => (
            <div key={i} style={{ background: 'var(--bg-card)', padding: '36px 32px', display: 'grid', gridTemplateColumns: '200px 1fr 1fr', gap: 40, alignItems: 'start' }}>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-3)', letterSpacing: '0.04em' }}>PHASE {String(i+1).padStart(2, '0')}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 600, letterSpacing: '-0.01em', textTransform: 'uppercase', marginTop: 8, lineHeight: 1.1 }}>{p.name}</div>
              </div>
              <div>
                <div style={{ fontSize: 12, letterSpacing: 'var(--tr-eyebrow)', textTransform: 'uppercase', color: 'var(--fg-3)', marginBottom: 8 }}>Goal</div>
                <div style={{ fontSize: 16, color: 'var(--fg-1)', lineHeight: 1.5 }}>{p.goal}</div>
              </div>
              <div>
                <div style={{ fontSize: 12, letterSpacing: 'var(--tr-eyebrow)', textTransform: 'uppercase', color: 'var(--fg-3)', marginBottom: 12 }}>Key moves</div>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                  {p.keys.map((k, j) => (
                    <li key={j} style={{ display: 'flex', gap: 12, marginBottom: 8, color: 'var(--fg-2)', fontSize: 14 }}>
                      <span style={{ color: 'var(--accent)', flex: '0 0 auto' }}>—</span><span>{k}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Daily rhythm */}
      <Section eyebrow="Daily Rhythm" title="Your day, structured" background="var(--bg-raised)">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 2, background: 'var(--border-subtle)' }}>
          {SHARED.dailyRhythm.map((block, i) => (
            <div key={i} style={{ background: 'var(--bg-card)', padding: '32px 28px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--accent)', letterSpacing: '0.04em', marginBottom: 8 }}>{block.block}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '-0.01em', marginBottom: 16 }}>{block.title}</div>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                {block.items.map((item, j) => (
                  <li key={j} style={{ display: 'flex', gap: 10, marginBottom: 10, color: 'var(--fg-2)', fontSize: 14, lineHeight: 1.5 }}>
                    <span style={{ color: 'var(--accent)', flex: '0 0 auto' }}>·</span><span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* Mode-specific inputs */}
      <Section eyebrow="Mode-specific Inputs" title="Nutrition · Exercise · Supplements">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 2, background: 'var(--border-subtle)' }}>
          <InputCard title="Nutrition" subtitle="Organic. Non-GMO. Anti-inflammatory." items={mode.nutrition} />
          <InputCard title="Exercise" subtitle="Movement engineered for this mode." items={mode.exercise} />
          <InputCard title="Supplement emphasis" subtitle="All plans include the full Radius Super Stack below. These are accents." items={mode.supplementEmphasis} />
        </div>

        {mode.renueBlue && (
          <div style={{ marginTop: 2, background: 'var(--bg-card)', padding: '40px 32px', borderTop: '1px solid var(--accent)' }}>
            <Eyebrow>Topical protocol</Eyebrow>
            <h3 style={{ marginTop: 12, marginBottom: 16 }}>{mode.renueBlue.title}</h3>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: 10, maxWidth: '76ch' }}>
              {mode.renueBlue.items.map((it, i) => (
                <li key={i} style={{ display: 'flex', gap: 12, color: 'var(--fg-2)', fontSize: 15, lineHeight: 1.55 }}>
                  <span style={{ color: 'var(--accent)' }}>—</span><span>{it}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Section>

      {/* Radius Super Stack */}
      <section style={{ background: 'var(--bg-raised)', padding: '96px 28px' }}>
        <div style={{ maxWidth: 'var(--page-max)', margin: '0 auto' }}>
          <Eyebrow style={{ marginBottom: 16 }}>Radius Super Stack</Eyebrow>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 40, flexWrap: 'wrap' }}>
            <h2 style={{ fontSize: 'clamp(36px, 4.2vw, 64px)', margin: 0, flex: '0 1 auto' }}>
              Your supplement foundation
            </h2>
            <img
              src="/assets/logo-radius-super-stack.png"
              alt="Radius Super Stack"
              style={{ height: 'clamp(180px, 20vw, 280px)', width: 'auto', flex: '0 0 auto', marginLeft: -12 }}
            />
          </div>
          <div style={{ maxWidth: '70ch', marginBottom: 40 }}>
            <p className="lede" style={{ margin: 0 }}>
              Every plan includes these. Follow the label on each product — the timing column below indicates when in the day to take them, not specific doses.
            </p>
          </div>
          <div style={{ display: 'grid', gap: 2, background: 'var(--border-subtle)' }}>
            {SHARED.supplements.map((s, i) => (
              <div key={i} style={{ background: 'var(--bg-card)', padding: '24px 28px', display: 'grid', gridTemplateColumns: '2fr 1.5fr 3fr', gap: 32, alignItems: 'start' }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--fg-3)' }}>{String(i+1).padStart(2, '0')}</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '-0.01em', marginTop: 4, lineHeight: 1.15 }}>{s.name}</div>
                  {s.link && (
                    <a href={s.link} target="_blank" rel="noopener" style={{ display: 'inline-block', marginTop: 10, fontFamily: 'var(--font-sans)', fontSize: 10, letterSpacing: 'var(--tr-eyebrow)', textTransform: 'uppercase', color: 'var(--accent)', border: '1px solid var(--accent)', padding: '6px 10px', textDecoration: 'none', fontWeight: 600 }}>
                      {s.linkLabel || 'Purchase'} →
                    </a>
                  )}
                </div>
                <div style={{ fontSize: 13, color: 'var(--accent)', letterSpacing: 'var(--tr-eyebrow)', textTransform: 'uppercase', fontWeight: 600 }}>{s.timing}</div>
                <div style={{ fontSize: 14, color: 'var(--fg-2)', lineHeight: 1.55 }}>{s.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Practice library */}
      <Section eyebrow="Practice Library" title="The practices underneath">
        <p className="lede" style={{ marginBottom: 40 }}>
          These are referenced in the daily rhythm and applied universally — modality-agnostic tools that earn their keep in every protocol.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 2, background: 'var(--border-subtle)' }}>
          {Object.entries(SHARED.practices).map(([k, p]) => (
            <div key={k} style={{ background: 'var(--bg-card)', padding: '28px 24px', display: 'flex', flexDirection: 'column' }}>
              <RedRule w={32} style={{ marginBottom: 14 }} />
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '-0.01em', marginBottom: 14, lineHeight: 1.1 }}>{p.title}</div>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', flex: 1 }}>
                {p.lines.map((l, i) => (
                  <li key={i} style={{ color: 'var(--fg-2)', fontSize: 14, marginBottom: 10, lineHeight: 1.5 }}>{l}</li>
                ))}
              </ul>
              {p.video && (
                <div style={{ marginTop: 16, paddingTop: 14, borderTop: '1px solid var(--border-subtle)' }}>
                  <a href={p.video.url} target="_blank" rel="noopener"
                    style={{ fontFamily: 'var(--font-sans)', fontSize: 10, letterSpacing: 'var(--tr-eyebrow)', textTransform: 'uppercase', color: 'var(--accent)', fontWeight: 600, textDecoration: 'none' }}>
                    Watch guided session →
                  </a>
                  <div style={{ fontSize: 10, color: 'var(--fg-3)', marginTop: 4, fontStyle: 'italic' }}>{p.video.credit}</div>
                </div>
              )}
            </div>
          ))}
        </div>
        <div style={{ marginTop: 2, background: 'var(--bg-card)', padding: '28px 24px' }}>
          <RedRule w={32} style={{ marginBottom: 14 }} />
          <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '-0.01em', marginBottom: 14 }}>{SHARED.nutritionBase.title}</div>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
            {SHARED.nutritionBase.lines.map((l, i) => (
              <li key={i} style={{ color: 'var(--fg-2)', fontSize: 14, marginBottom: 10, lineHeight: 1.5 }}>{l}</li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Disclaimer */}
      <section style={{ background: 'var(--bg-raised)', borderTop: '1px solid var(--accent)', padding: '80px 28px 96px' }}>
        <div style={{ maxWidth: 'var(--page-max)', margin: '0 auto' }}>
          <Eyebrow>Important · Not medical advice</Eyebrow>
          <h2 style={{ fontSize: 'clamp(32px, 3.6vw, 56px)', margin: '16px 0 32px', maxWidth: '22ch' }}>Read before you begin.</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
            <div>
              <p style={{ color: 'var(--fg-2)', fontSize: 15, lineHeight: 1.6 }}>{SHARED.disclaimer.short}</p>
              <p style={{ color: 'var(--fg-3)', fontSize: 13, marginTop: 20, lineHeight: 1.6 }}>
                The Radius {mode.name} protocol is designed for generally healthy adults. It is not intended to diagnose, treat, cure, or prevent any disease.
                Individual responses vary. If anything in this guide conflicts with the direction of your licensed physician, defer to your physician.
              </p>
            </div>
            <div>
              <div style={{ fontSize: 12, letterSpacing: 'var(--tr-eyebrow)', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 14, fontWeight: 600 }}>Contraindications</div>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                {SHARED.disclaimer.contraindications.map((c, i) => (
                  <li key={i} style={{ display: 'flex', gap: 10, color: 'var(--fg-2)', fontSize: 14, marginBottom: 8, lineHeight: 1.5 }}>
                    <span style={{ color: 'var(--accent)', flex: '0 0 auto' }}>×</span><span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
