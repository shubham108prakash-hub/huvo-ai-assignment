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

function badge(value: string) {
  if (["high", "positive", "No"].includes(value))
    return { bg: "#dcfce7", color: "#166534" };
  if (["medium", "neutral"].includes(value))
    return { bg: "#fef9c3", color: "#854d0e" };
  return { bg: "#fee2e2", color: "#991b1b" };
}

export default function AnalyticsModal({ analytics: a, duration, onClose }: AnalyticsModalProps) {
  const visitStyle = a.site_visit_booked
    ? { bg: "#dcfce7", color: "#166534" }
    : { bg: "#fee2e2", color: "#991b1b" };

  const stats = [
    { label: "Customer Name", value: a.customer_name || "Not provided", isBadge: false },
    { label: "Interest Level", value: a.interest_level, isBadge: true, style: badge(a.interest_level) },
    { label: "Configuration", value: a.configuration || "—", isBadge: false },
    { label: "Budget", value: a.budget || "—", isBadge: false },
    { label: "Site Visit", value: a.site_visit_booked ? "Booked ✓" : "Not booked", isBadge: true, style: visitStyle },
    { label: "Sentiment", value: a.sentiment, isBadge: true, style: badge(a.sentiment) },
    { label: "Follow-up Needed", value: a.follow_up_needed ? "Yes" : "No", isBadge: true, style: badge(a.follow_up_needed ? "low" : "No") },
    { label: "Human Agent", value: a.wants_human_agent ? "Requested" : "No", isBadge: true, style: badge(a.wants_human_agent ? "low" : "No") },
    { label: "Stop Communication", value: a.stop_communication ? "Yes" : "No", isBadge: true, style: badge(a.stop_communication ? "low" : "No") },
    { label: "Messages Sent", value: String(a.customer_messages), isBadge: false },
    { label: "Duration", value: duration, isBadge: false },
  ];

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(10,25,41,0.65)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100,
        padding: "20px",
        animation: "fadeSlide 0.2s ease both",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff",
          borderRadius: "20px",
          width: "100%",
          maxWidth: "600px",
          maxHeight: "85svh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 30px 60px rgba(0,0,0,0.3)",
          animation: "fadeSlide 0.25s ease both",
        }}
      >
        {/* Modal header */}
        <div
          className="flex items-center justify-between px-6 py-4"
          style={{ background: "linear-gradient(135deg, #0a1929, #243b53)", color: "#fff" }}
        >
          <h2 className="text-[15px] font-semibold">Conversation Analytics</h2>
          <button
            onClick={onClose}
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              border: "none",
              background: "rgba(255,255,255,0.12)",
              color: "#fff",
              fontSize: 18,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ×
          </button>
        </div>

        {/* Stats grid */}
        <div
          style={{ overflowY: "auto", padding: "20px" }}
          className="grid grid-cols-2 sm:grid-cols-3 gap-3"
        >
          {stats.map((s) => (
            <div
              key={s.label}
              style={{
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: 14,
                padding: "14px 16px",
              }}
            >
              <p style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.08em", color: "#94a3b8", fontWeight: 600, marginBottom: 8 }}>
                {s.label}
              </p>
              {s.isBadge && s.style ? (
                <span
                  style={{
                    display: "inline-block",
                    padding: "3px 10px",
                    borderRadius: 999,
                    fontSize: 12,
                    fontWeight: 600,
                    background: s.style.bg,
                    color: s.style.color,
                    textTransform: "capitalize",
                  }}
                >
                  {s.value}
                </span>
              ) : (
                <p style={{ fontSize: 13, fontWeight: 600, color: "#1e293b" }}>{s.value}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
