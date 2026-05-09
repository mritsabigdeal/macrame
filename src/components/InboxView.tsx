import { INBOX_ITEMS, CLIENTS } from '../lib/data'
import { StagePill } from './StagePill'

interface InboxViewProps {
  role: 'agency' | 'client'
  onOpenProfile: (clientId: string) => void
}

function TypeBadge({ type }: { type: 'image' | 'video' }) {
  return (
    <span style={{
      fontSize: 10,
      fontWeight: 600,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: type === 'video' ? 'var(--accent-2)' : 'var(--fg-subtle)',
      background: type === 'video' ? 'var(--accent-2-soft)' : 'var(--bg-elevated)',
      padding: '2px 7px',
      borderRadius: 4,
      fontFamily: 'var(--font-mono)',
    }}>
      {type}
    </span>
  )
}

function PriorityDot({ priority }: { priority: 'high' | 'normal' }) {
  if (priority !== 'high') return null
  return (
    <span style={{
      width: 6,
      height: 6,
      borderRadius: '50%',
      background: 'var(--accent)',
      flexShrink: 0,
      boxShadow: '0 0 5px var(--accent)',
    }} title="High priority" />
  )
}

export function InboxView({ role, onOpenProfile }: InboxViewProps) {
  const items = role === 'client'
    ? INBOX_ITEMS.filter(i => i.stage === 'client')
    : INBOX_ITEMS

  return (
    <div style={{ padding: '28px 32px' }}>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontStyle: 'italic',
          fontSize: 28,
          fontWeight: 400,
          color: 'var(--fg)',
          lineHeight: 1.2,
          marginBottom: 6,
        }}>Inbox</h1>
        <p style={{ fontSize: 13, color: 'var(--fg-subtle)' }}>
          {items.length} item{items.length !== 1 ? 's' : ''} awaiting attention
        </p>
      </div>

      {/* Table header */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 180px 100px 80px 80px 32px',
        gap: 12,
        padding: '6px 16px',
        marginBottom: 4,
      }}>
        {['Asset', 'Project', 'Stage', 'Request', 'Age', ''].map((h, i) => (
          <span key={i} style={{
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--fg-subtle)',
          }}>{h}</span>
        ))}
      </div>

      {/* Items */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {items.map(item => {
          const client = CLIENTS.find(c => c.id === item.clientId)
          const isHigh = item.priority === 'high'

          return (
            <div
              key={item.id}
              onClick={() => onOpenProfile(item.clientId)}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 180px 100px 80px 80px 32px',
                gap: 12,
                alignItems: 'center',
                padding: '11px 16px',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border)',
                borderLeft: isHigh ? '2.5px solid var(--accent)' : '1px solid var(--border)',
                borderRadius: 'var(--radius-sm)',
                cursor: 'pointer',
                transition: 'background 0.12s, border-color 0.12s',
              }}
              onMouseEnter={e => {
                ;(e.currentTarget as HTMLDivElement).style.background = 'var(--bg-elevated)'
                ;(e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border-strong)'
                if (isHigh) (e.currentTarget as HTMLDivElement).style.borderLeftColor = 'var(--accent)'
              }}
              onMouseLeave={e => {
                ;(e.currentTarget as HTMLDivElement).style.background = 'var(--bg-surface)'
                ;(e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border)'
                if (isHigh) (e.currentTarget as HTMLDivElement).style.borderLeftColor = 'var(--accent)'
              }}
            >
              {/* Asset name */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
                <span style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: client?.swatch ?? 'var(--fg-subtle)',
                  flexShrink: 0,
                }} />
                <div style={{ minWidth: 0 }}>
                  <div style={{
                    fontSize: 13,
                    fontWeight: 500,
                    color: 'var(--fg)',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}>{item.assetName}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
                    <TypeBadge type={item.type} />
                  </div>
                </div>
              </div>

              {/* Project */}
              <div style={{
                fontSize: 12,
                color: 'var(--fg-muted)',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}>{item.project}</div>

              {/* Stage */}
              <StagePill stage={item.stage} />

              {/* Request */}
              <div style={{
                fontSize: 12,
                color: 'var(--fg-subtle)',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}>{item.request}</div>

              {/* Age */}
              <div style={{
                fontSize: 12,
                color: 'var(--fg-subtle)',
                fontFamily: 'var(--font-mono)',
              }}>{item.age}</div>

              {/* Priority */}
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <PriorityDot priority={item.priority} />
              </div>
            </div>
          )
        })}
      </div>

      {/* Empty state for client role */}
      {items.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '60px 0',
          color: 'var(--fg-subtle)',
          fontSize: 14,
        }}>
          No items awaiting your review.
        </div>
      )}
    </div>
  )
}
