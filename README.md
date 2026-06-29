# Google Calendar Automation — AI Chat Assistant

A conversational AI assistant for managing Google Calendar through natural language. Built with Next.js and TypeScript on the frontend, powered by an n8n AI Agent workflow on the backend that interprets requests and performs calendar actions.

## Features

- Chat-based interface for managing your calendar in plain English
- Schedule meetings and events ("Schedule a meeting tomorrow")
- Check existing events ("What's on my calendar?", "Show today's events")
- Create new events with specific times ("Create Gym at 7 PM")
- Animated, responsive chat UI with light/dark theme support
- Markdown-rendered assistant responses

## Tech Stack

- **Frontend:** Next.js 16 (App Router), React 19, TypeScript
- **Styling/UI:** Tailwind CSS, Framer Motion, Lucide icons
- **Automation backend:** n8n AI Agent workflow (webhook-driven), connected to Google Calendar
- **Markdown rendering:** react-markdown with remark-gfm

## Architecture

```
User → Chat UI (Next.js) → n8n Webhook → AI Agent → Google Calendar API → Response → Chat UI
```

The frontend sends each chat message to an n8n webhook endpoint. The n8n workflow runs an AI agent that interprets the request, performs the relevant Google Calendar action (create, read, update events), and returns a natural-language reply, which is rendered back in the chat window.

## Repository Structure

```
google-calendar-automation/
├── app/              # Next.js app router pages and layout
├── components/        # Chat UI components (ChatWindow, ChatMessage, ChatInput, EmptyState, Header, TypingIndicator)
├── lib/                # Webhook client (api.ts) and theme utilities
├── types/              # Shared TypeScript types for chat messages and webhook payloads
├── scripts/            # API verification script (verify-api.ts)
└── public/             # Static assets
```

## Getting Started

1. Clone the repository and install dependencies:
   ```bash
   git clone <repo-url>
   cd google-calendar-automation
   npm install
   ```

2. Configure your n8n webhook URL in `lib/api.ts` (`WEBHOOK_URL`) to point to your own n8n AI Agent workflow connected to Google Calendar.

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` — start the development server
- `npm run build` — create a production build
- `npm run start` — run the production build
- `npm run lint` — run ESLint
- `npm run test` — verify the webhook API connection
- `npm run verify` — run tests, lint, and build in sequence

## Purpose

This project demonstrates how a simple chat frontend can be paired with a no-code automation workflow (n8n) to build a practical AI assistant — turning natural-language requests into real actions on Google Calendar.
