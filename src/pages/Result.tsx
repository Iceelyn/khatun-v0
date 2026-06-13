// NOTE: stub for Milestone 1 — AI result screen arrives in Milestone 3.
import type { Answers } from './Questionnaire'

export default function Result({ answers, onRestart }: { answers: Answers; onRestart: () => void }) {
  return (
    <div style={{ padding: 40, textAlign: 'center', marginTop: 80 }}>
      <h2 style={{ fontWeight: 800 }}>Хатаны зөвлөмж (M3-т нэмэгдэнэ)</h2>
      <pre style={{ marginTop: 16, color: 'rgba(255,255,255,0.85)' }}>{JSON.stringify(answers, null, 2)}</pre>
      <button
        style={{ marginTop: 24, color: '#6F61E8', background: '#fff', padding: '12px 20px', borderRadius: 999, fontWeight: 700 }}
        onClick={onRestart}
      >
        Дахин эхлэх
      </button>
    </div>
  )
}
