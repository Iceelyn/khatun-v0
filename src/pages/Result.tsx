import { useEffect, useRef, useState } from 'react'
import type { Answers } from './Questionnaire'
import { buildIntakeMessage, chat, type ChatMessage } from '../lib/api'
import KhatunAvatar from '../assets/KhatunAvatar'

export default function Result({ answers, onRestart }: { answers: Answers; onRestart: () => void }) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [followText, setFollowText] = useState('')
  const [followUsed, setFollowUsed] = useState(false)
  const started = useRef(false)

  // Fire the single structured intake call once on mount.
  useEffect(() => {
    if (started.current) return
    started.current = true
    void sendIntake()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function sendIntake() {
    setLoading(true)
    setError(null)
    const intake: ChatMessage = { role: 'user', content: buildIntakeMessage(answers) }
    try {
      const reply = await chat([intake])
      setMessages([intake, { role: 'assistant', content: reply }])
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setLoading(false)
    }
  }

  async function sendFollowUp() {
    const q = followText.trim()
    if (!q || loading || followUsed) return
    const history: ChatMessage[] = [...messages, { role: 'user', content: q }]
    setMessages(history)
    setFollowText('')
    setFollowUsed(true)
    setLoading(true)
    setError(null)
    try {
      const reply = await chat(history)
      setMessages([...history, { role: 'assistant', content: reply }])
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setLoading(false)
    }
  }

  const assistantMessages = messages.filter((m) => m.role === 'assistant')
  const followQuestion = messages.find((m, i) => m.role === 'user' && i > 0)?.content

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', padding: '24px 22px 28px' }}>
      {/* header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <KhatunAvatar size={48} />
        <div>
          <div style={{ fontWeight: 800, fontSize: 19, color: '#fff' }}>Khatun</div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)' }}>Чиний санхүүгийн хамтрагч</div>
        </div>
      </div>

      <div style={{ flex: 1, marginTop: 22, display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* loading (initial, before any reply) */}
        {loading && assistantMessages.length === 0 && <Loading />}

        {/* error (initial) */}
        {error && assistantMessages.length === 0 && <ErrorCard message={error} onRetry={sendIntake} />}

        {/* first recommendation */}
        {assistantMessages[0] && <ReplyCard text={assistantMessages[0].content} primary />}

        {/* follow-up Q + A */}
        {followQuestion && <UserBubble text={followQuestion} />}
        {loading && assistantMessages.length === 1 && <Loading compact />}
        {error && assistantMessages.length >= 1 && <ErrorCard message={error} onRetry={sendFollowUp} />}
        {assistantMessages[1] && <ReplyCard text={assistantMessages[1].content} />}

        {/* one optional free-text follow-up */}
        {assistantMessages.length >= 1 && !followUsed && (
          <div style={{ marginTop: 4 }}>
            <p style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.85)', marginBottom: 8 }}>
              Нэг асуулт асуумаар байна уу? ✍️
            </p>
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                value={followText}
                onChange={(e) => setFollowText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendFollowUp()}
                placeholder="Жишээ нь: Хадгаламж аюулгүй юу?"
                maxLength={300}
                style={{
                  flex: 1,
                  border: 'none',
                  borderRadius: 999,
                  padding: '14px 18px',
                  fontSize: 15,
                  color: '#2B2350',
                  outline: 'none',
                }}
              />
              <button
                onClick={sendFollowUp}
                disabled={!followText.trim() || loading}
                style={{
                  background: '#fff',
                  color: '#6F61E8',
                  borderRadius: 999,
                  padding: '0 20px',
                  fontWeight: 700,
                  fontSize: 15,
                  opacity: !followText.trim() || loading ? 0.5 : 1,
                }}
              >
                Илгээх
              </button>
            </div>
          </div>
        )}
      </div>

      {/* restart */}
      <button
        onClick={onRestart}
        style={{
          marginTop: 18,
          color: 'rgba(255,255,255,0.9)',
          fontSize: 14.5,
          fontWeight: 600,
          textDecoration: 'underline',
        }}
      >
        Дахин эхлэх
      </button>
    </div>
  )
}

function ReplyCard({ text, primary = false }: { text: string; primary?: boolean }) {
  return (
    <div
      className="fade-in"
      style={{
        background: '#fff',
        borderRadius: 22,
        padding: '20px 20px',
        boxShadow: '0 10px 28px rgba(79,63,168,0.18)',
        border: primary ? '2px solid rgba(111,97,232,0.25)' : 'none',
      }}
    >
      <p style={{ color: '#2B2350', fontSize: 15.5, lineHeight: 1.6, whiteSpace: 'pre-line' }}>{text}</p>
    </div>
  )
}

function UserBubble({ text }: { text: string }) {
  return (
    <div
      className="fade-in"
      style={{
        alignSelf: 'flex-end',
        maxWidth: '85%',
        background: 'rgba(255,255,255,0.2)',
        borderRadius: '18px 18px 4px 18px',
        padding: '12px 16px',
        color: '#fff',
        fontSize: 15,
      }}
    >
      {text}
    </div>
  )
}

function Loading({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className="fade-in"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 14,
        padding: compact ? '12px 0' : '40px 0',
      }}
    >
      {!compact && <KhatunAvatar size={84} />}
      <div style={{ display: 'flex', gap: 6 }}>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{
              width: 9,
              height: 9,
              borderRadius: '50%',
              background: '#fff',
              animation: 'pulseDots 1.2s infinite ease-in-out',
              animationDelay: `${i * 0.18}s`,
            }}
          />
        ))}
      </div>
      <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: 15, textAlign: 'center' }}>
        Хатан чамд тохирох алхмыг бодож байна…
      </p>
    </div>
  )
}

function ErrorCard({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div
      className="fade-in"
      style={{
        background: '#fff',
        borderRadius: 22,
        padding: '20px',
        textAlign: 'center',
        boxShadow: '0 10px 28px rgba(79,63,168,0.18)',
      }}
    >
      <div style={{ fontSize: 30 }}>🌸</div>
      <p style={{ color: '#2B2350', fontSize: 15, lineHeight: 1.5, margin: '10px 0 16px' }}>{message}</p>
      <button
        onClick={onRetry}
        style={{
          background: '#6F61E8',
          color: '#fff',
          borderRadius: 999,
          padding: '12px 24px',
          fontWeight: 700,
          fontSize: 15,
        }}
      >
        Дахин оролдох
      </button>
    </div>
  )
}
