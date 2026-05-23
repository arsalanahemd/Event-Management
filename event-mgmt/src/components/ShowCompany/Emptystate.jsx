// ─── EmptyState.jsx ──────────────────────────────────────────
import React from "react";
import { C } from "./tokens";

const BuildingIcon = () => (
  <svg width="52" height="52" viewBox="0 0 24 24" fill="none"
    stroke="rgba(255,255,255,0.15)" strokeWidth="1.2">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);

export default function EmptyState() {
  return (
    <div style={{
      background: C.card,
      border: `1.5px dashed ${C.border}`,
      borderRadius: 18,
      padding: "72px 40px",
      textAlign: "center",
      animation: "fadeUp .6s ease",
    }}>
      <div style={{
        width: 80, height: 80, borderRadius: "50%",
        background: "rgba(255,255,255,0.03)",
        border: `1px solid ${C.border}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        margin: "0 auto 20px",
      }}>
        <BuildingIcon />
      </div>

      <h3 style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "1.4rem", fontWeight: 700,
        color: C.white, marginBottom: 10,
      }}>
        No company registered yet
      </h3>

      <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.7, maxWidth: 320, margin: "0 auto 28px" }}>
        You haven't set up your company profile. Register now to start participating in expos.
      </p>

      <a href="/addCompany" style={{
        display: "inline-block",
        padding: "12px 28px",
        background: C.gold,
        color: "#0a0a0a",
        borderRadius: 10,
        fontSize: 13, fontWeight: 600,
        letterSpacing: ".07em", textTransform: "uppercase",
        textDecoration: "none",
        transition: "background .2s",
      }}
        onMouseEnter={e => e.currentTarget.style.background = C.goldHover}
        onMouseLeave={e => e.currentTarget.style.background = C.gold}
      >
        Add Company →
      </a>
    </div>
  );
}