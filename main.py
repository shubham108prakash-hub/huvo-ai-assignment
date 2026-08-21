import os
from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from bot import chat as bot_chat
from analytics import extract_conversation_analytics

app = FastAPI(title="Northstar Homes AI Assistant")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: list[ChatMessage]

class AnalyticsRequest(BaseModel):
    messages: list[ChatMessage]

@app.post("/api/chat")
async def chat_endpoint(req: ChatRequest):
    messages = [{"role": m.role, "content": m.content} for m in req.messages]
    result = bot_chat(messages)
    return result

@app.post("/api/analytics")
async def analytics_endpoint(req: AnalyticsRequest):
    messages = [{"role": m.role, "content": m.content} for m in req.messages]
    analytics = extract_conversation_analytics(messages)
    return {"analytics": analytics}

@app.get("/api/health")
async def health():
    return {"status": "ok"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
