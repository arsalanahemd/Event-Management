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
//   MenuItem,
//   Select,
//   Button,
//   ButtonGroup,
// } from "@mui/material";
// import axios from "axios";

// // ✅ Theme Constants
// const NEON_CYAN = "#4CC9F0";

// function ShowRegistrations() {
//   const [registrations, setRegistrations] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [successMsg, setSuccessMsg] = useState("");
//   const [filter, setFilter] = useState("all");

//   useEffect(() => {
//     fetchRegistrations();
//   }, []);

//   const fetchRegistrations = async () => {
//     setLoading(true);
//     setError("");
//     try {
//       const res = await axios.get("http://localhost:3001/register");
//       if (res.data.success) {
//         setRegistrations(res.data.registrations);
//       } else {
//         setError("Failed to fetch registrations");
//       }
//     } catch (err) {
//       setError("Failed to fetch registrations");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleStatusChange = async (regId, status) => {
//     try {
//       await axios.put(`http://localhost:3001/register/${regId}`, { status });
//       setSuccessMsg(`Status updated to ${status}`);
//       setRegistrations((prev) => prev.map((reg) => (reg._id === regId ? { ...reg, status } : reg)));
//       setTimeout(() => setSuccessMsg(""), 2000);
//     } catch (err) {
//       setError("Failed to update status");
//       setTimeout(() => setError(""), 2000);
//     }
//   };

//   const filteredRegistrations =
//     filter === "all" ? registrations : registrations.filter((reg) => reg.status === filter);

//   const getStatusStyle = (status) => {
//     const colors = {
//       pending: { bg: "rgba(255, 183, 3, 0.1)", text: "#FFB703", border: "rgba(255, 183, 3, 0.4)" },
//       approved: { bg: "rgba(0, 245, 160, 0.1)", text: "#00F5A0", border: "rgba(0, 245, 160, 0.4)" },
//       rejected: {
//         bg: "rgba(255, 77, 77, 0.15)",
//         text: "#FF4D4D",
//         border: "rgba(255, 77, 77, 0.4)",
//       },
//     };
//     return colors[status] || colors.pending;
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
//         <Typography mt={2} sx={{ color: "#94A3B8" }}>
//           Fetching Registrations...
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
//       <Box sx={{ width: "100%", maxWidth: 1100, mx: "auto" }}>
//         {/* Dashboar Heading */}
//         <Typography
//           variant="h3"
//           textAlign="center"
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
//           User Registrations
//         </Typography>

//         <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
//           <ButtonGroup
//             variant="outlined"
//             sx={{
//               border: "1px solid rgba(255,255,255,0.1)",
//               p: 0.5,
//               borderRadius: "18px",
//               bgcolor: "rgba(255,255,255,0.03)",
//             }}
//           >
//             {["all", "pending", "approved", "rejected"].map((status) => (
//               <Button
//                 key={status}
//                 onClick={() => setFilter(status)}
//                 sx={{
//                   border: "none !important",
//                   borderRadius: "14px !important",
//                   px: 4,
//                   py: 1,
//                   fontWeight: "bold",
//                   fontSize: "0.9rem",
//                   color: filter === status ? "#fff" : "#94A3B8",
//                   background:
//                     filter === status ? "linear-gradient(90deg, #4895EF, #4CC9F0)" : "transparent",
//                   boxShadow: filter === status ? "0 4px 15px rgba(76, 201, 240, 0.3)" : "none",
//                   transition: "0.4s",
//                   "&:hover": {
//                     bgcolor: filter === status ? "" : "rgba(76, 201, 240, 0.1)",
//                     transform: "translateY(-2px)",
//                   },
//                   textTransform: "capitalize",
//                 }}
//               >
//                 {status}
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

//         <TableContainer
//           component={Paper}
//           sx={{
//             borderRadius: "20px",
//             background: "rgba(13, 27, 42, 0.8)",
//             backdropFilter: "blur(10px)",
//             border: "1px solid rgba(255, 255, 255, 0.1)",
//             boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
//             overflow: "hidden",
//           }}
//         >
//           <Table sx={{ minWidth: 800 }}>
//             <TableHead>
//               <TableRow sx={{ background: "linear-gradient(90deg, #1B263B, #0D1B2A)" }}>
//                 {["Expo Image", "Attendee", "Expo Title", "Date", "Status", "Manage Status"].map(
//                   (heading) => (
//                     <TableCell
//                       key={heading}
//                       sx={{
//                         color: "#A2EDFF !important",
//                         fontWeight: "900",
//                         fontSize: "0.9rem",
//                         textTransform: "uppercase",
//                         letterSpacing: "1px",
//                         borderBottom: "3px solid rgba(76, 201, 240, 0.3)",
//                         padding: "20px",
//                       }}
//                     >
//                       {heading}
//                     </TableCell>
//                   )
//                 )}
//               </TableRow>
//             </TableHead>

//             <TableBody>
//               {filteredRegistrations.length > 0 ? (
//                 filteredRegistrations.map((reg) => {
//                   const statusStyle = getStatusStyle(reg.status);
//                   return (
//                     <TableRow
//                       key={reg._id}
//                       sx={{
//                         "&:hover": { backgroundColor: "rgba(76, 201, 240, 0.05)" },
//                         transition: "all 0.3s",
//                         "& td": { borderBottom: "1px solid rgba(255, 255, 255, 0.05)" },
//                       }}
//                     >
//                       <TableCell>
//                         {reg.expoId?.image ? (
//                           <Box
//                             component="img"
//                             src={`http://localhost:3001/uploads/${reg.expoId.image}`}
//                             alt="expo"
//                             sx={{
//                               width: 50,
//                               height: 50,
//                               objectFit: "cover",
//                               borderRadius: "10px",
//                               border: `1px solid rgba(255,255,255,0.1)`,
//                             }}
//                           />
//                         ) : (
//                           "—"
//                         )}
//                       </TableCell>
//                       <TableCell sx={{ color: "#F1F5F9", fontWeight: 600 }}>
//                         {reg.userId?.name || "Unknown"}
//                       </TableCell>
//                       <TableCell sx={{ color: "#94A3B8" }}>{reg.expoId?.title || "N/A"}</TableCell>
//                       <TableCell sx={{ color: "#94A3B8" }}>
//                         {reg.expoId?.date ? new Date(reg.expoId.date).toLocaleDateString() : "—"}
//                       </TableCell>

//                       <TableCell>
//                         <Box
//                           sx={{
//                             display: "inline-block",
//                             px: 1.5,
//                             py: 0.5,
//                             borderRadius: "6px",
//                             fontSize: "0.75rem",
//                             fontWeight: "bold",
//                             backgroundColor: statusStyle.bg,
//                             color: statusStyle.text,
//                             border: `1px solid ${statusStyle.border}`,
//                             textTransform: "uppercase",
//                           }}
//                         >
//                           {reg.status}
//                         </Box>
//                       </TableCell>

//                       <TableCell>
//                        <Select
//   value={reg.status}
//   size="small"
//   onChange={(e) => handleStatusChange(reg._id, e.target.value)}
//   MenuProps={{
//     PaperProps: {
//       sx: {
//         bgcolor: "#0D1B2A", 
//         border: "1px solid rgba(76, 201, 240, 0.3)",
//         borderRadius: "10px",
//         "& .MuiMenuItem-root": {
//           color: "#fff",
//           fontSize: "0.85rem",
//           "&:hover": { bgcolor: "rgba(76, 201, 240, 0.1)" },
//           "&.Mui-selected": { bgcolor: "rgba(76, 201, 240, 0.2)" },
//         },
//       },
//     },
//   }}
//   sx={{
//     height: "35px",
//     width: "130px", 
//     borderRadius: "8px",
//     fontSize: "0.8rem",
//     fontWeight: "bold",
//     color: 
//       reg.status === "approved" ? "#00F5A0" : 
//       reg.status === "rejected" ? "#FF4D4D" : "#FFD700",
//     bgcolor: "rgba(255,255,255,0.05)",
//     "& .MuiOutlinedInput-notchedOutline": {
//       borderColor: "rgba(76, 201, 240, 0.3)",
//     },
//     "&:hover .MuiOutlinedInput-notchedOutline": { 
//       borderColor: "#4CC9F0" 
//     },
//     "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
//       borderColor: "#4CC9F0",
//     },
//     "& .MuiSvgIcon-root": { color: "#4CC9F0" },
//   }}
// >
//   <MenuItem value="pending" sx={{ color: "#FFD700 !important" }}>Pending</MenuItem>
//   <MenuItem value="approved" sx={{ color: "#00F5A0 !important" }}>Approved</MenuItem>
//   <MenuItem value="rejected" sx={{ color: "#FF4D4D !important" }}>Rejected</MenuItem>
// </Select>
//                       </TableCell>
//                     </TableRow>
//                   );
//                 })
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={6} sx={{ textAlign: "center", py: 12 }}>
//                     <Typography
//                       variant="h5"
//                       sx={{ color: "#94A3B8", fontWeight: 800, mb: 1, letterSpacing: "1px" }}
//                     >
//                       🚫 No Registrations Found
//                     </Typography>
//                     <Typography variant="body1" sx={{ color: "rgba(148, 163, 184, 0.5)" }}>
//                       There are no attendees matching this status at the moment.
//                     </Typography>
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Box>
//     </Box>
//   );
// }

// export default ShowRegistrations;
import React, { useEffect, useState } from "react";
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
const IconEmpty = ({ size = 60, color = "rgba(255,255,255,0.12)" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/>
  </svg>
);

/* =============================================
   STATUS BADGE
   ============================================= */
function StatusBadge({ status }) {
  const colors = {
    pending: { bg: "rgba(255,183,3,0.12)", color: "#FFB703", border: "rgba(255,183,3,0.3)" },
    approved: { bg: "rgba(0,245,160,0.12)", color: "#00F5A0", border: "rgba(0,245,160,0.3)" },
    rejected: { bg: "rgba(255,77,77,0.12)", color: "#FF4D4D", border: "rgba(255,77,77,0.3)" },
  };
  const c = colors[status] || colors.pending;

  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: "6px",
      background: c.bg,
      border: `1px solid ${c.border}`,
      borderRadius: "6px",
      padding: "4px 12px",
      fontFamily: "'Inter', sans-serif",
      fontSize: "11px", fontWeight: 700,
      letterSpacing: "0.08em", textTransform: "uppercase",
      color: c.color,
    }}>
      <span style={{
        width: "5px", height: "5px", borderRadius: "50%",
        background: c.color,
      }} />
      {status}
    </span>
  );
}

/* =============================================
   CUSTOM SELECT
   ============================================= */
function StatusSelect({ value, onChange, options }) {
  const [open, setOpen] = useState(false);
  const ref = React.useRef(null);

  React.useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selected = options.find((o) => o.value === value);

  return (
    <div ref={ref} style={{ position: "relative", width: "130px" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          padding: "8px 12px",
          background: "rgba(255,255,255,0.03)",
          border: `1px solid ${G.border}`,
          borderRadius: "8px",
          color: selected?.color || G.w55,
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.8rem",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.5px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transition: "all 0.2s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = G.bGold;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = G.border;
        }}
      >
        <span>{selected?.label || "Select"}</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={G.gold} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: open ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }}>
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            style={{
              position: "absolute",
              top: "calc(100% + 4px)",
              left: 0,
              right: 0,
              background: G.black2,
              border: `1px solid ${G.border}`,
              borderRadius: "8px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
              zIndex: 10,
              overflow: "hidden",
            }}
          >
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  background: value === option.value ? "rgba(201,168,76,0.12)" : "transparent",
                  border: "none",
                  color: option.color || G.w55,
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all 0.15s",
                  borderBottom: `1px solid ${G.border}`,
                }}
                onMouseEnter={(e) => {
                  if (value !== option.value) {
                    e.currentTarget.style.background = "rgba(201,168,76,0.05)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (value !== option.value) {
                    e.currentTarget.style.background = "transparent";
                  }
                }}
              >
                {option.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* =============================================
   MAIN COMPONENT
   ============================================= */
export default function ShowRegistrations() {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get("http://localhost:3001/register");
      if (res.data.success) {
        setRegistrations(res.data.registrations);
      } else {
        setError("Failed to fetch registrations");
      }
    } catch (err) {
      setError("Failed to fetch registrations");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (regId, status) => {
    try {
      await axios.put(`http://localhost:3001/register/${regId}`, { status });
      setSuccessMsg(`Status updated to ${status}`);
      setRegistrations((prev) => prev.map((reg) => (reg._id === regId ? { ...reg, status } : reg)));
      setTimeout(() => setSuccessMsg(""), 2000);
    } catch (err) {
      setError("Failed to update status");
      setTimeout(() => setError(""), 2000);
    }
  };

  const filteredRegistrations =
    filter === "all" ? registrations : registrations.filter((reg) => reg.status === filter);

  const filterOptions = [
    { value: "all", label: "All" },
    { value: "pending", label: "Pending" },
    { value: "approved", label: "Approved" },
    { value: "rejected", label: "Rejected" },
  ];

  const statusOptions = [
    { value: "pending", label: "Pending", color: "#FFB703" },
    { value: "approved", label: "Approved", color: "#00F5A0" },
    { value: "rejected", label: "Rejected", color: "#FF4D4D" },
  ];

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
          Fetching Registrations...
        </p>
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
      <Toast
        alert={{ success: !!successMsg, message: successMsg || error }}
        onClose={() => { setSuccessMsg(""); setError(""); }}
      />

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
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            background: "rgba(201,168,76,0.1)", border: `1px solid ${G.bGold}`,
            borderRadius: "4px", padding: "6px 16px",
            fontSize: "11px", fontWeight: 700, letterSpacing: "0.16em",
            textTransform: "uppercase", color: G.gold,
            fontFamily: "'Inter', sans-serif", marginBottom: "20px",
          }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: G.gold }} />
            Attendee Management
          </div>

          <h1 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(2.2rem, 5vw, 4rem)",
            fontWeight: 700, color: G.white, lineHeight: 1.08,
            marginBottom: "14px", letterSpacing: "-0.01em",
          }}>
            User{" "}
            <em style={{ fontStyle: "italic", color: G.gold }}>Registrations</em>
          </h1>

          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "15px", lineHeight: 1.75, color: G.w55,
            maxWidth: "500px", margin: "0 auto",
          }}>
            Manage and track all attendee registrations across events.
          </p>
        </motion.div>
      </section>

      {/* ---- CONTENT ---- */}
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "64px 24px 80px" }}>
        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            display: "flex", justifyContent: "center", gap: "8px",
            marginBottom: "32px", flexWrap: "wrap",
          }}
        >
          {filterOptions.map((option) => (
            <motion.button
              key={option.value}
              onClick={() => setFilter(option.value)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              style={{
                padding: "10px 24px",
                borderRadius: "10px",
                fontWeight: 700,
                fontFamily: "'Inter', sans-serif",
                fontSize: "13px",
                cursor: "pointer",
                transition: "all 0.3s",
                border: "none",
                textTransform: "capitalize",
                background: filter === option.value ? G.gold : "rgba(255,255,255,0.03)",
                color: filter === option.value ? "#000" : G.w55,
                border: filter === option.value ? "none" : `1px solid ${G.border}`,
                boxShadow: filter === option.value ? "0 4px 15px rgba(201,168,76,0.3)" : "none",
              }}
              onMouseEnter={(e) => {
                if (filter !== option.value) {
                  e.currentTarget.style.background = "rgba(201,168,76,0.08)";
                  e.currentTarget.style.borderColor = G.bGold;
                  e.currentTarget.style.color = G.w80;
                }
              }}
              onMouseLeave={(e) => {
                if (filter !== option.value) {
                  e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                  e.currentTarget.style.borderColor = G.border;
                  e.currentTarget.style.color = G.w55;
                }
              }}
            >
              {option.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.15 }}
          style={{
            background: G.black2,
            border: `1px solid ${G.border}`,
            borderRadius: "20px",
            overflow: "hidden",
            position: "relative",
            boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
          }}
        >
          {/* Gold top line */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: "2px",
            background: `linear-gradient(90deg, ${G.gold}, transparent)`,
            zIndex: 2,
          }} />

          <div style={{ overflowX: "auto" }}>
            <table style={{
              width: "100%",
              borderCollapse: "collapse",
              minWidth: "800px",
            }}>
              <thead>
                <tr>
                  {["Expo Image", "Attendee", "Expo Title", "Date", "Status", "Manage Status"].map((heading) => (
                    <th
                      key={heading}
                      style={{
                        textAlign: heading === "Manage Status" ? "center" : "left",
                        color: G.gold,
                        fontWeight: 700,
                        fontSize: "11px",
                        textTransform: "uppercase",
                        letterSpacing: "0.12em",
                        borderBottom: `2px solid ${G.bGold}`,
                        padding: "20px 16px",
                        fontFamily: "'Inter', sans-serif",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredRegistrations.length > 0 ? (
                  filteredRegistrations.map((reg, index) => (
                    <motion.tr
                      key={reg._id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.04 }}
                      style={{
                        transition: "background-color 0.3s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "rgba(201,168,76,0.03)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                      }}
                    >
                      <td style={{
                        padding: "16px",
                        borderBottom: `1px solid ${G.border}`,
                      }}>
                        {reg.expoId?.image ? (
                          <img
                            src={`http://localhost:3001/uploads/${reg.expoId.image}`}
                            alt="expo"
                            style={{
                              width: "50px",
                              height: "50px",
                              objectFit: "cover",
                              borderRadius: "10px",
                              border: `1px solid ${G.border}`,
                            }}
                          />
                        ) : (
                          <span style={{ color: G.w30, fontFamily: "'Inter', sans-serif", fontSize: "14px" }}>—</span>
                        )}
                      </td>
                      <td style={{
                        padding: "16px",
                        color: G.w80,
                        fontWeight: 600,
                        fontSize: "14px",
                        borderBottom: `1px solid ${G.border}`,
                        fontFamily: "'Inter', sans-serif",
                      }}>
                        {reg.userId?.name || "Unknown"}
                      </td>
                      <td style={{
                        padding: "16px",
                        color: G.w55,
                        fontSize: "14px",
                        borderBottom: `1px solid ${G.border}`,
                        fontFamily: "'Inter', sans-serif",
                      }}>
                        {reg.expoId?.title || "N/A"}
                      </td>
                      <td style={{
                        padding: "16px",
                        color: G.w55,
                        fontSize: "14px",
                        borderBottom: `1px solid ${G.border}`,
                        fontFamily: "'Inter', sans-serif",
                      }}>
                        {reg.expoId?.date ? new Date(reg.expoId.date).toLocaleDateString() : "—"}
                      </td>
                      <td style={{
                        padding: "16px",
                        borderBottom: `1px solid ${G.border}`,
                      }}>
                        <StatusBadge status={reg.status} />
                      </td>
                      <td style={{
                        padding: "16px",
                        borderBottom: `1px solid ${G.border}`,
                        textAlign: "center",
                      }}>
                        <StatusSelect
                          value={reg.status}
                          onChange={(value) => handleStatusChange(reg._id, value)}
                          options={statusOptions}
                        />
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} style={{
                      textAlign: "center",
                      padding: "60px 20px",
                      borderBottom: `1px solid ${G.border}`,
                    }}>
                      <IconEmpty size={60} />
                      <h3 style={{
                        fontFamily: "'Playfair Display', Georgia, serif",
                        fontSize: "1.3rem", fontWeight: 700,
                        color: G.w55, marginTop: "16px", marginBottom: "4px",
                      }}>
                        No Registrations Found
                      </h3>
                      <p style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "14px", color: G.w30,
                      }}>
                        There are no attendees matching this status at the moment.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}