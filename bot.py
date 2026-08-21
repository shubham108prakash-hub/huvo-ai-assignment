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

def _build_messages(messages: list[dict]) -> list[dict]:
    system_prompt = get_prompt()
    api_messages = [{"role": "system", "content": system_prompt}]
    for msg in messages:
        api_messages.append({"role": msg["role"], "content": msg["content"]})
    return api_messages

def chat_stream(messages: list[dict]):
    if client is None:
        init_client()

    api_messages = _build_messages(messages)

    try:
        stream = client.chat.completions.create(
            model="openai/gpt-oss-120b",
            messages=api_messages,
            temperature=0.7,
            max_tokens=1024,
            stream=True,
        )

        collected = ""
        for chunk in stream:
            if chunk.choices and chunk.choices[0].delta.content:
                token = chunk.choices[0].delta.content
                collected += token
                yield {"type": "token", "content": token}

        clean_text, analytics = parse_analytics(collected)
        yield {"type": "done", "reply": clean_text, "analytics": analytics}

    except Exception as e:
        yield {"type": "done", "reply": "I'm having some trouble connecting right now. Please try again in a moment.", "analytics": {}, "error": str(e)}
