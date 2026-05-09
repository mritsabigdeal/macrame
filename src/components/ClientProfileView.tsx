import { useState, useEffect, useRef } from 'react'
import { CLIENT_PROFILES, TEAM, PROJECTS } from '../lib/data'
import { CLIENT_SEED_MEMORIES } from '../lib/demo/allClients'
import { Avatar } from './Avatar'
import { api } from '../lib/api'
import type { Project } from '../lib/types'

interface ClientProfileViewProps {
  clientId: string
  role: 'agency' | 'client'
  onProjectClick: (project: Project) => void
}

const TAG_COLORS: Record<string, string> = {
  'Ad':          'var(--info)',
  'Social Post': 'var(--accent)',
  'Social Reel': 'var(--accent-2)',
  'Billboard':   'var(--warn)',
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontSize: 10, fontWeight: 600, letterSpacing: '0.10em',
      textTransform: 'uppercase', color: 'var(--fg-subtle)', marginBottom: 10,
    }}>{children}</div>
  )
}

function ProfileChip({ label, value }: { label: string; value: string | number }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', gap: 3, padding: '10px 14px',
      background: 'var(--bg-elevated)', border: '1px solid var(--border)',
      borderRadius: 'var(--radius-sm)',
    }}>
      <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--fg-subtle)' }}>
        {label}
      </span>
      <span style={{ fontSize: 18, fontWeight: 600, color: 'var(--fg)', fontFamily: 'var(--font-mono)' }}>
        {value}
      </span>
    </div>
  )
}

function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  const tagColor = TAG_COLORS[project.tag] ?? 'var(--fg-muted)'
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '14px 16px',
        background: hovered ? 'var(--bg-elevated)' : 'var(--bg-surface)',
        border: `1px solid ${hovered ? 'var(--border-strong)' : 'var(--border)'}`,
        borderRadius: 'var(--radius)',
        display: 'flex', alignItems: 'center', gap: 14,
        opacity: project.status === 'completed' ? 0.65 : 1,
        transition: 'all 0.12s',
        cursor: 'pointer',
      }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--fg)', marginBottom: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {project.title}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{
            fontSize: 10, fontWeight: 600, fontFamily: 'var(--font-mono)',
            color: tagColor,
            padding: '2px 7px', borderRadius: 999,
            background: 'var(--bg-elevated)',
            border: `1px solid var(--border)`,
          }}>
            {project.tag.toUpperCase()}
          </span>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
        {project.status === 'completed' ? (
          <span style={{ fontSize: 11, color: 'var(--success)', fontFamily: 'var(--font-mono)' }}>✓ Done</span>
        ) : (
          <>
            <span style={{ fontSize: 10, color: 'var(--fg-subtle)', fontFamily: 'var(--font-mono)' }}>Due</span>
            <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>{project.dueDate}</span>
          </>
        )}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--fg-subtle)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: hovered ? 1 : 0, transition: 'opacity 0.12s' }}>
          <path d="M9 18l6-6-6-6" />
        </svg>
      </div>
    </div>
  )
}

// Track which clients have been seeded this session
const seededClients = new Set<string>()

export function ClientProfileView({ clientId, role, onProjectClick }: ClientProfileViewProps) {
  const profile = CLIENT_PROFILES[clientId]
  const [ingestStatus, setIngestStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle')
  const abortRef = useRef(false)

  useEffect(() => {
    abortRef.current = false
    if (!profile || seededClients.has(clientId)) {
      if (seededClients.has(clientId)) setIngestStatus('done')
      return
    }

    const seeds = CLIENT_SEED_MEMORIES[clientId]
    if (!seeds?.length) return

    setIngestStatus('loading')
    api.ingest({ clientId, items: seeds })
      .then(() => {
        if (!abortRef.current) {
          seededClients.add(clientId)
          setIngestStatus('done')
        }
      })
      .catch(() => {
        if (!abortRef.current) setIngestStatus('error')
      })

    return () => { abortRef.current = true }
  }, [clientId, profile])

  if (!profile) {
    return <div style={{ padding: 40, color: 'var(--fg-subtle)' }}>Client not found.</div>
  }

  const reviewer = TEAM[profile.leadReviewer]
  const clientProjects = PROJECTS.filter(p => p.clientId === clientId)
  const activeProjects = clientProjects.filter(p => p.status === 'active')
  const completedProjects = clientProjects.filter(p => p.status === 'completed')

  return (
    <div style={{ padding: '28px 32px', maxWidth: 1100 }}>

      {/* Hero */}
      <div style={{
        display: 'flex', alignItems: 'flex-start', gap: 20, marginBottom: 28,
        padding: '24px', background: 'var(--bg-surface)', border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)', borderLeft: `3px solid ${profile.swatch}`,
      }}>
        <div style={{ width: 52, height: 52, borderRadius: 12, background: profile.swatch, flexShrink: 0, opacity: 0.85 }} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <h1 style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 30, fontWeight: 400, color: 'var(--fg)', lineHeight: 1.1, marginBottom: 4 }}>
            {profile.name}
          </h1>
          <p style={{ fontSize: 14, color: 'var(--fg-muted)', marginBottom: 12, fontStyle: 'italic' }}>{profile.tagline}</p>
          <p style={{ fontSize: 13, color: 'var(--fg-muted)', lineHeight: 1.65, maxWidth: 560 }}>{profile.voice}</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flexShrink: 0 }}>
          <div style={{ display: 'flex', gap: 8 }}>
            <ProfileChip label="Assets reviewed" value={profile.reviewedAssets} />
            <ProfileChip label="Avg notes" value={profile.notesAvg} />
          </div>
          {reviewer && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8, padding: '8px 14px',
              background: 'var(--bg-elevated)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)',
            }}>
              <Avatar initials={reviewer.initials} color={reviewer.color} size="sm" />
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, color: reviewer.color }}>{reviewer.name}</div>
                <div style={{ fontSize: 10, color: 'var(--fg-subtle)' }}>Lead reviewer</div>
              </div>
            </div>
          )}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{
              width: 7, height: 7, borderRadius: '50%',
              background: ingestStatus === 'done' ? 'var(--success)' : ingestStatus === 'loading' ? 'var(--warn)' : ingestStatus === 'error' ? 'var(--danger)' : 'var(--border)',
            }} />
            <span style={{ fontSize: 10, color: 'var(--fg-subtle)', fontFamily: 'var(--font-mono)' }}>
              {ingestStatus === 'done' ? 'Memory seeded' : ingestStatus === 'loading' ? 'Seeding…' : ingestStatus === 'error' ? 'Memory error' : 'No memory'}
            </span>
          </div>
        </div>
      </div>

      {/* General Notes panel — static, always visible */}
      <div style={{
        padding: '22px 24px', background: 'var(--bg-surface)', border: '1px solid var(--border)',
        borderRadius: 'var(--radius)', marginBottom: 28,
      }}>
        <SectionLabel>General Notes</SectionLabel>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          {/* Preferences */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--success)', marginBottom: 8, letterSpacing: '0.04em' }}>Responds well to</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {profile.likes.map((item, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'flex-start', gap: 8,
                    padding: '6px 0', borderBottom: '1px solid var(--border)',
                  }}>
                    <span style={{ fontSize: 12, color: 'var(--success)', flexShrink: 0, marginTop: 1, fontWeight: 600 }}>✓</span>
                    <span style={{ fontSize: 13, color: 'var(--fg-muted)', lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--danger)', marginBottom: 8, letterSpacing: '0.04em' }}>Will push back on</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {profile.dislikes.map((item, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'flex-start', gap: 8,
                    padding: '6px 0', borderBottom: '1px solid var(--border)',
                  }}>
                    <span style={{ fontSize: 12, color: 'var(--danger)', flexShrink: 0, marginTop: 1, fontWeight: 600 }}>×</span>
                    <span style={{ fontSize: 13, color: 'var(--fg-muted)', lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quotes + cadence */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--accent)', marginBottom: 8, letterSpacing: '0.04em' }}>Past feedback</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {profile.pastQuotes.map((q, i) => (
                  <blockquote key={i} style={{
                    fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--fg-muted)',
                    borderLeft: '2px solid var(--accent)', paddingLeft: 12, margin: 0, lineHeight: 1.6,
                  }}>{q}</blockquote>
                ))}
              </div>
            </div>
            <div style={{
              padding: '14px 16px', background: 'var(--bg-tint)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius-sm)',
            }}>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--fg-subtle)', marginBottom: 6 }}>Review cadence</div>
              <p style={{ fontSize: 13, color: 'var(--fg-muted)', lineHeight: 1.6, margin: 0 }}>{profile.cadence}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Projects */}
      <div style={{ marginBottom: 40 }}>
        {activeProjects.length > 0 && (
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--fg-subtle)', marginBottom: 12 }}>
              Active Projects · {activeProjects.length}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 10 }}>
              {activeProjects.map(p => (
                <ProjectCard key={p.id} project={p} onClick={() => onProjectClick(p)} />
              ))}
            </div>
          </div>
        )}
        {completedProjects.length > 0 && (
          <div>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--fg-subtle)', marginBottom: 12 }}>
              Completed · {completedProjects.length}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 10 }}>
              {completedProjects.map(p => (
                <ProjectCard key={p.id} project={p} onClick={() => onProjectClick(p)} />
              ))}
            </div>
          </div>
        )}
      </div>

    </div>
  )
}
