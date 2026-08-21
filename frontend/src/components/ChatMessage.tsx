"use client";

import React from "react";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
}

export default function ChatMessage({ role, content }: ChatMessageProps) {
  if (role === "user") {
    return (
      <div className="flex justify-end mb-4 animate-[msgIn_0.3s_ease-out]">
        <div className="max-w-[68%] px-5 py-3.5 rounded-[20px] rounded-br-[6px] bg-gradient-to-br from-navy-900 to-navy-700 text-white text-sm leading-relaxed shadow-lg shadow-navy-900/25 whitespace-pre-wrap break-words">
          {content}
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start mb-4 animate-[msgIn_0.3s_ease-out]">
      <div className="w-8 h-8 bg-gradient-to-br from-gold-400 to-gold-500 rounded-[10px] flex items-center justify-center font-bold text-[13px] text-navy-950 shrink-0 self-end mr-2.5">
        N
      </div>
      <div className="max-w-[68%] px-5 py-3.5 rounded-[20px] rounded-bl-[6px] bg-white text-navy-900 text-sm leading-relaxed shadow-md border border-black/[0.04] whitespace-pre-wrap break-words">
        {content}
      </div>
    </div>
  );
}
