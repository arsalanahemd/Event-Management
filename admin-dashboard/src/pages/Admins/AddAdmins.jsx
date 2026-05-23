// import React, { useState } from "react";
// import { Box, TextField, Button, Typography, Alert, Paper, CircularProgress } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// //  Theme Constants
// const NEON_CYAN = "#000000";

// function AddAdmins() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     role: "admin",
//   });

//   const [alert, setAlert] = useState({ success: true, message: "" });
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const { name, email, password } = formData;

//     if (!name || !email || !password) {
//       setAlert({ success: false, message: "Please fill all fields" });
//       return;
//     }

//     setLoading(true);

//     try {
//       const res = await axios.post("http://localhost:3001/signup", formData);

//       if (res.data.success) {
//         setAlert({ success: true, message: "Admin added successfully!" });
//         setFormData({ name: "", email: "", password: "", role: "admin" });

//         setTimeout(() => {
//           navigate("/showAdmin");
//         }, 1500);
//       } else {
//         setAlert({ success: false, message: res.data.message });
//       }
//     } catch (error) {
//       setAlert({
//         success: false,
//         message: error.response?.data?.message || "Something went wrong!",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         background: "radial-gradient(circle at top right, #1B263B, #0D1B2A)",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         p: 2,
//       }}
//     >
//       <Paper
//         elevation={24}
//         sx={{
//           width: "100%",
//           maxWidth: 450,
//           p: 5,
//           borderRadius: "30px",
//           background: "rgba(13, 27, 42, 0.9)",
//           backdropFilter: "blur(15px)",
//           border: "1px solid rgba(255, 255, 255, 0.1)",
//           boxShadow: "0 25px 50px rgba(0,0,0,0.6)",
//         }}
//       >
//         {/* Dashboard Heading */}
//         <Typography
//           variant="h4"
//           sx={{
//             fontWeight: 900,
//             fontFamily: "'Poppins', sans-serif",
//             textAlign: "center",
//             textTransform: "uppercase",
//             letterSpacing: "2px",
//             mb: 4,
//             background: "linear-gradient(90deg, #4CC9F0, #ffffff, #F72585)",
//             WebkitBackgroundClip: "text",
//             WebkitTextFillColor: "transparent",
//             filter: "drop-shadow(0px 4px 8px rgba(76, 201, 240, 0.3))",
//           }}
//         >
//           Add Admin Account
//         </Typography>

//         {alert.message && (
//           <Alert
//             severity={alert.success ? "success" : "error"}
//             sx={{ mb: 3, borderRadius: "12px", fontWeight: "bold" }}
//           >
//             {alert.message}
//           </Alert>
//         )}

//         <form onSubmit={handleSubmit}>
//           {[
//             { label: "Full Name", name: "name", type: "text" },
//             { label: "Email Address", name: "email", type: "email" },
//             { label: "Password", name: "password", type: "password" },
//           ].map((field) => (
//             <TextField
//               key={field.name}
//               fullWidth
//               label={field.label}
//               name={field.name}
//               type={field.type}
//               value={formData[field.name]}
//               onChange={handleChange}
//               margin="normal"
//               required
//               variant="filled"
//               sx={{
//                 mb: 2,
//                 "& .MuiFilledInput-root": {
//                   backgroundColor: "rgba(255, 255, 255, 0.05)",
//                   color: "#fff",
//                   borderRadius: "12px",
//                   "&:before, &:after": { display: "none" },
//                   border: "1px solid rgba(76, 201, 240, 0.2)",
//                   transition: "0.3s",
//                   "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.08)" },
//                   "&.Mui-focused": {
//                     border: `2px solid ${NEON_CYAN}`,
//                     boxShadow: `0 0 15px ${NEON_CYAN}44`,
//                   },
//                 },
//                 "& .MuiInputLabel-root": { color: "#94A3B8" },
//                 "& .MuiInputLabel-root.Mui-focused": { color: NEON_CYAN },
//               }}
//             />
//           ))}

//           <input type="hidden" name="role" value="admin" />

//           {/* Action Button */}
//           <Button
//             type="submit"
//             variant="contained"
//             fullWidth
//             disabled={loading}
//             sx={{
//               py: 2,
//               fontSize: 18,
//               fontWeight: 800,
//               borderRadius: "18px",
//               background: "linear-gradient(90deg, #4895EF, #4CC9F0)",
//               boxShadow: "0 12px 30px rgba(76, 201, 240, 0.3)",
//               transition: "all 0.4s ease",
//               textTransform: "none",
//               "&:hover": {
//                 transform: "translateY(-4px)",
//                 boxShadow: "0 18px 45px rgba(76, 201, 240, 0.5)",
//                 background: "linear-gradient(90deg, #4CC9F0, #4895EF)",
//               },
//               "&:disabled": {
//                 background: "rgba(255, 255, 255, 0.1)",
//                 color: "rgba(255, 255, 255, 0.3)",
//               },
//             }}
//           >
//             {loading ? (
//               <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                 <CircularProgress size={20} sx={{ color: "#fff" }} />
//                 <Typography variant="body1" fontWeight={800}>
//                   Verifying...
//                 </Typography>
//               </Box>
//             ) : (
//               "Create Admin Account"
//             )}
//           </Button>
//         </form>
//       </Paper>
//     </Box>
//   );
// }

// export default AddAdmins;

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";

/* ---- FONT INJECT ---- */
if (!document.getElementById("monks-fonts")) {
  const l = document.createElement("link");
  l.id = "monks-fonts";
  l.rel = "stylesheet";
  l.href =
    "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Inter:wght@300;400;500;600;700&display=swap";
  document.head.appendChild(l);
}

const G = {
  black:  "#000000",
  black2: "#0a0a0a",
  black3: "#111111",
  black4: "#1a1a1a",
  gold:   "#C9A84C",
  goldLt: "#dcc07e",
  white:  "#FFFFFF",
  w80:    "rgba(255,255,255,0.80)",
  w55:    "rgba(255,255,255,0.55)",
  w30:    "rgba(255,255,255,0.30)",
  border: "rgba(255,255,255,0.08)",
  bGold:  "rgba(201,168,76,0.30)",
};

/* =============================================
   TOAST
   ============================================= */
function Toast({ alert, onClose }) {
  React.useEffect(() => {
    if (!alert.message) return;
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, [alert.message]);

  return (
    <AnimatePresence>
      {alert.message && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          style={{
            position: "fixed", top: "24px", left: "50%",
            transform: "translateX(-50%)", zIndex: 9999,
            background: alert.success
              ? "rgba(201,168,76,0.12)"
              : "rgba(248,113,113,0.12)",
            border: `1px solid ${alert.success ? G.bGold : "rgba(248,113,113,0.35)"}`,
            borderRadius: "10px", padding: "13px 24px",
            fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 600,
            color: alert.success ? G.gold : "#f87171",
            backdropFilter: "blur(12px)", whiteSpace: "nowrap",
            boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
          }}
        >
          {alert.success ? "✓  " : "✕  "}{alert.message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* =============================================
   ICONS (SVG)
   ============================================= */
const IconUserPlus = ({ size = 55, color = G.gold }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" x2="20" y1="8" y2="14"/><line x1="23" x2="17" y1="11" y2="11"/>
  </svg>
);

/* =============================================
   FIELD — reusable input
   ============================================= */
function Field({ label, name, value, onChange, type = "text", required }) {
  const [focused, setFocused] = React.useState(false);

  return (
    <div style={{ marginBottom: "18px" }}>
      <label style={{
        display: "block",
        fontFamily: "'Inter', sans-serif",
        fontSize: "11px", fontWeight: 700,
        letterSpacing: "0.1em", textTransform: "uppercase",
        color: focused ? G.gold : G.w30,
        marginBottom: "7px",
        transition: "color 0.2s",
      }}>
        {label}
      </label>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: "100%",
          background: G.black3,
          border: `1px solid ${focused ? G.bGold : G.border}`,
          borderRadius: "8px",
          padding: "14px 18px",
          fontFamily: "'Inter', sans-serif",
          fontSize: "14px",
          color: G.white,
          outline: "none",
          transition: "border-color 0.2s, box-shadow 0.2s",
          boxSizing: "border-box",
          boxShadow: focused ? "0 0 20px rgba(201,168,76,0.08)" : "none",
        }}
      />
    </div>
  );
}

/* =============================================
   MAIN COMPONENT
   ============================================= */
export default function AddAdmins() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "admin",
  });

  const [alert, setAlert] = useState({ success: true, message: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = formData;

    if (!name || !email || !password) {
      setAlert({ success: false, message: "Please fill all fields" });
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post("http://localhost:3001/signup", formData);

      if (res.data.success) {
        setAlert({ success: true, message: "Admin added successfully!" });
        setFormData({ name: "", email: "", password: "", role: "admin" });

        setTimeout(() => {
          navigate("/showAdmin");
        }, 1500);
      } else {
        setAlert({ success: false, message: res.data.message });
      }
    } catch (error) {
      setAlert({
        success: false,
        message: error.response?.data?.message || "Something went wrong!",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      background: G.black, minHeight: "100vh",
      fontFamily: "'Inter', sans-serif",
      WebkitFontSmoothing: "antialiased",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "24px",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Background glow */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%,-50%)",
        width: "800px", height: "600px", borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(201,168,76,0.06), transparent 70%)",
        pointerEvents: "none",
        zIndex: 0,
      }} />

      {/* Toast */}
      <Toast alert={alert} onClose={() => setAlert({ ...alert, message: "" })} />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 200, damping: 20 }}
        style={{
          width: "100%", maxWidth: "440px",
          background: G.black2,
          border: `1px solid ${G.border}`,
          borderRadius: "20px",
          padding: "clamp(32px, 5vw, 48px)",
          position: "relative", zIndex: 1,
          overflow: "hidden",
          boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
        }}
      >
        {/* Gold top line */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "2px",
          background: `linear-gradient(90deg, ${G.gold}, transparent)`,
        }} />
        {/* Corner glow */}
        <div style={{
          position: "absolute", top: "-60px", right: "-60px",
          width: "200px", height: "200px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(201,168,76,0.07), transparent 70%)",
          pointerEvents: "none",
        }} />

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "32px", position: "relative" }}>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
            style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              width: "72px", height: "72px",
              background: "rgba(201,168,76,0.08)",
              border: `1px solid ${G.bGold}`,
              borderRadius: "16px",
              marginBottom: "20px",
            }}
          >
            <IconUserPlus size={32} color={G.gold} />
          </motion.div>

          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            fontSize: "11px", fontWeight: 700, letterSpacing: "0.16em",
            textTransform: "uppercase", color: G.gold,
            fontFamily: "'Inter', sans-serif", marginBottom: "10px",
          }}>
            <span style={{ width: "20px", height: "1px", background: G.gold }} />
            Admin Panel
          </div>

          <h1 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(1.6rem, 4vw, 2rem)",
            fontWeight: 700, color: G.white, lineHeight: 1.15,
          }}>
            Add{" "}
            <em style={{ fontStyle: "italic", color: G.gold }}>Admin</em>
          </h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <Field
            label="Full Name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <Field
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Field
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <input type="hidden" name="role" value="admin" />

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={!loading ? { y: -3, boxShadow: "0 14px 32px rgba(201,168,76,0.35)" } : {}}
            whileTap={!loading ? { scale: 0.97 } : {}}
            style={{
              width: "100%", padding: "17px",
              marginTop: "8px",
              background: loading ? "rgba(255,255,255,0.05)" : G.gold,
              color: loading ? G.w30 : "#000",
              fontFamily: "'Inter', sans-serif",
              fontSize: "14px", fontWeight: 700,
              letterSpacing: "0.06em", textTransform: "uppercase",
              border: "none", borderRadius: "8px",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "background 0.25s",
              display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
            }}
          >
            {loading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                style={{
                  width: "20px", height: "20px",
                  border: `2px solid ${G.border}`,
                  borderTopColor: G.gold,
                  borderRadius: "50%",
                }}
              />
            ) : (
              "Create Admin Account"
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
