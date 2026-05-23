import React from "react";
import { motion } from "framer-motion";

const infoItems = [
  {
    icon: "📍",
    title: "Our Office",
    text: "Suite 101, EventSphere Building in Karachi, Pakistan",
    accent: "#C9A84C",
  },
  {
    icon: "📞",
    title: "Phone",
    text: "+92 333 1234567",
    accent: "#C9A84C",
  },
  {
    icon: "✉️",
    title: "Email",
    text: "info@eventsphere.com",
    accent: "#C9A84C",
  },
  {
    icon: "🕐",
    title: "Working Hours",
    text: "Mon - Sat: 9:00 AM - 6:00 PM",
    accent: "#C9A84C",
  },
];

export default function ContactInfo() {
  return (
    <div>
      {/* Section label */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        style={{ marginBottom: "32px" }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#C9A84C",
            fontFamily: "'Inter', sans-serif",
            marginBottom: "12px",
          }}
        >
          <span
            style={{ width: "20px", height: "1px", background: "#C9A84C" }}
          />
          Contact Info
        </div>
        <h2
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
            fontWeight: 700,
            color: "#fff",
            lineHeight: 1.15,
          }}
        >
          Let's Start a{" "}
          <em style={{ fontStyle: "italic", color: "#C9A84C" }}>
            Conversation
          </em>
        </h2>
      </motion.div>

      {/* Cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        {infoItems.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            whileHover={{ x: 6 }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              background: "#111",
              border: "1px solid rgba(255,255,255,0.08)",
              borderLeft: `3px solid ${item.accent}`,
              borderRadius: "10px",
              padding: "18px 22px",
              cursor: "default",
              transition: "border-color 0.25s, background 0.25s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(201,168,76,0.05)";
              e.currentTarget.style.borderColor = "rgba(201,168,76,0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#111";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
            }}
          >
            {/* Icon bubble */}
            <div
              style={{
                width: "46px",
                height: "46px",
                borderRadius: "50%",
                background: "rgba(201,168,76,0.12)",
                border: "1px solid rgba(201,168,76,0.25)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.3rem",
                flexShrink: 0,
              }}
            >
              {item.icon}
            </div>

            <div>
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#C9A84C",
                  marginBottom: "3px",
                }}
              >
                {item.title}
              </div>
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "14px",
                  color: "rgba(255,255,255,0.65)",
                  lineHeight: 1.5,
                }}
              >
                {item.text}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Decorative map placeholder */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.5 }}
        style={{
          marginTop: "24px",
          height: "180px",
          borderRadius: "12px",
          overflow: "hidden",
          border: "1px solid rgba(201,168,76,0.2)",
          background: "#111",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        <span style={{ fontSize: "2rem" }}>🗺️</span>
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "12px",
            color: "rgba(255,255,255,0.3)",
            letterSpacing: "0.08em",
          }}
        >
          Karachi, Pakistan
        </span>
      </motion.div>
    </div>
  );
}