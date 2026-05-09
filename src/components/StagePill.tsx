interface StagePillProps {
  stage: string
}

function stageStyle(stage: string): { bg: string; color: string; dot: string } {
  switch (stage) {
    case 'draft':
      return { bg: 'var(--bg-elevated)', color: 'var(--fg-subtle)', dot: 'var(--fg-subtle)' }
    case 'internal':
      return { bg: 'var(--info-soft)', color: 'var(--info)', dot: 'var(--info)' }
    case 'client':
      return { bg: 'var(--accent-soft)', color: 'var(--accent)', dot: 'var(--accent)' }
    case 'approved':
      return { bg: 'var(--success-soft)', color: 'var(--success)', dot: 'var(--success)' }
    case 'changes':
      return { bg: 'var(--accent-2-soft)', color: 'var(--accent-2)', dot: 'var(--accent-2)' }
    default:
      return { bg: 'var(--bg-elevated)', color: 'var(--fg-muted)', dot: 'var(--fg-muted)' }
  }
}

export function StagePill({ stage }: StagePillProps) {
  const { bg, color, dot } = stageStyle(stage)
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      background: bg,
      color,
      fontSize: 11,
      fontWeight: 500,
      padding: '2px 8px',
      borderRadius: 20,
      letterSpacing: '0.02em',
      whiteSpace: 'nowrap',
    }}>
      <span style={{ width: 5, height: 5, borderRadius: '50%', background: dot, flexShrink: 0 }} />
      {stage}
    </span>
  )
}
