import { CLIENTS, TEAM } from '../lib/data'
import { Avatar } from './Avatar'

interface SidebarProps {
  view: string
  selectedClientId: string
  onNavigate: (view: string, clientId?: string) => void
  mobileOpen?: boolean
  onMobileClose?: () => void
}

const DM_MEMBERS = ['theo', 'jules', 'sana', 'kit']

function NavItem({
  icon,
  label,
  badge,
  active,
  onClick,
}: {
  icon: React.ReactNode
  label: string
  badge?: string
  active?: boolean
  onClick?: () => void
}) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '6px 12px',
        width: '100%',
        textAlign: 'left',
        borderRadius: 'var(--radius-sm)',
        background: active ? 'var(--accent-soft)' : 'transparent',
        color: active ? 'var(--accent)' : 'var(--fg-muted)',
        fontSize: 13,
        fontWeight: active ? 500 : 400,
        transition: 'background 0.12s, color 0.12s',
      }}
      onMouseEnter={e => {
        if (!active) {
          ;(e.currentTarget as HTMLButtonElement).style.background = 'var(--bg-tint)'
          ;(e.currentTarget as HTMLButtonElement).style.color = 'var(--fg)'
        }
      }}
      onMouseLeave={e => {
        if (!active) {
          ;(e.currentTarget as HTMLButtonElement).style.background = 'transparent'
          ;(e.currentTarget as HTMLButtonElement).style.color = 'var(--fg-muted)'
        }
      }}
    >
      <span style={{ opacity: 0.7, flexShrink: 0 }}>{icon}</span>
      <span style={{ flex: 1 }}>{label}</span>
      {badge && (
        <span style={{
          fontSize: 10,
          fontWeight: 600,
          background: active ? 'var(--accent)' : 'var(--bg-elevated)',
          color: active ? 'var(--bg-canvas)' : 'var(--fg-subtle)',
          padding: '1px 6px',
          borderRadius: 10,
          letterSpacing: '0.01em',
        }}>{badge}</span>
      )}
    </button>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontSize: 10,
      fontWeight: 600,
      letterSpacing: '0.10em',
      textTransform: 'uppercase',
      color: 'var(--fg-subtle)',
      padding: '0 12px',
      marginBottom: 2,
    }}>
      {children}
    </div>
  )
}

export function Sidebar({ view, selectedClientId, onNavigate, mobileOpen, onMobileClose }: SidebarProps) {
  const mira = TEAM.mira

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          onClick={onMobileClose}
          style={{
            display: 'none',
            position: 'fixed', inset: 0, zIndex: 40,
            background: 'oklch(0.10 0.008 60 / 0.7)',
          }}
          className="mobile-backdrop"
        />
      )}
    <div className={`sidebar${mobileOpen ? ' sidebar-open' : ''}`}>
      {/* Workspace mark */}
      <div style={{
        padding: '14px 14px 12px',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
      }}>
        <div style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: 'linear-gradient(135deg, var(--accent), var(--accent-2))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontSize: 18,
            color: 'oklch(0.12 0.008 60)',
            lineHeight: 1,
            marginTop: 1,
          }}>M</span>
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--fg)', letterSpacing: '0.01em' }}>
            Macrame
          </div>
          <div style={{ fontSize: 11, color: 'var(--fg-subtle)' }}>Content Studio</div>
        </div>
      </div>

      {/* Nav section */}
      <div style={{ padding: '12px 8px 4px', display: 'flex', flexDirection: 'column', gap: 1 }}>
        <NavItem
          icon={<InboxIcon />}
          label="Inbox"
          badge="12"
          active={view === 'inbox'}
          onClick={() => onNavigate('inbox')}
        />
        <NavItem
          icon={<ReviewIcon />}
          label="My Reviews"
          badge="3"
          active={false}
        />
        <NavItem
          icon={<BellIcon />}
          label="Notifications"
          active={false}
        />
      </div>

      <div style={{ height: 1, background: 'var(--border)', margin: '8px 0' }} />

      {/* Clients */}
      <div style={{ padding: '4px 8px', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 1 }}>
        <div style={{ padding: '0 4px', marginBottom: 4 }}>
          <SectionLabel>Clients</SectionLabel>
        </div>
        {CLIENTS.map(client => (
          <button
            key={client.id}
            onClick={() => onNavigate('profile', client.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '5px 12px',
              width: '100%',
              textAlign: 'left',
              borderRadius: 'var(--radius-sm)',
              background: view === 'profile' && selectedClientId === client.id
                ? 'var(--accent-soft)' : 'transparent',
              color: view === 'profile' && selectedClientId === client.id
                ? 'var(--fg)' : 'var(--fg-muted)',
              fontSize: 13,
              fontWeight: view === 'profile' && selectedClientId === client.id ? 500 : 400,
              border: 'none',
              cursor: 'pointer',
              transition: 'background 0.12s, color 0.12s',
            }}
            onMouseEnter={e => {
              const isActive = view === 'profile' && selectedClientId === client.id
              if (!isActive) {
                ;(e.currentTarget as HTMLButtonElement).style.background = 'var(--bg-tint)'
                ;(e.currentTarget as HTMLButtonElement).style.color = 'var(--fg)'
              }
            }}
            onMouseLeave={e => {
              const isActive = view === 'profile' && selectedClientId === client.id
              if (!isActive) {
                ;(e.currentTarget as HTMLButtonElement).style.background = 'transparent'
                ;(e.currentTarget as HTMLButtonElement).style.color = 'var(--fg-muted)'
              }
            }}
          >
            <span style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: client.swatch,
              flexShrink: 0,
            }} />
            <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {client.name}
            </span>
            <span style={{
              fontSize: 10,
              color: 'var(--fg-subtle)',
              fontFamily: 'var(--font-mono)',
            }}>{client.activeProjects}</span>
          </button>
        ))}

        <div style={{ height: 1, background: 'var(--border)', margin: '8px 0' }} />

        {/* DMs */}
        <div style={{ padding: '0 4px', marginBottom: 4 }}>
          <SectionLabel>Direct Messages</SectionLabel>
        </div>
        {DM_MEMBERS.map(id => {
          const person = TEAM[id]
          return (
            <button
              key={id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '4px 12px',
                width: '100%',
                textAlign: 'left',
                borderRadius: 'var(--radius-sm)',
                background: 'transparent',
                color: 'var(--fg-muted)',
                fontSize: 13,
                border: 'none',
                cursor: 'pointer',
                transition: 'background 0.12s, color 0.12s',
              }}
              onMouseEnter={e => {
                ;(e.currentTarget as HTMLButtonElement).style.background = 'var(--bg-tint)'
                ;(e.currentTarget as HTMLButtonElement).style.color = 'var(--fg)'
              }}
              onMouseLeave={e => {
                ;(e.currentTarget as HTMLButtonElement).style.background = 'transparent'
                ;(e.currentTarget as HTMLButtonElement).style.color = 'var(--fg-muted)'
              }}
            >
              <Avatar initials={person.initials} color={person.color} size="sm" name={person.name} />
              <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {person.name}
              </span>
            </button>
          )
        })}
      </div>

      {/* Footer */}
      <div style={{
        padding: '10px 12px',
        borderTop: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
      }}>
        <Avatar initials={mira.initials} color={mira.color} size="sm" name={mira.name} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--fg)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {mira.name}
          </div>
          <div style={{ fontSize: 10, color: 'var(--fg-subtle)' }}>{mira.role}</div>
        </div>
        <button style={{
          width: 24,
          height: 24,
          borderRadius: 'var(--radius-sm)',
          background: 'var(--bg-elevated)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--fg-subtle)',
          flexShrink: 0,
        }}>
          <SettingsIcon />
        </button>
      </div>
    </div>
    </>
  )
}

// Minimal inline SVG icons
function InboxIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 4h12l-1.5 7H3.5L2 4z"/>
      <path d="M5.5 11v2.5h5V11"/>
    </svg>
  )
}

function ReviewIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="12" height="12" rx="2"/>
      <path d="M5 8l2 2 4-4"/>
    </svg>
  )
}

function BellIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 2a4 4 0 0 1 4 4v3l1 2H3l1-2V6a4 4 0 0 1 4-4z"/>
      <path d="M6.5 13a1.5 1.5 0 0 0 3 0"/>
    </svg>
  )
}

function SettingsIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="8" r="2"/>
      <path d="M8 2v1M8 13v1M2 8h1M13 8h1M4.2 4.2l.7.7M11.1 11.1l.7.7M11.1 4.9l-.7.7M4.9 11.1l-.7.7"/>
    </svg>
  )
}
