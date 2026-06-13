import type { ReactNode } from 'react'

// White card option (used in the 2x2 grids). Highlights when selected.
export default function OptionCard({
  label,
  emoji,
  icon,
  selected,
  onClick,
}: {
  label: string
  emoji?: string
  icon?: ReactNode
  selected: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      style={{
        background: selected ? '#F2EFFE' : '#fff',
        border: selected ? '2.5px solid #6F61E8' : '2.5px solid transparent',
        borderRadius: 18,
        padding: '18px 14px',
        minHeight: 116,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        textAlign: 'center',
        boxShadow: selected
          ? '0 8px 20px rgba(79,63,168,0.22)'
          : '0 6px 16px rgba(79,63,168,0.12)',
        transition: 'all 0.15s ease',
        transform: selected ? 'translateY(-2px)' : 'none',
      }}
    >
      <span style={{ fontSize: 28, lineHeight: 1 }}>{icon ?? emoji}</span>
      <span style={{ fontSize: 14.5, fontWeight: 600, color: '#2B2350', lineHeight: 1.25 }}>
        {label}
      </span>
    </button>
  )
}
