// ─── InfoRow.jsx ─────────────────────────────────────────────
// A single labelled detail row with an icon box
import React from "react";
import { C } from "./tokens";

/**
 * @param {string}    label   - small uppercase label
 * @param {string}    value   - main text value
 * @param {ReactNode} icon    - SVG or emoji
 * @param {string}    iconBg  - background tint for icon box
 */
export default function InfoRow({ label, value, icon, iconBg }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
      {/* icon box */}
      <div style={{
        width: 38, height: 38, borderRadius: 10,
        background: iconBg || C.goldDim,
        border: `1px solid ${C.goldBorder}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0, fontSize: 16,
      }}>
        {icon}
      </div>

      {/* text */}
      <div>
        <p style={{
          fontSize: 10, letterSpacing: ".1em",
          textTransform: "uppercase",
          color: C.muted, marginBottom: 4,
        }}>
          {label}
        </p>
        <p style={{ fontSize: 14, color: C.white, lineHeight: 1.6, fontWeight: 400 }}>
          {value || "N/A"}
        </p>
      </div>
    </div>
  );
}