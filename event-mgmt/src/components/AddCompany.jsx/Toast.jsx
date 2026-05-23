// ─── Toast.jsx ───────────────────────────────────────────────
import React, { useEffect } from "react";

const styles = {
  base: {
    borderRadius: 10,
    padding: "12px 16px",
    marginBottom: 18,
    display: "flex",
    alignItems: "center",
    gap: 10,
    fontSize: 13,
    animation: "toastIn .3s ease",
  },
  success: {
    background: "rgba(20,45,20,0.92)",
    border: "1px solid rgba(74,222,128,0.3)",
    color: "#86efac",
  },
  error: {
    background: "rgba(45,15,15,0.92)",
    border: "1px solid rgba(248,113,113,0.3)",
    color: "#fca5a5",
  },
  closeBtn: {
    marginLeft: "auto",
    background: "none",
    border: "none",
    color: "inherit",
    cursor: "pointer",
    opacity: 0.6,
    fontSize: 14,
    padding: 0,
    lineHeight: 1,
  },
};

/**
 * @param {string}  msg      - message text (empty = hidden)
 * @param {"success"|"error"} type
 * @param {function} onClose
 * @param {number}  duration - auto-close ms (default 4000, 0 = manual only)
 */
export default function Toast({ msg, type = "success", onClose, duration = 4000 }) {
  useEffect(() => {
    if (!msg || !duration) return;
    const t = setTimeout(onClose, duration);
    return () => clearTimeout(t);
  }, [msg]);

  if (!msg) return null;

  return (
    <div style={{ ...styles.base, ...(type === "success" ? styles.success : styles.error) }}>
      <span style={{ fontSize: 15 }}>{type === "success" ? "✓" : "✕"}</span>
      <span style={{ flex: 1 }}>{msg}</span>
      <button style={styles.closeBtn} onClick={onClose} aria-label="Close">✕</button>
    </div>
  );
}