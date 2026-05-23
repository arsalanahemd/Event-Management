// ─── UploadZone.jsx ──────────────────────────────────────────
import React, { useState } from "react";
import { C } from "./tokens";

const UploadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke={C.gold} strokeWidth="2">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="17 8 12 3 7 8"/>
    <line x1="12" y1="3" x2="12" y2="15"/>
  </svg>
);

export default function UploadZone({ file, onChange, onRemove }) {
  const [drag, setDrag] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault(); setDrag(false);
    const f = e.dataTransfer.files[0];
    if (f) onChange(f);
  };

  return (
    <div className="f-group">
      <label className="f-lbl">Update Logo</label>

      <div
        onDragOver={e => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={handleDrop}
        style={{
          border: `1px dashed ${drag ? C.gold : "rgba(255,255,255,0.12)"}`,
          borderRadius: 12, padding: "18px 16px",
          textAlign: "center", cursor: "pointer",
          background: drag ? "rgba(201,168,76,0.04)" : "transparent",
          transition: "border-color .2s, background .2s",
          position: "relative",
        }}
      >
        <input
          type="file" accept="image/*"
          onChange={e => e.target.files[0] && onChange(e.target.files[0])}
          style={{ position: "absolute", inset: 0, opacity: 0, cursor: "pointer", width: "100%", height: "100%" }}
        />
        <div style={{
          width: 36, height: 36, borderRadius: 8,
          background: C.goldDim, border: `1px solid ${C.goldBorder}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 8px",
        }}>
          <UploadIcon />
        </div>
        <p style={{ fontSize: 12, fontWeight: 500, color: C.white, marginBottom: 2 }}>
          {file ? "Change Logo" : "Drag & drop or click to upload"}
        </p>
        <p style={{ fontSize: 11, color: C.muted }}>PNG, JPG, WEBP</p>
      </div>

      {file && (
        <div style={{
          display: "flex", alignItems: "center", gap: 10,
          background: "rgba(201,168,76,0.06)",
          border: `1px solid ${C.goldBorder}`,
          borderRadius: 8, padding: "9px 14px", marginTop: 10,
        }}>
          <span style={{ fontSize: 16 }}>🖼</span>
          <span style={{ fontSize: 12, color: C.gold, fontWeight: 500, flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {file.name}
          </span>
          <button type="button" onClick={onRemove}
            style={{ background: "none", border: "none", color: C.muted, cursor: "pointer", fontSize: 14, padding: 0 }}
            onMouseEnter={e => e.currentTarget.style.color = C.danger}
            onMouseLeave={e => e.currentTarget.style.color = C.muted}
          >✕</button>
        </div>
      )}
    </div>
  );
}