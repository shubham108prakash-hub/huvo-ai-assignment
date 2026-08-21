"use client";

import React from "react";

export default function TypingIndicator() {
  return (
    <div className="flex justify-start mb-4 animate-[msgIn_0.3s_ease-out]">
      <div className="w-8 h-8 bg-gradient-to-br from-gold-400 to-gold-500 rounded-[10px] flex items-center justify-center font-bold text-[13px] text-navy-950 shrink-0 self-end mr-2.5">
        N
      </div>
      <div className="px-5 py-3.5 rounded-[20px] rounded-bl-[6px] bg-white text-gray-400 text-sm shadow-md border border-black/[0.04] italic">
        Typing
        <span className="inline-flex gap-1 ml-1">
          <span className="w-[5px] h-[5px] bg-gray-400 rounded-full animate-[dotPulse_1.2s_ease-in-out_infinite]" />
          <span className="w-[5px] h-[5px] bg-gray-400 rounded-full animate-[dotPulse_1.2s_ease-in-out_infinite_0.15s]" />
          <span className="w-[5px] h-[5px] bg-gray-400 rounded-full animate-[dotPulse_1.2s_ease-in-out_infinite_0.3s]" />
        </span>
      </div>
    </div>
  );
}
