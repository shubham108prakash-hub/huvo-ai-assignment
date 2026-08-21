"use client";

import React from "react";

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

interface AnalyticsModalProps {
  analytics: Analytics;
  duration: string;
  onClose: () => void;
}

function badgeClass(value: string): string {
  if (["high", "positive"].includes(value)) return "bg-emerald-100 text-emerald-800";
  if (["medium", "neutral"].includes(value)) return "bg-yellow-100 text-yellow-800";
  return "bg-red-100 text-red-800";
}

function boolBadge(yes: boolean): { text: string; cls: string } {
  if (yes) return { text: "Yes", cls: "bg-yellow-100 text-yellow-800" };
  return { text: "No", cls: "bg-emerald-100 text-emerald-800" };
}

export default function AnalyticsModal({
  analytics,
  duration,
  onClose,
}: AnalyticsModalProps) {
  const a = analytics;
  const visitBadge = a.site_visit_booked
    ? { text: "Booked", cls: "bg-emerald-100 text-emerald-800" }
    : { text: "Not booked", cls: "bg-red-100 text-red-800" };
  const followUp = boolBadge(a.follow_up_needed);
  const humanAgent = boolBadge(a.wants_human_agent);
  const stopComm = a.stop_communication
    ? { text: "Yes", cls: "bg-red-100 text-red-800" }
    : { text: "No", cls: "bg-emerald-100 text-emerald-800" };

  const stats = [
    { label: "Customer Name", value: a.customer_name || "Not provided", badge: "" },
    { label: "Interest Level", value: a.interest_level, badge: badgeClass(a.interest_level) },
    { label: "Configuration", value: a.configuration, badge: "" },
    { label: "Budget", value: a.budget, badge: "" },
    { label: "Site Visit", value: visitBadge.text, badge: visitBadge.cls },
    { label: "Sentiment", value: a.sentiment, badge: badgeClass(a.sentiment) },
    { label: "Follow-up Needed", value: followUp.text, badge: followUp.cls },
    { label: "Human Agent Requested", value: humanAgent.text, badge: humanAgent.cls },
    { label: "Stop Communication", value: stopComm.text, badge: stopComm.cls },
    { label: "Messages", value: String(a.customer_messages), badge: "" },
    { label: "Duration", value: duration, badge: "" },
  ];

  return (
    <div
      className="fixed inset-0 bg-navy-950/60 backdrop-blur-sm flex items-center justify-center z-50 animate-[fadeIn_0.2s_ease]"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-[20px] w-[92%] max-w-[640px] max-h-[82vh] overflow-hidden shadow-2xl animate-[modalIn_0.3s_ease]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center px-6 py-5 bg-gradient-to-r from-navy-950 to-navy-800 text-white">
          <h2 className="text-base font-semibold">Conversation Analytics</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-lg leading-none"
          >
            &times;
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(82vh-70px)] scrollbar-thin">
          <div className="grid grid-cols-[repeat(auto-fill,minmax(170px,1fr))] gap-3 p-5">
            {stats.map((s) => (
              <div
                key={s.label}
                className="bg-gray-50 p-4 rounded-[14px] border border-gray-200 hover:-translate-y-0.5 hover:shadow-sm transition-all duration-200"
              >
                <div className="text-[10px] uppercase tracking-widest text-gray-400 mb-2 font-semibold">
                  {s.label}
                </div>
                {s.badge ? (
                  <span
                    className={`inline-block px-3 py-0.5 rounded-full text-xs font-semibold ${s.badge}`}
                  >
                    {s.value}
                  </span>
                ) : (
                  <span className="text-sm font-semibold text-navy-900">{s.value}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
