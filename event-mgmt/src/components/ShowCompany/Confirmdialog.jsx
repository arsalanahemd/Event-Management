// ─── ConfirmDialog.jsx ───────────────────────────────────────
import React from "react";
import { C } from "./tokens";

const WarnIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
    stroke={C.danger} strokeWidth="2">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
    <line x1="12" y1="9" x2="12" y2="13"/>
    <line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);

/**
 * @param {bool}     open
 * @param {function} onConfirm
 * @param {function} onCancel
 */
export default function ConfirmDialog({ open, onConfirm, onCancel }) {
  if (!open) return null;
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="confirm-box" onClick={e => e.stopPropagation()}>
        {/* icon */}
        <div style={{
          width: 56, height: 56, borderRadius: "50%",
          background: "rgba(248,113,113,0.08)",
          border: "1px solid rgba(248,113,113,0.22)",
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 18px",
        }}>
          <WarnIcon />
        </div>

        <h3 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "1.35rem", fontWeight: 700,
          color: C.white, marginBottom: 10,
        }}>
          Delete Company?
        </h3>

        <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.7, marginBottom: 28 }}>
          This action is irreversible. Your company profile will be permanently removed from EventSphere.
        </p>

        <div style={{ display: "flex", gap: 12 }}>
          <button className="btn-ghost" onClick={onCancel} style={{ flex: 1 }}>
            Cancel
          </button>
          <button
            onClick={onConfirm}
            style={{
              flex: 1, padding: "12px 0",
              background: C.dangerDim,
              border: `1px solid ${C.dangerBorder}`,
              borderRadius: 10,
              color: C.danger,
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13, fontWeight: 600,
              letterSpacing: ".06em", textTransform: "uppercase",
              cursor: "pointer",
              transition: "background .2s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(248,113,113,0.16)"}
            onMouseLeave={e => e.currentTarget.style.background = C.dangerDim}
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
}