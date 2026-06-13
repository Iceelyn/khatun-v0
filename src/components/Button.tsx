import type { CSSProperties, ReactNode } from 'react'

type Variant = 'solid' | 'outline'

const base: CSSProperties = {
  width: '100%',
  padding: '16px 20px',
  borderRadius: '999px',
  fontSize: '17px',
  fontWeight: 700,
  transition: 'transform 0.12s ease, opacity 0.2s ease, background 0.2s ease',
}

export default function Button({
  children,
  onClick,
  variant = 'solid',
  disabled = false,
}: {
  children: ReactNode
  onClick?: () => void
  variant?: Variant
  disabled?: boolean
}) {
  const style: CSSProperties =
    variant === 'solid'
      ? {
          ...base,
          background: '#fff',
          color: '#6F61E8',
          boxShadow: '0 10px 24px rgba(79, 63, 168, 0.25)',
        }
      : {
          ...base,
          background: 'transparent',
          color: '#fff',
          border: '2px solid rgba(255,255,255,0.9)',
        }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        ...style,
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
      onPointerDown={(e) => {
        if (!disabled) e.currentTarget.style.transform = 'scale(0.97)'
      }}
      onPointerUp={(e) => {
        e.currentTarget.style.transform = 'scale(1)'
      }}
      onPointerLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)'
      }}
    >
      {children}
    </button>
  )
}
