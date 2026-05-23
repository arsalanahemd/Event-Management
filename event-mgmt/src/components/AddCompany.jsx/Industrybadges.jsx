// ─── IndustryBadges.jsx ──────────────────────────────────────
import React from "react";
import { C } from "./tokens";

const INDUSTRIES = [
  "Technology", "Healthcare", "Finance",
  "Retail", "Fashion", "F&B",
];

function Badge({ label }) {
  return (
    <span style={{
      padding: "7px 14px",
      border: `1px solid ${C.goldBorder}`,
      borderRadius: 999,
      fontSize: 11,
      color: C.gold,
      background: C.goldDim,
      fontWeight: 500,
      letterSpacing: ".04em",
    }}>
      {label}
    </span>
  );
}

export default function IndustryBadges() {
  return (
    <div style={{ animation: "fadeUp .7s .3s ease both" }}>
      <p style={{
        fontSize: 10, letterSpacing: ".1em",
        color: C.muted, textTransform: "uppercase",
        marginBottom: 12,
      }}>
        Trusted by exhibitors from
      </p>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        {INDUSTRIES.map((ind) => (
          <Badge key={ind} label={ind} />
        ))}
      </div>
    </div>
  );
}