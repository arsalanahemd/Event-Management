// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Typography,
//   CircularProgress,
//   Alert,
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
// } from "@mui/material";
// import axios from "axios";

// //  Theme Constants
// const NEON_CYAN = "#4CC9F0";
// const NEON_PINK = "#F72585";
// const LIGHT_CYAN = "#A2EDFF";

// function ShowFloors() {
//   const [floors, setFloors] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [successMsg, setSuccessMsg] = useState("");

//   const [openEdit, setOpenEdit] = useState(false);
//   const [editData, setEditData] = useState({
//     _id: "",
//     floor: "",
//     boothName: "",
//     boothSize: "",
//     status: "Available",
//   });

//   const fetchFloors = async () => {
//     setLoading(true);
//     setError("");
//     try {
//       const res = await axios.get("http://localhost:3001/floors");
//       setFloors(res.data.floors || []);
//     } catch (err) {
//       setError("Failed to fetch floors");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchFloors();
//   }, []);

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this floor?")) return;
//     try {
//       await axios.delete(`http://localhost:3001/floors/${id}`);
//       setFloors((prev) => prev.filter((floor) => floor._id !== id));
//       setSuccessMsg("Floor deleted successfully!");
//       setTimeout(() => setSuccessMsg(""), 2000);
//     } catch (err) {
//       setError("Failed to delete floor");
//     }
//   };

//   const handleEditOpen = (floor) => {
//     setEditData(floor);
//     setOpenEdit(true);
//   };

//   const handleEditClose = () => {
//     setOpenEdit(false);
//   };

//   const handleEditChange = (e) => {
//     setEditData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleUpdate = async () => {
//     const { _id, floor, boothName, boothSize, status } = editData;
//     try {
//       const res = await axios.put(`http://localhost:3001/floors/${_id}`, {
//         floor,
//         boothName,
//         boothSize,
//         status,
//       });
//       if (res.data.success) {
//         setSuccessMsg("Floor updated successfully!");
//         setFloors((prev) => prev.map((item) => (item._id === _id ? res.data.floor : item)));
//         handleEditClose();
//         setTimeout(() => setSuccessMsg(""), 2000);
//       }
//     } catch (err) {
//       setError("Error updating floor");
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
//         <Typography mt={2} sx={{ color: "#94A3B8" }}>
//           Loading Floors Database...
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
//       <Box sx={{ width: "100%", maxWidth: 1000, mx: "auto" }}>
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
//           Floor Management
//         </Typography>

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
//             boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
//             overflow: "hidden",
//           }}
//         >
//           <Table sx={{ minWidth: 650 }}>
//             <TableHead>
//               <TableRow sx={{ background: "linear-gradient(90deg, #1B263B, #0D1B2A)" }}>
//                 {["Floor", "Booth Name", "Booth Size", "Status", "Actions"].map((heading) => (
//                   <TableCell
//                     key={heading}
//                     align={heading === "Actions" ? "center" : "left"}
//                     sx={{
//                       color: `${LIGHT_CYAN} !important`,
//                       fontWeight: "900",
//                       fontSize: "1.1rem",
//                       textTransform: "uppercase",
//                       letterSpacing: "1.5px",
//                       borderBottom: "3px solid rgba(76, 201, 240, 0.4)",
//                       padding: "24px",
//                       fontFamily: "'Poppins', sans-serif",
//                     }}
//                   >
//                     {heading}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             </TableHead>

//             <TableBody>
//               {floors.map((floor) => (
//                 <TableRow
//                   key={floor._id}
//                   sx={{
//                     "&:hover": { backgroundColor: "rgba(76, 201, 240, 0.05)" },
//                     transition: "all 0.3s",
//                     "& td": { borderBottom: "1px solid rgba(255, 255, 255, 0.05)" },
//                   }}
//                 >
//                   <TableCell sx={{ color: "#F1F5F9", fontWeight: 500 }}>{floor.floor}</TableCell>
//                   <TableCell sx={{ color: "#94A3B8" }}>{floor.boothName}</TableCell>
//                   <TableCell sx={{ color: "#94A3B8" }}>{floor.boothSize}</TableCell>
//                   <TableCell>
//                     <Box
//                       sx={{
//                         display: "inline-block",
//                         px: 1.5,
//                         py: 0.5,
//                         borderRadius: "6px",
//                         fontSize: "0.75rem",
//                         fontWeight: "bold",
//                         backgroundColor:
//                           floor.status === "Booked"
//                             ? "rgba(247, 37, 133, 0.1)"
//                             : "rgba(76, 201, 240, 0.1)",
//                         color: floor.status === "Booked" ? NEON_PINK : NEON_CYAN,
//                         border: `1px solid ${floor.status === "Booked" ? NEON_PINK : NEON_CYAN}44`,
//                       }}
//                     >
//                       {floor.status.toUpperCase()}
//                     </Box>
//                   </TableCell>
//                   <TableCell align="center">
//                     <Button
//                       variant="outlined"
//                       size="small"
//                       onClick={() => handleEditOpen(floor)}
//                       sx={{
//                         mr: 1,
//                         borderRadius: "8px",
//                         color: "#FFD700",
//                         borderColor: "rgba(255, 215, 0, 0.4)",
//                         backgroundColor: "transparent",
//                         fontWeight: "bold",
//                         transition: "all 0.3s ease",

//                         "&:hover": {
//                           borderColor: "#FFD700",
//                           backgroundColor: "rgba(255, 215, 0, 0.15)",
//                         },
//                       }}
//                     >
//                       Edit
//                     </Button>
//                     <Button
//                       variant="outlined"
//                       size="small"
//                       onClick={() => handleDelete(floor._id)}
//                       sx={{
//                         borderRadius: "8px",
//                         color: "#FF4D4D",
//                         borderColor: "rgba(255, 77, 77, 0.4)",
//                         "&:hover": {
//                           borderColor: "#FF4D4D",
//                           backgroundColor: "rgba(255, 77, 77, 0.1)",
//                         },
//                       }}
//                     >
//                       Delete
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Box>

//       {/*  Edit */}
//       <Dialog
//         open={openEdit}
//         onClose={handleEditClose}
//         PaperProps={{
//           sx: {
//             background: "#0D1B2A",
//             color: "#fff",
//             borderRadius: "20px",
//             border: "1px solid rgba(76, 201, 240, 0.3)",
//             p: 2,
//             width: "400px",
//           },
//         }}
//       >
//         <DialogTitle
//           sx={{
//             fontWeight: "bold",
//             color: NEON_CYAN,
//             textTransform: "uppercase",
//             textAlign: "center",
//           }}
//         >
//           Edit Floor Details
//         </DialogTitle>

//         <DialogContent>
//           {["floor", "boothName", "boothSize"].map((field) => (
//     <TextField
//   key={field}
//   margin="dense"
//   label={field.replace(/([A-Z])/g, " $1").toUpperCase()}
//   name={field}
//   fullWidth
//   variant="outlined" 
//   value={editData[field]}
//   onChange={handleEditChange}
//   InputLabelProps={{
//     shrink: true, 
//     sx: {
//       color: "#4CC9F0",
//       fontWeight: "900",
//       letterSpacing: "1px",
//       fontSize: "0.85rem",
//       backgroundColor: "#0D1B2A",
//       px: 1,
//       "&.Mui-focused": {
//         color: "#4CC9F0",
//       },
//     },
//   }}
//   sx={{
//     mb: 3,
//     "& .MuiOutlinedInput-root": {
//       color: "#fff",
//       borderRadius: "12px",
//       backgroundColor: "rgba(255,255,255,0.03)",
//       "& fieldset": {
//         borderColor: "rgba(76, 201, 240, 0.3)",
//       },
//       "&:hover fieldset": {
//         borderColor: "#4CC9F0",
//       },
//       "&.Mui-focused fieldset": {
//         borderColor: "#4CC9F0",
//         borderWidth: "2px",
//         boxShadow: "0 0 10px rgba(76, 201, 240, 0.2)",
//       },
//     },
//     "& .MuiInputBase-input": {
//       padding: "16px",
//       fontWeight: "500",
//       fontFamily: "'Poppins', sans-serif",
//     },
//   }}
// />
//           ))}
//         </DialogContent>

//         <DialogActions sx={{ p: 3 }}>
//           <Button
//             onClick={handleEditClose}
//             sx={{
//               color: "#94A3B8",
//               fontWeight: "bold",
//               "&:hover": { color: "#fff" },
//             }}
//           >
//             Cancel
//           </Button>
//           <Button
//             onClick={handleUpdate}
//             variant="contained"
//             sx={{
//               background: "linear-gradient(90deg, #4CC9F0, #4895EF)",
//               fontWeight: "800",
//               borderRadius: "12px",
//               px: 4,
//               boxShadow: "0 8px 20px rgba(76, 201, 240, 0.3)",
//               textTransform: "none",
//               "&:hover": {
//                 background: "linear-gradient(90deg, #4895EF, #4CC9F0)",
//                 transform: "translateY(-2px)",
//               },
//             }}
//           >
//             Update
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// }

// export default ShowFloors;
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
const IconLayers = ({ size = 55, color = G.gold }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>
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
const IconClose = ({ size = 18, color = G.w55 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

/* =============================================
   FIELD — reusable input for dialog
   ============================================= */
function Field({ label, name, value, onChange, type = "text", required }) {
  const [focused, setFocused] = React.useState(false);

  return (
    <div style={{ marginBottom: "16px" }}>
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
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: "100%",
          background: G.black3,
          border: `1px solid ${focused ? G.bGold : G.border}`,
          borderRadius: "8px",
          padding: "14px 18px",
          fontFamily: "'Inter', sans-serif",
          fontSize: "14px",
          color: G.white,
          outline: "none",
          transition: "border-color 0.2s, box-shadow 0.2s",
          boxSizing: "border-box",
          boxShadow: focused ? "0 0 20px rgba(201,168,76,0.08)" : "none",
        }}
      />
    </div>
  );
}

/* =============================================
   STATUS BADGE
   ============================================= */
function StatusBadge({ status }) {
  const colors = {
    Available: { bg: "rgba(201,168,76,0.12)", color: G.gold, border: G.bGold },
    Booked: { bg: "rgba(255,77,77,0.12)", color: "#ff4d4d", border: "rgba(255,77,77,0.3)" },
  };
  const c = colors[status] || colors.Available;

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
   MAIN COMPONENT
   ============================================= */
export default function ShowFloors() {
  const [floors, setFloors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState({
    _id: "",
    floor: "",
    boothName: "",
    boothSize: "",
    status: "Available",
  });

  const fetchFloors = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get("http://localhost:3001/floors");
      setFloors(res.data.floors || []);
    } catch (err) {
      setError("Failed to fetch floors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFloors();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this floor?")) return;
    try {
      await axios.delete(`http://localhost:3001/floors/${id}`);
      setFloors((prev) => prev.filter((floor) => floor._id !== id));
      setSuccessMsg("Floor deleted successfully!");
      setTimeout(() => setSuccessMsg(""), 2000);
    } catch (err) {
      setError("Failed to delete floor");
    }
  };

  const handleEditOpen = (floor) => {
    setEditData(floor);
    setOpenEdit(true);
  };

  const handleEditClose = () => setOpenEdit(false);

  const handleEditChange = (e) => {
    setEditData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async () => {
    const { _id, floor, boothName, boothSize, status } = editData;
    try {
      const res = await axios.put(`http://localhost:3001/floors/${_id}`, {
        floor, boothName, boothSize, status,
      });
      if (res.data.success) {
        setSuccessMsg("Floor updated successfully!");
        setFloors((prev) => prev.map((item) => (item._id === _id ? res.data.floor : item)));
        handleEditClose();
        setTimeout(() => setSuccessMsg(""), 2000);
      }
    } catch (err) {
      setError("Error updating floor");
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
          Loading Floors Database...
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
            Venue Management
          </div>

          <h1 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(2.2rem, 5vw, 4rem)",
            fontWeight: 700, color: G.white, lineHeight: 1.08,
            marginBottom: "14px", letterSpacing: "-0.01em",
          }}>
            Floor{" "}
            <em style={{ fontStyle: "italic", color: G.gold }}>Management</em>
          </h1>

          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "15px", lineHeight: 1.75, color: G.w55,
            maxWidth: "500px", margin: "0 auto",
          }}>
            Manage venue floors, booths, and their availability status.
          </p>
        </motion.div>
      </section>

      {/* ---- CONTENT ---- */}
      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "64px 24px 80px" }}>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.15 }}
          style={{
            background: G.black2,
            border: `1px solid ${G.border}`,
            borderRadius: "20px",
            padding: "clamp(28px, 5vw, 40px)",
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

          {floors.length === 0 ? (
            /* ---- EMPTY STATE ---- */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              style={{ textAlign: "center", padding: "60px 20px" }}
            >
              <IconLayers size={60} color="rgba(255,255,255,0.12)" />
              <h3 style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "1.5rem", fontWeight: 700,
                color: G.w55, marginTop: "20px", marginBottom: "8px",
              }}>
                No Floors Found
              </h3>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "14px", color: G.w30, lineHeight: 1.7,
              }}>
                There are no floors configured in the system yet.
              </p>
            </motion.div>
          ) : (
            /* ---- TABLE ---- */
            <div style={{ overflowX: "auto" }}>
              <table style={{
                width: "100%",
                borderCollapse: "collapse",
                minWidth: "650px",
              }}>
                <thead>
                  <tr>
                    {["Floor", "Booth Name", "Booth Size", "Status", "Actions"].map((heading) => (
                      <th
                        key={heading}
                        style={{
                          textAlign: heading === "Actions" ? "center" : "left",
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
                  {floors.map((floor, index) => (
                    <motion.tr
                      key={floor._id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.06 }}
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
                        padding: "18px 16px",
                        color: G.w80,
                        fontWeight: 600,
                        fontSize: "14px",
                        borderBottom: `1px solid ${G.border}`,
                        fontFamily: "'Inter', sans-serif",
                      }}>
                        {floor.floor}
                      </td>
                      <td style={{
                        padding: "18px 16px",
                        color: G.w55,
                        fontSize: "14px",
                        borderBottom: `1px solid ${G.border}`,
                        fontFamily: "'Inter', sans-serif",
                      }}>
                        {floor.boothName}
                      </td>
                      <td style={{
                        padding: "18px 16px",
                        color: G.w55,
                        fontSize: "14px",
                        borderBottom: `1px solid ${G.border}`,
                        fontFamily: "'Inter', sans-serif",
                      }}>
                        {floor.boothSize}
                      </td>
                      <td style={{
                        padding: "18px 16px",
                        borderBottom: `1px solid ${G.border}`,
                      }}>
                        <StatusBadge status={floor.status} />
                      </td>
                      <td style={{
                        padding: "18px 16px",
                        borderBottom: `1px solid ${G.border}`,
                        textAlign: "center",
                      }}>
                        <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
                          <motion.button
                            onClick={() => handleEditOpen(floor)}
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            style={{
                              padding: "8px 16px",
                              background: "transparent",
                              color: G.gold,
                              fontFamily: "'Inter', sans-serif",
                              fontSize: "13px", fontWeight: 600,
                              border: `1px solid ${G.bGold}`,
                              borderRadius: "8px",
                              cursor: "pointer",
                              display: "flex", alignItems: "center", gap: "6px",
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
                            Edit
                          </motion.button>

                          <motion.button
                            onClick={() => handleDelete(floor._id)}
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            style={{
                              padding: "8px 16px",
                              background: "transparent",
                              color: "#ff4d4d",
                              fontFamily: "'Inter', sans-serif",
                              fontSize: "13px", fontWeight: 600,
                              border: "1px solid rgba(255,77,77,0.3)",
                              borderRadius: "8px",
                              cursor: "pointer",
                              display: "flex", alignItems: "center", gap: "6px",
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
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </div>

      {/* ---- EDIT DIALOG ---- */}
      <AnimatePresence>
        {openEdit && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              position: "fixed", inset: 0,
              background: "rgba(0,0,0,0.7)",
              backdropFilter: "blur(8px)",
              zIndex: 1000,
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: "24px",
            }}
            onClick={handleEditClose}
          >
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              transition={{ duration: 0.35, type: "spring", stiffness: 300, damping: 25 }}
              style={{
                background: G.black2,
                border: `1px solid ${G.border}`,
                borderRadius: "20px",
                width: "100%", maxWidth: "440px",
                maxHeight: "90vh", overflowY: "auto",
                position: "relative",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Gold top line */}
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: "2px",
                background: `linear-gradient(90deg, ${G.gold}, transparent)`,
              }} />

              {/* Header */}
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "28px 32px 0",
              }}>
                <div>
                  <div style={{
                    display: "inline-flex", alignItems: "center", gap: "8px",
                    fontSize: "11px", fontWeight: 700, letterSpacing: "0.18em",
                    textTransform: "uppercase", color: G.gold,
                    fontFamily: "'Inter', sans-serif", marginBottom: "6px",
                  }}>
                    <span style={{ width: "20px", height: "1px", background: G.gold }} />
                    Edit
                  </div>
                  <h2 style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: "1.5rem", fontWeight: 700,
                    color: G.white, lineHeight: 1.15,
                  }}>
                    Floor{" "}
                    <em style={{ fontStyle: "italic", color: G.gold }}>Details</em>
                  </h2>
                </div>
                <button
                  onClick={handleEditClose}
                  style={{
                    background: "transparent", border: "none",
                    cursor: "pointer", padding: "8px",
                    borderRadius: "8px",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                >
                  <IconClose />
                </button>
              </div>

              {/* Form */}
              <div style={{ padding: "24px 32px 32px", display: "flex", flexDirection: "column", gap: "4px" }}>
                <Field
                  label="Floor"
                  name="floor"
                  value={editData.floor}
                  onChange={handleEditChange}
                />
                <Field
                  label="Booth Name"
                  name="boothName"
                  value={editData.boothName}
                  onChange={handleEditChange}
                />
                <Field
                  label="Booth Size"
                  name="boothSize"
                  value={editData.boothSize}
                  onChange={handleEditChange}
                />
                <Field
                  label="Status"
                  name="status"
                  value={editData.status}
                  onChange={handleEditChange}
                />

                {/* Actions */}
                <div style={{ display: "flex", gap: "12px", marginTop: "12px" }}>
                  <button
                    onClick={handleEditClose}
                    style={{
                      flex: 1, padding: "15px",
                      background: "transparent",
                      color: G.w55,
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "13px", fontWeight: 700,
                      letterSpacing: "0.06em", textTransform: "uppercase",
                      border: `1px solid ${G.border}`,
                      borderRadius: "8px",
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = G.w30;
                      e.currentTarget.style.color = G.white;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = G.border;
                      e.currentTarget.style.color = G.w55;
                    }}
                  >
                    Cancel
                  </button>
                  <motion.button
                    onClick={handleUpdate}
                    whileHover={{ y: -2, boxShadow: "0 10px 24px rgba(201,168,76,0.35)" }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      flex: 1, padding: "15px",
                      background: G.gold,
                      color: "#000",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "13px", fontWeight: 700,
                      letterSpacing: "0.06em", textTransform: "uppercase",
                      border: "none",
                      borderRadius: "8px",
                      cursor: "pointer",
                      transition: "background 0.25s",
                    }}
                  >
                    Update
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}