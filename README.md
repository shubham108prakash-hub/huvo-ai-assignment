# Northstar Homes — AI Sales Assistant

An AI-powered conversational bot for Northstar Homes, built with FastAPI (Python) backend and Next.js frontend. The bot handles customer enquiries, qualifies leads, books site visits, and supports English, Hindi, and Hinglish.

## Project: Northstar One

- **Location:** Sector 79, Gurugram
- **Configurations:** 2 BHK and 3 BHK
- **2 BHK:** ₹1.35 crore onwards
- **3 BHK:** ₹1.75 crore onwards

## Features

- Natural conversation in English, Hindi, and Hinglish
- Lead qualification through guided conversation
- Site visit booking simulation
- Objection handling (pricing, hesitation, competitor comparison)
- Human agent escalation
- Stop-communication respect
- Post-conversation analytics (interest level, sentiment, configuration, follow-up needs)
- Modern UI with Tailwind CSS

## Tech Stack

- **Backend:** FastAPI (Python) + Groq API
- **Frontend:** Next.js 15 + React 19 + TypeScript + Tailwind CSS
- **Deployment:** Docker Compose

## Setup

### Local Development

**Backend:**
```bash
cp .env.example .env
# Add your GROQ_API_KEY to .env

pip install -r requirements.txt
python main.py
```
Backend runs at `http://localhost:8000`

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```
Frontend runs at `http://localhost:3000`

### Docker

```bash
cp .env.example .env
# Add your GROQ_API_KEY to .env

docker compose up --build
```
Frontend at `http://localhost:3000`, Backend at `http://localhost:8000`

## Project Structure

```
├── main.py                  # FastAPI backend (API only)
├── prompt.py                # System prompt for the AI agent
├── bot.py                   # Groq API chat integration
├── analytics.py             # Conversation analytics extraction
├── requirements.txt         # Python dependencies
├── Dockerfile               # Backend container
├── docker-compose.yml       # Orchestrates both services
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── layout.tsx   # Root layout
│   │   │   ├── page.tsx     # Main chat page
│   │   │   └── globals.css  # Global styles + Tailwind
│   │   └── components/
│   │       ├── Header.tsx
│   │       ├── ChatMessage.tsx
│   │       ├── ChatInput.tsx
│   │       ├── TypingIndicator.tsx
│   │       └── AnalyticsModal.tsx
│   ├── next.config.ts       # API proxy to backend
│   ├── tailwind.config.ts
│   ├── Dockerfile           # Frontend container
│   └── package.json
│
├── test_cases.md            # 14 test scenarios
└── .env.example
```

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/chat` | Send messages, get bot response |
| POST | `/api/analytics` | Generate conversation analytics |
| GET | `/api/health` | Health check |

## Test Cases

See [test_cases.md](test_cases.md) for 14 test scenarios covering greeting, Hindi/Hinglish conversations, objections, site visit booking, failed booking, busy customers, not-interested, stop communication, unknown questions, human escalation, and more.
