# Northstar Homes — AI Sales Assistant

An AI-powered conversational bot for Northstar Homes, built with FastAPI and Groq API. The bot handles customer enquiries, qualifies leads, books site visits, and supports English, Hindi, and Hinglish.

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
- Clean web interface with chat and analytics dashboard

## Tech Stack

- **Backend:** FastAPI (Python)
- **LLM:** Groq API (Llama 3.3 70B Versatile)
- **Frontend:** Vanilla HTML/CSS/JS
- **Deployment:** Docker

## Setup

### Local

```bash
cp .env.example .env
# Edit .env and add your GROQ_API_KEY

pip install -r requirements.txt
python main.py
```

App runs at `http://localhost:8000`

### Docker

```bash
cp .env.example .env
# Edit .env and add your GROQ_API_KEY

docker compose up --build
```

## Project Structure

```
├── main.py              # FastAPI app and API routes
├── prompt.py            # System prompt for the AI agent
├── bot.py               # Groq API chat integration
├── analytics.py         # Conversation analytics extraction
├── templates/index.html # Chat web interface
├── static/style.css     # Styles
├── Dockerfile           # Container image
├── docker-compose.yml   # Deployment config
├── test_cases.md        # 14 test scenarios
└── requirements.txt     # Python dependencies
```

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/` | Chat interface |
| POST | `/api/chat` | Send messages, get bot response |
| POST | `/api/analytics` | Generate conversation analytics |

## Test Cases

See [test_cases.md](test_cases.md) for 14 test scenarios covering greeting, Hindi/Hinglish conversations, objections, site visit booking, failed booking, busy customers, not-interested, stop communication, unknown questions, human escalation, and more.
