import { useState, useRef, useEffect } from 'react'
import { TEAM } from '../lib/data'
import { Avatar } from './Avatar'

interface ChatPanelProps {
  selectedClientId: string
}

type Tab = 'project' | 'asset'

interface Message {
  id: string
  authorId: string
  timestamp: string
  body: string
  system?: boolean
}

const PROJECT_MESSAGES: Message[] = [
  { id: 'm1', authorId: 'jules', timestamp: '9:14 AM', body: "Delivered v3 of the hero image to Daniel and Aya this morning. Waiting on their notes." },
  { id: 'm2', authorId: 'theo', timestamp: '9:31 AM', body: "Nice. I made one more pass on the crop — moved the cup slightly left, negative space is cleaner for the headline." },
  { id: 'm3', authorId: 'system', timestamp: '9:45 AM', body: "Hero — Counter Ritual moved to Client Review", system: true },
  { id: 'm4', authorId: 'mira', timestamp: '10:02 AM', body: "Let me know the second Daniel replies. Based on the last round he'll go straight to the orange saturation." },
  { id: 'm5', authorId: 'sana', timestamp: '10:18 AM', body: "I tightened the tagline copy on the secondary frames. Removed two adjectives, feels closer to their voice now." },
  { id: 'm6', authorId: 'jules', timestamp: '11:30 AM', body: "Daniel came back — 4 notes as expected. The orange, a caption alignment, and two line-level copy changes. Sending to Theo now." },
  { id: 'm7', authorId: 'theo', timestamp: '11:42 AM', body: "Got it. I'll address the orange first and get a new export by 2pm." },
  { id: 'm8', authorId: 'mira', timestamp: '11:50 AM', body: "Good. If the orange is still reading warm, try cooling the highlight slightly rather than pulling the saturation globally. That's what worked on the Lumen brass." },
]

const ASSET_MESSAGES: Message[] = [
  { id: 'a1', authorId: 'theo', timestamp: '8:55 AM', body: "Framing is locked. Used the upper-left negative space like Daniel usually wants — headline will sit cleanly there." },
  { id: 'a2', authorId: 'mira', timestamp: '9:05 AM', body: "Good instinct. The ceramic hand position reads really nicely — texture is doing the work." },
  { id: 'a3', authorId: 'system', timestamp: '9:45 AM', body: "Asset sent to client for review", system: true },
  { id: 'a4', authorId: 'daniel', timestamp: '10:58 AM', body: "Pull the orange back about 10%. The cup is competing with the hand and I want the hand to win." },
  { id: 'a5', authorId: 'aya', timestamp: '11:04 AM', body: "Agreed on the orange. Otherwise it feels right — the quietness is there." },
  { id: 'a6', authorId: 'theo', timestamp: '11:22 AM', body: "On it. Will desaturate the orange channel and push a new export shortly." },
]

function ChatMessage({ msg }: { msg: Message }) {
  if (msg.system) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '6px 0',
      }}>
        <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
        <span style={{
          fontSize: 11,
          color: 'var(--fg-subtle)',
          fontFamily: 'var(--font-mono)',
          whiteSpace: 'nowrap',
        }}>{msg.body}</span>
        <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
      </div>
    )
  }

  const person = TEAM[msg.authorId]
  if (!person) return null

  const isClient = person.org === 'client'

  return (
    <div style={{
      display: 'flex',
      gap: 8,
      alignItems: 'flex-start',
      padding: isClient ? '8px 10px' : '6px 0',
      background: isClient ? 'var(--bg-tint)' : 'transparent',
      borderRadius: isClient ? 'var(--radius-sm)' : 0,
      margin: isClient ? '4px 0' : 0,
    }}>
      <Avatar initials={person.initials} color={person.color} size="sm" name={person.name} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 3 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: person.color }}>{person.name}</span>
          <span style={{ fontSize: 10, color: 'var(--fg-subtle)', fontFamily: 'var(--font-mono)' }}>
            {msg.timestamp}
          </span>
          {isClient && (
            <span style={{
              fontSize: 9,
              fontWeight: 600,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: 'var(--accent)',
              background: 'var(--accent-soft)',
              padding: '1px 5px',
              borderRadius: 3,
            }}>Client</span>
          )}
        </div>
        <p style={{
          fontSize: 13,
          color: 'var(--fg-muted)',
          lineHeight: 1.55,
          margin: 0,
        }}>{msg.body}</p>
      </div>
    </div>
  )
}

export function ChatPanel({ selectedClientId }: ChatPanelProps) {
  const [tab, setTab] = useState<Tab>('project')
  const [input, setInput] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)

  const messages = tab === 'project' ? PROJECT_MESSAGES : ASSET_MESSAGES

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [tab])

  function handleSend() {
    if (!input.trim()) return
    setInput('')
    // In a real app, send the message
  }

  return (
    <div className="chat-panel">
      {/* Header */}
      <div style={{
        padding: '0 14px',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'stretch',
        gap: 0,
      }}>
        {(['project', 'asset'] as Tab[]).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              padding: '14px 12px 13px',
              fontSize: 12,
              fontWeight: tab === t ? 600 : 400,
              color: tab === t ? 'var(--fg)' : 'var(--fg-subtle)',
              borderBottom: `2px solid ${tab === t ? 'var(--accent)' : 'transparent'}`,
              background: 'transparent',
              marginBottom: -1,
              transition: 'color 0.12s',
            }}
          >
            #{t}
          </button>
        ))}

        <div style={{ flex: 1 }} />

        <button style={{
          padding: '0 8px',
          color: 'var(--fg-subtle)',
          display: 'flex',
          alignItems: 'center',
        }}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <circle cx="8" cy="8" r="1"/><circle cx="13" cy="8" r="1"/><circle cx="3" cy="8" r="1"/>
          </svg>
        </button>
      </div>

      {/* Messages */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '14px 14px',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}>
        <div style={{
          fontSize: 11,
          color: 'var(--fg-subtle)',
          textAlign: 'center',
          padding: '6px 0 12px',
        }}>
          Today — {tab === 'project' ? 'Field Notes Spring \'26' : 'Hero — Counter Ritual'}
        </div>

        {messages.map(msg => (
          <ChatMessage key={msg.id} msg={msg} />
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Participants */}
      <div style={{
        padding: '8px 14px',
        borderTop: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        gap: 6,
      }}>
        {['mira', 'theo', 'jules', 'daniel'].map(id => {
          const p = TEAM[id]
          return <Avatar key={id} initials={p.initials} color={p.color} size="sm" name={p.name} />
        })}
        <span style={{ fontSize: 11, color: 'var(--fg-subtle)', marginLeft: 4 }}>
          4 in thread
        </span>
      </div>

      {/* Input */}
      <div style={{
        padding: '10px 12px',
        borderTop: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'flex-end',
        gap: 8,
      }}>
        <div style={{
          flex: 1,
          background: 'var(--bg-input)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-sm)',
          padding: '8px 12px',
          display: 'flex',
          alignItems: 'flex-end',
          gap: 8,
        }}>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleSend()
              }
            }}
            placeholder={`Message #${tab}...`}
            rows={1}
            style={{
              flex: 1,
              background: 'none',
              border: 'none',
              outline: 'none',
              resize: 'none',
              fontSize: 13,
              color: 'var(--fg)',
              lineHeight: 1.5,
              fontFamily: 'var(--font-ui)',
              maxHeight: 120,
            }}
          />
        </div>
        <button
          onClick={handleSend}
          style={{
            width: 34,
            height: 34,
            borderRadius: 'var(--radius-sm)',
            background: input.trim() ? 'var(--accent)' : 'var(--bg-elevated)',
            border: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: input.trim() ? 'oklch(0.12 0.008 60)' : 'var(--fg-subtle)',
            transition: 'all 0.15s',
            flexShrink: 0,
          }}
        >
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2L2 7l5 2 2 5 5-12z"/>
          </svg>
        </button>
      </div>
    </div>
  )
}
