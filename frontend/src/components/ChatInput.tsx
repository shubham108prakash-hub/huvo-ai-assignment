"use client";
import React, { useState, FormEvent, KeyboardEvent, useRef, useEffect } from "react";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled: boolean;
}

export default function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Keep focus after each message
  useEffect(() => {
    if (!disabled) inputRef.current?.focus();
  }, [disabled]);

  function handleSubmit(e?: FormEvent) {
    e?.preventDefault();
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue("");
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }

  const canSend = !!value.trim() && !disabled;

  return (
    <form onSubmit={handleSubmit} className="input-row flex items-center gap-3">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type in English, Hindi, or Hinglish…"
        disabled={disabled}
        autoComplete="off"
        style={{
          flex: 1,
          padding: "12px 16px",
          fontSize: "16px", /* 16px prevents iOS auto-zoom */
          lineHeight: "1.5",
          borderRadius: "14px",
          border: "1.5px solid #e2e8f0",
          background: "#f8fafc",
          outline: "none",
          color: "#1e293b",
          transition: "border-color 0.2s, box-shadow 0.2s",
          appearance: "none",
          WebkitAppearance: "none",
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "#c8a45c";
          e.currentTarget.style.boxShadow = "0 0 0 3px rgba(200,164,92,0.15)";
          e.currentTarget.style.background = "#fff";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "#e2e8f0";
          e.currentTarget.style.boxShadow = "none";
          e.currentTarget.style.background = "#f8fafc";
        }}
      />
      <button
        type="submit"
        disabled={!canSend}
        style={{
          padding: "12px 20px",
          borderRadius: "14px",
          border: "none",
          fontSize: "14px",
          fontWeight: "600",
          cursor: canSend ? "pointer" : "not-allowed",
          opacity: canSend ? 1 : 0.5,
          background: canSend
            ? "linear-gradient(135deg, #e4af3c, #c8a45c)"
            : "#e2e8f0",
          color: canSend ? "#0a1929" : "#94a3b8",
          transition: "all 0.2s",
          whiteSpace: "nowrap",
          flexShrink: 0,
        }}
      >
        Send
      </button>
    </form>
  );
}
