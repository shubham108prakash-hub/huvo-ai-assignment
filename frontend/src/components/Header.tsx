"use client";

import React from "react";

interface HeaderProps {
  onAnalytics: () => void;
  onNewChat: () => void;
}

export default function Header({ onAnalytics, onNewChat }: HeaderProps) {
  return (
    <header className="relative flex items-center justify-between px-7 py-4 bg-gradient-to-r from-navy-950 via-navy-900 to-navy-800 text-white overflow-hidden">
      <div className="absolute -top-12 -right-8 w-48 h-48 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex items-center gap-3.5 z-10">
        <div className="w-11 h-11 bg-gradient-to-br from-gold-400 to-gold-500 rounded-xl flex items-center justify-center font-bold text-lg text-navy-950 shadow-lg shadow-gold-500/20">
          N
        </div>
        <div>
          <h1 className="text-[17px] font-semibold tracking-tight">Northstar Homes</h1>
          <span className="text-[12px] text-gold-300 font-medium tracking-wide">
            AI Sales Assistant
          </span>
        </div>
      </div>

      <div className="flex gap-2 z-10">
        <button
          onClick={onAnalytics}
          className="px-4 py-2 text-[13px] font-medium border border-gold-500/30 bg-gold-500/10 text-gold-300 rounded-xl hover:bg-gold-500/20 hover:border-gold-500/50 transition-all duration-200 hover:-translate-y-0.5 backdrop-blur-sm"
        >
          Analytics
        </button>
        <button
          onClick={onNewChat}
          className="px-4 py-2 text-[13px] font-medium border border-gold-500/30 bg-gold-500/10 text-gold-300 rounded-xl hover:bg-gold-500/20 hover:border-gold-500/50 transition-all duration-200 hover:-translate-y-0.5 backdrop-blur-sm"
        >
          New Chat
        </button>
      </div>
    </header>
  );
}
