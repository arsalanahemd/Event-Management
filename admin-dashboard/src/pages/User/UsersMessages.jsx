// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Typography,
//   CircularProgress,
//   Alert,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Button,
//   ButtonGroup,
// } from "@mui/material";
// import axios from "axios";

// // Theme Constants
// const NEON_CYAN = "#4CC9F0";
// const NEON_AMBER = "#FFD166";
// const LIGHT_CYAN = "#A2EDFF";

// function UsersMessages() {
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [successMsg, setSuccessMsg] = useState("");
//   const [filter, setFilter] = useState("all");

//   useEffect(() => {
//     fetchMessages();
//   }, []);

//   const fetchMessages = async () => {
//     setLoading(true);
//     setError("");
//     try {
//       const res = await axios.get("http://localhost:3001/contact");
//       const sortedMessages = res.data.contacts.sort(
//         (a, b) => new Date(b.sendAt) - new Date(a.sendAt)
//       );
//       setMessages(sortedMessages);
//     } catch (err) {
//       setError("Failed to fetch messages");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filteredMessages =
//     filter === "all" ? messages : messages.filter((msg) => msg.userId?.role === filter);

//   const toggleSeenStatus = async (id, currentStatus) => {
//     try {
//       const newStatus = currentStatus === "seen" ? "unseen" : "seen";
//       await axios.patch(`http://localhost:3001/contact/${id}/status`, {
//         status: newStatus,
//       });
//       setMessages((prev) =>
//         prev.map((msg) => (msg._id === id ? { ...msg, status: newStatus } : msg))
//       );
//       setSuccessMsg(`Message marked as ${newStatus}`);
//       setTimeout(() => setSuccessMsg(""), 2000);
//     } catch (err) {
//       setError("Failed to update status");
//     }
//   };

//   if (loading) {
//     return (
//       <Box
//         sx={{
//           minHeight: "80vh",
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//       >
//         <CircularProgress sx={{ color: NEON_CYAN }} />
//         <Typography mt={2} sx={{ color: "#94A3B8", fontFamily: "'Poppins', sans-serif" }}>
//           Loading Inbox...
//         </Typography>
//       </Box>
//     );
//   }

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         background: "radial-gradient(circle at top right, #1B263B, #0D1B2A)",
//         py: 6,
//         px: 2,
//       }}
//     >
//       <Box sx={{ width: "100%", maxWidth: 1200, mx: "auto" }}>
//         <Typography
//           variant="h3"
//           textAlign="center"
//           sx={{
//             fontWeight: 900,
//             fontFamily: "'Poppins', sans-serif",
//             textTransform: "uppercase",
//             letterSpacing: "3px",
//             mb: 4,
//             background: "linear-gradient(90deg, #4CC9F0, #4895EF, #FFD166)",
//             WebkitBackgroundClip: "text",
//             WebkitTextFillColor: "transparent",
//             filter: "drop-shadow(0px 4px 10px rgba(76, 201, 240, 0.2))",
//           }}
//         >
//           Users Messages
//         </Typography>

//         <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
//           <ButtonGroup
//             sx={{
//               borderRadius: "12px",
//               overflow: "hidden",
//               border: "1px solid rgba(76, 201, 240, 0.3)",
//               boxShadow: "0px 10px 30px rgba(0,0,0,0.4)",
//             }}
//           >
//             {["all", "attendee", "exhibitor"].map((role) => (
//               <Button
//                 key={role}
//                 onClick={() => setFilter(role)}
//                 sx={{
//                   px: 3,
//                   py: 1.2,
//                   fontWeight: "700",
//                   textTransform: "uppercase",
//                   color: filter === role ? NEON_CYAN : "#94A3B8",
//                   backgroundColor: filter === role ? "rgba(76, 201, 240, 0.15)" : "transparent",
//                   border: "none !important",
//                   "&:hover": { backgroundColor: "rgba(76, 201, 240, 0.1)", color: "#fff" },
//                 }}
//               >
//                 {role}
//               </Button>
//             ))}
//           </ButtonGroup>
//         </Box>

//         {error && (
//           <Alert severity="error" sx={{ mb: 2, borderRadius: "10px" }}>
//             {error}
//           </Alert>
//         )}
//         {successMsg && (
//           <Alert severity="success" sx={{ mb: 2, borderRadius: "10px" }}>
//             {successMsg}
//           </Alert>
//         )}

//         {filteredMessages.length === 0 ? (
//           <Box
//             sx={{
//               mt: 5,
//               textAlign: "center",
//               p: 8,
//               borderRadius: "20px",
//               background: "rgba(13, 27, 42, 0.5)",
//               border: "2px dashed rgba(255, 209, 102, 0.2)",
//               backdropFilter: "blur(5px)",
//             }}
//           >
//             <Typography variant="h5" sx={{ color: NEON_AMBER, fontWeight: "bold", opacity: 0.7 }}>
//               No Messages Found
//             </Typography>
//             <Typography sx={{ color: "rgba(148, 163, 184, 0.6)", mt: 1 }}>
//               Looks like there's nothing in the {filter} folder yet.
//             </Typography>
//           </Box>
//         ) : (
//           <TableContainer
//             component={Paper}
//             sx={{
//               borderRadius: "20px",
//               background: "rgba(13, 27, 42, 0.8)",
//               backdropFilter: "blur(10px)",
//               border: "1px solid rgba(255, 255, 255, 0.1)",
//               boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
//               overflow: "hidden",
//             }}
//           >
//             <Table sx={{ minWidth: 900 }}>
//               <TableHead>
//                 <TableRow sx={{ background: "linear-gradient(90deg, #1B263B, #0D1B2A)" }}>
//                   {["User Name", "Email", "Phone", "Subject", "Message", "Sent At", "Status"].map(
//                     (heading) => (
//                       <TableCell
//                         key={heading}
//                         align={heading === "Status" ? "center" : "left"}
//                         sx={{
//                           color: "#A2EDFF !important",
//                           fontWeight: "900",
//                           fontSize: "1.1rem",
//                           textTransform: "uppercase",
//                           letterSpacing: "1.5px",
//                           borderBottom: "3px solid rgba(76, 201, 240, 0.4)",
//                           padding: "24px",
//                           fontFamily: "'Poppins', sans-serif",
//                         }}
//                       >
//                         {heading}
//                       </TableCell>
//                     )
//                   )}
//                 </TableRow>
//               </TableHead>

//               <TableBody>
//                 {filteredMessages.map((msg) => (
//                   <TableRow
//                     key={msg._id}
//                     sx={{
//                       "&:hover": { backgroundColor: "rgba(76, 201, 240, 0.03)" },
//                       transition: "all 0.3s",
//                       "& td": { borderBottom: "1px solid rgba(255, 255, 255, 0.05)" },
//                     }}
//                   >
//                     <TableCell sx={{ color: "#F1F5F9", fontWeight: 600 }}>
//                       {msg.fullName || msg.userId?.name || "—"}
//                     </TableCell>
//                     <TableCell sx={{ color: "#94A3B8" }}>
//                       {msg.email || msg.userId?.email || "—"}
//                     </TableCell>
//                     <TableCell sx={{ color: "#94A3B8" }}>{msg.phone}</TableCell>
//                     <TableCell sx={{ color: "#F1F5F9" }}>{msg.subject}</TableCell>
//                     <TableCell
//                       sx={{
//                         color: "#94A3B8",
//                         maxWidth: 200,
//                         whiteSpace: "nowrap",
//                         overflow: "hidden",
//                         textOverflow: "ellipsis",
//                       }}
//                     >
//                       {msg.message}
//                     </TableCell>
//                     <TableCell sx={{ color: "#94A3B8", fontSize: "0.8rem" }}>
//                       {new Date(msg.sendAt).toLocaleString()}
//                     </TableCell>
//                     <TableCell align="center">
//                       <Button
//                         variant="outlined"
//                         size="small"
//                         onClick={() => toggleSeenStatus(msg._id, msg.status)}
//                         sx={{
//                           borderRadius: "8px",
//                           fontWeight: "bold",
//                           textTransform: "none",
//                           px: 2,
//                           borderColor:
//                             msg.status === "seen" ? NEON_CYAN : "rgba(255, 209, 102, 0.4)",
//                           color: msg.status === "seen" ? NEON_CYAN : NEON_AMBER,
//                           backgroundColor: "transparent",
//                           "&:hover": {
//                             backgroundColor:
//                               msg.status === "seen"
//                                 ? "rgba(76, 201, 240, 0.1)"
//                                 : "rgba(255, 209, 102, 0.1)",
//                             borderColor: msg.status === "seen" ? NEON_CYAN : NEON_AMBER,
//                             transform: "scale(1.05)",
//                           },
//                           transition: "all 0.2s",
//                         }}
//                       >
//                         {msg.status === "seen" ? "Seen" : "Unseen"}
//                       </Button>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         )}
//       </Box>
//     </Box>
//   );
// }

// export default UsersMessages;
import React, { useEffect, useState } from "react";
import axios from "axios";

// ─── THEME CONSTANTS ───────────────────────────────────────────────
const GOLD = "#C9A84C";
const GOLD_LIGHT = "#E8D5A3";
const GOLD_DARK = "#9A7B2E";
const BLACK = "#0A0A0A";
const BLACK_CARD = "#111111";
const GRAY_TEXT = "#B0B0B0";
const G = {
  black: "#000000",
  black2: "#0a0a0a",
  gold: "#C9A84C",
  white: "#FFFFFF",
  w80: "rgba(255,255,255,0.80)",
  w55: "rgba(255,255,255,0.55)",
  w30: "rgba(255,255,255,0.30)",
  border: "rgba(255,255,255,0.08)",
  bGold: "rgba(201,168,76,0.30)",
};

// ─── SVG ICONS ───────────────────────────────────────────────────
const MailIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const InboxIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
    <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
  </svg>
);

const EyeIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#FF6B6B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

const CloseIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const CheckIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const AlertCircleIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#FF6B6B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

// ─── PREMIUM TOAST ────────────────────────────────────────────────
function PremiumToast({ message, type, onClose }) {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const showTimer = setTimeout(() => setVisible(true), 50);
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 0) {
          clearInterval(progressInterval);
          return 0;
        }
        return prev - 2;
      });
    }, 40);

    const closeTimer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 400);
    }, 2200);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(closeTimer);
      clearInterval(progressInterval);
    };
  }, [onClose]);

  const isSuccess = type === "success";

  return (
    <div
      style={{
        position: "fixed",
        top: 24,
        right: 24,
        zIndex: 9999,
        transform: visible ? "translateX(0)" : "translateX(120%)",
        opacity: visible ? 1 : 0,
        transition: "all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
      }}
    >
      <div
        style={{
          background: BLACK_CARD,
          border: `1px solid ${isSuccess ? GOLD : "#FF6B6B"}`,
          borderRadius: "16px",
          padding: "16px 20px",
          minWidth: "320px",
          boxShadow: `0 8px 32px rgba(0,0,0,0.6), 0 0 20px ${isSuccess ? "rgba(201,168,76,0.15)" : "rgba(255,107,107,0.15)"}`,
          display: "flex",
          alignItems: "center",
          gap: "14px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "1px",
            background: isSuccess
              ? `linear-gradient(90deg, transparent, ${GOLD}, transparent)`
              : `linear-gradient(90deg, transparent, #FF6B6B, transparent)`,
            opacity: 0.6,
          }}
        />
        <div
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            background: isSuccess ? "rgba(201,168,76,0.1)" : "rgba(255,107,107,0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {isSuccess ? <CheckIcon size={18} /> : <AlertCircleIcon size={18} />}
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ margin: 0, color: "#fff", fontSize: "0.95rem", fontWeight: 600, fontFamily: "'Poppins', sans-serif" }}>
            {isSuccess ? "Success!" : "Error!"}
          </p>
          <p style={{ margin: "4px 0 0 0", color: GRAY_TEXT, fontSize: "0.82rem", fontFamily: "'Poppins', sans-serif" }}>
            {message}
          </p>
        </div>
        <button
          onClick={() => { setVisible(false); setTimeout(onClose, 400); }}
          style={{ background: "none", border: "none", cursor: "pointer", padding: "4px", borderRadius: "6px" }}
        >
          <CloseIcon size={16} />
        </button>
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            height: "2px",
            width: `${progress}%`,
            background: isSuccess ? GOLD : "#FF6B6B",
            transition: "width 0.04s linear",
            borderRadius: "0 0 0 16px",
          }}
        />
      </div>
    </div>
  );
}

// ─── GLASS CARD ───────────────────────────────────────────────────
function GlassCard({ children, style = {} }) {
  return (
    <div
      style={{
        background: "rgba(17,17,17,0.85)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderRadius: "24px",
        border: "1px solid rgba(201,168,76,0.12)",
        boxShadow: "0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.03)",
        position: "relative",
        overflow: "hidden",
        ...style,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "10%",
          right: "10%",
          height: "1px",
          background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
          opacity: 0.4,
        }}
      />
      {children}
    </div>
  );
}

// ─── PREMIUM SPINNER ──────────────────────────────────────────────
function PremiumSpinner({ size = 24 }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        border: `2px solid rgba(201,168,76,0.15)`,
        borderTop: `2px solid ${GOLD}`,
        borderRadius: "50%",
        animation: "spin 0.8s linear infinite",
      }}
    />
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────
function UsersMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [filter, setFilter] = useState("all");
  const [statusLoading, setStatusLoading] = useState(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get("http://localhost:3001/contact");
      const sortedMessages = res.data.contacts.sort(
        (a, b) => new Date(b.sendAt) - new Date(a.sendAt)
      );
      setMessages(sortedMessages);
    } catch (err) {
      setError("Failed to fetch messages");
    } finally {
      setLoading(false);
    }
  };

  const filteredMessages =
    filter === "all" ? messages : messages.filter((msg) => msg.userId?.role === filter);

  const toggleSeenStatus = async (id, currentStatus) => {
    setStatusLoading(id);
    try {
      const newStatus = currentStatus === "seen" ? "unseen" : "seen";
      await axios.patch(`http://localhost:3001/contact/${id}/status`, {
        status: newStatus,
      });
      setMessages((prev) =>
        prev.map((msg) => (msg._id === id ? { ...msg, status: newStatus } : msg))
      );
      setSuccessMsg(`Message marked as ${newStatus}`);
    } catch (err) {
      setError("Failed to update status");
    } finally {
      setStatusLoading(null);
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return (
      date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) +
      " " +
      date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
    );
  };

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: BLACK,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "24px",
        }}
      >
        <div
          style={{
            width: "56px",
            height: "56px",
            border: `2px solid rgba(201,168,76,0.12)`,
            borderTop: `2px solid ${GOLD}`,
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
          }}
        />
        <p
          style={{
            color: GOLD,
            fontSize: "0.9rem",
            fontWeight: 600,
            letterSpacing: "3px",
            textTransform: "uppercase",
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          Loading Inbox
        </p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: BLACK,
        padding: "48px 24px",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=Poppins:wght@300;400;500;600;700;800;900&display=swap');
      `}</style>

      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "14px", marginBottom: "16px" }}>
            <MailIcon size={28} />
            <span
              style={{
                color: GOLD,
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "4px",
                textTransform: "uppercase",
              }}
            >
              Communication Hub
            </span>
          </div>
          {/* <h1
            style={{
              margin: 0,
              color: "#fff",
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: 700,
              fontFamily: "'Playfair Display', serif",
              fontStyle: "italic",
              letterSpacing: "1px",
              textShadow: `0 0 40px rgba(201,168,76,0.15)`,
            }}
          >
            Users Messages
          </h1> */}
            <h1 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 700,
            color: G.white, lineHeight: 1.1, marginBottom: "12px",
            letterSpacing: "-0.01em",
          }}>
            User <span style={{ color: G.gold, fontStyle: "italic" }}>Messages</span>
          </h1>

          <div
            style={{
              width: "80px",
              height: "2px",
              background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
              margin: "20px auto 0",
            }}
          />
        </div>

        {/* Toasts */}
        {error && <PremiumToast message={error} type="error" onClose={() => setError("")} />}
        {successMsg && <PremiumToast message={successMsg} type="success" onClose={() => setSuccessMsg("")} />}

        {/* Filter Tabs */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "32px", gap: "8px" }}>
          {[
            { key: "all", label: "All Messages", count: messages.length },
            { key: "attendee", label: "Attendees", count: messages.filter((m) => m.userId?.role === "attendee").length },
            { key: "exhibitor", label: "Exhibitors", count: messages.filter((m) => m.userId?.role === "exhibitor").length },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              style={{
                padding: "10px 24px",
                borderRadius: "10px",
                border: `1px solid ${filter === tab.key ? GOLD : "rgba(255,255,255,0.08)"}`,
                background: filter === tab.key ? "rgba(201,168,76,0.1)" : "transparent",
                color: filter === tab.key ? GOLD : GRAY_TEXT,
                fontSize: "0.8rem",
                fontWeight: 700,
                fontFamily: "'Poppins', sans-serif",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "all 0.3s ease",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              {tab.label}
              <span
                style={{
                  background: filter === tab.key ? GOLD : "rgba(255,255,255,0.1)",
                  color: filter === tab.key ? BLACK : GRAY_TEXT,
                  padding: "2px 8px",
                  borderRadius: "6px",
                  fontSize: "0.7rem",
                  fontWeight: 800,
                }}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Content */}
        {filteredMessages.length === 0 ? (
          <GlassCard>
            <div style={{ padding: "80px 20px", textAlign: "center" }}>
              <InboxIcon size={48} />
              <p
                style={{
                  color: GOLD,
                  fontSize: "1.2rem",
                  fontWeight: 700,
                  margin: "20px 0 8px",
                  fontFamily: "'Playfair Display', serif",
                  fontStyle: "italic",
                }}
              >
                No Messages Found
              </p>
              <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.9rem" }}>
                Looks like there's nothing in the {filter} folder yet.
              </p>
            </div>
          </GlassCard>
        ) : (
          <GlassCard>
            {/* Table Header */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "160px 200px 130px 140px 1fr 160px 120px",
                padding: "18px 28px",
                borderBottom: "1px solid rgba(201,168,76,0.1)",
                background: "linear-gradient(90deg, rgba(201,168,76,0.03), transparent)",
              }}
            >
              {["User Name", "Email", "Phone", "Subject", "Message", "Sent At", "Status"].map(
                (heading, i) => (
                  <div
                    key={heading}
                    style={{
                      color: GOLD,
                      fontSize: "0.7rem",
                      fontWeight: 800,
                      letterSpacing: "2px",
                      textTransform: "uppercase",
                      textAlign: i === 6 ? "center" : "left",
                      fontFamily: "'Poppins', sans-serif",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      paddingRight: "12px",
                    }}
                  >
                    {heading}
                  </div>
                )
              )}
            </div>

            {/* Table Body */}
            {filteredMessages.map((msg, index) => (
              <div
                key={msg._id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "160px 200px 130px 140px 1fr 160px 120px",
                  alignItems: "center",
                  padding: "16px 28px",
                  borderBottom:
                    index < filteredMessages.length - 1
                      ? "1px solid rgba(255,255,255,0.03)"
                      : "none",
                  transition: "all 0.3s ease",
                  background: msg.status === "unseen" ? "rgba(201,168,76,0.02)" : "transparent",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(201,168,76,0.04)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = msg.status === "unseen" ? "rgba(201,168,76,0.02)" : "transparent";
                }}
              >
                {/* User Name */}
                <div
                  style={{
                    color: "#fff",
                    fontSize: "0.88rem",
                    fontWeight: 600,
                    fontFamily: "'Poppins', sans-serif",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    paddingRight: "12px",
                  }}
                >
                  {msg.fullName || msg.userId?.name || "—"}
                </div>

                {/* Email */}
                <div
                  style={{
                    color: GRAY_TEXT,
                    fontSize: "0.82rem",
                    fontFamily: "'Poppins', sans-serif",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    paddingRight: "12px",
                  }}
                >
                  {msg.email || msg.userId?.email || "—"}
                </div>

                {/* Phone */}
                <div
                  style={{
                    color: GRAY_TEXT,
                    fontSize: "0.82rem",
                    fontFamily: "'Poppins', sans-serif",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    paddingRight: "12px",
                  }}
                >
                  {msg.phone || "—"}
                </div>

                {/* Subject */}
                <div
                  style={{
                    color: "#fff",
                    fontSize: "0.85rem",
                    fontWeight: 500,
                    fontFamily: "'Poppins', sans-serif",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    paddingRight: "12px",
                  }}
                >
                  {msg.subject}
                </div>

                {/* Message */}
                <div
                  style={{
                    color: GRAY_TEXT,
                    fontSize: "0.82rem",
                    fontFamily: "'Poppins', sans-serif",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    paddingRight: "12px",
                  }}
                  title={msg.message}
                >
                  {msg.message}
                </div>

                {/* Sent At */}
                <div
                  style={{
                    color: "rgba(255,255,255,0.4)",
                    fontSize: "0.78rem",
                    fontFamily: "'Poppins', sans-serif",
                    whiteSpace: "nowrap",
                    paddingRight: "12px",
                  }}
                >
                  {formatDate(msg.sendAt)}
                </div>

                {/* Status Toggle */}
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <button
                    onClick={() => toggleSeenStatus(msg._id, msg.status)}
                    disabled={statusLoading === msg._id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "7px 14px",
                      borderRadius: "10px",
                      border: `1px solid ${msg.status === "seen" ? "rgba(201,168,76,0.3)" : "rgba(255,107,107,0.3)"}`,
                      background: msg.status === "seen" ? "rgba(201,168,76,0.08)" : "rgba(255,107,107,0.08)",
                      color: msg.status === "seen" ? GOLD : "#FF6B6B",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      fontFamily: "'Poppins', sans-serif",
                      letterSpacing: "1px",
                      textTransform: "uppercase",
                      cursor: statusLoading === msg._id ? "wait" : "pointer",
                      transition: "all 0.25s ease",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {statusLoading === msg._id ? (
                      <PremiumSpinner size={14} />
                    ) : msg.status === "seen" ? (
                      <>
                        <EyeIcon size={14} /> Seen
                      </>
                    ) : (
                      <>
                        <EyeOffIcon size={14} /> Unseen
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </GlassCard>
        )}
      </div>
    </div>
  );
}

export default UsersMessages;
