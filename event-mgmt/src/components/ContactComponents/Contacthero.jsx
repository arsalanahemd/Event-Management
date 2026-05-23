import React from "react";
import { motion } from "framer-motion";

export default function ContactHero() {
  return (
    <section
      style={{
        position: "relative",
        background: "#000",
        padding: "120px 0 80px",
        textAlign: "center",
        overflow: "hidden",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {/* Gold glow left */}
      <div
        style={{
          position: "absolute",
          left: "-200px",
          top: "50%",
          transform: "translateY(-50%)",
          width: "600px",
          height: "400px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(201,168,76,0.12), transparent 70%)",
          pointerEvents: "none",
        }}
      />
      {/* Gold glow right */}
      <div
        style={{
          position: "absolute",
          right: "-150px",
          top: "30%",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(201,168,76,0.08), transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Top gold line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background:
            "linear-gradient(90deg, transparent, #C9A84C, transparent)",
        }}
      />

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(201,168,76,0.1)",
            border: "1px solid rgba(201,168,76,0.3)",
            borderRadius: "4px",
            padding: "7px 18px",
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "#C9A84C",
            fontFamily: "'Inter', sans-serif",
            marginBottom: "24px",
          }}
        >
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: "#C9A84C",
            }}
          />
          Reach Out
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(2.8rem, 6vw, 5rem)",
            fontWeight: 700,
            lineHeight: 1.06,
            color: "#fff",
            marginBottom: "20px",
            letterSpacing: "-0.01em",
          }}
        >
          Get in{" "}
          <em style={{ fontStyle: "italic", color: "#C9A84C" }}>Touch</em>
        </motion.h1>

        {/* Desc */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "16px",
            lineHeight: 1.8,
            color: "rgba(255,255,255,0.6)",
            maxWidth: "540px",
            margin: "0 auto",
          }}
        >
          We'd love to hear from you — let's make your next event unforgettable!
        </motion.p>
      </div>
    </section>
  );
}