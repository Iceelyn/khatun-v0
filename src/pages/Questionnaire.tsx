import { useState } from 'react'
import Button from '../components/Button'
import StepProgress from '../components/StepProgress'
import OptionCard from '../components/OptionCard'
import CircleOption from '../components/CircleOption'

export type Answers = {
  balance: string
  goal: string
  risk: string
}

const Q1_OPTIONS = [
  'Бараг үлддэггүй 😅',
  '100,000₮ хүртэл 🪙',
  '100,000–300,000₮ 💵',
  '300,000₮-с дээш 💰',
]

const Q2_OPTIONS = [
  'Хадгаламжаа өсгөх 📈',
  'Инфляциас хамгаалах 🛡️',
  'Тодорхой зорилгод хуримтлуулах 🏠',
  'Зүгээр л эхлэх ✨',
]

const Q3_OPTIONS = [
  { emoji: '🐢', label: 'Болгоомжтой' },
  { emoji: '🙂', label: 'Жаахан нээлттэй' },
  { emoji: '🚀', label: 'Туршихад бэлэн' },
]

export default function Questionnaire({ onComplete }: { onComplete: (a: Answers) => void }) {
  const [step, setStep] = useState(0)
  const [balance, setBalance] = useState<string | null>(null)
  const [goal, setGoal] = useState<string | null>(null)
  const [risk, setRisk] = useState<string | null>(null)

  const selected = [balance, goal, risk][step]
  const isLast = step === 2

  function advance() {
    if (isLast) {
      onComplete({ balance: balance!, goal: goal!, risk: risk! })
    } else {
      setStep((s) => s + 1)
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        padding: '22px 24px 32px',
      }}
    >
      {/* progress */}
      <div style={{ paddingTop: 8 }}>
        <StepProgress total={3} current={step} />
      </div>

      {/* question */}
      <div key={step} className="fade-in" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ marginTop: 34 }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: 'rgba(255,255,255,0.7)' }}>
            Асуулт {step + 1}/3
          </span>
          <h1 style={{ marginTop: 8, fontSize: 24, fontWeight: 800, lineHeight: 1.3, color: '#fff' }}>
            {step === 0 && 'Сард зарлагынхаа дараа хэр их үлддэг вэ? 💸'}
            {step === 1 && 'Таны зорилго юу вэ? 🎯'}
            {step === 2 && 'Эрсдэлд хэр тэвчээртэй вэ? ⚖️'}
          </h1>
        </div>

        {/* options */}
        <div style={{ marginTop: 30, flex: 1 }}>
          {step === 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              {Q1_OPTIONS.map((opt) => (
                <OptionCard
                  key={opt}
                  label={opt.replace(/\s*\p{Emoji}+\s*$/u, '')}
                  emoji={opt.match(/\p{Emoji}+$/u)?.[0]}
                  selected={balance === opt}
                  onClick={() => setBalance(opt)}
                />
              ))}
            </div>
          )}

          {step === 1 && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              {Q2_OPTIONS.map((opt) => (
                <OptionCard
                  key={opt}
                  label={opt.replace(/\s*\p{Emoji}+\s*$/u, '')}
                  emoji={opt.match(/\p{Emoji}+$/u)?.[0]}
                  selected={goal === opt}
                  onClick={() => setGoal(opt)}
                />
              ))}
            </div>
          )}

          {step === 2 && (
            <div style={{ display: 'flex', gap: 12, justifyContent: 'space-between', marginTop: 24 }}>
              {Q3_OPTIONS.map((opt) => {
                const value = `${opt.label} ${opt.emoji}`
                return (
                  <CircleOption
                    key={opt.label}
                    emoji={opt.emoji}
                    label={opt.label}
                    selected={risk === value}
                    onClick={() => setRisk(value)}
                  />
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* advance button */}
      <div style={{ marginTop: 16 }}>
        <Button variant="outline" disabled={!selected} onClick={advance}>
          {isLast ? 'Хатанд асуух' : 'Үргэлжлүүлэх'}
        </Button>
      </div>
    </div>
  )
}
