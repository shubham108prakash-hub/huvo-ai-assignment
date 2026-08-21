import json
import re
from datetime import datetime

def extract_conversation_analytics(conversation_history: list[dict]) -> dict:
    all_text = " ".join([m["content"] for m in conversation_history if m["role"] == "user"])

    customer_name = ""
    name_patterns = [
        r"(?:my name is|i'm|main|mera naam)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)",
        r"(?: naam |name )([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)",
    ]
    for pattern in name_patterns:
        match = re.search(pattern, all_text, re.IGNORECASE)
        if match:
            customer_name = match.group(1).strip()
            break

    interest_level = "none"
    positive_signals = ["interested", "visit", "book", "dekhna", "dekhenge", "schedule", "sure", "haan", "yes", "please", "great", "perfect", "sounds good"]
    negative_signals = ["not interested", "nahi", "no", "busy", "later", "call back", "not now", "think", "sochunga"]
    positive_count = sum(1 for s in positive_signals if s in all_text.lower())
    negative_count = sum(1 for s in negative_signals if s in all_text.lower())

    if positive_count >= 2 and positive_count > negative_count:
        interest_level = "high"
    elif positive_count > negative_count:
        interest_level = "medium"
    elif negative_count > 0:
        interest_level = "low"

    configuration = "unknown"
    if "2 bhk" in all_text.lower() or "2bhk" in all_text.lower():
        configuration = "2 BHK"
    elif "3 bhk" in all_text.lower() or "3bhk" in all_text.lower():
        configuration = "3 BHK"

    budget = "unknown"
    if "1.35" in all_text or "1.75" in all_text:
        budget = "Mentioned project pricing"
    elif any(w in all_text.lower() for w in ["budget", "afford", "price", "cost"]):
        budget = "Budget discussed but not specific"

    visit_booked = False
    if any(w in all_text.lower() for w in ["visit confirmed", "site visit", "visit is confirmed", "confirmed for"]):
        visit_booked = True

    wants_human = False
    if any(w in all_text.lower() for w in ["speak to", "human", "real person", "transfer", "sales team"]):
        wants_human = True

    stop_communication = False
    if any(w in all_text.lower() for w in ["stop", "don't contact", "unsubscribe", "do not contact"]):
        stop_communication = True

    follow_up_needed = False
    if interest_level in ["high", "medium"] and not visit_booked:
        follow_up_needed = True
    if wants_human:
        follow_up_needed = True

    sentiment = "neutral"
    if positive_count > negative_count:
        sentiment = "positive"
    elif negative_count > positive_count:
        sentiment = "negative"

    message_count = len([m for m in conversation_history if m["role"] == "user"])

    return {
        "customer_name": customer_name,
        "interest_level": interest_level,
        "configuration": configuration,
        "budget": budget,
        "site_visit_booked": visit_booked,
        "wants_human_agent": wants_human,
        "stop_communication": stop_communication,
        "follow_up_needed": follow_up_needed,
        "sentiment": sentiment,
        "customer_messages": message_count,
        "conversation_duration": "calculated_on_frontend",
        "timestamp": datetime.now().isoformat(),
    }
