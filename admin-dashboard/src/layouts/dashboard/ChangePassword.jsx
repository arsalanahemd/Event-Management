// import React, { useState } from "react";
// import {
//   Box,
//   TextField,
//   Button,
//   Typography,
//   Alert,
//   InputAdornment,
//   IconButton,
//   Paper,
//   CircularProgress,
// } from "@mui/material";
// import { Visibility, VisibilityOff, LockReset } from "@mui/icons-material";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import axios from "axios";

// //  Theme Constants
// const NEON_CYAN = "#4CC9F0";

// function ChangePass() {
//   const [searchParams] = useSearchParams();
//   const userIdFromURL = searchParams.get("id");

//   const [formData, setFormData] = useState({
//     currentPassword: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [alert, setAlert] = useState({ success: true, message: "" });
//   const [show, setShow] = useState({ current: false, new: false, confirm: false });
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const toggleShow = (field) => setShow((s) => ({ ...s, [field]: !s[field] }));

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const { currentPassword, password, confirmPassword } = formData;

//     if (!currentPassword || !password || !confirmPassword) {
//       setAlert({ success: false, message: "Please fill all fields" });
//       return;
//     }
//     if (password.length < 6) {
//       setAlert({
//         success: false,
//         message: "Password must be at least 6 characters long",
//       });
//       return;
//     }
//     if (password !== confirmPassword) {
//       setAlert({ success: false, message: "Passwords do not match" });
//       return;
//     }

//     const storedUser =
//       JSON.parse(localStorage.getItem("user")) || JSON.parse(localStorage.getItem("adminUser"));

//     const userId = userIdFromURL || storedUser?._id || storedUser?.id;
//     if (!userId) {
//       setAlert({ success: false, message: "User ID not found!" });
//       return;
//     }

//     setLoading(true);

//     try {
//       const res = await axios.put(`http://localhost:3001/updateUser/${userId}`, {
//         currentPassword,
//         newPassword: password,
//       });

//       if (res.data.success) {
//         setAlert({ success: true, message: "Password updated successfully!" });
//         window.dispatchEvent(new Event("userUpdated"));
//         setTimeout(() => navigate("/admin-dashboard"), 1500);
//       } else {
//         setAlert({ success: false, message: res.data.message });
//       }
//     } catch (error) {
//       console.error("Update Error:", error);
//       setAlert({
//         success: false,
//         message: error.response?.data?.message || "Something went wrong",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   // AddAdmins Style TextField Logic
//   const textFieldStyle = {
//     mb: 2,
//     "& .MuiFilledInput-root": {
//       backgroundColor: "rgba(255, 255, 255, 0.05)",
//       color: "#fff",
//       borderRadius: "12px",
//       "&:before, &:after": { display: "none" },
//       border: "1px solid rgba(76, 201, 240, 0.2)",
//       transition: "0.3s",
//       "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.08)" },
//       "&.Mui-focused": {
//         border: `2px solid ${NEON_CYAN}`,
//         boxShadow: `0 0 15px ${NEON_CYAN}44`,
//       },
//     },
//     "& .MuiInputLabel-root": { color: "#94A3B8" },
//     "& .MuiInputLabel-root.Mui-focused": { color: NEON_CYAN },
//   };

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         background: "radial-gradient(circle at top right, #1B263B, #0D1B2A)",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         py: 6,
//         px: 2,
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
//           textAlign: "center",
//         }}
//       >
//         {/*  Dashboard Heading */}
//         <Box sx={{ mb: 4 }}>
//           <LockReset
//             sx={{
//               fontSize: 55,
//               color: NEON_CYAN,
//               filter: "drop-shadow(0 0 12px rgba(76, 201, 240, 0.4))",
//             }}
//           />
//           <Typography
//             variant="h4"
//             sx={{
//               fontWeight: 900,
//               fontFamily: "'Poppins', sans-serif",
//               textTransform: "uppercase",
//               letterSpacing: "2px",
//               mt: 1,
//               background: "linear-gradient(90deg, #4CC9F0, #4895EF, #F72585)",
//               WebkitBackgroundClip: "text",
//               WebkitTextFillColor: "transparent",
//               filter: "drop-shadow(0px 4px 8px rgba(76, 201, 240, 0.3))",
//             }}
//           >
//             Change Password
//           </Typography>
//         </Box>

//         {alert.message && (
//           <Alert
//             severity={alert.success ? "success" : "error"}
//             sx={{ mb: 3, borderRadius: "12px", fontWeight: "bold" }}
//           >
//             {alert.message}
//           </Alert>
//         )}

//         <form onSubmit={handleSubmit}>
//           <TextField
//             fullWidth
//             variant="filled"
//             label="Current Password"
//             name="currentPassword"
//             type={show.current ? "text" : "password"}
//             value={formData.currentPassword}
//             onChange={handleChange}
//             sx={textFieldStyle}
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton onClick={() => toggleShow("current")} sx={{ color: "#94A3B8" }}>
//                     {show.current ? <VisibilityOff /> : <Visibility />}
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//           />

//           <TextField
//             fullWidth
//             variant="filled"
//             label="New Password"
//             name="password"
//             type={show.new ? "text" : "password"}
//             value={formData.password}
//             onChange={handleChange}
//             sx={textFieldStyle}
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton onClick={() => toggleShow("new")} sx={{ color: "#94A3B8" }}>
//                     {show.new ? <VisibilityOff /> : <Visibility />}
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//           />

//           <TextField
//             fullWidth
//             variant="filled"
//             label="Confirm New Password"
//             name="confirmPassword"
//             type={show.confirm ? "text" : "password"}
//             value={formData.confirmPassword}
//             onChange={handleChange}
//             sx={textFieldStyle}
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton onClick={() => toggleShow("confirm")} sx={{ color: "#94A3B8" }}>
//                     {show.confirm ? <VisibilityOff /> : <Visibility />}
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//           />

//           <Button
//             type="submit"
//             fullWidth
//             disabled={loading}
//             sx={{
//               mt: 4,
//               background: "linear-gradient(90deg, #4CC9F0, #4895EF)",
//               fontWeight: "800",
//               borderRadius: "12px",
//               px: 4,
//               py: 1.8,
//               boxShadow: "0 8px 20px rgba(76, 201, 240, 0.3)",
//               textTransform: "none",
//               transition: "0.3s ease",
//               fontSize: "1rem",
//               "&:hover": {
//                 background: "linear-gradient(90deg, #4895EF, #4CC9F0)",
//                 transform: "translateY(-2px)",
//                 boxShadow: "0 12px 25px rgba(76, 201, 240, 0.4)",
//               },
//               "&:disabled": {
//                 background: "rgba(255, 255, 255, 0.1)",
//                 color: "rgba(255, 255, 255, 0.3)",
//               },
//             }}
//           >
//             {loading ? <CircularProgress size={24} sx={{ color: "#fff" }} /> : "Update Password"}
//           </Button>
//         </form>

//         <Button
//           fullWidth
//           onClick={() => navigate(-1)}
//           sx={{
//             mt: 2.5,
//             color: "#94A3B8",
//             textTransform: "none",
//             fontSize: "0.85rem",
//             borderRadius: "10px",
//             transition: "all 0.3s ease",
//             "&:hover": {
//               color: "#4CC9F0",
//               bgcolor: "rgba(76, 201, 240, 0.08)",
//               letterSpacing: "0.5px",
//             },
//           }}
//         >
//           Cancel and Return to Dashboard
//         </Button>
//       </Paper>
//     </Box>
//   );
// }

// export default ChangePass;
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
// import {motion ,Anima}
import { useNavigate, useSearchParams } from "react-router-dom";
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
const IconLock = ({ size = 55, color = G.gold }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);
const IconEye = ({ size = 20, color = G.w55 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>
  </svg>
);
const IconEyeOff = ({ size = 20, color = G.w55 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/>
  </svg>
);
const IconArrowLeft = ({ size = 16, color = G.w55 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
  </svg>
);

/* =============================================
   PASSWORD FIELD
   ============================================= */
function PasswordField({ label, name, value, onChange, show, onToggle }) {
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
      <div style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
      }}>
        <input
          name={name}
          type={show ? "text" : "password"}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            width: "100%",
            background: G.black3,
            border: `1px solid ${focused ? G.bGold : G.border}`,
            borderRadius: "8px",
            padding: "14px 48px 14px 18px",
            fontFamily: "'Inter', sans-serif",
            fontSize: "14px",
            color: G.white,
            outline: "none",
            transition: "border-color 0.2s, box-shadow 0.2s",
            boxSizing: "border-box",
            boxShadow: focused ? "0 0 20px rgba(201,168,76,0.08)" : "none",
          }}
        />
        <button
          type="button"
          onClick={onToggle}
          style={{
            position: "absolute",
            right: "14px",
            top: "50%",
            transform: "translateY(-50%)",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            padding: "4px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {show ? <IconEyeOff color={G.w55} /> : <IconEye color={G.w55} />}
        </button>
      </div>
    </div>
  );
}

/* =============================================
   MAIN COMPONENT
   ============================================= */
export default function ChangePass() {
  const [searchParams] = useSearchParams();
  const userIdFromURL = searchParams.get("id");

  const [formData, setFormData] = useState({
    currentPassword: "",
    password: "",
    confirmPassword: "",
  });

  const [alert, setAlert] = useState({ success: true, message: "" });
  const [show, setShow] = useState({ current: false, new: false, confirm: false });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const toggleShow = (field) => setShow((s) => ({ ...s, [field]: !s[field] }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { currentPassword, password, confirmPassword } = formData;

    if (!currentPassword || !password || !confirmPassword) {
      setAlert({ success: false, message: "Please fill all fields" });
      return;
    }
    if (password.length < 6) {
      setAlert({
        success: false,
        message: "Password must be at least 6 characters long",
      });
      return;
    }
    if (password !== confirmPassword) {
      setAlert({ success: false, message: "Passwords do not match" });
      return;
    }

    const storedUser =
      JSON.parse(localStorage.getItem("user")) || JSON.parse(localStorage.getItem("adminUser"));

    const userId = userIdFromURL || storedUser?._id || storedUser?.id;
    if (!userId) {
      setAlert({ success: false, message: "User ID not found!" });
      return;
    }

    setLoading(true);

    try {
      const res = await axios.put(`http://localhost:3001/updateUser/${userId}`, {
        currentPassword,
        newPassword: password,
      });

      if (res.data.success) {
        setAlert({ success: true, message: "Password updated successfully!" });
        window.dispatchEvent(new Event("userUpdated"));
        setTimeout(() => navigate("/admin-dashboard"), 1500);
      } else {
        setAlert({ success: false, message: res.data.message });
      }
    } catch (error) {
      console.error("Update Error:", error);
      setAlert({
        success: false,
        message: error.response?.data?.message || "Something went wrong",
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
            <IconLock size={32} color={G.gold} />
          </motion.div>

          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            fontSize: "11px", fontWeight: 700, letterSpacing: "0.16em",
            textTransform: "uppercase", color: G.gold,
            fontFamily: "'Inter', sans-serif", marginBottom: "10px",
          }}>
            <span style={{ width: "20px", height: "1px", background: G.gold }} />
            Security
          </div>

          <h1 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(1.6rem, 4vw, 2rem)",
            fontWeight: 700, color: G.white, lineHeight: 1.15,
          }}>
            Change{" "}
            <em style={{ fontStyle: "italic", color: G.gold }}>Password</em>
          </h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <PasswordField
            label="Current Password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            show={show.current}
            onToggle={() => toggleShow("current")}
          />
          <PasswordField
            label="New Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            show={show.new}
            onToggle={() => toggleShow("new")}
          />
          <PasswordField
            label="Confirm New Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            show={show.confirm}
            onToggle={() => toggleShow("confirm")}
          />

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
              "Update Password"
            )}
          </motion.button>
        </form>

        {/* Cancel Button */}
        <motion.button
          onClick={() => navigate(-1)}
          whileHover={{ y: -2 }}
          style={{
            width: "100%", padding: "14px",
            marginTop: "12px",
            background: "transparent",
            color: G.w55,
            fontFamily: "'Inter', sans-serif",
            fontSize: "13px", fontWeight: 600,
            letterSpacing: "0.04em",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = G.gold}
          onMouseLeave={(e) => e.currentTarget.style.color = G.w55}
        >
          <IconArrowLeft size={14} />
          Cancel and Return to Dashboard
        </motion.button>
      </motion.div>
    </div>
  );
}