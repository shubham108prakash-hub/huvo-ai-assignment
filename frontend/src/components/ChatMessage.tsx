"use client";
import React from "react";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
}

export default function ChatMessage({ role, content }: ChatMessageProps) {
  if (role === "user") {
    return (
      <div className="msg-bubble flex justify-end mb-3">
        <div
          className="max-w-[72%] px-4 py-3 rounded-2xl rounded-br-sm text-sm leading-relaxed text-white whitespace-pre-wrap break-words shadow-md"
          style={{ background: "linear-gradient(135deg, #102a43, #334e68)" }}
        >
          {content}
        </div>
      </div>
    );
  }

  return (
    <div className="msg-bubble flex justify-start mb-3 items-end gap-2">
      <div
        className="w-8 h-8 rounded-[10px] flex items-center justify-center font-bold text-[13px] shrink-0"
        style={{ background: "linear-gradient(135deg, #e4af3c, #c8a45c)", color: "#0a1929" }}
      >
        N
      </div>
      <div
        className="max-w-[72%] px-4 py-3 rounded-2xl rounded-bl-sm text-sm leading-relaxed text-gray-800 whitespace-pre-wrap break-words shadow-sm"
        style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.07)" }}
      >
        {content}
      </div>
    </div>
  );
}
