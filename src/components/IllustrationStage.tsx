import type { ReactNode } from 'react'

// Upper ~60% soft-lavender area with a curved bottom edge, holding a large
// cute illustration. Used on every onboarding screen.
export default function IllustrationStage({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        position: 'relative',
        flex: '0 0 58%',
        minHeight: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* pale lavender backdrop with a curved bottom */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'var(--lavender-tint)',
          borderBottomLeftRadius: '46% 22%',
          borderBottomRightRadius: '46% 22%',
        }}
      />
      <div
        style={{
          position: 'relative',
          width: '76%',
          maxWidth: 280,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {children}
      </div>
    </div>
  )
}
