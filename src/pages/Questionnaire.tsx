// NOTE: stub for Milestone 1 — full guided questionnaire arrives in Milestone 2.
export type Answers = {
  balance: string
  goal: string
  risk: string
}

export default function Questionnaire({ onComplete }: { onComplete: (a: Answers) => void }) {
  return (
    <div style={{ padding: 40, textAlign: 'center', marginTop: 80 }}>
      <h2 style={{ fontWeight: 800 }}>Асуумж (M2-т нэмэгдэнэ)</h2>
      <button
        style={{ marginTop: 24, color: '#6F61E8', background: '#fff', padding: '12px 20px', borderRadius: 999, fontWeight: 700 }}
        onClick={() => onComplete({ balance: '—', goal: '—', risk: '—' })}
      >
        Үргэлжлүүлэх →
      </button>
    </div>
  )
}
