// ─── HeroBanner.jsx ──────────────────────────────────────────
import React from "react";
import { C } from "./tokens";

export default function HeroBanner() {
  return (
    <div className="sc-hero">
      <div className="sc-hero-top-bar" />

      <div style={{ position: "relative", animation: "fadeUp .7s ease" }}>
        <p style={{
          fontSize: 10, letterSpacing: ".28em",
          color: "rgba(201,168,76,0.65)",
          textTransform: "uppercase", fontWeight: 600,
          marginBottom: 14,
        }}>
          // Exhibitor Dashboard
        </p>

        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(2rem, 5vw, 3rem)",
          fontWeight: 700, color: C.white,
          lineHeight: 1.1, marginBottom: 14,
        }}>
          Company{" "}
          <em style={{
            fontStyle: "italic",
            background: `linear-gradient(135deg, ${C.gold}, ${C.goldHover})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            Profile
          </em>
        </h1>

        <p style={{
          color: C.muted, fontSize: 14,
          maxWidth: 480, margin: "0 auto",
          lineHeight: 1.75, fontWeight: 300,
        }}>
          Manage your professional presence and business details for the expo network.
        </p>
      </div>
    </div>
  );
}