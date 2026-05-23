// ─── CompanyForm.jsx ─────────────────────────────────────────
import React from "react";
import { C }          from "./tokens";
import Toast          from "./Toast";
import UploadZone     from "./UploadZone";
import SubmitButton   from "./SubmitButton";

/**
 * Props:
 *   formData     { companyName, productsOrServices, companyEmail, contactNumber, description, image }
 *   onChange     (e) => void
 *   onFileChange (File) => void
 *   onFileRemove () => void
 *   onSubmit     (e) => void
 *   loading      bool
 *   toast        { msg, type }
 *   onToastClose () => void
 */
export default function CompanyForm({
  formData,
  onChange,
  onFileChange,
  onFileRemove,
  onSubmit,
  loading,
  toast,
  onToastClose,
}) {
  return (
    <div style={{
      width: "100%",
      background: C.card,
      border: `1px solid ${C.border}`,
      borderRadius: 18,
      padding: "36px 32px",
      animation: "fadeUp .6s .15s ease both",
    }}>
      {/* Gold top bar */}
      <div style={{
        height: 3, borderRadius: 3,
        background: `linear-gradient(90deg, transparent, ${C.gold}, transparent)`,
        marginBottom: 30,
      }} />

      {/* Heading */}
      <p style={{
        fontSize: 10, letterSpacing: ".25em",
        color: C.gold, textTransform: "uppercase",
        fontWeight: 600, marginBottom: 8,
      }}>
        // New Registration
      </p>
      <h2 style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 28, fontWeight: 700,
        color: C.white, marginBottom: 4,
      }}>
        Add Your Company
      </h2>
      <p style={{
        fontSize: 12, color: C.muted,
        marginBottom: 26, fontWeight: 300, lineHeight: 1.6,
      }}>
        Register your business for upcoming expos
      </p>

      {/* Toast */}
      <Toast msg={toast.msg} type={toast.type} onClose={onToastClose} />

      {/* Form */}
      <form onSubmit={onSubmit}>

        {/* Company Name */}
        <div className="f-group">
          <label className="f-lbl">Company Name</label>
          <input
            className="f-input"
            name="companyName"
            value={formData.companyName}
            onChange={onChange}
            placeholder="Acme Corporation"
            required
          />
        </div>

        {/* Products / Services */}
        <div className="f-group">
          <label className="f-lbl">Products or Services</label>
          <input
            className="f-input"
            name="productsOrServices"
            value={formData.productsOrServices}
            onChange={onChange}
            placeholder="e.g. SaaS, Consulting, Electronics…"
            required
          />
        </div>

        {/* Email + Contact row */}
        <div className="f-row">
          <div>
            <label className="f-lbl">Company Email</label>
            <input
              className="f-input"
              type="email"
              name="companyEmail"
              value={formData.companyEmail}
              onChange={onChange}
              placeholder="hello@company.com"
              required
            />
          </div>
          <div>
            <label className="f-lbl">Contact Number</label>
            <input
              className="f-input"
              type="tel"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={onChange}
              placeholder="+1 234 567 890"
            />
          </div>
        </div>

        {/* Description */}
        <div className="f-group">
          <label className="f-lbl">Description</label>
          <textarea
            className="f-input"
            name="description"
            value={formData.description}
            onChange={onChange}
            placeholder="Tell attendees what makes your company unique…"
            rows={3}
          />
        </div>

        {/* Logo Upload */}
        <UploadZone
          file={formData.image}
          onChange={onFileChange}
          onRemove={onFileRemove}
        />

        {/* Submit */}
        <SubmitButton loading={loading} />
      </form>
    </div>
  );
}