// ─── SkeletonCard.jsx ────────────────────────────────────────
import React from "react";
import { C } from "./tokens";

function SkeletonLine({ w = "100%", h = 14, mb = 10 }) {
  return (
    <div className="skeleton" style={{ width: w, height: h, marginBottom: mb }} />
  );
}

export default function SkeletonCard() {
  return (
    <div style={{
      background: C.card,
      border: `1px solid ${C.border}`,
      borderRadius: 18,
      overflow: "hidden",
      animation: "fadeIn .5s ease",
    }}>
      {/* image area */}
      <div className="skeleton" style={{ height: 180, borderRadius: 0 }} />

      <div style={{ padding: "32px 28px" }}>
        <SkeletonLine w="55%" h={22} mb={20} />

        {/* divider */}
        <div style={{ height: 1, background: C.border, marginBottom: 24 }} />

        {[1, 2, 3, 4].map((i) => (
          <div key={i} style={{ display: "flex", gap: 14, marginBottom: 22 }}>
            <div className="skeleton" style={{ width: 36, height: 36, borderRadius: 8, flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <SkeletonLine w="30%" h={10} mb={8} />
              <SkeletonLine w="70%" h={13} mb={0} />
            </div>
          </div>
        ))}

        <div style={{ display: "flex", gap: 12, marginTop: 28 }}>
          <div className="skeleton" style={{ flex: 1, height: 44, borderRadius: 10 }} />
          <div className="skeleton" style={{ flex: 1, height: 44, borderRadius: 10 }} />
        </div>
      </div>
    </div>
  );
}