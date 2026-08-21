import os
from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel
from bot import chat as bot_chat
from analytics import extract_conversation_analytics

app = FastAPI(title="Northstar Homes AI Assistant")
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

class ChatMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: list[ChatMessage]

class AnalyticsRequest(BaseModel):
    messages: list[ChatMessage]

@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

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

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
