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
  // Missing OR still the .env.example placeholder → the call would 401. Catch it
  // up front with a message that tells the developer exactly what to fix.
  if (!apiKey || apiKey.includes('xxxx')) {
    console.error(
      '[Khatun] ANTHROPIC_API_KEY is not set to a real key in server/.env.\n' +
        '  → Put your key in server/.env (ANTHROPIC_API_KEY=sk-ant-...) and RESTART the backend\n' +
        '    (the server reads .env only at startup).',
    )
    return res.status(500).json({
      error: 'Уучлаарай, серверийн тохиргоо дутуу байна. API түлхүүрээ тохируулаад серверээ дахин эхлүүлээрэй.',
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
      // 401/403 = bad/expired key. Retrying won't help — say so plainly in the
      // log and give the user a message that doesn't promise a pointless retry.
      if (upstream.status === 401 || upstream.status === 403) {
        console.error(
          '[Khatun] Anthropic rejected the API key (auth error). Check ANTHROPIC_API_KEY in server/.env and restart the backend.',
        )
        return res.status(502).json({
          error: 'Уучлаарай, серверийн API түлхүүр буруу байна. Эзэнтэй нь холбогдоно уу.',
        })
      }
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

const server = app.listen(PORT, () => {
  console.log(`Khatun server listening on http://localhost:${PORT}`)
})

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(
      `[Khatun] Port ${PORT} is already in use — another backend is probably still running.\n` +
        `  → Free it:  lsof -ti:${PORT} | xargs -r kill   (or change PORT in server/.env), then restart.`,
    )
    process.exit(1)
  }
  throw err
})
