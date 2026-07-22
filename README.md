# 📅 n8n Calendar Agent — AI Chat Assistant

[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![n8n](https://img.shields.io/badge/n8n-Workflow_Automation-FF6D5A?style=flat-square&logo=n8n)](https://n8n.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)

A modern, conversational AI assistant for managing Google Calendar through natural language. Built with a responsive **Next.js 16** frontend and powered by an **n8n AI Agent** workflow backend. 

The complete n8n workflow definition is included in [`n8n/google_calendar_agent.json`](file:///Users/raghhavv03/Workspace/Projects/n8n-calendar-agent/n8n/google_calendar_agent.json) and can be imported directly into any n8n instance.

---

## 🏗️ Architecture & Data Flow

```text
┌─────────────────┐       HTTP POST       ┌────────────────┐       LangChain       ┌──────────────────┐
│  Next.js Chat   │ ────────────────────► │  n8n Webhook   │ ────────────────────► │   n8n AI Agent   │
│  User Interface │ ◄──────────────────── │  Parent Engine │ ◄──────────────────── │ (GPT-4.1-mini)   │
└─────────────────┘     JSON / Text       └────────────────┘       Tool Calls      └────────┬─────────┘
                                                                                            │
                                                                                 Google Calendar API
                                                                                            │
                                                                                            ▼
                                                                                   ┌──────────────────┐
                                                                                   │ Google Calendar  │
                                                                                   │ (Create / Read)  │
                                                                                   └──────────────────┘
```

---

## ✨ Features

- **Natural Language Calendar Management:** Schedule meetings, check schedules, and block time using plain conversational English.
- **Intelligent Event Handling:** Automatically infers event titles, dates, start times, and durations from ambiguous user prompts.
- **Bi-directional Google Calendar Integration:** Supports creating new calendar events and querying existing events by date ranges.
- **Modern & Responsive UI:** Built with Next.js App Router, Framer Motion animations, Lucide icons, and light/dark theme switching.
- **Rich Markdown Formatting:** Assistant responses render lists, formatted event summaries, and emphasis with GitHub Flavored Markdown.
- **Serverless & Decoupled:** Requires no dedicated backend application server—n8n handles orchestration, LLM reasoning, and API authentication.

---

## 🛠️ Tech Stack

- **Frontend Framework:** [Next.js 16](https://nextjs.org/) (App Router), React 19, TypeScript
- **Styling & UI:** Tailwind CSS, Framer Motion, Lucide React
- **Workflow Automation:** [n8n](https://n8n.io/) AI Agent Workflow
- **AI / LLM Engine:** OpenAI GPT-4.1-mini via n8n LangChain integration
- **Integration API:** Google Calendar OAuth2 API via n8n tool nodes
- **Markdown Processor:** `react-markdown` with `remark-gfm`

---

## 📁 Repository Structure

```text
n8n-calendar-agent/
├── app/                  # Next.js 16 App Router (pages, layout, styles)
├── components/           # UI Components (ChatWindow, ChatInput, ChatMessage, EmptyState, Header, TypingIndicator)
├── lib/                  # Webhook API client (api.ts) and theme system (theme.ts)
├── n8n/                  # Exported n8n workflow definitions
│   └── google_calendar_agent.json
├── types/                # TypeScript interface & type definitions
├── scripts/              # Integration verification script (verify-api.ts)
├── public/               # Static assets & client-side theme initialization
├── package.json          # Dependency manifest & scripts
└── tsconfig.json         # TypeScript configuration
```

---

## 🚀 Setup & Installation

### 1. Import the n8n Workflow

1. Open your n8n instance (Cloud or Self-Hosted).
2. Navigate to **Workflows → Import from File**.
3. Upload [`n8n/google_calendar_agent.json`](file:///Users/raghhavv03/Workspace/Projects/n8n-calendar-agent/n8n/google_calendar_agent.json).
4. The workflow includes:
   - **Execute Workflow Trigger:** Sub-workflow interface accepting `text` and `session.id`.
   - **AI Agent (LangChain):** System prompt configured with rules for calendar parsing.
   - **Create Google Calendar Event:** Tool node for event creation.
   - **Get Many Google Calendar Events:** Tool node for retrieving schedules.

### 2. Configure n8n Credentials

In your n8n workspace, add and connect:
1. **OpenAI API Credential:** Connected to the AI Agent node.
2. **Google Calendar OAuth2 Credential:** Connected to both Google Calendar tool nodes.

### 3. Setup Parent Webhook Trigger

Create a parent n8n workflow with:
1. **Webhook Node (POST):** Receives incoming chat messages.
2. **Execute Workflow Node:** Calls the imported `google_calendar_agent` workflow passing `text` and `session.id`.
3. **Respond to Webhook Node:** Returns the assistant response back to the client.

Copy the active **Production Webhook URL**.

### 4. Configure & Run the Frontend

1. Update the webhook endpoint in [`lib/api.ts`](file:///Users/raghhavv03/Workspace/Projects/n8n-calendar-agent/lib/api.ts):
   ```typescript
   const WEBHOOK_URL = "https://your-n8n-instance.com/webhook/your-webhook-id";
   ```

2. Install dependencies and start the development server:
   ```bash
   npm install
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Available Scripts

| Script | Description |
| :--- | :--- |
| `npm run dev` | Starts Next.js development server on port 3000 |
| `npm run build` | Builds the production Next.js bundle |
| `npm run start` | Starts the production server |
| `npm run lint` | Executes ESLint to check for code issues |
| `npm run test` | Runs the webhook API response parser tests (`scripts/verify-api.ts`) |
| `npm run verify` | Runs tests, linting, and build validation in sequence |

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
