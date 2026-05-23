// ─── Toast.jsx ───────────────────────────────────────────────
import React, { useEffect } from "react";

export default function Toast({ msg, type = "success", onClose, duration = 4000 }) {
  useEffect(() => {
    if (!msg || !duration) return;
    const t = setTimeout(onClose, duration);
    return () => clearTimeout(t);
  }, [msg]);

  if (!msg) return null;
  return (
    <div className={`toast ${type}`}>
      <span style={{ fontSize: 15 }}>{type === "success" ? "✓" : "✕"}</span>
      <span style={{ flex: 1 }}>{msg}</span>
      <button className="toast-close" onClick={onClose} aria-label="Close">✕</button>
    </div>
  );
}