// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Typography,
//   CircularProgress,
//   Grid,
//   Card,
//   Avatar,
//   Stack,
//   Alert,
//   Button,
//   Container,
//   Chip,
//   Divider,
// } from "@mui/material";
// import axios from "axios";
// import {
//   Business,
//   EventAvailable,
//   LocationOn,
//   AccessTime,
//   CancelScheduleSend,
// } from "@mui/icons-material";

// function YourParticipation() {
//   const [participations, setParticipations] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [alertData, setAlertData] = useState({ success: true, message: "" });

//   const BASE_URL = "http://localhost:3001";

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     const userId = user?._id || user?.id;

//     if (!userId) {
//       setAlertData({
//         success: false,
//         message: "Please log in to view your participations.",
//       });
//       setLoading(false);
//       return;
//     }

//     fetchParticipations(userId);
//   }, []);

//   const fetchParticipations = async (userId) => {
//     try {
//       setLoading(true);
//       const res = await axios.get(
//         `${BASE_URL}/participation/by-exhibitor/${userId}`
//       );

//       if (res.data.success && res.data.records.length > 0) {
//         setParticipations(res.data.records);
//       } else {
//         setAlertData({
//           success: false,
//           message: "You have not registered for any expos.",
//         });
//       }
//     } catch (err) {
//       console.error("Error fetching participations:", err);
//       setAlertData({
//         success: false,
//         message: "Failed to fetch participations.",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCancel = async (participationId) => {
//     if (!window.confirm("Are you sure you want to cancel this participation?"))
//       return;

//     try {
//       const res = await axios.delete(
//         `${BASE_URL}/participation/${participationId}`
//       );
//       if (res.data.success) {
//         setParticipations((prev) =>
//           prev.filter((p) => p._id !== participationId)
//         );
//         setAlertData({
//           success: true,
//           message: "Participation cancelled successfully!",
//         });
//       }
//     } catch (err) {
//       console.error("Cancel failed:", err);
//       setAlertData({
//         success: false,
//         message: "Failed to cancel participation.",
//       });
//     }
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return "Date TBA";
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-GB");
//   };

//   const formatTime = (timeString) => {
//     if (!timeString) return "Time TBA";
//     const [hours, minutes] = timeString.split(":");
//     const date = new Date();
//     date.setHours(parseInt(hours), parseInt(minutes));
//     return date.toLocaleTimeString([], {
//       hour: "2-digit",
//       minute: "2-digit",
//       hour12: true,
//     });
//   };

//   const getStatusStyle = (status) => {
//     switch (status?.toLowerCase()) {
//       case "approved":
//         return {
//           color: "#4CC9F0",
//           bg: "rgba(76, 201, 240, 0.1)",
//           shadow: "0 0 15px rgba(76, 201, 240, 0.3)",
//         };
//       case "pending":
//         return {
//           color: "#FFD166",
//           bg: "rgba(255, 209, 102, 0.1)",
//           shadow: "0 0 15px rgba(255, 209, 102, 0.3)",
//         };
//       case "rejected":
//       default:
//         return {
//           color: "#ff4d4d",
//           bg: "rgba(255, 77, 77, 0.1)",
//           shadow: "0 0 15px rgba(255, 77, 77, 0.3)",
//         };
//     }
//   };

//   if (loading)
//     return (
//       <Box
//         sx={{
//           background: "#0D1B2A",
//           minHeight: "100vh",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         <CircularProgress sx={{ color: "#4CC9F0" }} />
//       </Box>
//     );

//   return (
//     <Box
//       sx={{
//         background: "linear-gradient(90deg, #0D1B2A 0%, #1B263B 100%)",
//         minHeight: "100vh",
//         pb: 10,
//       }}
//     >
//       <Box
//         sx={{
//           background: "linear-gradient(90deg, #1B263B, #273746)",
//           py: 6,
//           textAlign: "center",
//           color: "white",
//           mb: 6,
//         }}
//       >
//         <Typography
//           variant="h3"
//           fontWeight={900}
//           sx={{
//             background: "linear-gradient(90deg, #4CC9F0, #F72585)",
//             WebkitBackgroundClip: "text",
//             WebkitTextFillColor: "transparent",
//           }}
//         >
//           My Participations
//         </Typography>
//         <Typography variant="body1" sx={{ opacity: 0.7, mt: 1 }}>
//           Manage your expo registrations and bookings
//         </Typography>
//       </Box>

//       <Container maxWidth="lg">
//         {alertData.message && (
//           <Alert
//             severity={alertData.success ? "success" : "info"}
//             variant="filled"
//             sx={{ mb: 4, borderRadius: 2 }}
//           >
//             {alertData.message}
//           </Alert>
//         )}

//         <Grid container spacing={4}>
//           {participations.map((p) => {
//             const company = p.companyId || {};
//             const expo =
//               p.expoId && typeof p.expoId === "object"
//                 ? p.expoId
//                 : { title: "Loading Details..." };
//             const floor = p.floor || {};
//             const statusStyle = getStatusStyle(p.status);

//             return (
//               <Grid item xs={12} md={6} key={p._id}>
//                 <Card
//                   sx={{
//                     background: "rgba(255, 255, 255, 0.05)",
//                     backdropFilter: "blur(12px)",
//                     borderRadius: "24px",
//                     border: `1px solid rgba(255, 255, 255, 0.1)`,
//                     color: "white",
//                     position: "relative",
//                     transition:
//                       "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
//                     "&:hover": {
//                       transform: "translateY(-10px) scale(1.02)",
//                       borderColor: statusStyle.color,
//                       boxShadow: statusStyle.shadow,
//                       background: "rgba(255, 255, 255, 0.08)",
//                     },
//                   }}
//                 >
//                   <Box sx={{ p: 4 }}>
//                     <Stack
//                       direction="row"
//                       spacing={3}
//                       alignItems="center"
//                       mb={3}
//                     >
//                       <Avatar
//                         src={
//                           company.image
//                             ? `${BASE_URL}/uploads/${company.image}`
//                             : ""
//                         }
//                         sx={{
//                           width: 80,
//                           height: 80,
//                           border: `3px solid ${statusStyle.color}`,
//                           bgcolor: "#1B263B",
//                           boxShadow: `0 0 10px ${statusStyle.color}`,
//                           transition: "0.3s ease",
//                           "&:hover": { transform: "rotate(5deg)" },
//                         }}
//                       >
//                         {!company.image && <Business sx={{ fontSize: 40 }} />}
//                       </Avatar>
//                       <Box>
//                         <Typography
//                           variant="h6"
//                           fontWeight={800}
//                           sx={{ letterSpacing: 0.5 }}
//                         >
//                           {company.companyName || "N/A"}
//                         </Typography>
//                         <Chip
//                           label={p.status?.toUpperCase()}
//                           size="small"
//                           sx={{
//                             mt: 1,
//                             fontWeight: 900,
//                             color: statusStyle.color,
//                             bgcolor: statusStyle.bg,
//                             border: `1px solid ${statusStyle.color}`,
//                             fontSize: "0.65rem",
//                             letterSpacing: 1,
//                             px: 1,
//                           }}
//                         />
//                       </Box>
//                     </Stack>

//                     <Divider
//                       sx={{ borderColor: "rgba(255,255,255,0.08)", my: 2 }}
//                     />

//                     <Stack spacing={2}>
//                       <Typography
//                         variant="subtitle1"
//                         color="#4CC9F0"
//                         fontWeight={800}
//                         display="flex"
//                         alignItems="center"
//                       >
//                         <EventAvailable sx={{ mr: 1.5, fontSize: 22 }} />
//                         {expo.title}
//                       </Typography>

//                       <Box>
//                         <Typography
//                           variant="body2"
//                           sx={{
//                             display: "flex",
//                             alignItems: "center",
//                             opacity: 0.8,
//                             mb: 1,
//                           }}
//                         >
//                           <LocationOn
//                             sx={{ mr: 1.5, fontSize: 18, color: "#FFD166" }}
//                           />
//                           {expo.venue?.venueName || "TBA"}
//                         </Typography>

//                         <Typography
//                           variant="body2"
//                           sx={{
//                             display: "flex",
//                             alignItems: "center",
//                             opacity: 0.8,
//                           }}
//                         >
//                           <AccessTime
//                             sx={{ mr: 1.5, fontSize: 18, color: "#4CC9F0" }}
//                           />
//                           {formatDate(expo.date)} | {formatTime(expo.startTime)}
//                         </Typography>
//                       </Box>

//                       <Box
//                         sx={{
//                           mt: 1,
//                           p: 2,
//                           borderRadius: "15px",
//                           bgcolor: "rgba(0,0,0,0.2)",
//                           border: "1px dashed rgba(255,255,255,0.15)",
//                           transition: "0.3s",
//                           "&:hover": { bgcolor: "rgba(0,0,0,0.3)" },
//                         }}
//                       >
//                         <Typography
//                           variant="caption"
//                           sx={{
//                             color: "#FFD166",
//                             display: "block",
//                             mb: 0.5,
//                             fontWeight: 700,
//                             letterSpacing: 1,
//                           }}
//                         >
//                           BOOTH ALLOCATION
//                         </Typography>
//                         <Typography
//                           variant="body2"
//                           fontWeight={600}
//                           sx={{ color: "white" }}
//                         >
//                           {floor.floor
//                             ? `Floor: ${floor.floor} - Booth: ${floor.boothName}`
//                             : "Allocation in progress..."}
//                         </Typography>
//                       </Box>
//                     </Stack>

//                     <Box mt={4}>
//                       <Button
//                         fullWidth
//                         variant="outlined"
//                         startIcon={<CancelScheduleSend />}
//                         onClick={() => handleCancel(p._id)}
//                         sx={{
//                           color: "#ff4d4d",
//                           borderColor: "rgba(255, 77, 77, 0.3)",
//                           fontWeight: 800,
//                           textTransform: "none",
//                           borderRadius: "12px",
//                           py: 1.2,
//                           transition: "0.3s",
//                           "&:hover": {
//                             borderColor: "#ff4d4d",
//                             bgcolor: "rgba(255, 77, 77, 0.1)",
//                             boxShadow: "0 4px 15px rgba(255, 77, 77, 0.2)",
//                           },
//                         }}
//                       >
//                         Cancel Participation
//                       </Button>
//                     </Box>
//                   </Box>
//                 </Card>
//               </Grid>
//             );
//           })}
//         </Grid>
//       </Container>
//     </Box>
//   );
// }

// export default YourParticipation;
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

/* ---- STATUS CONFIG ---- */
const getStatusStyle = (status) => {
  switch (status?.toLowerCase()) {
    case "approved":
      return { color: "#4ade80", bg: "rgba(74,222,128,0.08)", border: "rgba(74,222,128,0.3)" };
    case "pending":
      return { color: G.gold,   bg: "rgba(201,168,76,0.08)", border: G.bGold };
    case "rejected":
    default:
      return { color: "#f87171", bg: "rgba(248,113,113,0.08)", border: "rgba(248,113,113,0.3)" };
  }
};

/* ---- HELPERS ---- */
const formatDate = (d) => {
  if (!d) return "Date TBA";
  return new Date(d).toLocaleDateString("en-GB");
};
const formatTime = (t) => {
  if (!t) return "Time TBA";
  const [h, m] = t.split(":");
  const date = new Date();
  date.setHours(parseInt(h), parseInt(m));
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true });
};

/* =============================================
   TOAST
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
            top: "90px", left: "50%",
            transform: "translateX(-50%)",
            zIndex: 9999,
            background: alert.success ? "rgba(201,168,76,0.12)" : "rgba(248,113,113,0.12)",
            border: `1px solid ${alert.success ? G.bGold : "rgba(248,113,113,0.35)"}`,
            borderRadius: "10px",
            padding: "13px 24px",
            fontFamily: "'Inter', sans-serif",
            fontSize: "13px",
            fontWeight: 600,
            color: alert.success ? G.gold : "#f87171",
            backdropFilter: "blur(12px)",
            whiteSpace: "nowrap",
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
   LOADING SCREEN
   ============================================= */
function LoadingScreen() {
  return (
    <div style={{
      background: G.black, minHeight: "100vh",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", gap: "20px",
    }}>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <div style={{
        width: "48px", height: "48px",
        border: `2px solid ${G.border}`,
        borderTop: `2px solid ${G.gold}`,
        borderRadius: "50%",
        animation: "spin 0.8s linear infinite",
      }} />
      <p style={{
        fontFamily: "'Inter', sans-serif", fontSize: "13px",
        color: G.w30, letterSpacing: "0.1em", textTransform: "uppercase",
      }}>
        Loading participations…
      </p>
    </div>
  );
}

/* =============================================
   EMPTY / INFO STATE
   ============================================= */
function EmptyState({ message, success }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={{
        maxWidth: "460px", margin: "0 auto", textAlign: "center",
        background: G.black2, border: `1px solid ${G.border}`,
        borderRadius: "20px", padding: "56px 40px", position: "relative", overflow: "hidden",
      }}
    >
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "2px",
        background: `linear-gradient(90deg, transparent, ${G.gold}, transparent)`,
      }} />
      <div style={{
        width: "72px", height: "72px", borderRadius: "50%",
        background: "rgba(201,168,76,0.1)", border: `1px solid ${G.bGold}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "2rem", margin: "0 auto 24px",
      }}>
        📋
      </div>
      <h3 style={{
        fontFamily: "'Playfair Display', Georgia, serif",
        fontSize: "1.5rem", fontWeight: 700,
        color: G.white, marginBottom: "10px", lineHeight: 1.2,
      }}>
        {success ? "All Caught Up" : <><em style={{ fontStyle: "italic", color: G.gold }}>Oops!</em></>}
      </h3>
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: G.w55, lineHeight: 1.75 }}>
        {message}
      </p>
    </motion.div>
  );
}

/* =============================================
   PARTICIPATION CARD
   ============================================= */
function ParticipationCard({ p, onCancel, BASE_URL }) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const company = p.companyId || {};
  const expo = p.expoId && typeof p.expoId === "object" ? p.expoId : { title: "Loading Details..." };
  const floor = p.floor || {};
  const st = getStatusStyle(p.status);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        whileHover={{ y: -8 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        style={{
          background: G.black2,
          border: `1px solid ${G.border}`,
          borderRadius: "20px",
          overflow: "hidden",
          position: "relative",
          transition: "border-color 0.3s, box-shadow 0.3s",
          fontFamily: "'Inter', sans-serif",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = st.border;
          e.currentTarget.style.boxShadow = `0 20px 40px rgba(0,0,0,0.4), 0 0 20px ${st.bg}`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = G.border;
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        {/* Status top bar */}
        <div style={{ height: "3px", background: st.color, opacity: 0.7 }} />

        <div style={{ padding: "28px" }}>

          {/* Header row: avatar + company + status */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px" }}>
            {/* Avatar */}
            <div style={{
              width: "68px", height: "68px", borderRadius: "50%",
              border: `2px solid ${st.border}`,
              background: G.black4, flexShrink: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
              overflow: "hidden", fontSize: "1.8rem",
            }}>
              {company.image
                ? <img src={`${BASE_URL}/uploads/${company.image}`} alt={company.companyName}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                : "🏢"
              }
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "1.05rem", fontWeight: 700, color: G.white,
                whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                marginBottom: "6px",
              }}>
                {company.companyName || "N/A"}
              </div>

              {/* Status badge */}
              <span style={{
                display: "inline-flex", alignItems: "center", gap: "5px",
                background: st.bg, border: `1px solid ${st.border}`,
                borderRadius: "4px", padding: "3px 10px",
                fontSize: "10px", fontWeight: 800,
                letterSpacing: "0.12em", textTransform: "uppercase",
                color: st.color,
              }}>
                <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: st.color }} />
                {p.status?.toUpperCase() || "UNKNOWN"}
              </span>
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: "1px", background: G.border, marginBottom: "20px" }} />

          {/* Expo info */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px" }}>

            {/* Expo title */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{
                width: "32px", height: "32px", borderRadius: "8px",
                background: "rgba(201,168,76,0.1)", border: `1px solid ${G.bGold}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "0.9rem", flexShrink: 0,
              }}>🎪</span>
              <div>
                <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: G.gold, marginBottom: "2px" }}>
                  Expo
                </div>
                <div style={{ fontSize: "14px", fontWeight: 600, color: G.white, lineHeight: 1.3 }}>
                  {expo.title}
                </div>
              </div>
            </div>

            {/* Venue */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{
                width: "32px", height: "32px", borderRadius: "8px",
                background: "rgba(255,255,255,0.04)", border: `1px solid ${G.border}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "0.9rem", flexShrink: 0,
              }}>📍</span>
              <div>
                <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: G.w30, marginBottom: "2px" }}>
                  Venue
                </div>
                <div style={{ fontSize: "13px", color: G.w55 }}>
                  {expo.venue?.venueName || "TBA"}
                </div>
              </div>
            </div>

            {/* Date & time */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{
                width: "32px", height: "32px", borderRadius: "8px",
                background: "rgba(255,255,255,0.04)", border: `1px solid ${G.border}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "0.9rem", flexShrink: 0,
              }}>🕐</span>
              <div>
                <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: G.w30, marginBottom: "2px" }}>
                  Date & Time
                </div>
                <div style={{ fontSize: "13px", color: G.w55 }}>
                  {formatDate(expo.date)} &nbsp;·&nbsp; {formatTime(expo.startTime)}
                </div>
              </div>
            </div>
          </div>

          {/* Booth allocation box */}
          <div style={{
            background: "rgba(201,168,76,0.05)",
            border: `1px dashed ${G.bGold}`,
            borderRadius: "12px",
            padding: "14px 16px",
            marginBottom: "20px",
          }}>
            <div style={{
              fontSize: "10px", fontWeight: 700, letterSpacing: "0.14em",
              textTransform: "uppercase", color: G.gold, marginBottom: "5px",
            }}>
              Booth Allocation
            </div>
            <div style={{ fontSize: "13px", fontWeight: 600, color: G.white }}>
              {floor.floor
                ? `Floor: ${floor.floor}  ·  Booth: ${floor.boothName}`
                : "Allocation in progress…"}
            </div>
          </div>

          {/* Cancel button */}
          <CancelButton onClick={() => setConfirmOpen(true)} />
        </div>
      </motion.div>

      {/* Confirm dialog */}
      <ConfirmDialog
        open={confirmOpen}
        onConfirm={() => { setConfirmOpen(false); onCancel(p._id); }}
        onCancel={() => setConfirmOpen(false)}
      />
    </>
  );
}

/* ---- Cancel Button ---- */
function CancelButton({ onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: "100%", padding: "13px",
        background: hov ? "rgba(248,113,113,0.08)" : "transparent",
        border: `1px solid ${hov ? "rgba(248,113,113,0.5)" : "rgba(248,113,113,0.25)"}`,
        borderRadius: "8px", cursor: "pointer",
        fontFamily: "'Inter', sans-serif",
        fontSize: "13px", fontWeight: 700,
        letterSpacing: "0.04em", color: "#f87171",
        display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
        transition: "all 0.2s",
      }}
    >
      ✕ &nbsp;Cancel Participation
    </motion.button>
  );
}

/* ---- Confirm Dialog ---- */
function ConfirmDialog({ open, onConfirm, onCancel }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onCancel}
            style={{
              position: "fixed", inset: 0, zIndex: 1000,
              background: "rgba(0,0,0,0.75)", backdropFilter: "blur(4px)",
            }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 20 }}
            transition={{ type: "spring", stiffness: 280, damping: 22 }}
            style={{
              position: "fixed", top: "50%", left: "50%",
              transform: "translate(-50%,-50%)", zIndex: 1001,
              background: G.black2, border: "1px solid rgba(248,113,113,0.25)",
              borderRadius: "18px", padding: "40px 36px", textAlign: "center",
              width: "100%", maxWidth: "360px",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg, transparent, #f87171, transparent)" }} />
            <div style={{ fontSize: "2.2rem", marginBottom: "16px" }}>⚠️</div>
            <h3 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "1.3rem", fontWeight: 700, color: G.white,
              marginBottom: "10px",
            }}>
              Cancel Participation?
            </h3>
            <p style={{ fontSize: "13px", color: G.w55, lineHeight: 1.75, marginBottom: "28px" }}>
              Are you sure you want to cancel this participation? This action cannot be undone.
            </p>
            <div style={{ display: "flex", gap: "10px" }}>
              <motion.button
                onClick={onConfirm}
                whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}
                style={{
                  flex: 1, padding: "12px", borderRadius: "8px",
                  background: "rgba(248,113,113,0.12)",
                  border: "1px solid rgba(248,113,113,0.4)",
                  color: "#f87171", fontFamily: "'Inter', sans-serif",
                  fontSize: "13px", fontWeight: 700, cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                Yes, Cancel
              </motion.button>
              <motion.button
                onClick={onCancel}
                whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}
                style={{
                  flex: 1, padding: "12px", borderRadius: "8px",
                  background: G.gold, border: "none",
                  color: "#000", fontFamily: "'Inter', sans-serif",
                  fontSize: "13px", fontWeight: 700, cursor: "pointer",
                }}
              >
                Keep It
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* =============================================
   MAIN COMPONENT
   ============================================= */
export default function YourParticipation() {
  /* ---- ORIGINAL LOGIC — UNCHANGED ---- */
  const [participations, setParticipations] = useState([]);
  const [loading,        setLoading]        = useState(true);
  const [alertData,      setAlertData]      = useState({ success: true, message: "" });

  const BASE_URL = "http://localhost:3001";

  useEffect(() => {
    const user   = JSON.parse(localStorage.getItem("user"));
    const userId = user?._id || user?.id;
    if (!userId) {
      setAlertData({ success: false, message: "Please log in to view your participations." });
      setLoading(false);
      return;
    }
    fetchParticipations(userId);
  }, []);

  const fetchParticipations = async (userId) => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/participation/by-exhibitor/${userId}`);
      if (res.data.success && res.data.records.length > 0) {
        setParticipations(res.data.records);
      } else {
        setAlertData({ success: false, message: "You have not registered for any expos." });
      }
    } catch (err) {
      console.error("Error fetching participations:", err);
      setAlertData({ success: false, message: "Failed to fetch participations." });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (participationId) => {
    try {
      const res = await axios.delete(`${BASE_URL}/participation/${participationId}`);
      if (res.data.success) {
        setParticipations((prev) => prev.filter((p) => p._id !== participationId));
        setAlertData({ success: true, message: "Participation cancelled successfully!" });
      }
    } catch (err) {
      console.error("Cancel failed:", err);
      setAlertData({ success: false, message: "Failed to cancel participation." });
    }
  };
  /* ---- END ORIGINAL LOGIC ---- */

  if (loading) return <LoadingScreen />;

  return (
    <div style={{ background: G.black, minHeight: "100vh", fontFamily: "'Inter', sans-serif" }}>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

      {/* Toast */}
      <Toast alert={alertData} onClose={() => setAlertData((p) => ({ ...p, message: "" }))} />

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
          width: "700px", height: "300px", borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(201,168,76,0.08), transparent 70%)",
          pointerEvents: "none",
        }} />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg, transparent, ${G.gold}, transparent)` }} />

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
            My Registrations
          </div>

          <h1 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
            fontWeight: 700, color: G.white, lineHeight: 1.1,
            marginBottom: "14px", letterSpacing: "-0.01em",
          }}>
            Your{" "}
            <em style={{ fontStyle: "italic", color: G.gold }}>Participations</em>
          </h1>

          <p style={{ fontSize: "15px", lineHeight: 1.75, color: G.w55 }}>
            Manage your expo registrations and bookings
          </p>
        </motion.div>
      </section>

      {/* ---- CONTENT ---- */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "72px 40px 80px" }}>

        {/* No data / not logged in */}
        {participations.length === 0 && alertData.message && (
          <EmptyState message={alertData.message} success={alertData.success} />
        )}

        {/* Cards grid */}
        {participations.length > 0 && (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
            gap: "24px",
          }}>
            {participations.map((p) => (
              <ParticipationCard
                key={p._id}
                p={p}
                onCancel={handleCancel}
                BASE_URL={BASE_URL}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
