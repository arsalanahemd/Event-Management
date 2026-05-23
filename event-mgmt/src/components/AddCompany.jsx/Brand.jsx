// ─── Brand.jsx ───────────────────────────────────────────────
import React from "react";
import { C } from "./tokens";

export default function Brand() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, animation: "fadeIn .5s ease" }}>
      <div style={{ width: 8, height: 8, background: C.gold, borderRadius: "50%" }} />
      <span style={{
        fontSize: 12,
        letterSpacing: ".2em",
        color: C.gold,
        fontWeight: 600,
        textTransform: "uppercase",
      }}>
        EventSphere
      </span>
    </div>
  );
}