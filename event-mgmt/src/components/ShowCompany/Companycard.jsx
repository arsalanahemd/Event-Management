// ─── CompanyCard.jsx ─────────────────────────────────────────
import React from "react";
import { C }       from "./tokens";
import InfoRow     from "./InfoRow";

const BASE_URL = "http://localhost:3001";

/* inline SVG icons */
const IconBriefcase = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.gold} strokeWidth="2">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
  </svg>
);
const IconMail = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.gold} strokeWidth="2">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);
const IconPhone = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.gold} strokeWidth="2">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.58 3.38 2 2 0 0 1 3.55 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.54a16 16 0 0 0 6.29 6.29l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);
const IconDoc = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.gold} strokeWidth="2">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
    <polyline points="10 9 9 9 8 9"/>
  </svg>
);
const IconEdit = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);
const IconTrash = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polyline points="3 6 5 6 21 6"/>
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
    <path d="M10 11v6M14 11v6"/>
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
  </svg>
);

/**
 * Props:
 *   company    object
 *   onEdit     () => void
 *   onDelete   () => void
 */
export default function CompanyCard({ company, onEdit, onDelete }) {
  return (
    <div style={{
      background: C.card,
      border: `1px solid ${C.border}`,
      borderRadius: 18,
      overflow: "hidden",
      animation: "fadeUp .6s .1s ease both",
    }}>
      {/* Logo area */}
      {company.image && (
        <div style={{
          padding: "32px 24px",
          background: "rgba(255,255,255,0.02)",
          borderBottom: `1px solid ${C.border}`,
          textAlign: "center",
        }}>
          <img
            src={`${BASE_URL}/uploads/${company.image}`}
            alt={`${company.companyName} logo`}
            style={{
              maxHeight: 120, maxWidth: "100%",
              objectFit: "contain",
              filter: "drop-shadow(0 8px 20px rgba(0,0,0,0.4))",
            }}
          />
        </div>
      )}

      {/* Content */}
      <div style={{ padding: "30px 28px" }}>

        {/* Company name + tag */}
        <div style={{ marginBottom: 20 }}>
          <p style={{
            fontSize: 10, letterSpacing: ".2em",
            color: C.muted, textTransform: "uppercase",
            marginBottom: 6,
          }}>
            Registered Company
          </p>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1.8rem", fontWeight: 700,
            color: C.white, lineHeight: 1.1,
          }}>
            {company.companyName}
          </h2>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: C.border, marginBottom: 24 }} />

        {/* Info rows */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20, marginBottom: 28 }}>
          <InfoRow
            label="Services & Products"
            value={company.productsOrServices}
            icon={<IconBriefcase />}
          />
          <InfoRow
            label="Official Email"
            value={company.companyEmail}
            icon={<IconMail />}
          />
          <InfoRow
            label="Contact Number"
            value={company.contactNumber}
            icon={<IconPhone />}
          />
          <InfoRow
            label="Business Description"
            value={company.description || "No description provided."}
            icon={<IconDoc />}
          />
        </div>

        {/* Gold divider */}
        <div style={{ height: 1, background: `linear-gradient(90deg,transparent,${C.gold},transparent)`, marginBottom: 22 }} />

        {/* Action buttons */}
        <div style={{ display: "flex", gap: 12 }}>
          <button className="btn-gold" onClick={onEdit} type="button">
            <IconEdit /> Edit Profile
          </button>
          <button className="btn-danger" onClick={onDelete} type="button">
            <IconTrash /> Delete
          </button>
        </div>
      </div>
    </div>
  );
}