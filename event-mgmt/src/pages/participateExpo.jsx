// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   Typography,
//   Alert,
//   CircularProgress,
//   Container,
//   Paper,
//   Snackbar,
// } from "@mui/material";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { CheckCircleOutline, ArrowBack } from "@mui/icons-material";

// function ParticipateExpo() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const BASE_URL = "http://localhost:3001";

//   // Fallback data from localStorage
//   const storedUser = JSON.parse(localStorage.getItem("user"));
//   const storedCompany = JSON.parse(localStorage.getItem("company"));

//   const expoId = location.state?.expoId;
//   const userId = location.state?.userId || storedUser?._id;
//   const companyId = location.state?.companyId || storedCompany?._id;

//   const [alert, setAlert] = useState({ success: true, message: "" });
//   const [loading, setLoading] = useState(false);

//   // Error view if data is missing
//   if (!expoId || !userId || !companyId) {
//     return (
//       <Box sx={{ 
//         background: "linear-gradient(90deg, #0D1B2A 0%, #1B263B 100%)",
//         minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" 
//       }}>
//         <Paper sx={{ p: 4, background: "rgba(255,255,255,0.05)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.1)", textAlign: "center", color: "white" }}>
//           <Alert severity="error" variant="filled" sx={{ mb: 2 }}>
//             Invalid access. Missing participation details.
//           </Alert>
//           <Button
//             variant="contained"
//             startIcon={<ArrowBack />}
//             sx={{ mt: 2, background: "#FFD166", color: "#0D1B2A", fontWeight: 800 }}
//             onClick={() => navigate("/events")}
//           >
//             Go Back to Events
//           </Button>
//         </Paper>
//       </Box>
//     );
//   }

//   const handleParticipate = async () => {
//     setLoading(true);
//     setAlert({ success: true, message: "" });

//     try {
//       const res = await axios.post(`${BASE_URL}/participation`, {
//         exhibitorId: userId,
//         companyId,
//         expoId,
//       });

//       if (res.data.success) {
//         navigate("/events", {
//           state: { successMessage: "Participation confirmed successfully!" },
//         });
//       } else {
//         setAlert({
//           success: false,
//           message: res.data.message || "Participation failed. Try again.",
//         });
//       }
//     } catch (err) {
//       setAlert({
//         success: false,
//         message: err.response?.data?.message || "Something went wrong. Please try again later.",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Box sx={{ 
//       background: "linear-gradient(90deg, #0D1B2A 0%, #1B263B 100%)",
//       backgroundAttachment: "fixed",
//       minHeight: "100vh",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       px: 2
//     }}>
//       <Snackbar 
//         open={!!alert.message} 
//         autoHideDuration={4000} 
//         onClose={() => setAlert({ ...alert, message: "" })}
//         anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
//       >
//         <Alert severity={alert.success ? "success" : "error"} variant="filled">
//           {alert.message}
//         </Alert>
//       </Snackbar>

//       <Container maxWidth="sm">
//         <Paper sx={{ 
//           p: { xs: 4, md: 6 }, 
//           background: "rgba(255, 255, 255, 0.05)", 
//           backdropFilter: "blur(15px)", 
//           borderRadius: 6,
//           border: "1px solid rgba(255, 255, 255, 0.1)",
//           boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
//           textAlign: "center",
//           color: "white"
//         }}>
//           <CheckCircleOutline sx={{ fontSize: 60, color: "#4CC9F0", mb: 2 }} />
          
//           <Typography variant="h4" fontWeight={900} gutterBottom sx={{ 
//             background: "linear-gradient(90deg, #4CC9F0, #4895EF)", 
//             WebkitBackgroundClip: "text", 
//             WebkitTextFillColor: "transparent" 
//           }}>
//             Confirm Participation
//           </Typography>

//           <Typography variant="body1" sx={{ opacity: 0.8, mb: 4, fontSize: "1.1rem" }}>
//             Do you want to confirm your company's participation in this expo? 
//             This action will notify the organizers.
//           </Typography>

//           <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
//             <Button
//               variant="contained"
//               fullWidth
//               onClick={handleParticipate}
//               disabled={loading}
//               sx={{ 
//                 background: "#4CC9F0", 
//                 color: "#0D1B2A", 
//                 fontWeight: 800, 
//                 py: 1.5,
//                 fontSize: "1rem",
//                 borderRadius: 2,
//                 transition: "all 0.3s ease",
//                 "&:hover": { background: "#4895EF", transform: "translateY(-2px)" },
//                 "&:disabled": { background: "rgba(76, 201, 240, 0.3)" }
//               }}
//             >
//               {loading ? <CircularProgress size={24} color="inherit" /> : "Confirm & Apply"}
//             </Button>

//             {/* UPDATED: Transparent Yellow Button */}
//             <Button
//               variant="outlined"
//               fullWidth
//               startIcon={<ArrowBack />}
//               onClick={() => navigate("/events")}
//               sx={{ 
//                 color: "#FFD166", 
//                 borderColor: "rgba(255, 209, 102, 0.4)", 
//                 fontWeight: 600,
//                 py: 1.2,
//                 borderRadius: 2,
//                 transition: "all 0.3s ease",
//                 "&:hover": { 
//                   borderColor: "#FFD166", 
//                   background: "rgba(255, 209, 102, 0.1)", // Halka transparent yellow background
//                   boxShadow: "0 0 10px rgba(255, 209, 102, 0.2)"
//                 }
//               }}
//             >
//               Go Back to Events
//             </Button>
//           </Box>
//         </Paper>
//       </Container>
//     </Box>
//   );
// }

// export default ParticipateExpo;
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
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
   MISSING DATA — ERROR STATE
   ============================================= */
function ErrorState({ onBack }) {
  return (
    <div
      style={{
        background: G.black,
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        style={{
          background: G.black2,
          border: `1px solid rgba(248,113,113,0.25)`,
          borderRadius: "20px",
          padding: "56px 48px",
          textAlign: "center",
          maxWidth: "460px",
          width: "100%",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Red top line */}
        <div
          style={{
            position: "absolute",
            top: 0, left: 0, right: 0,
            height: "2px",
            background: "linear-gradient(90deg, transparent, #f87171, transparent)",
          }}
        />

        {/* Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.2 }}
          style={{
            width: "80px", height: "80px",
            borderRadius: "50%",
            background: "rgba(248,113,113,0.1)",
            border: "1px solid rgba(248,113,113,0.3)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "2rem",
            margin: "0 auto 28px",
          }}
        >
          ⚠️
        </motion.div>

        <h2
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "1.8rem",
            fontWeight: 700,
            color: G.white,
            marginBottom: "12px",
            lineHeight: 1.15,
          }}
        >
          Invalid <em style={{ fontStyle: "italic", color: "#f87171" }}>Access</em>
        </h2>

        <p style={{ fontSize: "14px", lineHeight: 1.75, color: G.w55, marginBottom: "36px" }}>
          Missing participation details. Please go back to Events and try again.
        </p>

        <GoldButton onClick={onBack} icon="←">
          Go Back to Events
        </GoldButton>
      </motion.div>
    </div>
  );
}

/* =============================================
   TOAST NOTIFICATION
   ============================================= */
function Toast({ alert, onClose }) {
  useEffect(() => {
    if (!alert.message) return;
    const t = setTimeout(onClose, 4000);
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
            position: "fixed",
            top: "90px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 9999,
            background: alert.success
              ? "rgba(201,168,76,0.12)"
              : "rgba(248,113,113,0.12)",
            border: `1px solid ${alert.success ? G.bGold : "rgba(248,113,113,0.35)"}`,
            borderRadius: "10px",
            padding: "13px 22px",
            fontFamily: "'Inter', sans-serif",
            fontSize: "13px",
            fontWeight: 600,
            color: alert.success ? G.gold : "#f87171",
            backdropFilter: "blur(12px)",
            whiteSpace: "nowrap",
            boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
          }}
        >
          {alert.success ? "✓  " : "✕  "}
          {alert.message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* =============================================
   REUSABLE GOLD BUTTON
   ============================================= */
function GoldButton({ onClick, children, icon, disabled, loading }) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled ? { y: -3, boxShadow: "0 12px 28px rgba(201,168,76,0.35)" } : {}}
      whileTap={!disabled ? { scale: 0.97 } : {}}
      style={{
        width: "100%",
        padding: "16px",
        background: disabled ? "rgba(255,255,255,0.06)" : G.gold,
        color: disabled ? G.w30 : "#000",
        fontFamily: "'Inter', sans-serif",
        fontSize: "14px",
        fontWeight: 700,
        letterSpacing: "0.05em",
        textTransform: "uppercase",
        border: "none",
        borderRadius: "8px",
        cursor: disabled ? "not-allowed" : "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        transition: "background 0.25s",
      }}
    >
      {loading ? <Spinner /> : (
        <>
          {icon && <span>{icon}</span>}
          {children}
        </>
      )}
    </motion.button>
  );
}

function OutlineButton({ onClick, children, icon }) {
  const [hov, setHov] = React.useState(false);
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: "100%",
        padding: "15px",
        background: hov ? "rgba(201,168,76,0.06)" : "transparent",
        color: hov ? G.white : G.w55,
        fontFamily: "'Inter', sans-serif",
        fontSize: "14px",
        fontWeight: 600,
        letterSpacing: "0.04em",
        border: `1px solid ${hov ? G.bGold : G.border}`,
        borderRadius: "8px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        transition: "all 0.2s",
      }}
    >
      {icon && <span>{icon}</span>}
      {children}
    </motion.button>
  );
}

function Spinner() {
  return (
    <div
      style={{
        width: "20px", height: "20px",
        border: "2px solid rgba(0,0,0,0.2)",
        borderTop: "2px solid #000",
        borderRadius: "50%",
        animation: "spin 0.7s linear infinite",
      }}
    />
  );
}

/* =============================================
   MAIN COMPONENT
   ============================================= */
export default function ParticipateExpo() {
  /* ---- ORIGINAL LOGIC — UNCHANGED ---- */
  const location  = useNavigate() && useLocation();
  const navigate  = useNavigate();
  const BASE_URL  = "http://localhost:3001";

  const storedUser    = JSON.parse(localStorage.getItem("user"));
  const storedCompany = JSON.parse(localStorage.getItem("company"));

  const expoId    = location.state?.expoId;
  const userId    = location.state?.userId    || storedUser?._id;
  const companyId = location.state?.companyId || storedCompany?._id;

  const [alert,   setAlert]   = useState({ success: true, message: "" });
  const [loading, setLoading] = useState(false);

  if (!expoId || !userId || !companyId) {
    return <ErrorState onBack={() => navigate("/events")} />;
  }

  const handleParticipate = async () => {
    setLoading(true);
    setAlert({ success: true, message: "" });
    try {
      const res = await axios.post(`${BASE_URL}/participation`, {
        exhibitorId: userId,
        companyId,
        expoId,
      });
      if (res.data.success) {
        navigate("/events", {
          state: { successMessage: "Participation confirmed successfully!" },
        });
      } else {
        setAlert({
          success: false,
          message: res.data.message || "Participation failed. Try again.",
        });
      }
    } catch (err) {
      setAlert({
        success: false,
        message:
          err.response?.data?.message ||
          "Something went wrong. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };
  /* ---- END ORIGINAL LOGIC ---- */

  return (
    <div
      style={{
        background: G.black,
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        fontFamily: "'Inter', sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Spinner keyframe */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

      {/* Background gold glow */}
      <div
        style={{
          position: "absolute",
          top: "50%", left: "50%",
          transform: "translate(-50%,-50%)",
          width: "700px", height: "400px",
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse, rgba(201,168,76,0.07), transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Toast */}
      <Toast alert={alert} onClose={() => setAlert((p) => ({ ...p, message: "" }))} />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, ease: "easeOut" }}
        style={{
          background: G.black2,
          border: `1px solid ${G.border}`,
          borderRadius: "24px",
          padding: "clamp(36px, 6vw, 64px) clamp(28px, 5vw, 56px)",
          maxWidth: "480px",
          width: "100%",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Gold top line */}
        <div
          style={{
            position: "absolute",
            top: 0, left: 0, right: 0,
            height: "2px",
            background: `linear-gradient(90deg, transparent, ${G.gold}, transparent)`,
          }}
        />

        {/* Decorative corner glow */}
        <div
          style={{
            position: "absolute",
            top: "-60px", right: "-60px",
            width: "200px", height: "200px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(201,168,76,0.1), transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -15 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.25 }}
          style={{
            width: "88px", height: "88px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(201,168,76,0.15), rgba(201,168,76,0.05))",
            border: `1px solid ${G.bGold}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "2.5rem",
            margin: "0 auto 32px",
          }}
        >
          ✅
        </motion.div>

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(201,168,76,0.08)",
            border: `1px solid ${G.bGold}`,
            borderRadius: "4px",
            padding: "6px 14px",
            fontSize: "10px",
            fontWeight: 700,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: G.gold,
            marginBottom: "20px",
          }}
        >
          <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: G.gold }} />
          Expo Registration
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(1.8rem, 4vw, 2.4rem)",
            fontWeight: 700,
            color: G.white,
            lineHeight: 1.12,
            marginBottom: "16px",
            letterSpacing: "-0.01em",
          }}
        >
          Confirm{" "}
          <em style={{ fontStyle: "italic", color: G.gold }}>Participation</em>
        </motion.h1>

        {/* Body text */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          style={{
            fontSize: "14px",
            lineHeight: 1.8,
            color: G.w55,
            marginBottom: "40px",
          }}
        >
          Do you want to confirm your company's participation in this expo?
          This action will notify the organizers.
        </motion.p>

        {/* Divider */}
        <div
          style={{
            height: "1px",
            background: `linear-gradient(90deg, transparent, ${G.border}, transparent)`,
            marginBottom: "28px",
          }}
        />

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          style={{ display: "flex", flexDirection: "column", gap: "12px" }}
        >
          <GoldButton
            onClick={handleParticipate}
            disabled={loading}
            loading={loading}
            icon={loading ? null : "→"}
          >
            Confirm &amp; Apply
          </GoldButton>

          <OutlineButton onClick={() => navigate("/events")} icon="←">
            Go Back to Events
          </OutlineButton>
        </motion.div>

        {/* Bottom trust note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.75 }}
          style={{
            marginTop: "24px",
            fontSize: "12px",
            color: G.w30,
            letterSpacing: "0.04em",
          }}
        >
          🔒 &nbsp;Your data is secure and organizers will be notified instantly.
        </motion.p>
      </motion.div>
    </div>
  );
}