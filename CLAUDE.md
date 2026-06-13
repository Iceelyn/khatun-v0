# CLAUDE.md — Khatun

Persistent context for this repo. Read this before doing any work.

## What Khatun is
Khatun (Хатан) is a private, Mongolian-language AI financial companion for young Mongolian women taking their first step into saving and investing. Most financial guidance is in English and built on foreign products that don't exist in Mongolia, and talking about money carries social shame — so a woman with her first salary leaves it idle while inflation erodes it. Khatun removes the language barrier and the shame: through a short, judgment-free guided flow it learns a little about her and routes her to ONE real, locally available option with the exact first step she can take today.

It is a **non-custodial coaching layer** that sits *above* banks and brokers — not a trading app. The MVP's one job: take a first-time user from "my salary is just sitting there" to one concrete first action, privately, in Mongolian, in minutes.

## Tech stack
- Frontend: React + Vite, mobile-first web app.
- Backend: Node.js + Express — the ONLY place that talks to the AI. The API key never reaches the browser.
- AI: the Anthropic API (Claude). Do NOT use Groq or any other provider.

## Folder structure
- `/src/pages` — full screens (onboarding, each question, result).
- `/src/components` — reusable UI (cards, buttons, progress indicator, illustration wrapper).
- `/src/assets` — flat SVG illustrations, easy to swap.
- `/src/theme` — colors, spacing, radius tokens (so the hue can be re-skinned).
- `/server` — Express server and the Anthropic call.

## Design system (lavender, SettingZ-style)
- Background: soft purple/lavender (~`#8B7FF0`). White rounded cards. White text on lavender, dark text on cards.
- Cute flat character illustrations (Storyset / unDraw style) in the lavender palette.
- Full-width rounded buttons, generous spacing, "Khatun" centered at the top of onboarding.
- Keep all colors/spacing in `/src/theme` so the hue can be changed in one place.

## The AI layer
- Express route `POST /api/chat` takes a `messages` array and calls the Anthropic API:
  - endpoint `https://api.anthropic.com/v1/messages`
  - model `claude-sonnet-4-6`
  - header `anthropic-version: 2023-06-01`
  - body `{ system: SYSTEM_PROMPT, messages, max_tokens: 1000, temperature: 0.3 }`
- `SYSTEM_PROMPT` is sent as the `system` field (once per request), never inside `messages`.

### SYSTEM_PROMPT (use verbatim)
```
You are Khatun (Хатан), a warm, private, judgment-free financial coach for young Mongolian women taking their first step into saving and investing. Speak like a kind, knowledgeable older sister.
LANGUAGE: Always reply in natural, warm, simple Mongolian (Cyrillic). Short messages, 2–4 sentences, no jargon. Never make her feel behind or foolish.
INPUT: You receive her three answers (money left over, goal, risk comfort). Based on them, recommend ONE option from the four below, explain simply why it fits her, and give the exact first step plus a small, comfortable starting amount. Then warmly invite any worry.
FOUR PRODUCTS (recommend only from these):
1. Bank term deposit (хадгаламж) — lowest risk; first step: open one in her bank's app.
2. Government bond (Засгийн газрын бонд) — low risk; first step: ask her bank or a broker about the current offering.
3. Erdenes Tavantolgoi "1072" shares (1072 хувьцаа) — many women already own these; first step: check whether she holds them via a licensed broker.
4. MSE-listed fund or share (МХБ-д бүртгэлтэй сан/хувьцаа) — higher risk; first step: open an account with a licensed broker and start small.
RULES:
- Never state a specific interest rate, price, or minimum. If asked a number, kindly tell her to check the current figure at the bank or broker.
- Say once that this is friendly guidance, not licensed financial advice, and the final choice is hers.
- Only small, comfortable amounts; never suggest borrowing to invest.
- If she shows distress or an unsafe situation, be gentle, never pressure her, and suggest a trusted person or local support.
- Stay strictly on beginner saving and investing.
```

## Security (non-negotiable)
- `ANTHROPIC_API_KEY` lives ONLY in `server/.env` (gitignored) and in GitHub Secrets.
- The key must never appear in client code, the browser, or git history.
- GitHub Secrets: repo → Settings → Secrets and variables → Codespaces → new secret `ANTHROPIC_API_KEY`.

## Conventions
- Build incrementally: one milestone at a time, run + test, then a small commit with a clear message.
- Intake is the guided questionnaire — NO free-text chat for the three questions.
- NO calculator / discreet-mode screen anywhere.
- All user-facing text is Mongolian (Cyrillic).
- When something is ambiguous, make a sensible choice and note it rather than stopping.

## Commands
- Frontend dev: `npm run dev`
- Backend dev: from `/server`, `npm run dev`
- Install: `npm install` in root and in `/server`

## Definition of done
The flow runs end to end: onboarding (3 screens) → 3-question questionnaire → loading → Khatun's recommendation with a concrete first step — all in Mongolian, with the API key never exposed.
