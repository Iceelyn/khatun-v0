import type { Answers } from '../pages/Questionnaire'

export type ChatMessage = { role: 'user' | 'assistant'; content: string }

// Build the ONE structured intake message from the three answers.
export function buildIntakeMessage(a: Answers): string {
  return `Үлдэгдэл: ${a.balance}; Зорилго: ${a.goal}; Эрсдэл: ${a.risk}`
}

// Call the backend (same-origin /api/* — proxied to Express in dev).
// Throws an Error with a friendly Mongolian message on failure.
export async function chat(messages: ChatMessage[]): Promise<string> {
  let res: Response
  try {
    res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ messages }),
    })
  } catch {
    throw new Error('Сүлжээнд холбогдож чадсангүй. Холболтоо шалгаад дахин оролдоно уу.')
  }

  if (!res.ok) {
    let msg = 'Уучлаарай, ямар нэг асуудал гарлаа. Дахин оролдоно уу.'
    try {
      const data = await res.json()
      if (data?.error) msg = data.error
    } catch {
      /* keep default */
    }
    throw new Error(msg)
  }

  const data = await res.json()
  return (data.reply ?? '').trim()
}
