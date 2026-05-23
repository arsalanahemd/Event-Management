// ─── LeftPanel.jsx ───────────────────────────────────────────
import React from "react";
import { C } from "./tokens";
import Brand       from "./Brand";
import StepGuide   from "./StepGuide";
import IndustryBadges from "./IndustryBadges";

export default function LeftPanel() {
  return (
    <div className="ac-left">
      {/* Top — brand */}
      <Brand />

      {/* Middle — hero + steps */}
      <div style={{ animation: "fadeUp .7s .1s ease both" }}>
        <p style={{
          fontSize: 10, letterSpacing: ".28em",
          color: "rgba(201,168,76,0.65)",
          textTransform: "uppercase", fontWeight: 600,
          marginBottom: 18,
        }}>
          // Company Registration
        </p>

        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(36px, 3.5vw, 52px)",
          lineHeight: 1.06, color: C.white,
          fontWeight: 700, marginBottom: 22,
        }}>
          Showcase your<br />brand to the{" "}
          <em style={{ fontStyle: "italic", color: C.gold }}>world.</em>
        </h1>

        <p style={{
          fontSize: 13, color: C.muted,
          lineHeight: 1.85, maxWidth: 340,
          fontWeight: 300, marginBottom: 44,
        }}>
          Register your company on EventSphere and get discovered by thousands of
          attendees, investors, and collaborators at every expo.
        </p>

        <StepGuide />
      </div>

      {/* Bottom — industry badges */}
      <IndustryBadges />
    </div>
  );
}