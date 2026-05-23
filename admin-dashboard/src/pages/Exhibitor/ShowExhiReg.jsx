// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Typography,
//   CircularProgress,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Select,
//   MenuItem,
//   Avatar,
//   Button,
//   Stack,
//   Alert,
// } from "@mui/material";
// import axios from "axios";
// import SearchOffIcon from "@mui/icons-material/SearchOff";

// // Theme Constants
// const NEON_CYAN = "#4CC9F0";

// function ShowExhiReg() {
//   const [registrations, setRegistrations] = useState([]);
//   const [floors, setFloors] = useState([]);
//   const [expos, setExpos] = useState([]);
//   const [selectedExpo, setSelectedExpo] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [successMsg, setSuccessMsg] = useState("");

//   useEffect(() => {
//     const init = async () => {
//       try {
//         const [exposRes, floorsRes] = await Promise.all([
//           axios.get("http://localhost:3001/expo"),
//           axios.get("http://localhost:3001/floors"),
//         ]);

//         const exposData = exposRes.data.expos || [];
//         setExpos(exposData);
//         setFloors(floorsRes.data.floors || []);

//         if (exposData.length > 0) {
//           setSelectedExpo(exposData[0]._id);
//           fetchRegistrations(exposData[0]._id);
//         }
//       } catch (err) {
//         console.error("Error fetching expos/floors:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     init();
//   }, []);

//   const fetchRegistrations = async (expoId) => {
//     if (!expoId) return setRegistrations([]);
//     try {
//       setLoading(true);
//       const res = await axios.get(`http://localhost:3001/participation/by-expo/${expoId}`);
//       setRegistrations(res.data.records || []);
//     } catch (err) {
//       console.error("Error fetching registrations:", err);
//       setRegistrations([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateField = async (id, field, value) => {
//     try {
//       await axios.put(`http://localhost:3001/participation/${id}`, { [field]: value });
//       setSuccessMsg(`${field.charAt(0).toUpperCase() + field.slice(1)} updated!`);
//       fetchRegistrations(selectedExpo);
//       setTimeout(() => setSuccessMsg(""), 2000);
//     } catch (err) {
//       console.error("Error updating registration:", err);
//     }
//   };

//   const assignedFloors = registrations.filter((r) => r.floor).map((r) => r.floor._id);

//   if (loading && expos.length === 0) {
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
//           Loading Exhibitor Data...
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
//       <Box sx={{ width: "100%", maxWidth: 1400, mx: "auto" }}>
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
//           Exhibitor Registrations
//         </Typography>

//         {/* Expo Selection Buttons */}
//         <Stack direction="row" spacing={1} mb={4} justifyContent="center" flexWrap="wrap">
//           {expos.map((expo) => (
//             <Button
//               key={expo._id}
//               onClick={() => {
//                 setSelectedExpo(expo._id);
//                 fetchRegistrations(expo._id);
//               }}
//               sx={{
//                 borderRadius: "10px",
//                 px: 3,
//                 mb: 1,
//                 fontWeight: "bold",
//                 color: selectedExpo === expo._id ? "#fff" : "#94A3B8",
//                 background:
//                   selectedExpo === expo._id
//                     ? "linear-gradient(45deg, #4895EF, #4CC9F0)"
//                     : "rgba(255,255,255,0.05)",
//                 border: selectedExpo === expo._id ? "none" : "1px solid rgba(255,255,255,0.1)",
//                 "&:hover": { bgcolor: "rgba(76, 201, 240, 0.15)" },
//               }}
//             >
//               {expo.title}
//             </Button>
//           ))}
//         </Stack>

//         {successMsg && (
//           <Alert severity="success" sx={{ mb: 2, borderRadius: "10px" }}>
//             {successMsg}
//           </Alert>
//         )}

//         {registrations.length === 0 && !loading ? (
//           <Box
//             sx={{
//               mt: 8,
//               textAlign: "center",
//               p: 5,
//               borderRadius: "20px",
//               background: "rgba(255, 255, 255, 0.03)",
//               border: "1px dashed rgba(76, 201, 240, 0.3)",
//             }}
//           >
//             <SearchOffIcon sx={{ fontSize: 80, color: "rgba(76, 201, 240, 0.2)", mb: 2 }} />
//             <Typography variant="h5" sx={{ color: "#94A3B8", fontWeight: 600 }}>
//               No Registrations Found
//             </Typography>
//             <Typography sx={{ color: "rgba(148, 163, 184, 0.6)" }}>
//               There are no exhibitors registered for the selected expo yet.
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
//               boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
//               overflow: "hidden",
//             }}
//           >
//             <Table>
//               <TableHead>
//                 <TableRow sx={{ background: "linear-gradient(90deg, #1B263B, #0D1B2A)" }}>
//                   {[
//                     "Image",
//                     "Exhibitor",
//                     "Company",
//                     "Products",
//                     "Email",
//                     "Contact",
//                     "Floor",
//                     "Status",
//                   ].map((heading) => (
//                     <TableCell
//                       key={heading}
//                       sx={{
//                         color: "#A2EDFF !important",
//                         fontWeight: "900",
//                         fontSize: "0.85rem",
//                         textTransform: "uppercase",
//                         letterSpacing: "1px",
//                         borderBottom: "3px solid rgba(76, 201, 240, 0.3)",
//                         padding: "20px",
//                       }}
//                     >
//                       {heading}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               </TableHead>

//               <TableBody>
//                 {registrations.map((reg) => (
//                   <TableRow
//                     key={reg._id}
//                     sx={{
//                       "&:hover": { backgroundColor: "rgba(76, 201, 240, 0.05)" },
//                       transition: "all 0.3s",
//                       "& td": { borderBottom: "1px solid rgba(255, 255, 255, 0.05)" },
//                     }}
//                   >
//                     <TableCell>
//                       <Avatar
//                         src={
//                           reg.companyId?.image
//                             ? `http://localhost:3001/uploads/${reg.companyId.image}`
//                             : ""
//                         }
//                         sx={{ width: 45, height: 45, border: "1px solid rgba(255,255,255,0.1)" }}
//                       >
//                         {!reg.companyId?.image && reg.companyId?.companyName?.charAt(0)}
//                       </Avatar>
//                     </TableCell>
//                     <TableCell sx={{ color: "#F1F5F9", fontWeight: 600 }}>
//                       {reg.exhibitorId?.name || "N/A"}
//                     </TableCell>
//                     <TableCell sx={{ color: "#94A3B8" }}>
//                       {reg.companyId?.companyName || "N/A"}
//                     </TableCell>
//                     <TableCell sx={{ color: "#94A3B8", fontSize: "0.85rem" }}>
//                       {reg.companyId?.productsOrServices || "N/A"}
//                     </TableCell>
//                     <TableCell sx={{ color: "#94A3B8" }}>
//                       {reg.companyId?.companyEmail || "N/A"}
//                     </TableCell>
//                     <TableCell sx={{ color: "#94A3B8" }}>
//                       {reg.companyId?.contactNumber || "N/A"}
//                     </TableCell>

//                     <TableCell>
//                       <Select
//                         value={reg.floor?._id || ""}
//                         size="small"
//                         onChange={(e) => updateField(reg._id, "floor", e.target.value)}
//                         sx={{
//                           color: "#fff",
//                           width: "140px",
//                           bgcolor: "rgba(255,255,255,0.05)",
//                           borderRadius: "8px",
//                           fontSize: "0.8rem",
//                           "& .MuiOutlinedInput-notchedOutline": {
//                             borderColor: "rgba(76, 201, 240, 0.2)",
//                           },
//                           "& .MuiSvgIcon-root": { color: NEON_CYAN },
//                         }}
//                       >
//                         <MenuItem value="">Not Assigned</MenuItem>
//                         {floors.map(
//                           (floor) =>
//                             (!assignedFloors.includes(floor._id) ||
//                               reg.floor?._id === floor._id) && (
//                               <MenuItem key={floor._id} value={floor._id}>
//                                 {floor.floor} - {floor.boothName}
//                               </MenuItem>
//                             )
//                         )}
//                       </Select>
//                     </TableCell>

//                     <TableCell>
//                      <Select
//   value={reg.status || "Pending"}
//   size="small"
//   onChange={(e) => updateField(reg._id, "status", e.target.value)}
//   // Dropdown list (Menu) ki styling ke liye
//   MenuProps={{
//     PaperProps: {
//       sx: {
//         bgcolor: "#0D1B2A", // Dark Navy background
//         border: "1px solid rgba(76, 201, 240, 0.3)",
//         borderRadius: "12px",
//         mt: 1,
//         "& .MuiMenuItem-root": {
//           fontSize: "0.85rem",
//           fontWeight: "600",
//           color: "#94A3B8",
//           transition: "0.2s",
//           "&:hover": {
//             bgcolor: "rgba(76, 201, 240, 0.1)",
//             color: NEON_CYAN,
//           },
//           "&.Mui-selected": {
//             bgcolor: "rgba(76, 201, 240, 0.2)",
//             color: "#fff",
//             "&:hover": { bgcolor: "rgba(76, 201, 240, 0.3)" },
//           },
//         },
//       },
//     },
//   }}
//   sx={{
//     width: "135px",
//     borderRadius: "10px",
//     fontSize: "0.8rem",
//     fontWeight: "800",
//     textTransform: "uppercase",
//     letterSpacing: "0.5px",
//     color: 
//       reg.status === "Approved" ? "#00F5A0" : 
//       reg.status === "Rejected" ? "#FF4D4D" : "#FFD700", // Pending ke liye Gold/Yellow
//     bgcolor: "rgba(255,255,255,0.03)",
//     transition: "0.3s",
//     "& .MuiOutlinedInput-notchedOutline": {
//       borderColor: "rgba(255, 255, 255, 0.1)",
//     },
//     "&:hover .MuiOutlinedInput-notchedOutline": {
//       borderColor: "rgba(76, 201, 240, 0.5)",
//     },
//     "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
//       borderColor: NEON_CYAN,
//       borderWidth: "2px",
//     },
//     "& .MuiSvgIcon-root": { 
//       color: NEON_CYAN,
//       fontSize: "1.2rem" 
//     },
//   }}
// >
//   <MenuItem value="Pending" sx={{ color: "#FFD700 !important" }}>Pending</MenuItem>
//   <MenuItem value="Approved" sx={{ color: "#00F5A0 !important" }}>Approved</MenuItem>
//   <MenuItem value="Rejected" sx={{ color: "#FF4D4D !important" }}>Rejected</MenuItem>
// </Select>
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

// export default ShowExhiReg;
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
            background: "rgba(201,168,76,0.12)",
            border: `1px solid ${G.bGold}`,
            borderRadius: "10px", padding: "13px 24px",
            fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 600,
            color: G.gold,
            backdropFilter: "blur(12px)", whiteSpace: "nowrap",
            boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
          }}
        >
          ✓  {alert.message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* =============================================
   ICONS (SVG)
   ============================================= */
const IconSearchOff = ({ size = 80, color = "rgba(255,255,255,0.12)" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/>
  </svg>
);

/* =============================================
   CUSTOM SELECT COMPONENT
   ============================================= */
function CustomSelect({ value, options, onChange, width = "140px", color = G.w80 }) {
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
    <div ref={ref} style={{ position: "relative", width }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          padding: "8px 12px",
          background: "rgba(255,255,255,0.03)",
          border: `1px solid ${G.border}`,
          borderRadius: "8px",
          color: selected?.color || color,
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
   STATUS BADGE
   ============================================= */
function StatusBadge({ status }) {
  const colors = {
    Pending: { bg: "rgba(255,215,0,0.12)", color: "#FFD700", border: "rgba(255,215,0,0.3)" },
    Approved: { bg: "rgba(0,245,160,0.12)", color: "#00F5A0", border: "rgba(0,245,160,0.3)" },
    Rejected: { bg: "rgba(255,77,77,0.12)", color: "#FF4D4D", border: "rgba(255,77,77,0.3)" },
  };
  const c = colors[status] || colors.Pending;

  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: "6px",
      background: c.bg,
      border: `1px solid ${c.border}`,
      borderRadius: "6px",
      padding: "4px 10px",
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


export default function ShowExhiReg() {
  const [registrations, setRegistrations] = useState([]);
  const [floors, setFloors] = useState([]);
  const [expos, setExpos] = useState([]);
  const [selectedExpo, setSelectedExpo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    const init = async () => {
      try {
        const [exposRes, floorsRes] = await Promise.all([
          axios.get("http://localhost:3001/expo"),
          axios.get("http://localhost:3001/floors"),
        ]);

        const exposData = exposRes.data.expos || [];
        setExpos(exposData);
        setFloors(floorsRes.data.floors || []);

        if (exposData.length > 0) {
          setSelectedExpo(exposData[0]._id);
          fetchRegistrations(exposData[0]._id);
        }
      } catch (err) {
        console.error("Error fetching expos/floors:", err);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  const fetchRegistrations = async (expoId) => {
    if (!expoId) return setRegistrations([]);
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:3001/participation/by-expo/${expoId}`);
      setRegistrations(res.data.records || []);
    } catch (err) {
      console.error("Error fetching registrations:", err);
      setRegistrations([]);
    } finally {
      setLoading(false);
    }
  };

  const updateField = async (id, field, value) => {
    try {
      await axios.put(`http://localhost:3001/participation/${id}`, { [field]: value });
      setSuccessMsg(`${field.charAt(0).toUpperCase() + field.slice(1)} updated!`);
      fetchRegistrations(selectedExpo);
      setTimeout(() => setSuccessMsg(""), 2000);
    } catch (err) {
      console.error("Error updating registration:", err);
    }
  };

  const assignedFloors = registrations.filter((r) => r.floor).map((r) => r.floor._id);

  const floorOptions = [
    { value: "", label: "Not Assigned", color: G.w55 },
    ...floors
      .filter((floor) => !assignedFloors.includes(floor._id))
      .map((floor) => ({
        value: floor._id,
        label: `${floor.floor} - ${floor.boothName}`,
        color: G.w80,
      })),
  ];

  const statusOptions = [
    { value: "Pending", label: "Pending", color: "#FFD700" },
    { value: "Approved", label: "Approved", color: "#00F5A0" },
    { value: "Rejected", label: "Rejected", color: "#FF4D4D" },
  ];

  /* ---- LOADING ---- */
  if (loading && expos.length === 0) {
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
          Loading Exhibitor Data...
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
      <Toast alert={{ message: successMsg }} onClose={() => setSuccessMsg("")} />

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
            Expo Management
          </div>

          <h1 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(2.2rem, 5vw, 4rem)",
            fontWeight: 700, color: G.white, lineHeight: 1.08,
            marginBottom: "14px", letterSpacing: "-0.01em",
          }}>
            Exhibitor{" "}
            <em style={{ fontStyle: "italic", color: G.gold }}>Registrations</em>
          </h1>

          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "15px", lineHeight: 1.75, color: G.w55,
            maxWidth: "500px", margin: "0 auto",
          }}>
            Manage and track all exhibitor registrations for your expos.
          </p>
        </motion.div>
      </section>

      {/* ---- CONTENT ---- */}
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "64px 24px 80px" }}>
        {/* Expo Selection Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            display: "flex", gap: "8px", marginBottom: "32px",
            justifyContent: "center", flexWrap: "wrap",
          }}
        >
          {expos.map((expo) => (
            <motion.button
              key={expo._id}
              onClick={() => {
                setSelectedExpo(expo._id);
                fetchRegistrations(expo._id);
              }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              style={{
                padding: "10px 20px",
                borderRadius: "10px",
                fontWeight: 700,
                fontFamily: "'Inter', sans-serif",
                fontSize: "13px",
                cursor: "pointer",
                transition: "all 0.2s",
                border: "none",
                background: selectedExpo === expo._id ? G.gold : "rgba(255,255,255,0.03)",
                color: selectedExpo === expo._id ? "#000" : G.w55,
                border: selectedExpo === expo._id ? "none" : `1px solid ${G.border}`,
              }}
              onMouseEnter={(e) => {
                if (selectedExpo !== expo._id) {
                  e.currentTarget.style.background = "rgba(201,168,76,0.08)";
                  e.currentTarget.style.borderColor = G.bGold;
                  e.currentTarget.style.color = G.w80;
                }
              }}
              onMouseLeave={(e) => {
                if (selectedExpo !== expo._id) {
                  e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                  e.currentTarget.style.borderColor = G.border;
                  e.currentTarget.style.color = G.w55;
                }
              }}
            >
              {expo.title}
            </motion.button>
          ))}
        </motion.div>

        {registrations.length === 0 && !loading ? (
          /* ---- EMPTY STATE ---- */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            style={{
              textAlign: "center",
              padding: "60px 20px",
              background: G.black2,
              border: `1px dashed ${G.border}`,
              borderRadius: "20px",
            }}
          >
            <IconSearchOff size={80} />
            <h3 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "1.5rem", fontWeight: 700,
              color: G.w55, marginTop: "20px", marginBottom: "8px",
            }}>
              No Registrations Found
            </h3>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "14px", color: G.w30, lineHeight: 1.7,
            }}>
              There are no exhibitors registered for the selected expo yet.
            </p>
          </motion.div>
        ) : (
          /* ---- TABLE ---- */
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
                minWidth: "1000px",
              }}>
                <thead>
                  <tr>
                    {["Image", "Exhibitor", "Company", "Products", "Email", "Contact", "Floor", "Status"].map((heading) => (
                      <th
                        key={heading}
                        style={{
                          textAlign: "left",
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
                  {registrations.map((reg, index) => (
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
                      {/* Image */}
                      <td style={{
                        padding: "16px",
                        borderBottom: `1px solid ${G.border}`,
                      }}>
                        <div style={{
                          width: "45px", height: "45px",
                          borderRadius: "50%",
                          background: reg.companyId?.image
                            ? `url(http://localhost:3001/uploads/${reg.companyId.image}) center/cover`
                            : G.black3,
                          border: `1px solid ${G.border}`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontFamily: "'Inter', sans-serif",
                          fontSize: "16px",
                          fontWeight: 700,
                          color: G.gold,
                        }}>
                          {!reg.companyId?.image && reg.companyId?.companyName?.charAt(0)}
                        </div>
                      </td>

                      {/* Exhibitor */}
                      <td style={{
                        padding: "16px",
                        color: G.w80,
                        fontWeight: 600,
                        fontSize: "14px",
                        borderBottom: `1px solid ${G.border}`,
                        fontFamily: "'Inter', sans-serif",
                        whiteSpace: "nowrap",
                      }}>
                        {reg.exhibitorId?.name || "N/A"}
                      </td>

                      {/* Company */}
                      <td style={{
                        padding: "16px",
                        color: G.w55,
                        fontSize: "14px",
                        borderBottom: `1px solid ${G.border}`,
                        fontFamily: "'Inter', sans-serif",
                        whiteSpace: "nowrap",
                      }}>
                        {reg.companyId?.companyName || "N/A"}
                      </td>

                      {/* Products */}
                      <td style={{
                        padding: "16px",
                        color: G.w55,
                        fontSize: "13px",
                        borderBottom: `1px solid ${G.border}`,
                        fontFamily: "'Inter', sans-serif",
                        maxWidth: "200px",
                      }}>
                        {reg.companyId?.productsOrServices || "N/A"}
                      </td>

                      {/* Email */}
                      <td style={{
                        padding: "16px",
                        color: G.w55,
                        fontSize: "14px",
                        borderBottom: `1px solid ${G.border}`,
                        fontFamily: "'Inter', sans-serif",
                        whiteSpace: "nowrap",
                      }}>
                        {reg.companyId?.companyEmail || "N/A"}
                      </td>

                      {/* Contact */}
                      <td style={{
                        padding: "16px",
                        color: G.w55,
                        fontSize: "14px",
                        borderBottom: `1px solid ${G.border}`,
                        fontFamily: "'Inter', sans-serif",
                        whiteSpace: "nowrap",
                      }}>
                        {reg.companyId?.contactNumber || "N/A"}
                      </td>

                      {/* Floor Select */}
                      <td style={{
                        padding: "16px",
                        borderBottom: `1px solid ${G.border}`,
                      }}>
                        <CustomSelect
                          value={reg.floor?._id || ""}
                          options={floorOptions}
                          onChange={(value) => updateField(reg._id, "floor", value)}
                          width="160px"
                        />
                      </td>

                      {/* Status Select */}
                      <td style={{
                        padding: "16px",
                        borderBottom: `1px solid ${G.border}`,
                      }}>
                        <CustomSelect
                          value={reg.status || "Pending"}
                          options={statusOptions}
                          onChange={(value) => updateField(reg._id, "status", value)}
                          width="130px"
                          color={
                            reg.status === "Approved" ? "#00F5A0" :
                            reg.status === "Rejected" ? "#FF4D4D" : "#FFD700"
                          }
                        />
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
