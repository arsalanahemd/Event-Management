// ─── SubmitButton.jsx ────────────────────────────────────────
import React from "react";

/**
 * @param {boolean}  loading
 * @param {string}   label       - default text
 * @param {string}   loadingText - text while submitting
 */
export default function SubmitButton({
  loading = false,
  label = "Register Company",
  loadingText = "Registering…",
}) {
  return (
    <button className="btn-submit" type="submit" disabled={loading}>
      {loading && <span className="spinner" />}
      {loading ? loadingText : label}
    </button>
  );
}