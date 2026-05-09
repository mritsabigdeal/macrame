interface EvidenceCardProps {
  text: string
  index: number
}

export function EvidenceCard({ text, index }: EvidenceCardProps) {
  return (
    <div style={{
      display: 'flex',
      gap: 12,
      padding: '10px 12px',
      background: 'var(--bg-canvas)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-sm)',
    }}>
      <span style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        color: 'var(--accent)',
        marginTop: 1,
        flexShrink: 0,
        opacity: 0.7,
      }}>
        {String(index + 1).padStart(2, '0')}
      </span>
      <p style={{
        fontSize: 13,
        color: 'var(--fg-muted)',
        lineHeight: 1.55,
      }}>{text}</p>
    </div>
  )
}
