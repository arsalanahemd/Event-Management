// ─── StepGuide.jsx ───────────────────────────────────────────
import React from "react";
import { C } from "./tokens";

const STEPS = [
  {
    n: "01",
    title: "Fill Company Details",
    desc: "Add your company name, email, contact, and the products or services you offer.",
  },
  {
    n: "02",
    title: "Upload Your Logo",
    desc: "A professional logo helps attendees instantly recognise your brand at expos.",
  },
  {
    n: "03",
    title: "Submit & Go Live",
    desc: "Your profile goes live instantly — ready to participate in upcoming exhibitions.",
  },
];

function StepItem({ step }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
      {/* number pill */}
      <div style={{
        width: 32, height: 32, borderRadius: "50%",
        border: `1px solid ${C.goldBorder}`,
        background: C.goldDim,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 11, fontWeight: 600, color: C.gold,
        flexShrink: 0, letterSpacing: ".04em",
      }}>
        {step.n}
      </div>

      <div>
        <p style={{ fontSize: 13, fontWeight: 600, color: C.white, marginBottom: 3 }}>
          {step.title}
        </p>
        <p style={{ fontSize: 12, color: C.muted, lineHeight: 1.65, fontWeight: 300 }}>
          {step.desc}
        </p>
      </div>
    </div>
  );
}

export default function StepGuide() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18, animation: "fadeUp .7s .2s ease both" }}>
      {STEPS.map((s) => (
        <StepItem key={s.n} step={s} />
      ))}
    </div>
  );
}