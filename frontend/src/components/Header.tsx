"use client";
import React from "react";

interface HeaderProps {
  onAnalytics: () => void;
  onNewChat: () => void;
}

export default function Header({ onAnalytics, onNewChat }: HeaderProps) {
  return (
    <header
      style={{ background: "linear-gradient(135deg, #0a1929 0%, #243b53 100%)" }}
      className="relative flex items-center justify-between px-5 py-4 text-white overflow-hidden shrink-0"
    >
      {/* Glow accent */}
      <div
        className="pointer-events-none absolute -top-10 -right-6 w-40 h-40 rounded-full opacity-20"
        style={{ background: "radial-gradient(circle, #e4af3c, transparent 70%)" }}
      />

      {/* Logo + name */}
      <div className="flex items-center gap-3 z-10">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-base shrink-0 shadow-lg"
          style={{ background: "linear-gradient(135deg, #e4af3c, #c8a45c)", color: "#0a1929" }}
        >
          N
        </div>
        <div>
          <p className="text-[15px] font-semibold leading-tight tracking-tight">Northstar Homes</p>
          <p className="text-[11px] font-medium tracking-wider" style={{ color: "#ecc46d" }}>
            AI Sales Assistant
          </p>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-2 z-10">
        {[
          { label: "Analytics", onClick: onAnalytics },
          { label: "New Chat", onClick: onNewChat },
        ].map(({ label, onClick }) => (
          <button
            key={label}
            onClick={onClick}
            className="px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200"
            style={{
              border: "1px solid rgba(228,175,60,0.35)",
              background: "rgba(228,175,60,0.12)",
              color: "#ecc46d",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(228,175,60,0.25)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(228,175,60,0.12)";
            }}
          >
            {label}
          </button>
        ))}
      </div>
    </header>
  );
}
