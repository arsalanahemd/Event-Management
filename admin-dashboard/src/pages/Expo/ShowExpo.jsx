// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Grid,
//   Card,
//   CardMedia,
//   CardContent,
//   Typography,
//   Button,
//   CircularProgress,
//   Alert,
//   Divider,
//   Chip,
//   Stack,
// } from "@mui/material";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
// import LocationOnIcon from "@mui/icons-material/LocationOn";
// import AccessTimeIcon from "@mui/icons-material/AccessTime";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

// // Theme Constants
// const NEON_CYAN = "#4CC9F0";
// const NEON_PINK = "#F72585";

// function ShowExpos() {
//   const [expos, setExpos] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [alert, setAlert] = useState({ success: true, message: "" });
//   const navigate = useNavigate();

//   const fetchExpos = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get("http://localhost:3001/expo");
//       if (res.data.success) setExpos(res.data.expos);
//     } catch (err) {
//       setAlert({ success: false, message: "Failed to load expos" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchExpos();
//   }, []);

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this expo?")) return;
//     try {
//       const res = await axios.delete(`http://localhost:3001/expo/delete/${id}`);
//       if (res.data.success) {
//         setAlert({ success: true, message: "Expo deleted successfully" });
//         setExpos(expos.filter((e) => e._id !== id));
//         setTimeout(() => setAlert({ success: true, message: "" }), 3000);
//       }
//     } catch (err) {
//       setAlert({ success: false, message: "Failed to delete expo" });
//     }
//   };

//   const formatTime = (timeStr) => {
//     if (!timeStr) return "N/A";
//     try {
//       const [hours, minutes] = timeStr.split(":").map(Number);
//       const period = hours >= 12 ? "PM" : "AM";
//       const formattedHours = hours % 12 || 12;
//       return `${formattedHours}:${minutes.toString().padStart(2, "0")} ${period}`;
//     } catch {
//       return "N/A";
//     }
//   };

//   if (loading) {
//     return (
//       <Box
//         sx={{
//           minHeight: "100vh",
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           justifyContent: "center",
//           background: "#0D1B2A",
//         }}
//       >
//         <CircularProgress sx={{ color: NEON_CYAN }} />
//         <Typography mt={2} sx={{ color: "#94A3B8", fontWeight: 600 }}>
//           Fetching Live Expos...
//         </Typography>
//       </Box>
//     );
//   }

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         background: "radial-gradient(circle at top right, #1B263B, #0D1B2A)",
//         p: { xs: 2, md: 5 },
//         pb: 10,
//       }}
//     >
//       {/* Heading */}
//       <Box sx={{ textAlign: "center", mb: 8 }}>
//         <Typography
//           variant="h3"
//           sx={{
//             fontWeight: 900,
//             fontFamily: "'Poppins', sans-serif",
//             textTransform: "uppercase",
//             letterSpacing: "3px",
//             mb: 4,
//             background: "linear-gradient(90deg, #4CC9F0, #4895EF, #F72585)",
//             WebkitBackgroundClip: "text",
//             WebkitTextFillColor: "transparent",
//             filter: "drop-shadow(0px 4px 10px rgba(76, 201, 240, 0.2))",
//           }}
//         >
//           Live Expo Events
//         </Typography>
//         <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.6)", letterSpacing: 1 }}>
//           Discover and manage upcoming industry showcases
//         </Typography>
//       </Box>

//       {alert.message && (
//         <Alert
//           severity={alert.success ? "success" : "error"}
//           variant="filled"
//           sx={{ mb: 4, borderRadius: "12px", maxWidth: "600px", mx: "auto" }}
//         >
//           {alert.message}
//         </Alert>
//       )}

//       <Grid container spacing={4}>
//         {expos.map((expo) => (
//           <Grid item xs={12} sm={6} lg={4} key={expo._id}>
//             <Card
//               sx={{
//                 height: "100%",
//                 background: "rgba(255, 255, 255, 0.03)",
//                 backdropFilter: "blur(15px)",
//                 borderRadius: "30px",
//                 border: "1px solid rgba(255, 255, 255, 0.08)",
//                 color: "white",
//                 transition: "all 0.3s ease-in-out",
//                 display: "flex",
//                 flexDirection: "column",
//                 overflow: "hidden",
//                 position: "relative",
//                 "&:hover": {
//                   transform: "translateY(-5px)",
//                   borderColor: "rgba(76, 201, 240, 0.5)",
//                   boxShadow: `0 10px 20px rgba(0, 0, 0, 0.4)`,
//                 },
//               }}
//             >
//               {/*   Image Section  */}
//               <Box sx={{ position: "relative", height: "450px", overflow: "hidden" }}>
//                 <CardMedia
//                   component="img"
//                   height="450"
//                   image={
//                     expo.image
//                       ? `http://localhost:3001/uploads/${expo.image}`
//                       : "https://via.placeholder.com/400x320?text=No+Image"
//                   }
//                   alt={expo.title}
//                   sx={{
//                     transition: "0.6s ease",
//                     objectFit: "cover",
//                     "&:hover": { transform: "scale(1.05)" },
//                   }}
//                 />
//                 <Chip
//                   label={expo.theme || "General"}
//                   sx={{
//                     position: "absolute",
//                     top: 12,
//                     right: 12,
//                     zIndex: 2,
//                     background: "linear-gradient(90deg, #4895EF, #4CC9F0)",
//                     color: "#0D1B2A",
//                     padding: "4px 12px",
//                     borderRadius: "20px",
//                     fontSize: "0.65rem",
//                     fontWeight: "bold",
//                     textTransform: "uppercase",
//                     boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
//                   }}
//                 />
//               </Box>

//               {/* CardContent */}
//               <CardContent sx={{ flexGrow: 1, px: 3, py: 2 }}>
//                 <Typography variant="h6" sx={{ fontWeight: 800, mb: 1, lineHeight: 1.1 }}>
//                   {expo.title}
//                 </Typography>

//                 <Stack spacing={0.8}>
//                   <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
//                     <CalendarTodayIcon sx={{ fontSize: 16, color: NEON_CYAN }} />
//                     <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.7)" }}>
//                       {expo.date ? new Date(expo.date).toDateString() : "Date TBD"}
//                     </Typography>
//                   </Box>

//                   <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
//                     <AccessTimeIcon sx={{ fontSize: 16, color: NEON_PINK }} />
//                     <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.7)" }}>
//                       {formatTime(expo.startTime)} — {formatTime(expo.endTime)}
//                     </Typography>
//                   </Box>

//                   <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
//                     <LocationOnIcon sx={{ fontSize: 16, color: "#4895EF" }} />
//                     <Typography variant="caption" sx={{ color: "#fff", fontWeight: 600 }}>
//                       {expo.venue?.venueName}
//                     </Typography>
//                   </Box>
//                 </Stack>

//                 <Divider sx={{ my: 1.5, borderColor: "rgba(255,255,255,0.05)" }} />

//                 <Box
//                   sx={{
//                     p: 1.2,
//                     borderRadius: "12px",
//                     background: "rgba(0,0,0,0.2)",
//                     border: "1px solid rgba(255,255,255,0.05)",
//                   }}
//                 >
//                   <Typography
//                     variant="caption"
//                     sx={{ color: NEON_CYAN, fontWeight: 900, fontSize: "0.6rem", display: "block" }}
//                   >
//                     FEATURED SPEAKER
//                   </Typography>
//                   <Typography
//                     variant="body2"
//                     sx={{ color: "#fff", fontWeight: 500, fontSize: "0.85rem" }}
//                   >
//                     {expo.speaker?.name || "No Speaker Assigned"}
//                   </Typography>
//                 </Box>
//               </CardContent>

//               {/* Compact Buttons */}
//               <Box sx={{ px: 3, pb: 2, display: "flex", gap: 1.5 }}>
//                 <Button
//                   fullWidth
//                   variant="outlined"
//                   size="small"
//                   startIcon={<EditIcon />}
//                   onClick={() => navigate(`/editExpo/${expo._id}`)}
//                   sx={{
//                     borderRadius: "10px",
//                     color: NEON_CYAN,
//                     borderColor: "rgba(76, 201, 240, 0.3)",
//                     fontSize: "0.75rem",
//                     fontWeight: 700,
//                     py: 0.8,
//                     "&:hover": { borderColor: NEON_CYAN, background: "rgba(76, 201, 240, 0.05)" },
//                   }}
//                 >
//                   Update
//                 </Button>
//                 <Button
//                   fullWidth
//                   variant="outlined"
//                   size="small"
//                   color="error"
//                   startIcon={<DeleteOutlineIcon />}
//                   onClick={() => handleDelete(expo._id)}
//                   sx={{
//                     borderRadius: "10px",
//                     fontSize: "0.75rem",
//                     fontWeight: 700,
//                     py: 0.8,
//                     "&:hover": { background: "rgba(247, 37, 133, 0.05)" },
//                   }}
//                 >
//                   Delete
//                 </Button>
//               </Box>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// }

// export default ShowExpos;
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
const IconCalendar = ({ size = 16, color = G.gold }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);
const IconClock = ({ size = 16, color = G.gold }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);
const IconLocation = ({ size = 16, color = G.gold }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);
const IconEdit = ({ size = 16, color = G.gold }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);
const IconDelete = ({ size = 16, color = "#ff4d4d" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/>
  </svg>
);
const IconEmpty = ({ size = 60, color = "rgba(255,255,255,0.12)" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);

/* =============================================
   MAIN COMPONENT
   ============================================= */
export default function ShowExpos() {
  const [expos, setExpos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({ success: true, message: "" });
  const navigate = useNavigate();

  const fetchExpos = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:3001/expo");
      if (res.data.success) setExpos(res.data.expos);
    } catch (err) {
      setAlert({ success: false, message: "Failed to load expos" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpos();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this expo?")) return;
    try {
      const res = await axios.delete(`http://localhost:3001/expo/delete/${id}`);
      if (res.data.success) {
        setAlert({ success: true, message: "Expo deleted successfully" });
        setExpos(expos.filter((e) => e._id !== id));
        setTimeout(() => setAlert({ success: true, message: "" }), 3000);
      }
    } catch (err) {
      setAlert({ success: false, message: "Failed to delete expo" });
    }
  };

  const formatTime = (timeStr) => {
    if (!timeStr) return "N/A";
    try {
      const [hours, minutes] = timeStr.split(":").map(Number);
      const period = hours >= 12 ? "PM" : "AM";
      const formattedHours = hours % 12 || 12;
      return `${formattedHours}:${minutes.toString().padStart(2, "0")} ${period}`;
    } catch {
      return "N/A";
    }
  };

  /* ---- LOADING ---- */
  if (loading) {
    return (
      <div style={{
        background: G.black, minHeight: "100vh",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
      }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          style={{
            width: "40px", height: "40px",
            border: `2px solid ${G.border}`,
            borderTopColor: G.gold,
            borderRadius: "50%",
          }}
        />
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "14px", color: G.w55,
          marginTop: "16px",
        }}>
          Fetching Live Expos...
        </p>
      </div>
    );
  }

  return (
    <div style={{
      background: G.black, minHeight: "100vh",
      fontFamily: "'Inter', sans-serif",
      WebkitFontSmoothing: "antialiased",
      padding: "0 24px 80px",
    }}>
      {/* Toast */}
      <Toast alert={alert} onClose={() => setAlert({ ...alert, message: "" })} />

      {/* ---- HERO ---- */}
      <section style={{
        position: "relative", background: G.black2,
        padding: "100px 0 72px", textAlign: "center",
        borderBottom: `1px solid ${G.border}`, overflow: "hidden",
        margin: "0 -24px",
        paddingLeft: "24px",
        paddingRight: "24px",
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
            Event Showcase
          </div>

          {/* Title */}
          <h1 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(2.2rem, 5vw, 4rem)",
            fontWeight: 700, color: G.white, lineHeight: 1.08,
            marginBottom: "14px", letterSpacing: "-0.01em",
          }}>
            Live{" "}
            <em style={{ fontStyle: "italic", color: G.gold }}>Expo Events</em>
          </h1>

          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "15px", lineHeight: 1.75, color: G.w55,
            maxWidth: "500px", margin: "0 auto",
          }}>
            Discover and manage upcoming industry showcases.
          </p>
        </motion.div>
      </section>

      {/* ---- CARDS GRID ---- */}
      <div style={{
        maxWidth: "1200px",
        margin: "48px auto 0",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
        gap: "24px",
      }}>
        {expos.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            style={{
              gridColumn: "1 / -1",
              textAlign: "center",
              padding: "80px 20px",
              background: G.black2,
              border: `1px dashed ${G.border}`,
              borderRadius: "20px",
            }}
          >
            <IconEmpty size={60} />
            <h3 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "1.5rem", fontWeight: 700,
              color: G.w55, marginTop: "20px", marginBottom: "8px",
            }}>
              No Expos Found
            </h3>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "14px", color: G.w30, lineHeight: 1.7,
            }}>
              There are no expos scheduled at the moment.
            </p>
          </motion.div>
        ) : (
          expos.map((expo, index) => (
            <motion.div
              key={expo._id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              style={{
                background: G.black2,
                border: `1px solid ${G.border}`,
                borderRadius: "20px",
                overflow: "hidden",
                position: "relative",
                transition: "border-color 0.3s, transform 0.3s",
                display: "flex",
                flexDirection: "column",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = G.bGold;
                e.currentTarget.style.transform = "translateY(-5px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = G.border;
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {/* Gold top line */}
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: "2px",
                background: `linear-gradient(90deg, ${G.gold}, transparent)`,
                zIndex: 2,
              }} />

              {/* Image */}
              <div style={{
                position: "relative",
                height: "280px",
                overflow: "hidden",
              }}>
                <img
                  src={
                    expo.image
                      ? `http://localhost:3001/uploads/${expo.image}`
                      : "https://via.placeholder.com/400x320?text=No+Image"
                  }
                  alt={expo.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.6s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                />
                {/* Theme Badge */}
                <div style={{
                  position: "absolute",
                  top: "12px",
                  right: "12px",
                  zIndex: 2,
                  background: "rgba(201,168,76,0.9)",
                  color: "#000",
                  padding: "5px 14px",
                  borderRadius: "20px",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                }}>
                  {expo.theme || "General"}
                </div>
              </div>

              {/* Content */}
              <div style={{
                flex: 1,
                padding: "20px 24px",
                display: "flex",
                flexDirection: "column",
              }}>
                <h3 style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "1.2rem",
                  fontWeight: 700,
                  color: G.white,
                  marginBottom: "12px",
                  lineHeight: 1.2,
                }}>
                  {expo.title}
                </h3>

                {/* Info rows */}
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <IconCalendar size={14} color={G.gold} />
                    <span style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "13px", color: G.w55,
                    }}>
                      {expo.date ? new Date(expo.date).toDateString() : "Date TBD"}
                    </span>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <IconClock size={14} color={G.gold} />
                    <span style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "13px", color: G.w55,
                    }}>
                      {formatTime(expo.startTime)} — {formatTime(expo.endTime)}
                    </span>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <IconLocation size={14} color={G.gold} />
                    <span style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "13px", color: G.w80, fontWeight: 600,
                    }}>
                      {expo.venue?.venueName}
                    </span>
                  </div>
                </div>

                {/* Divider */}
                <div style={{
                  height: "1px",
                  background: G.border,
                  marginBottom: "16px",
                }} />

                {/* Speaker */}
                <div style={{
                  padding: "12px",
                  borderRadius: "10px",
                  background: "rgba(255,255,255,0.02)",
                  border: `1px solid ${G.border}`,
                  marginBottom: "16px",
                }}>
                  <div style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "10px", fontWeight: 700,
                    letterSpacing: "0.12em", textTransform: "uppercase",
                    color: G.gold, marginBottom: "4px",
                  }}>
                    Featured Speaker
                  </div>
                  <div style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "14px", fontWeight: 500,
                    color: G.white,
                  }}>
                    {expo.speaker?.name || "No Speaker Assigned"}
                  </div>
                </div>

                {/* Action Buttons */}
                <div style={{
                  display: "flex",
                  gap: "10px",
                  marginTop: "auto",
                }}>
                  <motion.button
                    onClick={() => navigate(`/editExpo/${expo._id}`)}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      flex: 1,
                      padding: "10px",
                      background: "transparent",
                      color: G.gold,
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "13px", fontWeight: 700,
                      letterSpacing: "0.04em",
                      border: `1px solid ${G.bGold}`,
                      borderRadius: "8px",
                      cursor: "pointer",
                      display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
                      transition: "all 0.25s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(201,168,76,0.08)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                    }}
                  >
                    <IconEdit size={14} color={G.gold} />
                    Update
                  </motion.button>

                  <motion.button
                    onClick={() => handleDelete(expo._id)}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      flex: 1,
                      padding: "10px",
                      background: "transparent",
                      color: "#ff4d4d",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "13px", fontWeight: 700,
                      letterSpacing: "0.04em",
                      border: "1px solid rgba(255,77,77,0.3)",
                      borderRadius: "8px",
                      cursor: "pointer",
                      display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
                      transition: "all 0.25s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(255,77,77,0.08)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                    }}
                  >
                    <IconDelete size={14} color="#ff4d4d" />
                    Delete
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}