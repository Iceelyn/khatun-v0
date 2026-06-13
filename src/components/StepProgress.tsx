// Top-center progress: current step = elongated pill, others = small dots.
export default function StepProgress({ total, current }: { total: number; current: number }) {
  return (
    <div style={{ display: 'flex', gap: 8, justifyContent: 'center', alignItems: 'center' }}>
      {Array.from({ length: total }).map((_, i) => {
        const active = i === current
        return (
          <span
            key={i}
            style={{
              height: 8,
              width: active ? 30 : 8,
              borderRadius: 999,
              background: active ? '#fff' : 'rgba(255,255,255,0.4)',
              transition: 'width 0.3s ease, background 0.3s ease',
            }}
          />
        )
      })}
    </div>
  )
}
