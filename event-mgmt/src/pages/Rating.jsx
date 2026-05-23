// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   Box,
//   Grid,
//   Card,
//   CardContent,
//   Typography,
//   TextField,
//   Alert,
//   Button,
//   Stack,
//   Container,
//   IconButton,
// } from "@mui/material";
// import StarIcon from "@mui/icons-material/Star";

// const NEON_CYAN = "#4CC9F0";
// const NEON_BLUE = "#4361EE";
// const DARK_BG = "#0D1B2A";
// const CARD_BG = "#1B263B";

// function Rating() {
//   const [isLoggedIn, setIsLoggedIn] = useState(true);
//   const [ratingData, setRatingData] = useState({
//     fullName: "",
//     email: "",
//     rating: 0,
//     message: "",
//   });
//   const [hoverRating, setHoverRating] = useState(0);
//   const [alert, setAlert] = useState({ success: true, message: "" });

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       const user = JSON.parse(storedUser);
//       setIsLoggedIn(true);
//       setRatingData((prev) => ({
//         ...prev,
//         fullName: user.name || "",
//         email: user.email || "",
//       }));
//     } else {
//       setIsLoggedIn(false);
//       setAlert({ success: false, message: "Please login to submit a rating." });
//     }
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setRatingData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async () => {
//     try {
//       const storedUser = localStorage.getItem("user");
//       if (!storedUser) {
//         setAlert({ success: false, message: "Please login first." });
//         return;
//       }
//       const user = JSON.parse(storedUser);
//       const userId = user._id || user.id;

//       if (!userId) {
//         setAlert({ success: false, message: "User session invalid." });
//         return;
//       }
//       if (ratingData.rating === 0) {
//         setAlert({ success: false, message: "Please select a star rating." });
//         return;
//       }

//       const res = await axios.post("http://localhost:3001/api/ratings", {
//         ...ratingData,
//         userId,
//       });

//       if (res.data.success) {
//         setAlert({ success: true, message: "Thank you for your feedback! ⭐" });
//         setRatingData((prev) => ({ ...prev, rating: 0, message: "" }));
//         setTimeout(() => setAlert({ success: true, message: "" }), 3000);
//       }
//     } catch (error) {
//       setAlert({
//         success: false,
//         message: error.response?.data?.message || "Something went wrong.",
//       });
//     }
//   };

//   const inputStyle = {
//     "& .MuiOutlinedInput-root": {
//       color: "white",
//       backgroundColor: "rgba(0,0,0,0.2)",
//       "& fieldset": { borderColor: "rgba(76, 201, 240, 0.2)" },
//       "&:hover fieldset": { borderColor: NEON_CYAN },
//       "&.Mui-focused fieldset": { borderColor: NEON_CYAN },
//       "&.Mui-disabled": {
//         color: "white",
//         "& .MuiOutlinedInput-notchedOutline": {
//           borderColor: "rgba(255, 255, 255, 0.1)",
//         },
//       },
//     },
//     "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.5)" },
//     "& .MuiInputLabel-root.Mui-focused": { color: NEON_CYAN },
//     "& .MuiInputLabel-root.Mui-disabled": { color: "rgba(255,255,255,0.7)" },
//     "& .MuiOutlinedInput-input.Mui-disabled": {
//       WebkitTextFillColor: "#FFFFFF",
//       opacity: 1,
//     },
//   };

//   return (
//     <Box sx={{ background: DARK_BG, minHeight: "100vh", pb: 10 }}>
//       {/* HERO SECTION */}
//       <Box
//         sx={{
//           background: "linear-gradient(180deg, #1B263B 0%, #0D1B2A 100%)",
//           pt: { xs: 8, md: 12 },
//           pb: { xs: 6, md: 8 },
//           textAlign: "center",
//           borderBottom: "1px solid rgba(76, 201, 240, 0.1)",
//         }}
//       >
//         <Typography
//           variant="h2"
//           fontWeight={900}
//           sx={{
//             background: `linear-gradient(90deg, ${NEON_CYAN}, ${NEON_BLUE})`,
//             WebkitBackgroundClip: "text",
//             WebkitTextFillColor: "transparent",
//             textTransform: "uppercase",
//             letterSpacing: 2,
//             fontSize: { xs: "2.5rem", md: "3.5rem" },
//             mb: 2,
//           }}
//         >
//           Rate Your Experience
//         </Typography>
//         <Typography
//           variant="h6"
//           sx={{
//             color: "rgba(255,255,255,0.6)",
//             maxWidth: "600px",
//             mx: "auto",
//             px: 2,
//           }}
//         >
//           Your feedback fuels our innovation. Help us make EventSphere even
//           better.
//         </Typography>
//       </Box>

//       {/* FORM CONTAINER */}
//       <Container maxWidth="md" sx={{ mt: 6 }}>
//         <Card
//           sx={{
//             borderRadius: 4,
//             backgroundColor: CARD_BG,
//             backgroundImage: "none",
//             border: "1px solid rgba(76, 201, 240, 0.15)",
//             boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
//             overflow: "visible",
//           }}
//         >
//           <CardContent sx={{ p: { xs: 3, md: 6 } }}>
//             {alert.message && (
//               <Alert
//                 severity={alert.success ? "success" : "error"}
//                 variant="filled"
//                 sx={{
//                   mb: 4,
//                   borderRadius: 2,
//                   backgroundColor: alert.success
//                     ? "rgba(6, 214, 160, 0.1)"
//                     : "rgba(255, 71, 87, 0.1)",
//                   color: alert.success ? "#06D6A0" : "#FF4757",
//                   border: `1px solid ${
//                     alert.success
//                       ? "rgba(6, 214, 160, 0.3)"
//                       : "rgba(255, 71, 87, 0.3)"
//                   }`,
//                   "& .MuiAlert-icon": {
//                     color: alert.success ? "#06D6A0" : "#FF4757",
//                   },
//                   fontWeight: 600,
//                 }}
//               >
//                 {alert.message}
//               </Alert>
//             )}

//             <Stack spacing={4}>
//               <Grid container spacing={3}>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     label="Full Name"
//                     value={ratingData.fullName}
//                     fullWidth
//                     disabled
//                     sx={inputStyle}
//                   />
//                 </Grid>
//                 <Grid item xs={12} sm={6}>
//                   <TextField
//                     label="Email"
//                     value={ratingData.email}
//                     fullWidth
//                     disabled
//                     sx={inputStyle}
//                   />
//                 </Grid>
//               </Grid>

//               {/* STAR RATING SECTION */}
//               <Box
//                 textAlign="center"
//                 sx={{
//                   py: 4,
//                   borderRadius: 3,
//                   backgroundColor: "rgba(0,0,0,0.3)",
//                   border: "1px solid rgba(255,255,255,0.05)",
//                   boxShadow: "inset 0 2px 10px rgba(0,0,0,0.5)",
//                 }}
//               >
//                 <Typography
//                   fontWeight={900}
//                   mb={2}
//                   sx={{
//                     fontFamily: "'Syncopate', sans-serif",
//                     textTransform: "uppercase",
//                     letterSpacing: "5px",
//                     fontSize: "0.9rem",
//                     textAlign: "center",
//                     display: "block",
//                     width: "100%",
//                     background: `linear-gradient(90deg, #FFFFFF 0%, ${NEON_CYAN} 50%, #FFFFFF 100%)`,
//                     WebkitBackgroundClip: "text",
//                     WebkitTextFillColor: "transparent",
//                     animation: "glow 3s ease-in-out infinite alternate",
//                     "@keyframes glow": {
//                       from: {
//                         opacity: 0.8,
//                         filter: "drop-shadow(0 0 2px rgba(255,255,255,0.2))",
//                       },
//                       to: {
//                         opacity: 1,
//                         filter: `drop-shadow(0 0 8px ${NEON_CYAN})`,
//                       },
//                     },
//                   }}
//                 >
//                   How would you rate us?
//                 </Typography>

//                 {/* STARS CONTAINER  */}
//                 <Box
//                   sx={{
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center",
//                     gap: 0,
//                   }}
//                 >
//                   {[1, 2, 3, 4, 5].map((star) => (
//                     <IconButton
//                       key={star}
//                       onClick={() =>
//                         setRatingData((prev) => ({ ...prev, rating: star }))
//                       }
//                       onMouseEnter={() => setHoverRating(star)}
//                       onMouseLeave={() => setHoverRating(0)}
//                       sx={{
//                         transition: "all 0.2s ease",
//                         mx: { xs: 0.1, sm: 0.2 },
//                         padding: "6px",
//                         "&:hover": {
//                           transform: "scale(1.2)",
//                           backgroundColor: "rgba(255, 255, 255, 0.03)",
//                         },
//                       }}
//                     >
//                       <StarIcon
//                         sx={{
//                           fontSize: { xs: 45, md: 55 },
//                           color:
//                             star <= (hoverRating || ratingData.rating)
//                               ? "#FFD166"
//                               : "rgba(255,255,255,0.1)",
//                           filter:
//                             star <= (hoverRating || ratingData.rating)
//                               ? "drop-shadow(0 0 15px rgba(255, 209, 102, 0.6))"
//                               : "none",
//                           transition: "all 0.3s ease",
//                         }}
//                       />
//                     </IconButton>
//                   ))}
//                 </Box>
//               </Box>

//               <TextField
//                 label="Your Feedback"
//                 name="message"
//                 placeholder="Share your thoughts with us..."
//                 value={ratingData.message}
//                 onChange={handleChange}
//                 fullWidth
//                 multiline
//                 rows={5}
//                 sx={inputStyle}
//               />

//               <Button
//                 variant="contained"
//                 disabled={!isLoggedIn}
//                 onClick={handleSubmit}
//                 sx={{
//                   py: 2.2,
//                   fontSize: "1.1rem",
//                   fontWeight: 800,
//                   borderRadius: "12px",
//                   textTransform: "uppercase",
//                   letterSpacing: 1.5,
//                   background: `linear-gradient(90deg, ${NEON_BLUE}, ${NEON_CYAN})`,
//                   boxShadow: `0 4px 20px rgba(67, 97, 238, 0.3)`,
//                   transition: "all 0.3s",
//                   "&:hover": {
//                     background: `linear-gradient(90deg, ${NEON_CYAN}, ${NEON_BLUE})`,
//                     transform: "translateY(-3px)",
//                     boxShadow: `0 8px 25px rgba(76, 201, 240, 0.4)`,
//                   },
//                   "&.Mui-disabled": {
//                     background: "rgba(255,255,255,0.05)",
//                     color: "rgba(255,255,255,0.2)",
//                   },
//                 }}
//               >
//                 Submit Review
//               </Button>
//             </Stack>
//           </CardContent>
//         </Card>
//       </Container>
//     </Box>
//   );
// }

// export default Rating;
import React, { useState, useEffect } from "react";
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
  useEffect(() => {
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
   FIELD — read-only or editable
   ============================================= */
function Field({ label, name, value, onChange, readOnly, multiline, rows }) {
  const [focused, setFocused] = React.useState(false);
  const Tag = multiline ? "textarea" : "input";

  return (
    <div style={{ flex: 1 }}>
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
      <Tag
        name={name}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        rows={rows}
        placeholder={multiline ? "Share your thoughts with us…" : ""}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: "100%",
          background: readOnly ? "rgba(255,255,255,0.02)" : G.black3,
          border: `1px solid ${focused ? G.bGold : G.border}`,
          borderRadius: "8px",
          padding: "14px 18px",
          fontFamily: "'Inter', sans-serif",
          fontSize: "14px",
          color: readOnly ? G.w55 : G.white,
          outline: "none",
          resize: multiline ? "vertical" : undefined,
          lineHeight: 1.7,
          cursor: readOnly ? "not-allowed" : "text",
          transition: "border-color 0.2s",
          boxSizing: "border-box",
        }}
      />
    </div>
  );
}

/* =============================================
   STAR ROW
   ============================================= */
function StarRating({ rating, hoverRating, onRate, onHover, onLeave }) {
  const labels = ["", "Poor", "Fair", "Good", "Great", "Excellent"];
  const active = hoverRating || rating;

  return (
    <div style={{
      background: "rgba(255,255,255,0.02)",
      border: `1px solid ${G.border}`,
      borderRadius: "14px",
      padding: "36px 24px",
      textAlign: "center",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Subtle gold glow */}
      {active > 0 && (
        <div style={{
          position: "absolute", bottom: "-40px", left: "50%",
          transform: "translateX(-50%)",
          width: "300px", height: "150px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(201,168,76,0.12), transparent 70%)",
          pointerEvents: "none",
          transition: "opacity 0.3s",
        }} />
      )}

      <div style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: "11px", fontWeight: 700,
        letterSpacing: "0.2em", textTransform: "uppercase",
        color: G.w30, marginBottom: "24px",
      }}>
        How would you rate us?
      </div>

      {/* Stars */}
      <div style={{ display: "flex", justifyContent: "center", gap: "4px", marginBottom: "16px" }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <motion.button
            key={star}
            onClick={() => onRate(star)}
            onMouseEnter={() => onHover(star)}
            onMouseLeave={onLeave}
            whileHover={{ scale: 1.25, y: -4 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 14 }}
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: "4px",
              fontSize: "clamp(2.2rem, 5vw, 3rem)",
              lineHeight: 1,
              filter: star <= active
                ? "drop-shadow(0 0 12px rgba(201,168,76,0.7))"
                : "none",
              transition: "filter 0.25s",
            }}
          >
            <span style={{
              display: "block",
              color: star <= active ? G.gold : "rgba(255,255,255,0.12)",
              transition: "color 0.2s",
            }}>
              ★
            </span>
          </motion.button>
        ))}
      </div>

      {/* Label */}
      <AnimatePresence mode="wait">
        {active > 0 && (
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "1.1rem", fontStyle: "italic",
              color: G.gold, fontWeight: 600,
            }}
          >
            {labels[active]}
          </motion.div>
        )}
        {active === 0 && (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "12px", color: G.w30,
            }}
          >
            Tap a star to rate
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* =============================================
   MAIN COMPONENT
   ============================================= */
export default function Rating() {
  /* ---- ORIGINAL LOGIC — UNCHANGED ---- */
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [ratingData, setRatingData] = useState({
    fullName: "",
    email: "",
    rating: 0,
    message: "",
  });
  const [hoverRating, setHoverRating] = useState(0);
  const [alert, setAlert] = useState({ success: true, message: "" });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setIsLoggedIn(true);
      setRatingData((prev) => ({
        ...prev,
        fullName: user.name || "",
        email: user.email || "",
      }));
    } else {
      setIsLoggedIn(false);
      setAlert({ success: false, message: "Please login to submit a rating." });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRatingData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) {
        setAlert({ success: false, message: "Please login first." });
        return;
      }
      const user = JSON.parse(storedUser);
      const userId = user._id || user.id;

      if (!userId) {
        setAlert({ success: false, message: "User session invalid." });
        return;
      }
      if (ratingData.rating === 0) {
        setAlert({ success: false, message: "Please select a star rating." });
        return;
      }

      const res = await axios.post("http://localhost:3001/api/ratings", {
        ...ratingData,
        userId,
      });

      if (res.data.success) {
        setAlert({ success: true, message: "Thank you for your feedback! ⭐" });
        setRatingData((prev) => ({ ...prev, rating: 0, message: "" }));
        setTimeout(() => setAlert({ success: true, message: "" }), 3000);
      }
    } catch (error) {
      setAlert({
        success: false,
        message: error.response?.data?.message || "Something went wrong.",
      });
    }
  };
  /* ---- END ORIGINAL LOGIC ---- */

  return (
    <div style={{
      background: G.black, minHeight: "100vh",
      fontFamily: "'Inter', sans-serif",
      WebkitFontSmoothing: "antialiased",
    }}>
      {/* Toast */}
      <Toast alert={alert} onClose={() => setAlert((p) => ({ ...p, message: "" }))} />

      {/* ---- HERO ---- */}
      <section style={{
        position: "relative", background: G.black2,
        padding: "100px 0 72px", textAlign: "center",
        borderBottom: `1px solid ${G.border}`, overflow: "hidden",
      }}>
        {/* Gold glow */}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%,-50%)",
          width: "600px", height: "300px", borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(201,168,76,0.08), transparent 70%)",
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
          {/* Eyebrow */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            background: "rgba(201,168,76,0.1)", border: `1px solid ${G.bGold}`,
            borderRadius: "4px", padding: "6px 16px",
            fontSize: "11px", fontWeight: 700, letterSpacing: "0.16em",
            textTransform: "uppercase", color: G.gold,
            fontFamily: "'Inter', sans-serif", marginBottom: "20px",
          }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: G.gold }} />
            Your Feedback
          </div>

          {/* Title */}
          <h1 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(2.2rem, 5vw, 4rem)",
            fontWeight: 700, color: G.white, lineHeight: 1.08,
            marginBottom: "14px", letterSpacing: "-0.01em",
          }}>
            Rate Your{" "}
            <em style={{ fontStyle: "italic", color: G.gold }}>Experience</em>
          </h1>

          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "15px", lineHeight: 1.75, color: G.w55,
            maxWidth: "500px", margin: "0 auto",
          }}>
            Your feedback fuels our innovation. Help us make EventSphere even better.
          </p>
        </motion.div>
      </section>

      {/* ---- FORM ---- */}
      <div style={{ maxWidth: "680px", margin: "0 auto", padding: "64px 24px 80px" }}>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.15 }}
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
          {/* Corner glow */}
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
              Submit Review
            </div>
            <h2 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700,
              color: G.white, lineHeight: 1.15,
            }}>
              Share Your{" "}
              <em style={{ fontStyle: "italic", color: G.gold }}>Thoughts</em>
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

            {/* Name + Email row */}
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <Field
                label="Full Name"
                value={ratingData.fullName}
                readOnly
              />
              <Field
                label="Email Address"
                value={ratingData.email}
                readOnly
              />
            </div>

            {/* Star rating */}
            <StarRating
              rating={ratingData.rating}
              hoverRating={hoverRating}
              onRate={(star) => setRatingData((prev) => ({ ...prev, rating: star }))}
              onHover={setHoverRating}
              onLeave={() => setHoverRating(0)}
            />

            {/* Message textarea */}
            <Field
              label="Your Feedback"
              name="message"
              value={ratingData.message}
              onChange={handleChange}
              multiline
              rows={5}
            />

            {/* Submit */}
            <motion.button
              onClick={handleSubmit}
              disabled={!isLoggedIn}
              whileHover={isLoggedIn ? { y: -3, boxShadow: "0 14px 32px rgba(201,168,76,0.35)" } : {}}
              whileTap={isLoggedIn ? { scale: 0.97 } : {}}
              style={{
                width: "100%", padding: "17px",
                background: isLoggedIn ? G.gold : "rgba(255,255,255,0.05)",
                color: isLoggedIn ? "#000" : G.w30,
                fontFamily: "'Inter', sans-serif",
                fontSize: "14px", fontWeight: 700,
                letterSpacing: "0.06em", textTransform: "uppercase",
                border: "none", borderRadius: "8px",
                cursor: isLoggedIn ? "pointer" : "not-allowed",
                transition: "background 0.25s",
              }}
            >
              {isLoggedIn ? "Submit Review ★" : "Please Login to Rate"}
            </motion.button>

          </div>
        </motion.div>
      </div>
    </div>
  );
}