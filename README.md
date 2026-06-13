# Khatun — Хатан

A private, Mongolian-language AI financial companion for young Mongolian women
taking their first step into saving and investing. Through a short,
judgment-free guided flow it learns a little about her and routes her to **one**
real, locally available option with the exact first step she can take today.

Khatun is a non-custodial coaching layer that sits *above* banks and brokers —
not a trading app. See [`CLAUDE.md`](./CLAUDE.md) for full product context.

## Architecture

```
Browser (React + Vite)  ──/api/*──►  Express server  ──►  Anthropic API
   src/                                server/              (claude-sonnet-4-6)
```

The browser only ever calls same-origin `/api/*`. **The Anthropic API key lives
only on the server and never reaches the browser.**

- `src/pages` — full screens (onboarding, questionnaire, result)
- `src/components` — reusable UI (buttons, cards, progress)
- `src/assets` — flat SVG illustrations
- `src/theme` — colour / spacing / radius tokens (re-skin in one place)
- `server/` — Express server and the Anthropic call

## Prerequisites

- Node.js 18+ (uses native `fetch` and `--env-file`; built on Node 22)
- An Anthropic API key — https://console.anthropic.com/

## Setup

```bash
# 1. Install dependencies (root = frontend, server = backend)
npm install
npm install --prefix server

# 2. Create the server env file and add your key
cp server/.env.example server/.env
#   then edit server/.env and set ANTHROPIC_API_KEY=sk-ant-...
```

## Run (development)

Two processes — run them in two terminals, or both at once:

```bash
# both together (frontend on :5173, backend on :3001)
npm run dev:all

# …or separately:
npm run dev                 # frontend  → http://localhost:5173
npm run dev --prefix server # backend   → http://localhost:3001
```

Open **http://localhost:5173**. Vite proxies `/api/*` to the Express server,
so the frontend never needs the key or the backend URL.

Health check: `curl http://localhost:5173/api/health` → `{"ok":true,"hasKey":true}`.

## The flow

Onboarding (3 screens, shown once) → 3-question guided questionnaire →
warm loading → Khatun's recommendation (the option, why it fits, the exact
first step) → one optional free-text follow-up. All in Mongolian.

## Security

- `ANTHROPIC_API_KEY` lives **only** in `server/.env` (gitignored) and in
  GitHub Secrets — never in client code, the browser, or git history.
- The key is read server-side via `process.env.ANTHROPIC_API_KEY` and attached
  to the Anthropic request in `server/src/index.js`. The client only knows
  about `/api/chat`.

### GitHub Secrets setup

For Codespaces / CI, store the key as a GitHub Secret instead of a local file:

1. Repo → **Settings** → **Secrets and variables** → **Codespaces**
   (use **Actions** instead if you consume it in a workflow).
2. **New repository secret** → name `ANTHROPIC_API_KEY`, paste your key.
3. In Codespaces it is injected as `process.env.ANTHROPIC_API_KEY`
   automatically. In Actions, expose it to the step:

   ```yaml
   env:
     ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
   ```

Never paste the key into source, commit `server/.env`, or log it.

## Production build

```bash
npm run build               # type-check + bundle frontend to dist/
npm start --prefix server   # serve the API
```
