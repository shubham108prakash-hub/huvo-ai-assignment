"use client";

import React, { useState, FormEvent, KeyboardEvent } from "react";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled: boolean;
}

export default function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [value, setValue] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue("");
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-3 px-7 py-4 bg-white border-t border-gray-200 items-center"
    >
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your message in English, Hindi, or Hinglish..."
        disabled={disabled}
        autoComplete="off"
        className="flex-1 px-5 py-3.5 rounded-[14px] text-base md:text-sm bg-gray-50 border-[1.5px] border-gray-200 outline-none transition-all duration-200 focus:border-gold-500 focus:bg-white focus:ring-2 focus:ring-gold-500/12 placeholder:text-gray-400"
      />
      <button
        type="submit"
        disabled={disabled || !value.trim()}
        className="px-7 py-3.5 rounded-[14px] text-sm font-semibold bg-gradient-to-r from-gold-400 to-gold-500 text-navy-950 border-none cursor-pointer transition-all duration-200 shadow-lg shadow-gold-500/30 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-gold-500/40 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        Send
      </button>
    </form>
  );
}
