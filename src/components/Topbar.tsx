import { CLIENTS } from '../lib/data'

interface TopbarProps {
  view: string
  selectedClientId: string
  role: 'agency' | 'client'
  onRoleToggle: () => void
  chatOpen: boolean
  onChatToggle: () => void
  onMenuToggle: () => void
}

function breadcrumb(view: string, selectedClientId: string) {
  const client = CLIENTS.find(c => c.id === selectedClientId)
  if (view === 'inbox') return ['Inbox']
  if (view === 'profile') return [client?.name ?? 'Client', 'Client Profile']
  if (view === 'project-detail') return [client?.name ?? 'Client', 'Project']
  return ['Macrame']
}

export function Topbar({ view, selectedClientId, role, onRoleToggle, chatOpen, onChatToggle, onMenuToggle }: TopbarProps) {
  const crumbs = breadcrumb(view, selectedClientId)

  return (
    <div className="topbar">
      {/* Hamburger — mobile only */}
      <button
        onClick={onMenuToggle}
        className="menu-btn"
        style={{
          display: 'none',
          alignItems: 'center', justifyContent: 'center',
          width: 32, height: 32, borderRadius: 'var(--radius-sm)',
          color: 'var(--fg-muted)', flexShrink: 0,
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <path d="M3 6h18M3 12h18M3 18h18"/>
        </svg>
      </button>

      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, flex: 1, minWidth: 0 }}>
        {crumbs.map((crumb, i) => (
          <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, minWidth: 0 }}>
            {i > 0 && (
              <span style={{ color: 'var(--fg-subtle)', fontSize: 13 }}>/</span>
            )}
            <span style={{
              fontSize: 13,
              color: i === crumbs.length - 1 ? 'var(--fg)' : 'var(--fg-subtle)',
              fontWeight: i === crumbs.length - 1 ? 500 : 400,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}>{crumb}</span>
          </span>
        ))}
      </div>

      {/* Search */}
      <div className="topbar-search" style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        background: 'var(--bg-input)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-sm)',
        padding: '5px 10px',
        width: 220,
        flexShrink: 0,
      }}>
        <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="var(--fg-subtle)" strokeWidth="1.5" strokeLinecap="round">
          <circle cx="6.5" cy="6.5" r="4.5"/>
          <path d="M10 10l3 3"/>
        </svg>
        <span style={{ fontSize: 12, color: 'var(--fg-subtle)', flex: 1 }}>Search...</span>
        <kbd style={{
          fontSize: 10,
          color: 'var(--fg-subtle)',
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border)',
          borderRadius: 4,
          padding: '1px 5px',
          fontFamily: 'var(--font-ui)',
          letterSpacing: '0.01em',
        }}>⌘K</kbd>
      </div>

      {/* Right controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
        {/* Role toggle */}
        <div style={{
          display: 'flex',
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-sm)',
          padding: 2,
          gap: 2,
        }}>
          {(['agency', 'client'] as const).map(r => (
            <button
              key={r}
              onClick={() => { if (role !== r) onRoleToggle() }}
              style={{
                fontSize: 11,
                fontWeight: 500,
                padding: '3px 10px',
                borderRadius: 5,
                background: role === r ? 'var(--accent)' : 'transparent',
                color: role === r ? 'oklch(0.12 0.008 60)' : 'var(--fg-subtle)',
                transition: 'all 0.15s',
                letterSpacing: '0.02em',
                textTransform: 'capitalize',
              }}
            >
              {r === 'agency' ? 'Agency' : 'Client'}
            </button>
          ))}
        </div>

        {/* Share */}
        <button style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          fontSize: 12,
          fontWeight: 500,
          color: 'var(--fg-muted)',
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-sm)',
          padding: '5px 12px',
          transition: 'all 0.12s',
        }}
        onMouseEnter={e => {
          ;(e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border-strong)'
          ;(e.currentTarget as HTMLButtonElement).style.color = 'var(--fg)'
        }}
        onMouseLeave={e => {
          ;(e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border)'
          ;(e.currentTarget as HTMLButtonElement).style.color = 'var(--fg-muted)'
        }}
        >
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="13" cy="3" r="1.5"/>
            <circle cx="3" cy="8" r="1.5"/>
            <circle cx="13" cy="13" r="1.5"/>
            <path d="M4.5 7.5l7-3.5M4.5 8.5l7 3.5"/>
          </svg>
          Share
        </button>

        {/* Upload */}
        <button className="upload-btn" style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          fontSize: 12,
          fontWeight: 500,
          color: 'oklch(0.12 0.008 60)',
          background: 'var(--accent)',
          border: '1px solid transparent',
          borderRadius: 'var(--radius-sm)',
          padding: '5px 12px',
          transition: 'opacity 0.12s',
        }}
        onMouseEnter={e => { ;(e.currentTarget as HTMLButtonElement).style.opacity = '0.88' }}
        onMouseLeave={e => { ;(e.currentTarget as HTMLButtonElement).style.opacity = '1' }}
        >
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 2v9M5 5l3-3 3 3"/>
            <path d="M2 12v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-1"/>
          </svg>
          Upload asset
        </button>

        {/* Chat toggle */}
        <button
          onClick={onChatToggle}
          title={chatOpen ? 'Hide chat' : 'Show chat'}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: 30, height: 30, borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border)',
            background: chatOpen ? 'var(--bg-elevated)' : 'transparent',
            color: chatOpen ? 'var(--fg)' : 'var(--fg-subtle)',
            transition: 'all 0.15s', flexShrink: 0,
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border-strong)' }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border)' }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
        </button>
      </div>
    </div>
  )
}
