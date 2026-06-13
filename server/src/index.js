import express from 'express'
import cors from 'cors'
import { SYSTEM_PROMPT } from './systemPrompt.js'

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json({ limit: '64kb' }))

const ANTHROPIC_URL = 'https://api.anthropic.com/v1/messages'
const MODEL = 'claude-sonnet-4-6'

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, hasKey: Boolean(process.env.ANTHROPIC_API_KEY) })
})

// The ONLY place that talks to the AI. The key never reaches the browser.
app.post('/api/chat', async (req, res) => {
  const { messages } = req.body ?? {}

  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'messages массив шаардлагатай.' })
  }

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    console.error('ANTHROPIC_API_KEY is not set in server/.env')
    return res.status(500).json({
      error: 'Уучлаарай, серверийн тохиргоо дутуу байна. Түлхүүр тохируулаагүй байна.',
    })
  }

  try {
    const upstream = await fetch(ANTHROPIC_URL, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: MODEL,
        system: SYSTEM_PROMPT,
        messages,
        max_tokens: 1000,
        temperature: 0.3,
      }),
    })

    if (!upstream.ok) {
      const detail = await upstream.text()
      console.error('Anthropic API error', upstream.status, detail)
      return res.status(502).json({
        error: 'Хатантай холбогдоход алдаа гарлаа. Түр зуурын асуудал байж магадгүй — дахин оролдоно уу.',
      })
    }

    const data = await upstream.json()
    const reply = (data.content ?? [])
      .filter((block) => block.type === 'text')
      .map((block) => block.text)
      .join('\n')
      .trim()

    return res.json({ reply })
  } catch (err) {
    console.error('Chat route failed', err)
    return res.status(500).json({
      error: 'Сүлжээнд асуудал гарлаа. Холболтоо шалгаад дахин оролдоно уу.',
    })
  }
})

app.listen(PORT, () => {
  console.log(`Khatun server listening on http://localhost:${PORT}`)
})
