import os
import json
import re
from groq import Groq
from prompt import get_prompt

client = None

def init_client():
    global client
    api_key = os.getenv("GROQ_API_KEY")
    if not api_key:
        raise ValueError("GROQ_API_KEY not set in environment variables")
    client = Groq(api_key=api_key)

def parse_analytics(response_text):
    match = re.search(r"```analytics\s*\n(.*?)```", response_text, re.DOTALL)
    if match:
        try:
            analytics = json.loads(match.group(1).strip())
            clean_text = re.sub(r"\s*```analytics\s*\n.*?```", "", response_text, flags=re.DOTALL).strip()
            return clean_text, analytics
        except json.JSONDecodeError:
            pass
    return response_text.strip(), {}

def chat(messages: list[dict]) -> dict:
    if client is None:
        init_client()

    system_prompt = get_prompt()

    api_messages = [{"role": "system", "content": system_prompt}]
    for msg in messages:
        api_messages.append({"role": msg["role"], "content": msg["content"]})

    try:
        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=api_messages,
            temperature=0.7,
            max_tokens=1024,
        )
        raw = response.choices[0].message.content
        clean_text, analytics = parse_analytics(raw)
        return {"reply": clean_text, "analytics": analytics}
    except Exception as e:
        return {"reply": "I'm having some trouble connecting right now. Please try again in a moment.", "analytics": {}, "error": str(e)}
