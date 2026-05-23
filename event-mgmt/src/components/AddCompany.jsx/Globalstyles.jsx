// ─── GlobalStyles.jsx ────────────────────────────────────────
// Inject once at the top of AddCompany page
import React from "react";
import { C } from "./tokens";

export default function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,700;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');

      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      html, body {
        background: ${C.bg};
        font-family: 'DM Sans', sans-serif;
        color: ${C.white};
        min-height: 100vh;
      }

      @keyframes fadeUp {
        from { opacity: 0; transform: translateY(22px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes fadeIn {
        from { opacity: 0; }
        to   { opacity: 1; }
      }
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
      @keyframes toastIn {
        from { opacity: 0; transform: translateY(-8px); }
        to   { opacity: 1; transform: translateY(0); }
      }

      /* ── Page grid ── */
      .ac-page {
        display: grid;
        grid-template-columns: 1fr 490px;
        min-height: 100vh;
      }

      /* ── Left panel ── */
      .ac-left {
        background: ${C.bg};
        padding: 56px 60px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        border-right: 1px solid ${C.border};
        position: relative;
        overflow: hidden;
        animation: fadeIn .5s ease;
      }
      .ac-left::before {
        content: '';
        position: absolute; bottom: 0; right: 0;
        width: 200px; height: 200px;
        border-left: 1px solid rgba(201,168,76,0.06);
        border-top:  1px solid rgba(201,168,76,0.06);
        border-radius: 100% 0 0 0;
        pointer-events: none;
      }

      /* ── Right panel ── */
      .ac-right {
        background: ${C.surface};
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 40px 36px;
      }

      /* ── Shared input ── */
      .f-input {
        width: 100%;
        background: rgba(255,255,255,0.03);
        border: 1px solid rgba(255,255,255,0.07);
        border-radius: 10px;
        padding: 12px 14px;
        color: ${C.white};
        font-family: 'DM Sans', sans-serif;
        font-size: 13px;
        outline: none;
        transition: border-color .2s, background .2s;
        resize: none;
      }
      .f-input:focus {
        border-color: ${C.gold};
        background: rgba(201,168,76,0.05);
      }
      .f-input::placeholder { color: rgba(255,255,255,0.2); }

      .f-lbl {
        font-size: 10px;
        letter-spacing: .1em;
        text-transform: uppercase;
        color: rgba(255,255,255,0.36);
        display: block;
        margin-bottom: 6px;
      }
      .f-group  { margin-bottom: 14px; }
      .f-row    { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 14px; }

      /* ── Submit button ── */
      .btn-submit {
        width: 100%;
        padding: 14px;
        background: ${C.gold};
        border: none;
        border-radius: 10px;
        color: #0a0a0a;
        font-family: 'DM Sans', sans-serif;
        font-size: 13px;
        font-weight: 600;
        letter-spacing: .08em;
        text-transform: uppercase;
        cursor: pointer;
        transition: background .2s, transform .15s;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        margin-top: 8px;
      }
      .btn-submit:hover  { background: ${C.goldHover}; transform: translateY(-1px); }
      .btn-submit:active { transform: scale(.99); }
      .btn-submit:disabled { opacity: .5; cursor: not-allowed; transform: none; }

      .spinner {
        width: 14px; height: 14px;
        border: 2px solid rgba(10,10,10,0.3);
        border-top-color: #0a0a0a;
        border-radius: 50%;
        animation: spin .7s linear infinite;
      }

      @media (max-width: 860px) {
        .ac-page { grid-template-columns: 1fr; }
        .ac-left  { display: none; }
      }
    `}</style>
  );
}