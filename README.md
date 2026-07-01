# n8n Calendar Agent — AI Chat Assistant

A conversational AI assistant for managing Google Calendar through natural language. Built with Next.js and TypeScript on the frontend, powered by an n8n AI Agent workflow on the backend. The n8n workflow is included in this repository — you can import it directly into your own n8n instance and be up and running quickly.

## How It Works

```
User → Chat UI (Next.js) → n8n Webhook → AI Agent (GPT-4.1-mini) → Google Calendar API → Response → Chat UI
```

The frontend sends each chat message to an n8n webhook. The n8n workflow passes it to an AI Agent (OpenAI GPT-4.1-mini) that interprets the request, performs the relevant Google Calendar action (create or retrieve events), and returns a natural-language reply rendered in the chat window.

## Features

- Chat-based interface for managing your calendar in plain English
- Schedule meetings and events ("Schedule a meeting tomorrow at 3 PM")
- Check existing events ("What's on my calendar today?", "Show this week's events")
- Create events with inferred titles, times, and durations ("Create Gym at 7 PM for 1 hour")
- Animated, responsive chat UI with light/dark theme support
- Markdown-rendered assistant responses

## Tech Stack

- **Frontend:** Next.js 16 (App Router), React 19, TypeScript
- **Styling/UI:** Tailwind CSS, Framer Motion, Lucide icons
- **Automation backend:** n8n AI Agent workflow (sub-workflow trigger)
- **LLM:** OpenAI GPT-4.1-mini via n8n LangChain nodes
- **Calendar integration:** Google Calendar OAuth2 via n8n
- **Markdown rendering:** react-markdown with remark-gfm

## Repository Structure

```
n8n-calendar-agent/
├── app/              # Next.js app router pages and layout
├── components/        # Chat UI components (ChatWindow, ChatInput, ChatMessage, EmptyState, Header, TypingIndicator)
├── lib/               # Webhook client (api.ts) and theme utilities
├── n8n/               # n8n workflow JSON — import this into your n8n instance
│   └── google-calender-agent.json
├── types/             # Shared TypeScript types for chat messages and webhook payloads
├── scripts/           # API verification script (verify-api.ts)
└── public/            # Static assets
```

---

## Setup Guide

### 1. Import the n8n Workflow

1. Open your n8n instance (cloud or self-hosted)
2. Go to **Workflows → Import**
3. Upload `n8n/google-calender-agent.json` from this repository
4. The workflow contains the following nodes:
   - **When Executed by Another Workflow** — sub-workflow trigger that receives `text` and `session.id`
   - **AI Agent** (LangChain) — GPT-4.1-mini with a detailed Google Calendar system prompt
   - **Create an event in Google Calendar** — Google Calendar tool node
   - **Get Many Google Calendar Events** — Google Calendar tool node

### 2. Connect Your Credentials

Inside n8n, you need to connect two credentials:

- **OpenAI API** — for the AI Agent (GPT-4.1-mini)
- **Google Calendar OAuth2** — for the calendar tool nodes (create and retrieve events)

To add Google Calendar credentials:
1. In n8n, go to **Credentials → New**
2. Search for **Google Calendar OAuth2**
3. Follow the OAuth flow to connect your Google account
4. Assign the credential to both calendar tool nodes in the workflow

### 3. Set Up a Parent Webhook Workflow

The imported workflow uses a **sub-workflow trigger** (not a direct webhook). You need a parent n8n workflow that:
1. Receives HTTP POST requests via a **Webhook** node
2. Calls this workflow using an **Execute Workflow** node, passing `text` (the user message) and `session.id`
3. Returns the AI Agent's reply back to the webhook caller

Once your parent workflow is active, copy its **production webhook URL**.

### 4. Configure the Frontend

Update the webhook URL in `lib/api.ts`:

```ts
const WEBHOOK_URL = "https://your-n8n-instance.com/webhook/your-webhook-id";
```

### 5. Run the Frontend

```bash
git clone <repo-url>
cd n8n-calendar-agent
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Available Scripts

- `npm run dev` — start the development server
- `npm run build` — create a production build
- `npm run start` — run the production build
- `npm run lint` — run ESLint
- `npm run test` — verify the webhook API connection
- `npm run verify` — run tests, lint, and build in sequence

## Purpose

This project demonstrates how a polished chat frontend can be paired with an n8n AI Agent workflow to build a practical, voice-friendly calendar assistant — turning natural-language requests into real Google Calendar actions, with no dedicated backend server required.
