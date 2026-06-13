export default function PageDots({ count, active }: { count: number; active: number }) {
  return (
    <div style={{ display: 'flex', gap: 8, justifyContent: 'center', alignItems: 'center' }}>
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          style={{
            height: 8,
            width: i === active ? 22 : 8,
            borderRadius: 999,
            background: i === active ? '#fff' : 'rgba(255,255,255,0.45)',
            transition: 'width 0.25s ease, background 0.25s ease',
          }}
        />
      ))}
    </div>
  )
}
