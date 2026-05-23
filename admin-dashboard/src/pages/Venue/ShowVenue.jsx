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
// const DARK_NAVY = "#0D1B2A";

// function ShowVenues() {
//   const [venues, setVenues] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [successMsg, setSuccessMsg] = useState("");

//   // Edit Modal States
//   const [openEdit, setOpenEdit] = useState(false);
//   const [editData, setEditData] = useState({
//     _id: "",
//     venueName: "",
//     venueLocation: "",
//   });

//   const fetchVenues = async () => {
//     setLoading(true);
//     setError("");
//     try {
//       const res = await axios.get("http://localhost:3001/venue");
//       setVenues(res.data.venues || []);
//     } catch (err) {
//       console.error(err);
//       setError("Failed to fetch venues");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchVenues();
//   }, []);

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this venue?")) return;
//     try {
//       await axios.delete(`http://localhost:3001/venue/${id}`);
//       setVenues((prev) => prev.filter((venue) => venue._id !== id));
//       setSuccessMsg("Venue deleted successfully!");
//       setTimeout(() => setSuccessMsg(""), 2000);
//     } catch (err) {
//       setError("Failed to delete venue");
//       setTimeout(() => setError(""), 2000);
//     }
//   };

//   const handleEditOpen = (venue) => {
//     setEditData(venue);
//     setOpenEdit(true);
//   };

//   const handleEditClose = () => {
//     setOpenEdit(false);
//     setEditData({ _id: "", venueName: "", venueLocation: "" });
//   };

//   const handleEditChange = (e) => {
//     setEditData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleUpdate = async () => {
//     const { _id, venueName, venueLocation } = editData;
//     if (!venueName || !venueLocation) {
//       setError("Please fill all fields.");
//       return;
//     }

//     try {
//       const res = await axios.put(`http://localhost:3001/venue/${_id}`, {
//         venueName,
//         venueLocation,
//       });

//       if (res.data.success) {
//         setSuccessMsg("Venue updated successfully!");
//         setVenues((prev) => prev.map((item) => (item._id === _id ? res.data.venue : item)));
//         handleEditClose();
//         setTimeout(() => setSuccessMsg(""), 2000);
//       }
//     } catch (err) {
//       setError("Error updating venue");
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
//         <Typography mt={2} variant="subtitle1" sx={{ color: "#94A3B8" }}>
//           Loading Venues...
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
//           Manage Venues
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

//         {venues.length === 0 ? (
//           <Typography textAlign="center" sx={{ color: "#94A3B8", mt: 5 }}>
//             No venues found.
//           </Typography>
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
//                   {["Venue Name", "Venue Location", "Action"].map((heading) => (
//                     <TableCell
//                       key={heading}
//                       align={heading === "Action" ? "center" : "left"}
//                       sx={{
//                         color: "#A2EDFF !important",
//                         fontWeight: "900",
//                         fontSize: "1.1rem",
//                         textTransform: "uppercase",
//                         letterSpacing: "1.5px",
//                         borderBottom: "3px solid rgba(76, 201, 240, 0.4)",
//                         padding: "24px",
//                       }}
//                     >
//                       {heading}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {venues.map((venue) => (
//                   <TableRow
//                     key={venue._id}
//                     sx={{
//                       "&:hover": { backgroundColor: "rgba(76, 201, 240, 0.05)" },
//                       transition: "all 0.3s",
//                       "& td": { borderBottom: "1px solid rgba(255, 255, 255, 0.05)" },
//                     }}
//                   >
//                     <TableCell sx={{ color: "#F1F5F9", fontWeight: 500 }}>
//                       {venue.venueName}
//                     </TableCell>
//                     <TableCell sx={{ color: "#94A3B8" }}>{venue.venueLocation}</TableCell>
//                     <TableCell align="center">
//                       <Button
//                         variant="outlined"
//                         size="small"
//                         onClick={() => handleEditOpen(venue)}
//                         sx={{
//                           mr: 1,
//                           borderRadius: "8px",
//                           color: "#FFD700",
//                           borderColor: "rgba(255, 215, 0, 0.4)",
//                           fontWeight: "bold",
//                           textTransform: "none",
//                           "&:hover": {
//                             borderColor: "#FFD700",
//                             backgroundColor: "rgba(255, 215, 0, 0.1)",
//                           },
//                         }}
//                       >
//                         Edit
//                       </Button>
//                       <Button
//                         variant="outlined"
//                         size="small"
//                         onClick={() => handleDelete(venue._id)}
//                         sx={{
//                           borderRadius: "8px",
//                           color: "#FF4D4D",
//                           borderColor: "rgba(255, 77, 77, 0.4)",
//                           fontWeight: "bold",
//                           textTransform: "none",
//                           "&:hover": {
//                             borderColor: "#FF4D4D",
//                             backgroundColor: "rgba(255, 77, 77, 0.1)",
//                           },
//                         }}
//                       >
//                         Delete
//                       </Button>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         )}
//       </Box>

//       {/*  Edit Modal */}
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
//             color: "#4CC9F0",
//             textTransform: "uppercase",
//             textAlign: "center",
//           }}
//         >
//           Edit Venue Information
//         </DialogTitle>

//         <DialogContent>
//           {[
//             { label: "Venue Name", name: "venueName" },
//             { label: "Venue Location", name: "venueLocation" },
//           ].map((field) => (
//          <TextField
//   key={field.name}
//   margin="dense"
//   label={field.label.toUpperCase()}
//   name={field.name}
//   fullWidth
//   variant="outlined" 
//   value={editData[field.name]}
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
//       },
//     },
//     "& .MuiInputBase-input": {
//       padding: "16px",
//       fontWeight: "500",
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
//               textTransform: "none",
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
//               py: 1.5,
//               boxShadow: "0 8px 20px rgba(76, 201, 240, 0.3)",
//               textTransform: "none",
//               transition: "0.3s ease",
//               "&:hover": {
//                 background: "linear-gradient(90deg, #4895EF, #4CC9F0)",
//                 transform: "translateY(-2px)",
//                 boxShadow: "0 12px 25px rgba(76, 201, 240, 0.4)",
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

// export default ShowVenues;
import React, { useEffect, useState } from "react";
import axios from "axios";

// ─── THEME CONSTANTS ───────────────────────────────────────────────
const GOLD = "#C9A84C";
const GOLD_LIGHT = "#E8D5A3";
const GOLD_DARK = "#9A7B2E";
const BLACK = "#0A0A0A";
const BLACK_CARD = "#111111";
const BLACK_INPUT = "#1A1A1A";
const GRAY_TEXT = "#B0B0B0";

// ─── SVG ICONS ───────────────────────────────────────────────────
const BuildingIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 21h18" />
    <path d="M5 21V7l8-4 8 4v14" />
    <path d="M9 21v-6h6v6" />
    <path d="M10 9h4" />
    <path d="M10 13h4" />
  </svg>
);

const EditIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const TrashIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#FF6B6B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <line x1="10" y1="11" x2="10" y2="17" />
    <line x1="14" y1="11" x2="14" y2="17" />
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

const MapPinIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const PlusIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
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
        if (prev <= 0) { clearInterval(progressInterval); return 0; }
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

// ─── PREMIUM INPUT ────────────────────────────────────────────────
function PremiumInput({ label, name, value, onChange, type = "text", placeholder = "" }) {
  const [focused, setFocused] = useState(false);

  return (
    <div style={{ marginBottom: "20px" }}>
      <label
        style={{
          display: "block",
          color: GOLD,
          fontSize: "0.75rem",
          fontWeight: 700,
          letterSpacing: "2px",
          textTransform: "uppercase",
          marginBottom: "10px",
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        {label}
      </label>
      <div style={{ position: "relative" }}>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            width: "100%",
            padding: "14px 18px",
            background: BLACK_INPUT,
            border: `1px solid ${focused ? GOLD : "rgba(255,255,255,0.08)"}`,
            borderRadius: "12px",
            color: "#fff",
            fontSize: "0.95rem",
            fontFamily: "'Poppins', sans-serif",
            outline: "none",
            transition: "all 0.3s ease",
            boxShadow: focused ? `0 0 20px rgba(201,168,76,0.1), inset 0 1px 0 rgba(255,255,255,0.03)` : "none",
            boxSizing: "border-box",
          }}
        />
        {focused && (
          <div
            style={{
              position: "absolute",
              bottom: "-1px",
              left: "10%",
              right: "10%",
              height: "1px",
              background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
            }}
          />
        )}
      </div>
    </div>
  );
}

// ─── PREMIUM BUTTON ───────────────────────────────────────────────
function PremiumButton({ children, onClick, variant = "primary", disabled = false, loading = false, style = {} }) {
  const [hovered, setHovered] = useState(false);
  const isPrimary = variant === "primary";

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "14px 32px",
        borderRadius: "12px",
        fontSize: "0.9rem",
        fontWeight: 700,
        fontFamily: "'Poppins', sans-serif",
        letterSpacing: "1px",
        textTransform: "uppercase",
        cursor: disabled || loading ? "not-allowed" : "pointer",
        border: isPrimary ? "none" : `1px solid rgba(201,168,76,0.3)`,
        background: isPrimary
          ? hovered
            ? `linear-gradient(135deg, ${GOLD}, ${GOLD_DARK})`
            : `linear-gradient(135deg, ${GOLD_LIGHT}, ${GOLD})`
          : "transparent",
        color: isPrimary ? BLACK : GOLD,
        boxShadow: isPrimary && hovered
          ? `0 8px 30px rgba(201,168,76,0.35)`
          : isPrimary
          ? `0 4px 20px rgba(201,168,76,0.2)`
          : "none",
        transform: hovered && !disabled && !loading ? "translateY(-2px)" : "translateY(0)",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        opacity: disabled ? 0.5 : 1,
        ...style,
      }}
    >
      {children}
    </button>
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

// ─── MODAL COMPONENT ──────────────────────────────────────────────
function PremiumModal({ open, onClose, title, children, actions }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => setVisible(true), 30);
      return () => clearTimeout(timer);
    } else {
      setVisible(false);
    }
  }, [open]);

  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.75)",
          backdropFilter: "blur(8px)",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.4s ease",
        }}
      />

      {/* Modal Content */}
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "460px",
          transform: visible ? "scale(1) translateY(0)" : "scale(0.92) translateY(20px)",
          opacity: visible ? 1 : 0,
          transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
        <GlassCard style={{ padding: "32px" }}>
          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "28px",
            }}
          >
            <h2
              style={{
                margin: 0,
                color: GOLD,
                fontSize: "1.3rem",
                fontWeight: 700,
                fontFamily: "'Playfair Display', serif",
                fontStyle: "italic",
                letterSpacing: "1px",
              }}
            >
              {title}
            </h2>
            <button
              onClick={onClose}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "6px",
                borderRadius: "8px",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
            >
              <CloseIcon size={18} />
            </button>
          </div>

          {/* Body */}
          <div>{children}</div>

          {/* Actions */}
          {actions && (
            <div
              style={{
                display: "flex",
                gap: "12px",
                justifyContent: "flex-end",
                marginTop: "28px",
                paddingTop: "20px",
                borderTop: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              {actions}
            </div>
          )}
        </GlassCard>
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────
function ShowVenues() {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState({
    _id: "",
    venueName: "",
    venueLocation: "",
  });
  const [updateLoading, setUpdateLoading] = useState(false);

  const fetchVenues = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get("http://localhost:3001/venue");
      setVenues(res.data.venues || []);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch venues");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVenues();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this venue?")) return;
    try {
      await axios.delete(`http://localhost:3001/venue/${id}`);
      setVenues((prev) => prev.filter((venue) => venue._id !== id));
      setSuccessMsg("Venue deleted successfully!");
    } catch (err) {
      setError("Failed to delete venue");
    }
  };

  const handleEditOpen = (venue) => {
    setEditData(venue);
    setOpenEdit(true);
  };

  const handleEditClose = () => {
    setOpenEdit(false);
    setEditData({ _id: "", venueName: "", venueLocation: "" });
  };

  const handleEditChange = (e) => {
    setEditData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async () => {
    const { _id, venueName, venueLocation } = editData;
    if (!venueName || !venueLocation) {
      setError("Please fill all fields.");
      return;
    }

    setUpdateLoading(true);
    try {
      const res = await axios.put(`http://localhost:3001/venue/${_id}`, {
        venueName,
        venueLocation,
      });

      if (res.data.success) {
        setSuccessMsg("Venue updated successfully!");
        setVenues((prev) => prev.map((item) => (item._id === _id ? res.data.venue : item)));
        handleEditClose();
      }
    } catch (err) {
      setError("Error updating venue");
    } finally {
      setUpdateLoading(false);
    }
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
          Loading Venues
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

      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "14px", marginBottom: "16px" }}>
            <BuildingIcon size={28} />
            <span
              style={{
                color: GOLD,
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "4px",
                textTransform: "uppercase",
              }}
            >
              Venue Management
            </span>
          </div>
          <h1
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
            Manage Venues
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

        {/* Add Venue Button */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "24px" }}>
          <button
            onClick={() => window.location.href = "/addVenue"}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 24px",
              borderRadius: "12px",
              border: `1px solid ${GOLD}`,
              background: "rgba(201,168,76,0.1)",
              color: GOLD,
              fontSize: "0.85rem",
              fontWeight: 700,
              fontFamily: "'Poppins', sans-serif",
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = GOLD;
              e.currentTarget.style.color = BLACK;
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 8px 25px rgba(201,168,76,0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(201,168,76,0.1)";
              e.currentTarget.style.color = GOLD;
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <PlusIcon size={16} />
            Add Venue
          </button>
        </div>

        {/* Toasts */}
        {error && <PremiumToast message={error} type="error" onClose={() => setError("")} />}
        {successMsg && <PremiumToast message={successMsg} type="success" onClose={() => setSuccessMsg("")} />}

        {/* Content */}
        {venues.length === 0 ? (
          <GlassCard>
            <div style={{ padding: "60px 20px", textAlign: "center" }}>
              <BuildingIcon size={48} />
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
                No Venues Found
              </p>
              <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.9rem" }}>
                Add your first venue to get started.
              </p>
            </div>
          </GlassCard>
        ) : (
          <GlassCard>
            {/* Table Header */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 180px",
                padding: "20px 28px",
                borderBottom: "1px solid rgba(201,168,76,0.1)",
                background: "linear-gradient(90deg, rgba(201,168,76,0.03), transparent)",
              }}
            >
              {["Venue Name", "Venue Location", "Actions"].map((heading, i) => (
                <div
                  key={heading}
                  style={{
                    color: GOLD,
                    fontSize: "0.72rem",
                    fontWeight: 800,
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    textAlign: i === 2 ? "center" : "left",
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  {heading}
                </div>
              ))}
            </div>

            {/* Table Body */}
            {venues.map((venue, index) => (
              <div
                key={venue._id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 180px",
                  alignItems: "center",
                  padding: "18px 28px",
                  borderBottom:
                    index < venues.length - 1
                      ? "1px solid rgba(255,255,255,0.03)"
                      : "none",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(201,168,76,0.04)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                }}
              >
                {/* Venue Name */}
                <div
                  style={{
                    color: "#fff",
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    fontFamily: "'Poppins', sans-serif",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <BuildingIcon size={16} />
                  {venue.venueName}
                </div>

                {/* Venue Location */}
                <div
                  style={{
                    color: GRAY_TEXT,
                    fontSize: "0.9rem",
                    fontFamily: "'Poppins', sans-serif",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <MapPinIcon size={14} />
                  {venue.venueLocation}
                </div>

                {/* Actions */}
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    justifyContent: "center",
                  }}
                >
                  <button
                    onClick={() => handleEditOpen(venue)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "8px 16px",
                      borderRadius: "10px",
                      border: `1px solid rgba(201,168,76,0.25)`,
                      background: "transparent",
                      color: GOLD,
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      fontFamily: "'Poppins', sans-serif",
                      cursor: "pointer",
                      transition: "all 0.25s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(201,168,76,0.1)";
                      e.currentTarget.style.borderColor = GOLD;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.borderColor = "rgba(201,168,76,0.25)";
                    }}
                  >
                    <EditIcon size={14} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(venue._id)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "8px 16px",
                      borderRadius: "10px",
                      border: "1px solid rgba(255,107,107,0.25)",
                      background: "transparent",
                      color: "#FF6B6B",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      fontFamily: "'Poppins', sans-serif",
                      cursor: "pointer",
                      transition: "all 0.25s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(255,107,107,0.1)";
                      e.currentTarget.style.borderColor = "#FF6B6B";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.borderColor = "rgba(255,107,107,0.25)";
                    }}
                  >
                    <TrashIcon size={14} />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </GlassCard>
        )}
      </div>

      {/* Edit Modal */}
      <PremiumModal
        open={openEdit}
        onClose={handleEditClose}
        title="Edit Venue"
        actions={
          <>
            <PremiumButton variant="secondary" onClick={handleEditClose}>
              Cancel
            </PremiumButton>
            <PremiumButton
              onClick={handleUpdate}
              loading={updateLoading}
              disabled={updateLoading}
            >
              {updateLoading ? "Updating..." : "Update Venue"}
            </PremiumButton>
          </>
        }
      >
        <PremiumInput
          label="Venue Name"
          name="venueName"
          value={editData.venueName}
          onChange={handleEditChange}
          placeholder="Enter venue name"
        />
        <PremiumInput
          label="Venue Location"
          name="venueLocation"
          value={editData.venueLocation}
          onChange={handleEditChange}
          placeholder="Enter venue location"
        />
      </PremiumModal>
    </div>
  );
}

export default ShowVenues;