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
      const botMsg: Message = { role: "assistant", content: data.reply };
      setMessages((prev) => [...prev, botMsg]);
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
    <div className="fixed inset-0 flex justify-center bg-[#f0f2f5]">
      <div className="w-full max-w-[860px] flex flex-col bg-white shadow-[0_0_60px_rgba(0,0,0,0.08)] overflow-hidden">
        <Header onAnalytics={handleAnalytics} onNewChat={handleNewChat} />

        <main className="flex-1 flex flex-col min-h-0 bg-gray-50">
          <div className="flex-1 overflow-y-auto px-7 py-6 scrollbar-thin scroll-smooth">
            {messages.length === 0 && (
              <div className="flex justify-start mb-4 animate-[msgIn_0.3s_ease-out]">
                <div className="w-8 h-8 bg-gradient-to-br from-gold-400 to-gold-500 rounded-[10px] flex items-center justify-center font-bold text-[13px] text-navy-950 shrink-0 self-end mr-2.5">
                  N
                </div>
                <div className="max-w-[68%] px-5 py-3.5 rounded-[20px] rounded-bl-[6px] bg-white text-navy-900 text-sm leading-relaxed shadow-md border border-black/[0.04]">
                  {GREETING}
                </div>
              </div>
            )}

            {messages.map((msg, i) => (
              <ChatMessage key={i} role={msg.role} content={msg.content} />
            ))}

            {loading && <TypingIndicator />}

            <div ref={chatEndRef} />
          </div>

          <div className="shrink-0">
            <ChatInput onSend={sendMessage} disabled={loading} />
          </div>
        </main>

        {showAnalytics && analytics && (
          <AnalyticsModal
            analytics={analytics}
            duration={duration}
            onClose={() => setShowAnalytics(false)}
          />
        )}
      </div>
    </div>
  );
}
