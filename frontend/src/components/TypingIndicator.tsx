"use client";
import React from "react";

export default function TypingIndicator() {
  return (
    <div className="msg-bubble flex justify-start mb-3 items-end gap-2">
      <div
        className="w-8 h-8 rounded-[10px] flex items-center justify-center font-bold text-[13px] shrink-0"
        style={{ background: "linear-gradient(135deg, #e4af3c, #c8a45c)", color: "#0a1929" }}
      >
        N
      </div>
      <div
        className="px-4 py-3 rounded-2xl rounded-bl-sm shadow-sm flex items-center gap-1.5"
        style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.07)" }}
      >
        {[0, 0.18, 0.36].map((delay, i) => (
          <span
            key={i}
            className="w-2 h-2 rounded-full inline-block"
            style={{
              background: "#94a3b8",
              animation: `dotBounce 1.2s ease-in-out ${delay}s infinite`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
