// ─── EditModal.jsx ───────────────────────────────────────────
import React from "react";
import { C }          from "./tokens";
import UploadZone     from "./UploadZone";

/**
 * Props:
 *   open         bool
 *   editData     { companyName, productsOrServices, companyEmail, contactNumber, description, image }
 *   onChange     (e) => void
 *   onFileChange (File) => void
 *   onFileRemove () => void
 *   onSave       () => void
 *   onClose      () => void
 *   saving       bool
 */
export default function EditModal({
  open, editData,
  onChange, onFileChange, onFileRemove,
  onSave, onClose, saving,
}) {
  if (!open) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div style={{
          padding: "28px 28px 0",
          borderBottom: `1px solid ${C.border}`,
          paddingBottom: 20,
          marginBottom: 24,
        }}>
          <div style={{ height: 3, background: `linear-gradient(90deg,transparent,${C.gold},transparent)`, borderRadius: 3, marginBottom: 20 }} />
          <p style={{ fontSize: 10, letterSpacing: ".25em", color: C.gold, textTransform: "uppercase", fontWeight: 600, marginBottom: 6 }}>
            // Edit Profile
          </p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, fontWeight: 700, color: C.white }}>
            Update Business Info
          </h2>
        </div>

        {/* Form body */}
        <div style={{ padding: "0 28px 28px" }}>

          {/* Logo upload */}
          <UploadZone
            file={editData.image}
            onChange={onFileChange}
            onRemove={onFileRemove}
          />

          {/* Company Name */}
          <div className="f-group">
            <label className="f-lbl">Company Name</label>
            <input className="f-input" name="companyName"
              value={editData.companyName} onChange={onChange}
              placeholder="Acme Corporation" required />
          </div>

          {/* Products / Services */}
          <div className="f-group">
            <label className="f-lbl">Products or Services</label>
            <input className="f-input" name="productsOrServices"
              value={editData.productsOrServices} onChange={onChange}
              placeholder="e.g. SaaS, Consulting…" required />
          </div>

          {/* Email + Phone row */}
          <div className="f-row">
            <div>
              <label className="f-lbl">Official Email</label>
              <input className="f-input" type="email" name="companyEmail"
                value={editData.companyEmail} onChange={onChange}
                placeholder="hello@company.com" required />
            </div>
            <div>
              <label className="f-lbl">Contact Phone</label>
              <input className="f-input" type="tel" name="contactNumber"
                value={editData.contactNumber} onChange={onChange}
                placeholder="+1 234 567 890" />
            </div>
          </div>

          {/* Description */}
          <div className="f-group">
            <label className="f-lbl">Business Description</label>
            <textarea className="f-input" name="description"
              value={editData.description} onChange={onChange}
              placeholder="What makes your company unique…" rows={3} />
          </div>

          {/* Actions */}
          <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
            <button className="btn-ghost" onClick={onClose} type="button">
              Cancel
            </button>
            <button
              className="btn-gold"
              onClick={onSave}
              disabled={saving}
              style={{ flex: 1 }}
            >
              {saving && <span className="spinner" />}
              {saving ? "Saving…" : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}