// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import axios from "axios";
// import {
//   Box,
//   Typography,
//   CircularProgress,
//   Alert,
//   Card,
//   CardContent,
//   Grid,
//   IconButton,
//   Container,
// } from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";

// function ShowMessages() {
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const userId = queryParams.get("userId");

//   useEffect(() => {
//     fetchMessages();
//   }, [userId]);

//   const fetchMessages = async () => {
//     setLoading(true);
//     setError("");
//     try {
//       const res = await axios.get(
//         `http://localhost:3001/contact/user?userId=${userId}`
//       );
//       setMessages(res.data.contacts || []);
//     } catch (err) {
//       console.error(err);
//       setError("Failed to fetch messages");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this message?"))
//       return;
//     try {
//       await axios.delete(`http://localhost:3001/contact/${id}`);
//       setMessages(messages.filter((msg) => msg._id !== id));
//     } catch (err) {
//       console.error(err);
//       alert("Failed to delete message");
//     }
//   };

//   if (loading)
//     return (
//       <Box
//         sx={{
//           minHeight: "100vh",
//           background: "linear-gradient(180deg, #0D1B2A 0%, #1B263B 100%)",
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "center",
//           alignItems: "center",
//         }}
//       >
//         <CircularProgress sx={{ color: "#4CC9F0" }} />
//         <Typography mt={2} color="white" variant="h6">
//           Loading your messages...
//         </Typography>
//       </Box>
//     );

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         background: "linear-gradient(180deg, #0D1B2A 0%, #1B263B 100%)",
//         pb: 10,
//       }}
//     >
//       {/* Hero Header Section */}
//       <Box
//         sx={{
//           background: "linear-gradient(90deg, #0D1B2A, #1B263B)",
//           py: { xs: 10, md: 15 },
//           textAlign: "center",
//           color: "white",
//           mb: 8,
//           position: "relative",
//           overflow: "hidden",
//           borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
//           boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
//         }}
//       >
//         <Container maxWidth="md">
//           <Typography
//             variant="h2"
//             fontWeight={900}
//             sx={{
//               fontSize: { xs: "2.8rem", md: "4.5rem" },
//               mb: 2,
//               fontFamily: "'Poppins', sans-serif",
//               background: "linear-gradient(90deg, #4CC9F0, #4895EF, #F72585)",
//               WebkitBackgroundClip: "text",
//               WebkitTextFillColor: "transparent",
//               textTransform: "uppercase",
//               letterSpacing: "2px",
//             }}
//           >
//             Message Inbox
//           </Typography>
//           <Typography
//             variant="h6"
//             sx={{
//               fontWeight: 400,
//               opacity: 0.8,
//               maxWidth: "700px",
//               mx: "auto",
//               lineHeight: 1.6,
//               color: "#E0E1DD",
//             }}
//           >
//             Manage all your incoming communications and stay connected with your
//             users through our streamlined dashboard.
//           </Typography>
//         </Container>
//       </Box>

//       <Container maxWidth="lg">
//         {messages.length === 0 ? (
//           <Box textAlign="center" sx={{ mt: 10 }}>
//             <Typography
//               sx={{
//                 color: "rgba(255,255,255,0.4)",
//                 variant: "h5",
//                 fontWeight: 300,
//               }}
//             >
//               No messages found for this account.
//             </Typography>
//           </Box>
//         ) : (
//           <Grid container spacing={4}>
//             {messages.map((msg) => (
//               <Grid item xs={12} key={msg._id}>
//                 <Card
//                   sx={{
//                     borderRadius: 5,
//                     background: "rgba(255, 255, 255, 0.03)",
//                     backdropFilter: "blur(12px)",
//                     border: "1px solid rgba(255, 255, 255, 0.1)",
//                     color: "white",
//                     p: { xs: 1, md: 3 },
//                     transition:
//                       "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
//                     "&:hover": {
//                       transform: "translateY(-5px)",
//                       background: "rgba(255, 255, 255, 0.07)",
//                       boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
//                       borderColor: "rgba(76, 201, 240, 0.5)",
//                     },
//                   }}
//                 >
//                   <CardContent>
//                     <Box
//                       sx={{
//                         display: "flex",
//                         justifyContent: "space-between",
//                         alignItems: "flex-start",
//                         mb: 3,
//                       }}
//                     >
//                       <Box>
//                         <Typography
//                           variant="h4"
//                           fontWeight={800}
//                           sx={{ color: "#4CC9F0", mb: 0.5 }}
//                         >
//                           {msg.fullName}
//                         </Typography>
//                         <Typography
//                           variant="h6"
//                           sx={{
//                             color: "#4895EF",
//                             fontWeight: 600,
//                             letterSpacing: 0.5,
//                           }}
//                         >
//                           Subject: {msg.subject}
//                         </Typography>
//                       </Box>

//                       <IconButton
//                         onClick={() => handleDelete(msg._id)}
//                         sx={{
//                           bgcolor: "rgba(255, 69, 58, 0.1)",
//                           color: "#FF453A",
//                           border: "1px solid rgba(255, 69, 58, 0.2)",
//                           p: 1.5,
//                           "&:hover": {
//                             bgcolor: "rgba(255, 69, 58, 0.3)",
//                             color: "#FF6961",
//                             boxShadow: "0 0 20px rgba(255, 69, 58, 0.3)",
//                           },
//                         }}
//                       >
//                         <DeleteIcon fontSize="medium" />
//                       </IconButton>
//                     </Box>

//                     <Typography
//                       variant="h6"
//                       sx={{
//                         lineHeight: 1.8,
//                         color: "rgba(255,255,255,0.9)",
//                         mb: 4,
//                         fontWeight: 400,
//                         backgroundColor: "rgba(0,0,0,0.3)",
//                         p: 4,
//                         borderRadius: 4,
//                         borderLeft: "4px solid #F72585",
//                         fontStyle: "italic",
//                       }}
//                     >
//                       "{msg.message}"
//                     </Typography>

//                     <Grid container spacing={2} sx={{ opacity: 0.8 }}>
//                       <Grid item xs={12} sm={4}>
//                         <Typography
//                           variant="subtitle1"
//                           fontWeight={600}
//                           sx={{ color: "#4CC9F0" }}
//                         >
//                           📞 {msg.phone}
//                         </Typography>
//                       </Grid>
//                       <Grid item xs={12} sm={4}>
//                         <Typography variant="subtitle1" fontWeight={600}>
//                           📅 {new Date(msg.sendAt).toLocaleDateString()}
//                         </Typography>
//                       </Grid>
//                       <Grid
//                         item
//                         xs={12}
//                         sm={4}
//                         sx={{ textAlign: { sm: "right" } }}
//                       >
//                         <Typography
//                           variant="button"
//                           sx={{
//                             color: "#4CC9F0",
//                             bgcolor: "rgba(76, 201, 240, 0.1)",
//                             border: "1px solid rgba(76, 201, 240, 0.4)",
//                             px: 3,
//                             py: 0.8,
//                             borderRadius: "50px",
//                             fontSize: "0.75rem",
//                             fontWeight: 800,
//                             letterSpacing: "1px",
//                           }}
//                         >
//                           STATUS: {msg.status}
//                         </Typography>
//                       </Grid>
//                     </Grid>
//                   </CardContent>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         )}
//       </Container>
//     </Box>
//   );
// }

// export default ShowMessages;
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
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
        Loading your messages…
      </p>
    </div>
  );
}

/* =============================================
   CONFIRM DIALOG  (replaces window.confirm)
   ============================================= */
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
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0, height: "2px",
              background: "linear-gradient(90deg, transparent, #f87171, transparent)",
            }} />
            <div style={{ fontSize: "2.2rem", marginBottom: "16px" }}>🗑️</div>
            <h3 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "1.3rem", fontWeight: 700, color: G.white, marginBottom: "10px",
            }}>
              Delete Message?
            </h3>
            <p style={{ fontSize: "13px", color: G.w55, lineHeight: 1.75, marginBottom: "28px" }}>
              Are you sure you want to delete this message? This action cannot be undone.
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
                }}
              >
                Yes, Delete
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
   TOAST
   ============================================= */
function Toast({ msg, onClose }) {
  useEffect(() => {
    if (!msg.text) return;
    const t = setTimeout(onClose, 4000);
    return () => clearTimeout(t);
  }, [msg.text]);

  return (
    <AnimatePresence>
      {msg.text && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          style={{
            position: "fixed", top: "90px", left: "50%",
            transform: "translateX(-50%)", zIndex: 9999,
            background: msg.success ? "rgba(201,168,76,0.12)" : "rgba(248,113,113,0.12)",
            border: `1px solid ${msg.success ? G.bGold : "rgba(248,113,113,0.35)"}`,
            borderRadius: "10px", padding: "13px 24px",
            fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 600,
            color: msg.success ? G.gold : "#f87171",
            backdropFilter: "blur(12px)", whiteSpace: "nowrap",
            boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
          }}
        >
          {msg.success ? "✓  " : "✕  "}{msg.text}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* =============================================
   EMPTY STATE
   ============================================= */
function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={{
        maxWidth: "440px", margin: "80px auto 0", textAlign: "center",
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
        📭
      </div>
      <h3 style={{
        fontFamily: "'Playfair Display', Georgia, serif",
        fontSize: "1.5rem", fontWeight: 700, color: G.white, marginBottom: "10px",
      }}>
        No <em style={{ fontStyle: "italic", color: G.gold }}>Messages</em> Yet
      </h3>
      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: G.w55, lineHeight: 1.75 }}>
        No messages found for this account.
      </p>
    </motion.div>
  );
}

/* =============================================
   MESSAGE CARD
   ============================================= */
function MessageCard({ msg, onDelete }) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

  const statusColor = msg.status?.toLowerCase() === "read"
    ? "#4ade80"
    : msg.status?.toLowerCase() === "pending"
    ? G.gold
    : G.w55;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: hovered ? "rgba(255,255,255,0.04)" : G.black2,
          border: `1px solid ${hovered ? G.bGold : G.border}`,
          borderRadius: "18px",
          overflow: "hidden",
          position: "relative",
          transition: "all 0.3s ease",
          boxShadow: hovered ? "0 20px 40px rgba(0,0,0,0.4)" : "none",
          transform: hovered ? "translateY(-4px)" : "translateY(0)",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {/* Gold top accent line */}
        <div style={{
          height: "2px",
          background: hovered
            ? `linear-gradient(90deg, ${G.gold}, transparent)`
            : `linear-gradient(90deg, transparent, transparent)`,
          transition: "all 0.3s",
        }} />

        <div style={{ padding: "28px 32px" }}>

          {/* Top row: name + subject + delete btn */}
          <div style={{
            display: "flex", justifyContent: "space-between",
            alignItems: "flex-start", gap: "16px", marginBottom: "24px",
          }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              {/* Name */}
              <h3 style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "1.35rem", fontWeight: 700, color: G.white,
                marginBottom: "6px", lineHeight: 1.2,
              }}>
                {msg.fullName}
              </h3>

              {/* Subject badge */}
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "6px",
                background: "rgba(201,168,76,0.08)", border: `1px solid ${G.bGold}`,
                borderRadius: "4px", padding: "4px 12px",
                fontSize: "11px", fontWeight: 700,
                letterSpacing: "0.1em", color: G.gold,
              }}>
                <span style={{ width: "14px", height: "1px", background: G.gold }} />
                {msg.subject}
              </div>
            </div>

            {/* Delete button */}
            <motion.button
              onClick={() => setConfirmOpen(true)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.93 }}
              style={{
                width: "42px", height: "42px", borderRadius: "10px",
                background: "rgba(248,113,113,0.08)",
                border: "1px solid rgba(248,113,113,0.25)",
                cursor: "pointer", display: "flex",
                alignItems: "center", justifyContent: "center",
                fontSize: "1rem", flexShrink: 0,
                transition: "background 0.2s, border-color 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(248,113,113,0.18)";
                e.currentTarget.style.borderColor = "rgba(248,113,113,0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(248,113,113,0.08)";
                e.currentTarget.style.borderColor = "rgba(248,113,113,0.25)";
              }}
            >
              🗑️
            </motion.button>
          </div>

          {/* Message body */}
          <div style={{
            background: "rgba(255,255,255,0.02)",
            border: `1px solid ${G.border}`,
            borderLeft: `3px solid ${G.gold}`,
            borderRadius: "10px",
            padding: "20px 22px",
            marginBottom: "24px",
          }}>
            <p style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "15px", fontStyle: "italic",
              color: G.w80, lineHeight: 1.8, margin: 0,
            }}>
              "{msg.message}"
            </p>
          </div>

          {/* Meta row */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "12px",
            paddingTop: "18px",
            borderTop: `1px solid ${G.border}`,
          }}>
            {/* Phone */}
            <div>
              <div style={{
                fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em",
                textTransform: "uppercase", color: G.w30, marginBottom: "4px",
              }}>
                Phone
              </div>
              <div style={{ fontSize: "13px", fontWeight: 600, color: G.w80 }}>
                📞 {msg.phone || "—"}
              </div>
            </div>

            {/* Date */}
            <div>
              <div style={{
                fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em",
                textTransform: "uppercase", color: G.w30, marginBottom: "4px",
              }}>
                Sent On
              </div>
              <div style={{ fontSize: "13px", fontWeight: 600, color: G.w80 }}>
                📅 {new Date(msg.sendAt).toLocaleDateString()}
              </div>
            </div>

            {/* Status */}
            <div style={{ textAlign: "right" }}>
              <div style={{
                fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em",
                textTransform: "uppercase", color: G.w30, marginBottom: "4px",
              }}>
                Status
              </div>
              <span style={{
                display: "inline-flex", alignItems: "center", gap: "5px",
                background: `${statusColor}12`,
                border: `1px solid ${statusColor}40`,
                borderRadius: "4px", padding: "3px 10px",
                fontSize: "10px", fontWeight: 800,
                letterSpacing: "0.12em", textTransform: "uppercase",
                color: statusColor,
              }}>
                <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: statusColor }} />
                {msg.status || "N/A"}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      <ConfirmDialog
        open={confirmOpen}
        onConfirm={() => { setConfirmOpen(false); onDelete(msg._id); }}
        onCancel={() => setConfirmOpen(false)}
      />
    </>
  );
}

/* =============================================
   MAIN COMPONENT
   ============================================= */
export default function ShowMessages() {
  /* ---- ORIGINAL LOGIC — UNCHANGED ---- */
  const [messages, setMessages] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState("");
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get("userId");

  const [toast, setToast] = useState({ text: "", success: true });

  useEffect(() => {
    fetchMessages();
  }, [userId]);

  const fetchMessages = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(
        `http://localhost:3001/contact/user?userId=${userId}`
      );
      setMessages(res.data.contacts || []);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch messages");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/contact/${id}`);
      setMessages(messages.filter((msg) => msg._id !== id));
      setToast({ text: "Message deleted successfully.", success: true });
    } catch (err) {
      console.error(err);
      setToast({ text: "Failed to delete message.", success: false });
    }
  };
  /* ---- END ORIGINAL LOGIC ---- */

  if (loading) return <LoadingScreen />;

  return (
    <div style={{ background: G.black, minHeight: "100vh", fontFamily: "'Inter', sans-serif" }}>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

      {/* Toast */}
      <Toast msg={toast} onClose={() => setToast((p) => ({ ...p, text: "" }))} />

      {/* ---- HERO ---- */}
      <section style={{
        position: "relative", background: G.black2,
        padding: "100px 0 72px", textAlign: "center",
        borderBottom: `1px solid ${G.border}`, overflow: "hidden",
      }}>
        {/* Background glow */}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%,-50%)",
          width: "700px", height: "300px", borderRadius: "50%",
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
            Inbox
          </div>

          {/* Title */}
          <h1 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(2.2rem, 5vw, 4rem)",
            fontWeight: 700, color: G.white, lineHeight: 1.08,
            marginBottom: "14px", letterSpacing: "-0.01em",
          }}>
            Message{" "}
            <em style={{ fontStyle: "italic", color: G.gold }}>Inbox</em>
          </h1>

          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "15px", lineHeight: 1.75, color: G.w55,
            maxWidth: "520px", margin: "0 auto",
          }}>
            Manage all your incoming communications and stay connected through
            our streamlined dashboard.
          </p>

          {/* Message count pill */}
          {messages.length > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                background: "rgba(201,168,76,0.08)", border: `1px solid ${G.bGold}`,
                borderRadius: "50px", padding: "7px 18px",
                fontSize: "12px", fontWeight: 700, color: G.gold,
                fontFamily: "'Inter', sans-serif", marginTop: "20px",
              }}
            >
              📬 &nbsp;{messages.length} message{messages.length !== 1 ? "s" : ""} found
            </motion.div>
          )}
        </motion.div>
      </section>

      {/* ---- CONTENT ---- */}
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "64px 40px 80px" }}>

        {/* Error state */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              background: "rgba(248,113,113,0.08)",
              border: "1px solid rgba(248,113,113,0.3)",
              borderRadius: "10px", padding: "16px 20px",
              fontFamily: "'Inter', sans-serif", fontSize: "14px",
              color: "#f87171", marginBottom: "32px",
            }}
          >
            ✕ &nbsp;{error}
          </motion.div>
        )}

        {/* Empty */}
        {messages.length === 0 && !error && <EmptyState />}

        {/* Messages list */}
        {messages.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {messages.map((msg) => (
              <MessageCard key={msg._id} msg={msg} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}