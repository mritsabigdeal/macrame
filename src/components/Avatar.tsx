interface AvatarProps {
  initials: string
  color: string
  size?: 'sm' | 'md' | 'lg'
  name?: string
}

const sizes = {
  sm: { width: 24, height: 24, fontSize: 10 },
  md: { width: 32, height: 32, fontSize: 12 },
  lg: { width: 44, height: 44, fontSize: 16 },
}

export function Avatar({ initials, color, size = 'md', name }: AvatarProps) {
  const { width, height, fontSize } = sizes[size]
  return (
    <div
      title={name}
      style={{
        width,
        height,
        borderRadius: '50%',
        background: `${color} / 0.18`,
        backgroundColor: color.replace(')', ' / 0.22)').replace('oklch(', 'oklch('),
        border: `1.5px solid ${color}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize,
        fontWeight: 600,
        color,
        letterSpacing: '0.01em',
        flexShrink: 0,
        userSelect: 'none',
      }}
    >
      {initials}
    </div>
  )
}
