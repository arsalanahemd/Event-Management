// ─── GlobalStyles.jsx ────────────────────────────────────────
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
      @keyframes fadeIn  { from { opacity:0; } to { opacity:1; } }
      @keyframes spin    { to   { transform: rotate(360deg); } }
      @keyframes toastIn {
        from { opacity:0; transform: translateY(-8px); }
        to   { opacity:1; transform: translateY(0); }
      }
      @keyframes overlayIn {
        from { opacity:0; }
        to   { opacity:1; }
      }
      @keyframes modalUp {
        from { opacity:0; transform: translateY(24px) scale(.97); }
        to   { opacity:1; transform: translateY(0)   scale(1);   }
      }
      @keyframes shimmer {
        0%   { background-position: -600px 0; }
        100% { background-position:  600px 0; }
      }

      /* ── Page shell ── */
      .sc-page { background: ${C.bg}; min-height: 100vh; }

      /* ── Hero ── */
      .sc-hero {
        background: ${C.surface};
        border-bottom: 1px solid ${C.border};
        padding: 64px 24px 52px;
        text-align: center;
        position: relative;
        overflow: hidden;
      }
      .sc-hero::before {
        content: '';
        position: absolute; inset: 0;
        opacity: .035;
        background-image: radial-gradient(circle, #c9a84c 1px, transparent 1px);
        background-size: 32px 32px;
      }
      .sc-hero-top-bar {
        position: absolute; top: 0; left: 50%;
        transform: translateX(-50%);
        width: 100px; height: 3px;
        background: ${C.gold};
        border-radius: 0 0 4px 4px;
      }

      /* ── Body container ── */
      .sc-body { max-width: 640px; margin: 0 auto; padding: 56px 24px 80px; }

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
      .f-input:focus  { border-color: ${C.gold}; background: rgba(201,168,76,0.05); }
      .f-input::placeholder { color: rgba(255,255,255,0.2); }
      .f-lbl {
        font-size: 10px; letter-spacing: .1em;
        text-transform: uppercase;
        color: rgba(255,255,255,0.36);
        display: block; margin-bottom: 6px;
      }
      .f-group  { margin-bottom: 14px; }
      .f-row    { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 14px; }

      /* ── Buttons ── */
      .btn-gold {
        flex: 1; padding: 13px 0;
        background: ${C.gold}; border: none; border-radius: 10px;
        color: #0a0a0a;
        font-family: 'DM Sans', sans-serif;
        font-size: 13px; font-weight: 600;
        letter-spacing: .06em; text-transform: uppercase;
        cursor: pointer;
        display: flex; align-items: center; justify-content: center; gap: 8px;
        transition: background .2s, transform .15s;
      }
      .btn-gold:hover  { background: ${C.goldHover}; transform: translateY(-1px); }
      .btn-gold:active { transform: scale(.99); }

      .btn-danger {
        flex: 1; padding: 13px 0;
        background: ${C.dangerDim};
        border: 1px solid ${C.dangerBorder};
        border-radius: 10px;
        color: ${C.danger};
        font-family: 'DM Sans', sans-serif;
        font-size: 13px; font-weight: 600;
        letter-spacing: .06em; text-transform: uppercase;
        cursor: pointer;
        display: flex; align-items: center; justify-content: center; gap: 8px;
        transition: background .2s, transform .15s;
      }
      .btn-danger:hover  { background: rgba(248,113,113,0.14); transform: translateY(-1px); }
      .btn-danger:active { transform: scale(.99); }

      .btn-ghost {
        padding: 11px 22px;
        background: transparent;
        border: 1px solid ${C.border};
        border-radius: 10px;
        color: ${C.muted};
        font-family: 'DM Sans', sans-serif;
        font-size: 13px; font-weight: 500;
        cursor: pointer;
        transition: border-color .2s, color .2s;
      }
      .btn-ghost:hover { border-color: rgba(255,255,255,0.2); color: ${C.white}; }

      .spinner {
        width: 14px; height: 14px;
        border: 2px solid rgba(10,10,10,0.3);
        border-top-color: #0a0a0a;
        border-radius: 50%;
        animation: spin .7s linear infinite;
      }

      /* ── Toast ── */
      .toast { border-radius: 10px; padding: 12px 16px; margin-bottom: 20px;
               display: flex; align-items: center; gap: 10px;
               font-size: 13px; animation: toastIn .3s ease; }
      .toast.success { background: rgba(20,45,20,.92); border: 1px solid rgba(74,222,128,.3); color: #86efac; }
      .toast.error   { background: rgba(45,15,15,.92); border: 1px solid rgba(248,113,113,.3); color: #fca5a5; }
      .toast-close   { margin-left:auto; background:none; border:none; color:inherit;
                       cursor:pointer; opacity:.6; font-size:14px; padding:0; }

      /* ── Skeleton ── */
      .skeleton {
        background: linear-gradient(90deg, #1a1a1a 25%, #242424 50%, #1a1a1a 75%);
        background-size: 600px 100%;
        animation: shimmer 1.4s infinite;
        border-radius: 8px;
      }

      /* ── Modal overlay ── */
      .modal-overlay {
        position: fixed; inset: 0; z-index: 1000;
        background: rgba(0,0,0,0.75);
        backdrop-filter: blur(4px);
        display: flex; align-items: center; justify-content: center;
        padding: 24px;
        animation: overlayIn .25s ease;
      }
      .modal-box {
        background: ${C.card};
        border: 1px solid ${C.border};
        border-radius: 18px;
        width: 100%; max-width: 480px;
        max-height: 90vh; overflow-y: auto;
        animation: modalUp .3s ease;
      }
      .modal-box::-webkit-scrollbar { width: 4px; }
      .modal-box::-webkit-scrollbar-thumb { background: ${C.gold}; border-radius: 2px; }

      /* ── Confirm dialog ── */
      .confirm-box {
        background: ${C.card};
        border: 1px solid ${C.border};
        border-radius: 16px;
        width: 100%; max-width: 360px;
        padding: 32px 28px;
        animation: modalUp .3s ease;
        text-align: center;
      }

      @media (max-width: 600px) {
        .f-row { grid-template-columns: 1fr; }
      }
    `}</style>
  );
}