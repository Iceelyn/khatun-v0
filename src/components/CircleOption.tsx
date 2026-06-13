// Circular emoji option (used for the risk question — a row of 3).
export default function CircleOption({
  emoji,
  label,
  selected,
  onClick,
}: {
  emoji: string
  label: string
  selected: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 10,
        flex: 1,
      }}
    >
      <span
        style={{
          width: 78,
          height: 78,
          borderRadius: '50%',
          background: selected ? '#fff' : 'rgba(255,255,255,0.18)',
          border: selected ? '3px solid #fff' : '3px solid rgba(255,255,255,0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 34,
          boxShadow: selected ? '0 8px 22px rgba(79,63,168,0.3)' : 'none',
          transform: selected ? 'scale(1.06)' : 'scale(1)',
          transition: 'all 0.18s ease',
        }}
      >
        {emoji}
      </span>
      <span
        style={{
          fontSize: 13.5,
          fontWeight: selected ? 700 : 500,
          color: '#fff',
          opacity: selected ? 1 : 0.85,
          textAlign: 'center',
        }}
      >
        {label}
      </span>
    </button>
  )
}
