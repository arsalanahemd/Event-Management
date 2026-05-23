import React from "react";
import { motion, AnimatePresence } from "framer-motion";

/* Shared input style */
const inputStyle = {
  width: "100%",
  background: "#111",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "8px",
  padding: "14px 18px",
  fontFamily: "'Inter', sans-serif",
  fontSize: "14px",
  color: "#fff",
  outline: "none",
  transition: "border-color 0.2s",
  boxSizing: "border-box",
};

const labelStyle = {
  display: "block",
  fontFamily: "'Inter', sans-serif",
  fontSize: "11px",
  fontWeight: 700,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "rgba(255,255,255,0.45)",
  marginBottom: "7px",
};

function Field({ label, name, value, onChange, readOnly, type = "text" }) {
  const [focused, setFocused] = React.useState(false);
  return (
    <div style={{ flex: 1 }}>
      <label style={labelStyle}>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          ...inputStyle,
          borderColor: focused
            ? "rgba(201,168,76,0.6)"
            : "rgba(255,255,255,0.1)",
          background: readOnly ? "rgba(255,255,255,0.03)" : "#111",
          cursor: readOnly ? "not-allowed" : "text",
          color: readOnly ? "rgba(255,255,255,0.4)" : "#fff",
        }}
      />
    </div>
  );
}

function TextareaField({ label, name, value, onChange }) {
  const [focused, setFocused] = React.useState(false);
  return (
    <div>
      <label style={labelStyle}>{label}</label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={6}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          ...inputStyle,
          borderColor: focused
            ? "rgba(201,168,76,0.6)"
            : "rgba(255,255,255,0.1)",
          resize: "vertical",
          lineHeight: 1.7,
        }}
      />
    </div>
  );
}

export default function ContactForm({ contact, isLoggedIn, alert, onChange, onSubmit }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.15 }}
      style={{
        background: "#0a0a0a",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "20px",
        padding: "clamp(28px, 5vw, 56px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Gold corner accent */}
      <div
        style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: "2px",
          background: "linear-gradient(90deg, var(--gold,#C9A84C), transparent)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "-80px", right: "-80px",
          width: "300px", height: "300px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(201,168,76,0.06), transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Form heading */}
      <div style={{ marginBottom: "36px" }}>
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
          <span style={{ width: "20px", height: "1px", background: "#C9A84C" }} />
          Message
        </div>
        <h3
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
            fontWeight: 700,
            color: "#fff",
            lineHeight: 1.15,
          }}
        >
          Send a <em style={{ fontStyle: "italic", color: "#C9A84C" }}>Message</em>
        </h3>
      </div>

      {/* Alert */}
      <AnimatePresence>
        {alert.message && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.35 }}
            style={{
              background: alert.success
                ? "rgba(201,168,76,0.1)"
                : "rgba(239,68,68,0.1)",
              border: `1px solid ${alert.success ? "rgba(201,168,76,0.35)" : "rgba(239,68,68,0.35)"}`,
              borderRadius: "8px",
              padding: "13px 18px",
              marginBottom: "24px",
              fontFamily: "'Inter', sans-serif",
              fontSize: "13px",
              fontWeight: 500,
              color: alert.success ? "#C9A84C" : "#f87171",
            }}
          >
            {alert.success ? "✓ " : "✕ "}
            {alert.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fields */}
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {/* Row 1: Name + Email */}
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          <Field
            label="Full Name"
            name="fullName"
            value={contact.fullName}
            onChange={onChange}
            readOnly
          />
          <Field
            label="Email Address"
            name="email"
            value={contact.email}
            onChange={onChange}
            readOnly
            type="email"
          />
        </div>

        {/* Row 2: Phone + Subject */}
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          <Field
            label="Phone Number"
            name="phone"
            value={contact.phone}
            onChange={onChange}
          />
          <Field
            label="Subject"
            name="subject"
            value={contact.subject}
            onChange={onChange}
          />
        </div>

        {/* Message */}
        <TextareaField
          label="Your Detailed Message"
          name="message"
          value={contact.message}
          onChange={onChange}
        />

        {/* Submit */}
        <motion.button
          onClick={onSubmit}
          disabled={!isLoggedIn}
          whileHover={isLoggedIn ? { y: -3, boxShadow: "0 12px 30px rgba(201,168,76,0.35)" } : {}}
          whileTap={isLoggedIn ? { scale: 0.98 } : {}}
          style={{
            width: "100%",
            padding: "17px",
            background: isLoggedIn ? "#C9A84C" : "rgba(255,255,255,0.06)",
            color: isLoggedIn ? "#000" : "rgba(255,255,255,0.25)",
            fontFamily: "'Inter', sans-serif",
            fontSize: "14px",
            fontWeight: 700,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            border: "none",
            borderRadius: "8px",
            cursor: isLoggedIn ? "pointer" : "not-allowed",
            transition: "background 0.25s",
          }}
        >
          {isLoggedIn ? "Send Message Now →" : "Please Login to Send"}
        </motion.button>
      </div>
    </motion.div>
  );
}