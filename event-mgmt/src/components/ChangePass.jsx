// import React, { useState } from "react";
// import {
//   Box,
//   Grid,
//   Card,
//   Typography,
//   TextField,
//   Button,
//   Stack,
//   Container,
//   InputAdornment,
//   IconButton,
// } from "@mui/material";
// import { Visibility, VisibilityOff } from "@mui/icons-material";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import axios from "axios";

// function ChangePass() {
//   const [searchParams] = useSearchParams();
//   const userIdFromURL = searchParams.get("id");

//   const [formData, setFormData] = useState({
//     currentPassword: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [alert, setAlert] = useState({ success: true, message: "" });
//   const [show, setShow] = useState({
//     current: false,
//     new: false,
//     confirm: false,
//   });
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
//       JSON.parse(localStorage.getItem("user")) ||
//       JSON.parse(localStorage.getItem("adminUser"));

//     const userId = userIdFromURL || storedUser?._id || storedUser?.id;
//     if (!userId) {
//       setAlert({ success: false, message: "User ID not found!" });
//       return;
//     }

//     setLoading(true);

//     try {
//       const res = await axios.put(
//         `http://localhost:3001/updateUser/${userId}`,
//         {
//           currentPassword,
//           newPassword: password,
//         }
//       );

//       if (res.data.success) {
//         setAlert({ success: true, message: "Password updated successfully!" });
//         window.dispatchEvent(new Event("userUpdated"));
//         setTimeout(() => navigate("/"), 500);
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

//   return (
//     <Box sx={{ minHeight: "100vh", backgroundColor: "#F1FAFF", pb: 12 }}>
//       {" "}
//       <Box
//         sx={{
//           background: "linear-gradient(90deg, #1B263B, #273746)",
//           py: { xs: 6, md: 10 },
//           textAlign: "center",
//           color: "white",
//           mb: 6,
//           boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
//         }}
//       >
//         <Typography
//           variant="h3"
//           fontWeight={900}
//           sx={{
//             mb: 2,
//             fontFamily: "'Poppins', sans-serif",
//             background: "linear-gradient(90deg, #4CC9F0, #4895EF, #F72585)",
//             WebkitBackgroundClip: "text",
//             WebkitTextFillColor: "transparent",
//           }}
//         >
//           Change Your Password
//         </Typography>
//         <Typography
//           variant="h6"
//           sx={{ fontWeight: 500, maxWidth: 600, mx: "auto" }}
//         >
//           Keep your account secure by updating your password regularly.
//         </Typography>
//       </Box>
//       {/* Main Content */}
//       <Container maxWidth="xl" sx={{ py: 5 }}>
//         <Grid container spacing={4} justifyContent="center" alignItems="center">
//           {/* Form */}
//           <Grid item xs={12} md={8} lg={8}>
//             <Card
//               sx={{
//                 borderRadius: 4,
//                 boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
//                 p: { xs: 4, md: 8 },
//                 background: "#fff",
//                 width: "100%",
//                 maxWidth: "100%",
//                 margin: "0 auto",
//               }}
//             >
//               <Typography
//                 variant="h3"
//                 fontWeight={800}
//                 mb={4}
//                 sx={{
//                   fontFamily: "'Poppins', sans-serif",
//                   background:
//                     "linear-gradient(90deg, #4CC9F0, #4895EF, #F72585)",
//                   WebkitBackgroundClip: "text",
//                   WebkitTextFillColor: "transparent",
//                   textAlign: "center",
//                 }}
//               >
//                 Update Password
//               </Typography>

//               {alert.message && (
//                 <Box
//                   sx={{
//                     mb: 4,
//                     p: 2.5,
//                     borderRadius: 2,
//                     backgroundColor: alert.success
//                       ? "rgba(76,201,240,0.15)"
//                       : "rgba(255,77,77,0.15)",
//                     color: alert.success ? "#4CC9F0" : "#F44336",
//                     fontWeight: 600,
//                     textAlign: "center",
//                   }}
//                 >
//                   {alert.message}
//                 </Box>
//               )}

//               <Stack spacing={3} component="form" onSubmit={handleSubmit}>
//                 <TextField
//                   label="Current Password"
//                   name="currentPassword"
//                   type={show.current ? "text" : "password"}
//                   value={formData.currentPassword}
//                   onChange={handleChange}
//                   fullWidth
//                   required
//                   sx={{
//                     "& .MuiOutlinedInput-root": {
//                       borderRadius: "12px",
//                       "& fieldset": { borderColor: "#ddd" },
//                     },
//                   }}
//                   InputProps={{
//                     endAdornment: (
//                       <InputAdornment position="end">
//                         <IconButton
//                           onClick={() => toggleShow("current")}
//                           edge="end"
//                         >
//                           {show.current ? <VisibilityOff /> : <Visibility />}
//                         </IconButton>
//                       </InputAdornment>
//                     ),
//                   }}
//                 />

//                 <TextField
//                   label="New Password"
//                   name="password"
//                   type={show.new ? "text" : "password"}
//                   value={formData.password}
//                   onChange={handleChange}
//                   fullWidth
//                   required
//                   sx={{
//                     "& .MuiOutlinedInput-root": {
//                       borderRadius: "12px",
//                       "& fieldset": { borderColor: "#ddd" },
//                     },
//                   }}
//                   InputProps={{
//                     endAdornment: (
//                       <InputAdornment position="end">
//                         <IconButton
//                           onClick={() => toggleShow("new")}
//                           edge="end"
//                         >
//                           {show.new ? <VisibilityOff /> : <Visibility />}
//                         </IconButton>
//                       </InputAdornment>
//                     ),
//                   }}
//                 />

//                 <TextField
//                   label="Confirm New Password"
//                   name="confirmPassword"
//                   type={show.confirm ? "text" : "password"}
//                   value={formData.confirmPassword}
//                   onChange={handleChange}
//                   fullWidth
//                   required
//                   sx={{
//                     "& .MuiOutlinedInput-root": {
//                       borderRadius: "12px",
//                       "& fieldset": { borderColor: "#ddd" },
//                     },
//                   }}
//                   InputProps={{
//                     endAdornment: (
//                       <InputAdornment position="end">
//                         <IconButton
//                           onClick={() => toggleShow("confirm")}
//                           edge="end"
//                         >
//                           {show.confirm ? <VisibilityOff /> : <Visibility />}
//                         </IconButton>
//                       </InputAdornment>
//                     ),
//                   }}
//                 />

//                 <Button
//                   type="submit"
//                   variant="contained"
//                   fullWidth
//                   sx={{
//                     py: 2,
//                     fontSize: 18,
//                     fontWeight: 700,
//                     borderRadius: "15px",
//                     background: "linear-gradient(90deg, #4895EF, #4CC9F0)",
//                     boxShadow: "0 10px 30px rgba(72, 149, 239, 0.4)",
//                     "&:hover": {
//                       background: "linear-gradient(90deg, #4CC9F0, #4895EF)",
//                     },
//                   }}
//                   disabled={loading}
//                 >
//                   {loading ? "Updating..." : "Confirm Update"}
//                 </Button>
//               </Stack>
//             </Card>
//           </Grid>

//           {/*Promo Cards */}
//           <Grid item xs={12} md={4} lg={4}>
//             <Stack spacing={3}>
//               {[
//                 {
//                   title: "Secure Your Account",
//                   desc: "Protect your personal information by updating your password regularly.",
//                   color: "#4CC9F0",
//                 },
//                 {
//                   title: "Easy Management",
//                   desc: "Experience a seamless process. Update your credentials quickly.",
//                   color: "#4895EF",
//                 },
//                 {
//                   title: "24/7 Support",
//                   desc: "Our dedicated security team is available round the clock.",
//                   color: "#F72585",
//                 },
//               ].map((card, index) => (
//                 <Card
//                   key={index}
//                   sx={{
//                     borderRadius: 4,
//                     p: 4,
//                     borderLeft: `10px solid ${card.color}`,
//                     background: "linear-gradient(135deg, #1B263B, #273746)",
//                     color: "#E0E1DD",
//                     transition: "all 0.4s ease",
//                     "&:hover": { transform: "translateX(12px)" },
//                   }}
//                 >
//                   <Typography
//                     variant="h5"
//                     fontWeight={800}
//                     sx={{ mb: 1.5, color: card.color }}
//                   >
//                     {card.title}
//                   </Typography>
//                   <Typography variant="body1" sx={{ opacity: 0.85 }}>
//                     {card.desc}
//                   </Typography>
//                 </Card>
//               ))}
//             </Stack>
//           </Grid>
//         </Grid>
//       </Container>
//       {/* --- CTA BANNER*/}
//       <Box
//         sx={{
//           background: "linear-gradient(90deg, #1B263B, #273746)",
//           color: "white",
//           py: 10,
//           textAlign: "center",
//           mt: 8,
//           mb: 12,
//           mx: { xs: 2, md: 6 },
//           borderRadius: 5,
//           boxShadow: "0 15px 40px rgba(0,0,0,0.4)",
//           border: "1px solid rgba(255,255,255,0.05)",
//         }}
//       >
//         <Container>
//           <Typography
//             variant="h4"
//             fontWeight="900"
//             sx={{
//               background: "linear-gradient(90deg, #4CC9F0, #4895EF, #F72585)",
//               WebkitBackgroundClip: "text",
//               WebkitTextFillColor: "transparent",
//               fontSize: { xs: "1.8rem", md: "2.8rem" },
//               mb: 1,
//             }}
//           >
//             Keep Your Account Safe
//           </Typography>
//           <Typography sx={{ color: "rgba(255,255,255,0.6)", mb: 4 }}>
//             Updating your password helps protect your account and personal data.
//           </Typography>
//         </Container>
//       </Box>
//     </Box>
//   );
// }

// export default ChangePass;

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
            position: "fixed", top: "90px", left: "50%",
            transform: "translateX(-50%)", zIndex: 9999,
            background: alert.success ? "rgba(201,168,76,0.12)" : "rgba(248,113,113,0.12)",
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
   PASSWORD FIELD with show/hide toggle
   ============================================= */
function PasswordField({ label, name, value, onChange, show, onToggle }) {
  const [focused, setFocused] = React.useState(false);
  return (
    <div>
      <label style={{
        display: "block",
        fontFamily: "'Inter', sans-serif",
        fontSize: "11px", fontWeight: 700,
        letterSpacing: "0.1em", textTransform: "uppercase",
        color: focused ? G.gold : G.w30,
        marginBottom: "7px", transition: "color 0.2s",
      }}>
        {label}
      </label>
      <div style={{ position: "relative" }}>
        <input
          type={show ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          required
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            width: "100%",
            background: G.black3,
            border: `1px solid ${focused ? G.bGold : G.border}`,
            borderRadius: "8px",
            padding: "14px 48px 14px 18px",
            fontFamily: "'Inter', sans-serif",
            fontSize: "14px", color: G.white,
            outline: "none", boxSizing: "border-box",
            transition: "border-color 0.2s",
            letterSpacing: show ? "0" : "0.15em",
          }}
        />
        {/* Eye toggle */}
        <button
          type="button"
          onClick={onToggle}
          style={{
            position: "absolute", right: "14px", top: "50%",
            transform: "translateY(-50%)",
            background: "transparent", border: "none",
            cursor: "pointer", color: G.w30,
            fontSize: "1rem", lineHeight: 1,
            transition: "color 0.2s", padding: "4px",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = G.gold)}
          onMouseLeave={(e) => (e.currentTarget.style.color = G.w30)}
        >
          {show ? "🙈" : "👁️"}
        </button>
      </div>
    </div>
  );
}

/* =============================================
   PROMO SIDE CARDS
   ============================================= */
const promoCards = [
  {
    icon: "🔒",
    title: "Secure Your Account",
    desc: "Protect your personal information by updating your password regularly.",
  },
  {
    icon: "⚡",
    title: "Easy Management",
    desc: "Experience a seamless process. Update your credentials quickly.",
  },
  {
    icon: "🛡️",
    title: "24/7 Support",
    desc: "Our dedicated security team is available round the clock.",
  },
];

function PromoCard({ card, index }) {
  const [hov, setHov] = React.useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.1 }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: G.black2,
        border: `1px solid ${hov ? G.bGold : G.border}`,
        borderLeft: `3px solid ${G.gold}`,
        borderRadius: "12px",
        padding: "22px 24px",
        display: "flex", alignItems: "flex-start", gap: "14px",
        transform: hov ? "translateX(6px)" : "translateX(0)",
        transition: "all 0.3s ease",
        cursor: "default",
      }}
    >
      <div style={{
        width: "42px", height: "42px", borderRadius: "10px",
        background: "rgba(201,168,76,0.1)", border: `1px solid ${G.bGold}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "1.2rem", flexShrink: 0,
      }}>
        {card.icon}
      </div>
      <div>
        <div style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: "1rem", fontWeight: 600,
          color: G.white, marginBottom: "5px",
        }}>
          {card.title}
        </div>
        <div style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "13px", lineHeight: 1.7, color: G.w55,
        }}>
          {card.desc}
        </div>
      </div>
    </motion.div>
  );
}

/* =============================================
   PASSWORD STRENGTH INDICATOR
   ============================================= */
function PasswordStrength({ password }) {
  if (!password) return null;
  const score =
    (password.length >= 8 ? 1 : 0) +
    (/[A-Z]/.test(password) ? 1 : 0) +
    (/[0-9]/.test(password) ? 1 : 0) +
    (/[^A-Za-z0-9]/.test(password) ? 1 : 0);
  const levels = [
    { label: "Weak",   color: "#f87171" },
    { label: "Fair",   color: G.gold    },
    { label: "Good",   color: "#fb923c" },
    { label: "Strong", color: "#4ade80" },
  ];
  const lvl = levels[Math.min(score - 1, 3)] || levels[0];

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      style={{ marginTop: "-8px" }}
    >
      <div style={{ display: "flex", gap: "4px", marginBottom: "4px" }}>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} style={{
            flex: 1, height: "3px", borderRadius: "2px",
            background: i < score ? lvl.color : G.border,
            transition: "background 0.3s",
          }} />
        ))}
      </div>
      <div style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: "11px", fontWeight: 600,
        color: lvl.color, letterSpacing: "0.06em",
      }}>
        {lvl.label} password
      </div>
    </motion.div>
  );
}

/* =============================================
   MAIN COMPONENT
   ============================================= */
export default function ChangePass() {
  /* ---- ORIGINAL LOGIC — UNCHANGED ---- */
  const [searchParams] = useSearchParams();
  const userIdFromURL = searchParams.get("id");

  const [formData, setFormData] = useState({
    currentPassword: "",
    password: "",
    confirmPassword: "",
  });
  const [alert, setAlert]   = useState({ success: true, message: "" });
  const [show, setShow]     = useState({ current: false, new: false, confirm: false });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const toggleShow = (field) => setShow((s) => ({ ...s, [field]: !s[field] }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { currentPassword, password, confirmPassword } = formData;

    if (!currentPassword || !password || !confirmPassword) {
      setAlert({ success: false, message: "Please fill all fields" });
      return;
    }
    if (password.length < 6) {
      setAlert({ success: false, message: "Password must be at least 6 characters long" });
      return;
    }
    if (password !== confirmPassword) {
      setAlert({ success: false, message: "Passwords do not match" });
      return;
    }

    const storedUser =
      JSON.parse(localStorage.getItem("user")) ||
      JSON.parse(localStorage.getItem("adminUser"));
    const userId = userIdFromURL || storedUser?._id || storedUser?.id;

    if (!userId) {
      setAlert({ success: false, message: "User ID not found!" });
      return;
    }

    setLoading(true);
    try {
      const res = await axios.put(
        `http://localhost:3001/updateUser/${userId}`,
        { currentPassword, newPassword: password }
      );
      if (res.data.success) {
        setAlert({ success: true, message: "Password updated successfully!" });
        window.dispatchEvent(new Event("userUpdated"));
        setTimeout(() => navigate("/"), 500);
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
  /* ---- END ORIGINAL LOGIC ---- */

  return (
    <div style={{
      background: G.black, minHeight: "100vh",
      fontFamily: "'Inter', sans-serif",
      WebkitFontSmoothing: "antialiased",
    }}>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

      {/* Toast */}
      <Toast alert={alert} onClose={() => setAlert((p) => ({ ...p, message: "" }))} />

      {/* ---- HERO ---- */}
      <section style={{
        position: "relative", background: G.black2,
        padding: "100px 0 72px", textAlign: "center",
        borderBottom: `1px solid ${G.border}`, overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%,-50%)",
          width: "600px", height: "300px", borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(201,168,76,0.07), transparent 70%)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "2px",
          background: `linear-gradient(90deg, transparent, ${G.gold}, transparent)`,
        }} />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ position: "relative", zIndex: 1 }}
        >
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            background: "rgba(201,168,76,0.1)", border: `1px solid ${G.bGold}`,
            borderRadius: "4px", padding: "6px 16px",
            fontSize: "11px", fontWeight: 700, letterSpacing: "0.16em",
            textTransform: "uppercase", color: G.gold,
            fontFamily: "'Inter', sans-serif", marginBottom: "20px",
          }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: G.gold }} />
            Account Security
          </div>

          <h1 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(2.2rem, 5vw, 4rem)",
            fontWeight: 700, color: G.white, lineHeight: 1.08,
            marginBottom: "14px", letterSpacing: "-0.01em",
          }}>
            Change Your{" "}
            <em style={{ fontStyle: "italic", color: G.gold }}>Password</em>
          </h1>

          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "15px", lineHeight: 1.75, color: G.w55,
            maxWidth: "480px", margin: "0 auto",
          }}>
            Keep your account secure by updating your password regularly.
          </p>
        </motion.div>
      </section>

      {/* ---- MAIN GRID ---- */}
      <div style={{
        maxWidth: "1100px", margin: "0 auto",
        padding: "72px 40px 0",
        display: "grid",
        gridTemplateColumns: "1.4fr 1fr",
        gap: "40px",
        alignItems: "flex-start",
      }}>

        {/* LEFT: Form card */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.1 }}
          style={{
            background: G.black2,
            border: `1px solid ${G.border}`,
            borderRadius: "20px",
            padding: "clamp(28px, 5vw, 52px)",
            position: "relative", overflow: "hidden",
          }}
        >
          {/* Gold top line */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: "2px",
            background: `linear-gradient(90deg, ${G.gold}, transparent)`,
          }} />
          <div style={{
            position: "absolute", top: "-60px", right: "-60px",
            width: "200px", height: "200px", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(201,168,76,0.07), transparent 70%)",
            pointerEvents: "none",
          }} />

          {/* Form heading */}
          <div style={{ marginBottom: "32px" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              fontSize: "11px", fontWeight: 700, letterSpacing: "0.18em",
              textTransform: "uppercase", color: G.gold,
              fontFamily: "'Inter', sans-serif", marginBottom: "10px",
            }}>
              <span style={{ width: "20px", height: "1px", background: G.gold }} />
              Update Password
            </div>
            <h2 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700,
              color: G.white, lineHeight: 1.15,
            }}>
              Set a New{" "}
              <em style={{ fontStyle: "italic", color: G.gold }}>Password</em>
            </h2>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

              <PasswordField
                label="Current Password"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                show={show.current}
                onToggle={() => toggleShow("current")}
              />

              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <PasswordField
                  label="New Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  show={show.new}
                  onToggle={() => toggleShow("new")}
                />
                <PasswordStrength password={formData.password} />
              </div>

              <PasswordField
                label="Confirm New Password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                show={show.confirm}
                onToggle={() => toggleShow("confirm")}
              />

              {/* Match indicator */}
              <AnimatePresence>
                {formData.confirmPassword && formData.password && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "12px", fontWeight: 600,
                      color: formData.password === formData.confirmPassword
                        ? "#4ade80" : "#f87171",
                      marginTop: "-8px",
                      display: "flex", alignItems: "center", gap: "6px",
                    }}
                  >
                    {formData.password === formData.confirmPassword
                      ? "✓  Passwords match"
                      : "✕  Passwords do not match"}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={!loading ? { y: -3, boxShadow: "0 14px 32px rgba(201,168,76,0.35)" } : {}}
                whileTap={!loading ? { scale: 0.97 } : {}}
                style={{
                  width: "100%", padding: "17px",
                  background: loading ? "rgba(255,255,255,0.05)" : G.gold,
                  color: loading ? G.w30 : "#000",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "14px", fontWeight: 700,
                  letterSpacing: "0.06em", textTransform: "uppercase",
                  border: "none", borderRadius: "8px",
                  cursor: loading ? "not-allowed" : "pointer",
                  transition: "background 0.25s",
                  display: "flex", alignItems: "center",
                  justifyContent: "center", gap: "10px",
                }}
              >
                {loading ? (
                  <>
                    <div style={{
                      width: "18px", height: "18px",
                      border: "2px solid rgba(0,0,0,0.2)",
                      borderTop: "2px solid #000",
                      borderRadius: "50%",
                      animation: "spin 0.7s linear infinite",
                    }} />
                    Updating…
                  </>
                ) : "Confirm Update →"}
              </motion.button>

            </div>
          </form>
        </motion.div>

        {/* RIGHT: Promo cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {promoCards.map((card, i) => (
            <PromoCard key={i} card={card} index={i} />
          ))}
        </div>
      </div>

      {/* ---- CTA BANNER ---- */}
      <div style={{ padding: "72px 40px 80px" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{
            background: G.black2,
            border: `1px solid ${G.border}`,
            borderRadius: "20px",
            padding: "64px 48px",
            textAlign: "center",
            position: "relative", overflow: "hidden",
          }}
        >
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: "2px",
            background: `linear-gradient(90deg, transparent, ${G.gold}, transparent)`,
          }} />
          <div style={{
            position: "absolute", left: "-100px", top: "50%",
            transform: "translateY(-50%)",
            width: "400px", height: "250px", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(201,168,76,0.08), transparent 70%)",
            pointerEvents: "none",
          }} />

          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              fontSize: "11px", fontWeight: 700, letterSpacing: "0.18em",
              textTransform: "uppercase", color: G.gold,
              fontFamily: "'Inter', sans-serif", marginBottom: "16px",
            }}>
              <span style={{ width: "20px", height: "1px", background: G.gold }} />
              Stay Protected
            </div>

            <h3 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", fontWeight: 700,
              color: G.white, lineHeight: 1.15, marginBottom: "12px",
            }}>
              Keep Your Account{" "}
              <em style={{ fontStyle: "italic", color: G.gold }}>Safe</em>
            </h3>

            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "14px", lineHeight: 1.8, color: G.w55,
              maxWidth: "480px", margin: "0 auto",
            }}>
              Updating your password helps protect your account and personal data from unauthorized access.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}