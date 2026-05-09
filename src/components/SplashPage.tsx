interface SplashPageProps {
  onEnter: () => void
}

export function SplashPage({ onEnter }: SplashPageProps) {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg-canvas)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'auto',
    }}>

      {/* Nav */}
      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '22px 48px',
        borderBottom: '1px solid var(--border)',
      }}>
        <div style={{
          fontFamily: 'var(--font-display)', fontStyle: 'italic',
          fontSize: 22, color: 'var(--fg)', letterSpacing: '-0.01em',
        }}>
          Macrame
        </div>
        <button
          onClick={onEnter}
          style={{
            fontSize: 13, fontWeight: 500, padding: '8px 18px',
            borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)',
            color: 'var(--fg-muted)', background: 'var(--bg-surface)',
            cursor: 'pointer', transition: 'all 0.15s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'var(--border-strong)'
            e.currentTarget.style.color = 'var(--fg)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'var(--border)'
            e.currentTarget.style.color = 'var(--fg-muted)'
          }}
        >
          Open the studio
        </button>
      </nav>

      {/* Hero */}
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '80px 48px 60px', textAlign: 'center',
      }}>

        {/* Eyebrow */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '5px 14px', borderRadius: 999,
          border: '1px solid var(--border)',
          background: 'var(--bg-surface)',
          marginBottom: 36,
        }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)' }} />
          <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--fg-subtle)', letterSpacing: '0.06em' }}>
            PRE-DELIVERY REVIEW AGENT
          </span>
        </div>

        {/* Headline */}
        <h1 style={{
          fontFamily: 'var(--font-display)', fontStyle: 'italic',
          fontSize: 'clamp(42px, 7vw, 80px)', fontWeight: 400,
          color: 'var(--fg)', lineHeight: 1.05, letterSpacing: '-0.02em',
          marginBottom: 28, maxWidth: 820,
        }}>
          Know your client<br />before they speak.
        </h1>

        {/* Body */}
        <p style={{
          fontSize: 18, color: 'var(--fg-muted)', lineHeight: 1.7,
          maxWidth: 560, marginBottom: 48,
        }}>
          Creative teams spend hours in revision cycles because they can't predict how a client will react. Macrame changes that. Upload your asset before delivery — and get AI feedback that sounds exactly like your client, drawn from every note they've ever left.
        </p>

        {/* CTA */}
        <button
          onClick={onEnter}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            padding: '14px 32px', borderRadius: 'var(--radius)',
            background: 'var(--accent)', border: 'none',
            color: 'oklch(0.12 0.008 60)', fontSize: 15, fontWeight: 600,
            cursor: 'pointer', transition: 'opacity 0.15s',
            letterSpacing: '-0.01em',
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        >
          Open the studio
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Feature trio */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 1, borderTop: '1px solid var(--border)',
        background: 'var(--border)',
      }}>
        {[
          {
            label: 'Memory-powered',
            icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
              </svg>
            ),
            body: 'Every past note, preference, and rejection is ingested and recalled at the exact moment you need it.',
          },
          {
            label: 'Format-aware',
            icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>
              </svg>
            ),
            body: 'Ad feedback is different from reel feedback. Macrame knows the difference and recalls accordingly.',
          },
          {
            label: 'Delivery-ready',
            icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            ),
            body: 'Know the revision risks before the client sees it. Frame your delivery to get to approval faster.',
          },
        ].map(({ label, icon, body }) => (
          <div key={label} style={{
            padding: '40px 40px',
            background: 'var(--bg-canvas)',
            display: 'flex', flexDirection: 'column', gap: 14,
          }}>
            <div style={{ color: 'var(--accent)' }}>{icon}</div>
            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--fg)' }}>{label}</div>
            <p style={{ fontSize: 13, color: 'var(--fg-muted)', lineHeight: 1.65 }}>{body}</p>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{
        padding: '24px 48px',
        borderTop: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 16, color: 'var(--fg-subtle)' }}>
          Macrame
        </span>
        <span style={{ fontSize: 12, color: 'var(--fg-subtle)' }}>
          Built for creative agencies who've been burned by round three.
        </span>
      </div>

    </div>
  )
}
