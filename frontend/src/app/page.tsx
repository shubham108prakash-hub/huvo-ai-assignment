"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import Header from "@/components/Header";
import ChatMessage from "@/components/ChatMessage";
import ChatInput from "@/components/ChatInput";
import TypingIndicator from "@/components/TypingIndicator";
import AnalyticsModal from "@/components/AnalyticsModal";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface Analytics {
  customer_name: string;
  interest_level: string;
  configuration: string;
  budget: string;
  site_visit_booked: boolean;
  sentiment: string;
  follow_up_needed: boolean;
  wants_human_agent: boolean;
  stop_communication: boolean;
  customer_messages: number;
}

const GREETING =
  "Welcome to Northstar Homes! I'm your AI sales assistant. How can I help you today? Are you interested in learning about our projects in Gurugram?";

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [duration, setDuration] = useState("0m 0s");
  const startTime = useRef(Date.now());
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading, scrollToBottom]);

  function computeDuration(): string {
    const secs = Math.round((Date.now() - startTime.current) / 1000);
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}m ${s}s`;
  }

  async function sendMessage(text: string) {
    const userMsg: Message = { role: "user", content: text };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updated }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  async function handleAnalytics() {
    if (messages.length === 0) return;
    setDuration(computeDuration());
    try {
      const res = await fetch("/api/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages }),
      });
      const data = await res.json();
      setAnalytics(data.analytics);
      setShowAnalytics(true);
    } catch {
      alert("Could not generate analytics.");
    }
  }

  function handleNewChat() {
    setMessages([]);
    startTime.current = Date.now();
  }

  return (
    /* chat-shell uses CSS Grid: header | messages (scrollable) | input */
    <div className="chat-shell">
      <Header onAnalytics={handleAnalytics} onNewChat={handleNewChat} />

      <div className="messages-area">
        {/* Greeting bubble */}
        {messages.length === 0 && (
          <div className="msg-bubble flex justify-start mb-3 items-end gap-2">
            <div
              className="w-8 h-8 rounded-[10px] flex items-center justify-center font-bold text-[13px] shrink-0"
              style={{ background: "linear-gradient(135deg, #e4af3c, #c8a45c)", color: "#0a1929" }}
            >
              N
            </div>
            <div
              className="max-w-[72%] px-4 py-3 rounded-2xl rounded-bl-sm text-sm leading-relaxed text-gray-800 shadow-sm"
              style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.07)" }}
            >
              {GREETING}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <ChatMessage key={i} role={msg.role} content={msg.content} />
        ))}

        {loading && <TypingIndicator />}

        {/* Scroll anchor */}
        <div ref={chatEndRef} />
      </div>

      <ChatInput onSend={sendMessage} disabled={loading} />

      {showAnalytics && analytics && (
        <AnalyticsModal
          analytics={analytics}
          duration={duration}
          onClose={() => setShowAnalytics(false)}
        />
      )}
    </div>
  );
}
