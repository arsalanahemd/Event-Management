// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Grid,
//   Card,
//   CardMedia,
//   CardContent,
//   Typography,
//   CircularProgress,
//   Alert,
//   Button,
//   Container,
//   Chip,
//   Divider,
//   Stack,
// } from "@mui/material";
// import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
// import LocationOnIcon from "@mui/icons-material/LocationOn";
// import AccessTimeIcon from "@mui/icons-material/AccessTime";
// import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
// import axios from "axios";

// function YourRegistration() {
//   const [loading, setLoading] = useState(true);
//   const [userRegistrations, setUserRegistrations] = useState([]);
//   const [user, setUser] = useState(null);
//   const [alert, setAlert] = useState({ success: true, message: "" });

//   const detectUser = () => {
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     if (storedUser) {
//       setUser(storedUser);
//       return storedUser._id || storedUser.id; 
//     }
//     setUser(null);
//     return null;
//   };

//   const fetchUserRegistrations = async (userId) => {
//     try {
//       setLoading(true);
//       const res = await axios.get(
//         `http://localhost:3001/register/user?userId=${userId}`
//       );
//       if (res.data.success) {
//         setUserRegistrations(res.data.registrations || []);
//       }
//     } catch (err) {
//       console.error("Fetch Error:", err);
//       setAlert({ success: false, message: "Failed to fetch registrations" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCancel = async (regId) => {
//     if (!window.confirm("Are you sure you want to cancel this registration?"))
//       return;
//     try {
//       await axios.delete(`http://localhost:3001/register/${regId}`);
//       setAlert({
//         success: true,
//         message: "Registration cancelled successfully!",
//       });
//       // Refresh the list
//       if (user) fetchUserRegistrations(user._id || user.id);
//     } catch (err) {
//       setAlert({ success: false, message: "Failed to cancel registration" });
//     }
//   };

//   useEffect(() => {
//     const userId = detectUser();
//     if (userId) {
//       fetchUserRegistrations(userId);
//     } else {
//       setLoading(false);
//     }
//   }, []);

//   return (
//     <Box
//       sx={{
//         background: "linear-gradient(90deg, #0D1B2A 0%, #1B263B 100%)",
//         backgroundAttachment: "fixed",
//         minHeight: "100vh",
//         display: "flex",
//         flexDirection: "column",
//         pb: 10,
//         color: "white",
//       }}
//     >
//       {/* Header Section */}
//       <Box
//         sx={{
//           background: "linear-gradient(90deg, #1B263B, #273746)",
//           py: 8,
//           textAlign: "center",
//           mb: 8,
//           boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
//         }}
//       >
//         <Typography
//           variant="h2"
//           fontWeight={900}
//           sx={{
//             mb: 2,
//             background: "linear-gradient(90deg, #4CC9F0, #4895EF, #F72585)",
//             WebkitBackgroundClip: "text",
//             WebkitTextFillColor: "transparent",
//             fontSize: { xs: "2.5rem", md: "3.5rem" },
//             textTransform: "uppercase",
//           }}
//         >
//           My Registrations
//         </Typography>
//         <Typography variant="h6" sx={{ opacity: 0.8, fontWeight: 400 }}>
//           Track your booked events and participation status
//         </Typography>
//       </Box>

//       <Container maxWidth="xl">
//         {alert.message && (
//           <Alert
//             severity={alert.success ? "success" : "error"}
//             sx={{
//               mb: 4,
//               borderRadius: "10px",
//               fontWeight: 600,
//               maxWidth: "800px",
//               mx: "auto",
//             }}
//             onClose={() => setAlert({ ...alert, message: "" })}
//           >
//             {alert.message}
//           </Alert>
//         )}

//         {loading ? (
//           <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
//             <CircularProgress color="info" />
//           </Box>
//         ) : !user ? (
//           <Box sx={{ textAlign: "center", py: 10 }}>
//             <Typography variant="h5">
//               Please login as an attendee to view registrations.
//             </Typography>
//           </Box>
//         ) : userRegistrations.length === 0 ? (
//           <Box sx={{ textAlign: "center", py: 10, opacity: 0.5 }}>
//             <Typography variant="h5">
//               You have not registered for any expos yet.
//             </Typography>
//           </Box>
//         ) : (
//           <Grid container spacing={4} justifyContent="center">
//             {userRegistrations.map((reg) => {
//               const expo = reg.expoId;
//               if (!expo) return null;

//               const statusColor =
//                 reg.status === "approved"
//                   ? "#4CC9F0"
//                   : reg.status === "pending"
//                   ? "#FF9F1C"
//                   : "#EF233C";

//               return (
//                 <Grid
//                   item
//                   xs={12}
//                   md={10}
//                   key={reg._id}
//                   sx={{ display: "flex", justifyContent: "center" }}
//                 >
//                   <Card
//                     sx={{
//                       width: "100%",
//                       maxWidth: "950px",
//                       borderRadius: 4,
//                       background: "rgba(255, 255, 255, 0.05)",
//                       backdropFilter: "blur(10px)",
//                       border: "1px solid rgba(255,255,255,0.1)",
//                       color: "white",
//                       position: "relative",
//                       overflow: "hidden",
//                       transition: "0.4s",
//                       "&:hover": {
//                         transform: "translateY(-5px)",
//                         border: `1px solid ${statusColor}`,
//                       },
//                     }}
//                   >
//                     <Chip
//                       label={reg.status}
//                       sx={{
//                         position: "absolute",
//                         top: 15,
//                         right: 15,
//                         zIndex: 2,
//                         backgroundColor: statusColor,
//                         color: "#0D1B2A",
//                         fontWeight: 800,
//                       }}
//                     />

//                     <CardMedia
//                       component="img"
//                       height="320"
//                       image={`http://localhost:3001/uploads/${expo.image}`}
//                       alt={expo.title}
//                       sx={{ objectFit: "cover" }}
//                     />

//                     <CardContent sx={{ p: 4 }}>
//                       <Typography
//                         variant="h5"
//                         fontWeight={800}
//                         color="#4CC9F0"
//                         gutterBottom
//                       >
//                         {expo.title}
//                       </Typography>

//                       <Stack
//                         direction={{ xs: "column", sm: "row" }}
//                         spacing={{ sm: 4, md: 6 }}
//                         sx={{ mt: 2, opacity: 0.9 }}
//                       >
//                         <Box display="flex" alignItems="center" gap={1.5}>
//                           <CalendarMonthIcon
//                             sx={{ fontSize: "1.2rem", color: "#F72585" }}
//                           />
//                           <Typography variant="body1">
//                             {expo.date ? expo.date.split("T")[0] : "N/A"}
//                           </Typography>
//                         </Box>
//                         <Box display="flex" alignItems="center" gap={1.5}>
//                           <AccessTimeIcon
//                             sx={{ fontSize: "1.2rem", color: "#4895EF" }}
//                           />
//                           <Typography variant="body1">
//                             {expo.startTime || "N/A"}
//                           </Typography>
//                         </Box>
//                         <Box display="flex" alignItems="center" gap={1.5}>
//                           <LocationOnIcon
//                             sx={{ fontSize: "1.2rem", color: "#FFD166" }}
//                           />
//                           <Typography variant="body1">
//                             {expo.venue?.venueName || "TBA"}
//                           </Typography>
//                         </Box>
//                       </Stack>

//                       <Divider
//                         sx={{ my: 3, borderColor: "rgba(255,255,255,0.1)" }}
//                       />

//                       <Typography variant="body1" sx={{ mb: 4, opacity: 0.8 }}>
//                         Speaker: <b>{expo.speaker?.name || "Expert Speaker"}</b>
//                       </Typography>

//                       {reg.status === "pending" && (
//                         <Button
//                           fullWidth
//                           variant="contained"
//                           startIcon={<DeleteForeverIcon />}
//                           onClick={() => handleCancel(reg._id)}
//                           sx={{
//                             background: "rgba(239, 35, 60, 0.12)",
//                             color: "#ff5d73",
//                             border: "1px solid rgba(239, 35, 60, 0.3)",
//                             borderRadius: "12px",
//                             fontWeight: 800,
//                             py: 1.5,
//                             "&:hover": {
//                               background: "rgba(239, 35, 60, 0.4)",
//                               color: "#fff",
//                             },
//                           }}
//                         >
//                           Cancel Registration
//                         </Button>
//                       )}
//                     </CardContent>
//                   </Card>
//                 </Grid>
//               );
//             })}
//           </Grid>
//         )}
//       </Container>
//     </Box>
//   );
// }

// export default YourRegistration;
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
   ICONS (SVG)
   ============================================= */
const IconCalendar = ({ size = 20, color = G.gold }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);
const IconLocation = ({ size = 20, color = G.gold }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);
const IconClock = ({ size = 20, color = G.gold }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);
const IconMic = ({ size = 20, color = G.gold }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="8" y1="22" x2="16" y2="22"/>
  </svg>
);
const IconDelete = ({ size = 18, color = "#ff4d4d" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/>
  </svg>
);
const IconEmpty = ({ size = 60, color = "rgba(255,255,255,0.12)" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);
const IconUser = ({ size = 60, color = "rgba(255,255,255,0.12)" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);

/* =============================================
   STATUS CHIP
   ============================================= */
function StatusChip({ status }) {
  const colors = {
    approved: { bg: "rgba(76,201,240,0.12)", color: "#4CC9F0", border: "rgba(76,201,240,0.3)" },
    pending:  { bg: "rgba(255,159,28,0.12)", color: "#FF9F1C", border: "rgba(255,159,28,0.3)" },
    rejected: { bg: "rgba(239,35,60,0.12)", color: "#EF233C", border: "rgba(239,35,60,0.3)" },
  };
  const c = colors[status] || colors.pending;

  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: "6px",
      background: c.bg,
      border: `1px solid ${c.border}`,
      borderRadius: "6px",
      padding: "5px 14px",
      fontFamily: "'Inter', sans-serif",
      fontSize: "11px", fontWeight: 700,
      letterSpacing: "0.08em", textTransform: "uppercase",
      color: c.color,
    }}>
      <span style={{
        width: "6px", height: "6px", borderRadius: "50%",
        background: c.color,
      }} />
      {status}
    </span>
  );
}

/* =============================================
   INFO TAG
   ============================================= */
function InfoTag({ icon, label, value }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: "10px",
    }}>
      {icon}
      <div>
        <div style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "10px", fontWeight: 700,
          letterSpacing: "0.1em", textTransform: "uppercase",
          color: G.w30, marginBottom: "2px",
        }}>
          {label}
        </div>
        <div style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "14px", fontWeight: 500,
          color: G.w80,
        }}>
          {value}
        </div>
      </div>
    </div>
  );
}

/* =============================================
   MAIN COMPONENT
   ============================================= */
export default function YourRegistration() {
  const [loading, setLoading] = useState(true);
  const [userRegistrations, setUserRegistrations] = useState([]);
  const [user, setUser] = useState(null);
  const [alert, setAlert] = useState({ success: true, message: "" });

  const detectUser = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      return storedUser._id || storedUser.id;
    }
    setUser(null);
    return null;
  };

  const fetchUserRegistrations = async (userId) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:3001/register/user?userId=${userId}`
      );
      if (res.data.success) {
        setUserRegistrations(res.data.registrations || []);
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      setAlert({ success: false, message: "Failed to fetch registrations" });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (regId) => {
    if (!window.confirm("Are you sure you want to cancel this registration?"))
      return;
    try {
      await axios.delete(`http://localhost:3001/register/${regId}`);
      setAlert({
        success: true,
        message: "Registration cancelled successfully!",
      });
      if (user) fetchUserRegistrations(user._id || user.id);
    } catch (err) {
      setAlert({ success: false, message: "Failed to cancel registration" });
    }
  };

  useEffect(() => {
    const userId = detectUser();
    if (userId) {
      fetchUserRegistrations(userId);
    } else {
      setLoading(false);
    }
  }, []);

  /* ---- LOADING ---- */
  if (loading) {
    return (
      <div style={{
        background: G.black, minHeight: "100vh",
        display: "flex", alignItems: "center", justifyContent: "center",
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
      </div>
    );
  }

  return (
    <div style={{
      background: G.black, minHeight: "100vh",
      fontFamily: "'Inter', sans-serif",
      WebkitFontSmoothing: "antialiased",
    }}>
      {/* Toast */}
      <Toast alert={alert} onClose={() => setAlert({ ...alert, message: "" })} />

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
            Event Dashboard
          </div>

          {/* Title */}
          <h1 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(2.2rem, 5vw, 4rem)",
            fontWeight: 700, color: G.white, lineHeight: 1.08,
            marginBottom: "14px", letterSpacing: "-0.01em",
          }}>
            My{" "}
            <em style={{ fontStyle: "italic", color: G.gold }}>Registrations</em>
          </h1>

          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "15px", lineHeight: 1.75, color: G.w55,
            maxWidth: "500px", margin: "0 auto",
          }}>
            Track your booked events and participation status in one place.
          </p>
        </motion.div>
      </section>

      {/* ---- CONTENT ---- */}
      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "64px 24px 80px" }}>
        {!user ? (
          /* ---- NOT LOGGED IN ---- */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            style={{
              textAlign: "center",
              padding: "80px 20px",
              background: G.black2,
              border: `1px solid ${G.border}`,
              borderRadius: "20px",
              position: "relative", overflow: "hidden",
            }}
          >
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0, height: "2px",
              background: `linear-gradient(90deg, ${G.gold}, transparent)`,
            }} />
            <IconUser size={60} />
            <h3 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "1.6rem", fontWeight: 700,
              color: G.w55, marginTop: "20px", marginBottom: "8px",
            }}>
              Authentication Required
            </h3>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "14px", color: G.w30, lineHeight: 1.7,
            }}>
              Please login as an attendee to view your registrations.
            </p>
          </motion.div>
        ) : userRegistrations.length === 0 ? (
          /* ---- EMPTY STATE ---- */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            style={{
              textAlign: "center",
              padding: "80px 20px",
              background: G.black2,
              border: `1px solid ${G.border}`,
              borderRadius: "20px",
              position: "relative", overflow: "hidden",
            }}
          >
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0, height: "2px",
              background: `linear-gradient(90deg, ${G.gold}, transparent)`,
            }} />
            <IconEmpty size={60} />
            <h3 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "1.6rem", fontWeight: 700,
              color: G.w55, marginTop: "20px", marginBottom: "8px",
            }}>
              No Registrations Yet
            </h3>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "14px", color: G.w30, lineHeight: 1.7,
            }}>
              You have not registered for any expos yet.<br />
              Browse events and book your spot today.
            </p>
          </motion.div>
        ) : (
          /* ---- REGISTRATION CARDS ---- */
          <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
            {userRegistrations.map((reg, index) => {
              const expo = reg.expoId;
              if (!expo) return null;

              return (
                <motion.div
                  key={reg._id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  style={{
                    background: G.black2,
                    border: `1px solid ${G.border}`,
                    borderRadius: "20px",
                    overflow: "hidden",
                    position: "relative",
                    transition: "border-color 0.3s, transform 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = G.bGold;
                    e.currentTarget.style.transform = "translateY(-4px)";
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

                  {/* Status Badge */}
                  <div style={{
                    position: "absolute", top: "16px", right: "16px", zIndex: 3,
                  }}>
                    <StatusChip status={reg.status} />
                  </div>

                  <div style={{ display: "flex", flexWrap: "wrap" }}>
                    {/* Image */}
                    <div style={{
                      flex: "1 1 320px",
                      minHeight: "260px",
                      position: "relative",
                      overflow: "hidden",
                    }}>
                      <img
                        src={`http://localhost:3001/uploads/${expo.image}`}
                        alt={expo.title}
                        style={{
                          width: "100%", height: "100%",
                          objectFit: "cover",
                          display: "block",
                        }}
                      />
                      <div style={{
                        position: "absolute", inset: 0,
                        background: "linear-gradient(to right, transparent 40%, rgba(10,10,10,0.9) 100%)",
                        pointerEvents: "none",
                      }} />
                    </div>

                    {/* Content */}
                    <div style={{
                      flex: "2 1 400px",
                      padding: "32px",
                      display: "flex", flexDirection: "column", justifyContent: "center",
                    }}>
                      {/* Section label */}
                      <div style={{
                        display: "inline-flex", alignItems: "center", gap: "8px",
                        fontSize: "11px", fontWeight: 700, letterSpacing: "0.18em",
                        textTransform: "uppercase", color: G.gold,
                        fontFamily: "'Inter', sans-serif", marginBottom: "10px",
                      }}>
                        <span style={{ width: "20px", height: "1px", background: G.gold }} />
                        {expo.category || "Expo Event"}
                      </div>

                      <h2 style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontSize: "clamp(1.4rem, 3vw, 1.8rem)", fontWeight: 700,
                        color: G.white, lineHeight: 1.2,
                        marginBottom: "20px",
                      }}>
                        {expo.title}
                      </h2>

                      {/* Info Grid */}
                      <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                        gap: "16px",
                        marginBottom: "20px",
                      }}>
                        <InfoTag
                          icon={<IconCalendar size={18} color={G.gold} />}
                          label="Date"
                          value={expo.date ? expo.date.split("T")[0] : "N/A"}
                        />
                        <InfoTag
                          icon={<IconClock size={18} color={G.gold} />}
                          label="Time"
                          value={expo.startTime || "N/A"}
                        />
                        <InfoTag
                          icon={<IconLocation size={18} color={G.gold} />}
                          label="Venue"
                          value={expo.venue?.venueName || "TBA"}
                        />
                        <InfoTag
                          icon={<IconMic size={18} color={G.gold} />}
                          label="Speaker"
                          value={expo.speaker?.name || "Expert Speaker"}
                        />
                      </div>

                      {/* Divider */}
                      <div style={{
                        height: "1px",
                        background: G.border,
                        marginBottom: "20px",
                      }} />

                      {/* Cancel Button */}
                      {reg.status === "pending" && (
                        <motion.button
                          onClick={() => handleCancel(reg._id)}
                          whileHover={{ y: -2 }}
                          whileTap={{ scale: 0.97 }}
                          style={{
                            display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px",
                            padding: "14px 28px",
                            background: "rgba(239,35,60,0.08)",
                            color: "#ff5d73",
                            fontFamily: "'Inter', sans-serif",
                            fontSize: "13px", fontWeight: 700,
                            letterSpacing: "0.06em", textTransform: "uppercase",
                            border: "1px solid rgba(239,35,60,0.25)",
                            borderRadius: "8px",
                            cursor: "pointer",
                            transition: "all 0.25s",
                            alignSelf: "flex-start",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = "rgba(239,35,60,0.18)";
                            e.currentTarget.style.borderColor = "rgba(239,35,60,0.5)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "rgba(239,35,60,0.08)";
                            e.currentTarget.style.borderColor = "rgba(239,35,60,0.25)";
                          }}
                        >
                          <IconDelete size={16} color="#ff5d73" />
                          Cancel Registration
                        </motion.button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}