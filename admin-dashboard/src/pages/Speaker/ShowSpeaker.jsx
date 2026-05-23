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

// // Theme Constants
// const NEON_CYAN = "#4CC9F0";
// const DARK_NAVY = "#0D1B2A";

// function ShowSpeaker() {
//   const [speakers, setSpeakers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [successMsg, setSuccessMsg] = useState("");

//   const [openEdit, setOpenEdit] = useState(false);
//   const [editData, setEditData] = useState({
//     _id: "",
//     name: "",
//     image: null,
//     existingImage: "",
//   });

//   const fetchSpeakers = async () => {
//     setLoading(true);
//     setError("");
//     try {
//       const res = await axios.get("http://localhost:3001/speaker");
//       setSpeakers(res.data.speakers || []);
//     } catch (err) {
//       console.error(err);
//       setError("Failed to fetch speakers");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchSpeakers();
//   }, []);

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this speaker?")) return;
//     try {
//       await axios.delete(`http://localhost:3001/speaker/${id}`);
//       setSpeakers((prev) => prev.filter((speaker) => speaker._id !== id));
//       setSuccessMsg("Speaker deleted successfully!");
//       setTimeout(() => setSuccessMsg(""), 2000);
//     } catch (err) {
//       setError("Failed to delete speaker");
//       setTimeout(() => setError(""), 2000);
//     }
//   };

//   const handleEditOpen = (speaker) => {
//     setEditData({
//       _id: speaker._id,
//       name: speaker.name,
//       image: null,
//       existingImage: speaker.image,
//     });
//     setOpenEdit(true);
//   };

//   const handleEditClose = () => {
//     setOpenEdit(false);
//     setEditData({ _id: "", name: "", image: null, existingImage: "" });
//   };

//   const handleEditChange = (e) => {
//     setEditData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleImageChange = (e) => {
//     setEditData((prev) => ({ ...prev, image: e.target.files[0] }));
//   };

//   const handleUpdate = async () => {
//     const { _id, name, image } = editData;
//     if (!name) {
//       setError("Please provide a name.");
//       return;
//     }

//     try {
//       const data = new FormData();
//       data.append("name", name);
//       if (image) data.append("image", image);

//       const res = await axios.put(`http://localhost:3001/speaker/${_id}`, data, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       if (res.data.success) {
//         setSuccessMsg("Speaker updated successfully!");
//         setSpeakers((prev) => prev.map((item) => (item._id === _id ? res.data.speaker : item)));
//         handleEditClose();
//         setTimeout(() => setSuccessMsg(""), 2000);
//       }
//     } catch (err) {
//       setError("Error updating speaker");
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
//           Loading Speakers...
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
//         {/*Heading */}
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
//           Event Speakers
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
//             boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
//             overflow: "hidden",
//           }}
//         >
//           <Table>
//             <TableHead>
//               <TableRow sx={{ background: "linear-gradient(90deg, #1B263B, #0D1B2A)" }}>
//                 {["Name", "Image", "Action"].map((heading) => (
//                   <TableCell
//                     key={heading}
//                     align={heading === "Action" ? "center" : "left"}
//                     sx={{
//                       color: "#A2EDFF !important",
//                       fontWeight: "900",
//                       fontSize: "1.1rem",
//                       textTransform: "uppercase",
//                       letterSpacing: "1.5px",
//                       borderBottom: "3px solid rgba(76, 201, 240, 0.4)",
//                       padding: "24px",
//                     }}
//                   >
//                     {heading}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {speakers.map((speaker) => (
//                 <TableRow
//                   key={speaker._id}
//                   sx={{
//                     "&:hover": { backgroundColor: "rgba(76, 201, 240, 0.05)" },
//                     transition: "all 0.3s",
//                     "& td": { borderBottom: "1px solid rgba(255, 255, 255, 0.05)" },
//                   }}
//                 >
//                   <TableCell sx={{ color: "#F1F5F9", fontWeight: 500 }}>{speaker.name}</TableCell>
//                   <TableCell>
//                     {speaker.image ? (
//                       <img
//                         src={`http://localhost:3001/uploads/${speaker.image}`}
//                         alt={speaker.name}
//                         style={{
//                           width: 60,
//                           height: 60,
//                           objectFit: "cover",
//                           borderRadius: "12px",
//                           border: "1px solid rgba(255,255,255,0.1)",
//                         }}
//                       />
//                     ) : (
//                       "No Image"
//                     )}
//                   </TableCell>
//                   <TableCell align="center">
//                     {/* Edit Button */}
//                     <Button
//                       variant="outlined"
//                       size="small"
//                       onClick={() => handleEditOpen(speaker)}
//                       sx={{
//                         mr: 1,
//                         borderRadius: "8px",
//                         color: "#FFD700",
//                         borderColor: "rgba(255, 215, 0, 0.4)",
//                         fontWeight: "bold",
//                         textTransform: "none",
//                         "&:hover": {
//                           borderColor: "#FFD700",
//                           backgroundColor: "rgba(255, 215, 0, 0.1)",
//                         },
//                       }}
//                     >
//                       Edit
//                     </Button>
//                     {/*Delete Button */}
//                     <Button
//                       variant="outlined"
//                       size="small"
//                       onClick={() => handleDelete(speaker._id)}
//                       sx={{
//                         borderRadius: "8px",
//                         color: "#FF4D4D",
//                         borderColor: "rgba(255, 77, 77, 0.4)",
//                         fontWeight: "bold",
//                         textTransform: "none",
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

//       {/*   Edit Modal */}
//       <Dialog
//         open={openEdit}
//         onClose={handleEditClose}
//         PaperProps={{
//           sx: {
//             background: "#0D1B2A", // Same background as floor dialog
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
//           Edit Speaker Details
//         </DialogTitle>

//         <DialogContent>
//        <TextField
//   margin="dense"
//   label="SPEAKER NAME"
//   name="name"
//   fullWidth
//   // Outlined variant use karein, ye neon theme par zyada suit karta hai
//   variant="outlined" 
//   value={editData.name}
//   onChange={handleEditChange}
//   // Label ko hamesha upar rakhne ke liye
//   InputLabelProps={{
//     shrink: true,
//     sx: {
//       color: NEON_CYAN,
//       fontWeight: "900",
//       letterSpacing: "1px",
//       fontSize: "0.85rem",
//       backgroundColor: "#0D1B2A", // Background color match karein taake border line chhup jaye
//       px: 1, // Label ke side par thodi jagah
//       "&.Mui-focused": {
//         color: NEON_CYAN,
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
//         borderColor: NEON_CYAN,
//       },
//       "&.Mui-focused fieldset": {
//         borderColor: NEON_CYAN,
//         borderWidth: "2px",
//       },
//     },
//     // Input text ki padding sahi karne ke liye
//     "& .MuiInputBase-input": {
//       padding: "16px",
//     },
//   }}
// />

//           {/* Image Upload Button */}
//           <Button
//             variant="outlined"
//             component="label"
//             fullWidth
//             sx={{
//               mt: 2,
//               py: 1.5,
//               color: NEON_CYAN,
//               borderColor: "rgba(76, 201, 240, 0.5)",
//               borderRadius: "12px",
//               fontWeight: "bold",
//               textTransform: "none",
//               borderWidth: "1px",
//               "&:hover": {
//                 borderColor: NEON_CYAN,
//                 backgroundColor: "rgba(76, 201, 240, 0.05)",
//                 borderWidth: "1px",
//               },
//             }}
//           >
//             Upload New Image
//             <input type="file" hidden accept="image/*" onChange={handleImageChange} />
//           </Button>
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

// export default ShowSpeaker;
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
const MicIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
    <line x1="12" y1="19" x2="12" y2="23" />
    <line x1="8" y1="23" x2="16" y2="23" />
  </svg>
);

const UploadIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
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

// ─── PREMIUM TOAST COMPONENT ──────────────────────────────────────
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
        {/* Glow effect */}
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

        {/* Icon */}
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

        {/* Message */}
        <div style={{ flex: 1 }}>
          <p
            style={{
              margin: 0,
              color: "#fff",
              fontSize: "0.95rem",
              fontWeight: 600,
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            {isSuccess ? "Success!" : "Error!"}
          </p>
          <p
            style={{
              margin: "4px 0 0 0",
              color: GRAY_TEXT,
              fontSize: "0.82rem",
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            {message}
          </p>
        </div>

        {/* Close button */}
        <button
          onClick={() => {
            setVisible(false);
            setTimeout(onClose, 400);
          }}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "4px",
            borderRadius: "6px",
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) => (e.target.style.background = "rgba(255,255,255,0.05)")}
          onMouseLeave={(e) => (e.target.style.background = "none")}
        >
          <CloseIcon size={16} />
        </button>

        {/* Progress bar */}
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

// ─── GLASS CARD COMPONENT ─────────────────────────────────────────
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
      {/* Top gold glow line */}
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
              animation: "fadeIn 0.3s ease",
            }}
          />
        )}
      </div>
    </div>
  );
}

// ─── FILE UPLOAD ZONE ─────────────────────────────────────────────
function FileUploadZone({ onChange, fileName, label = "Upload Image" }) {
  const [isDragOver, setIsDragOver] = useState(false);

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
      <label
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragOver(false);
          if (e.dataTransfer.files[0]) {
            onChange({ target: { files: e.dataTransfer.files } });
          }
        }}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "28px 20px",
          background: isDragOver ? "rgba(201,168,76,0.05)" : BLACK_INPUT,
          border: `2px dashed ${isDragOver ? GOLD : "rgba(255,255,255,0.1)"}`,
          borderRadius: "16px",
          cursor: "pointer",
          transition: "all 0.3s ease",
          gap: "10px",
        }}
      >
        <UploadIcon size={28} />
        <span
          style={{
            color: isDragOver ? GOLD : GRAY_TEXT,
            fontSize: "0.9rem",
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 500,
            transition: "color 0.3s",
          }}
        >
          {fileName || "Drag & drop or click to upload"}
        </span>
        <span
          style={{
            color: "rgba(255,255,255,0.3)",
            fontSize: "0.75rem",
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          Supports: JPG, PNG, WebP
        </span>
        <input
          type="file"
          hidden
          accept="image/*"
          onChange={onChange}
        />
      </label>
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
          ? `0 8px 30px rgba(201,168,76,0.35), 0 0 60px rgba(201,168,76,0.1)`
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
      {loading ? <PremiumSpinner size={18} /> : children}
    </button>
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
function ShowSpeaker() {
  const [speakers, setSpeakers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [openEdit, setOpenEdit] = useState(false);
  const [editData, setEditData] = useState({
    _id: "",
    name: "",
    image: null,
    existingImage: "",
  });
  const [updateLoading, setUpdateLoading] = useState(false);

  const fetchSpeakers = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get("http://localhost:3001/speaker");
      setSpeakers(res.data.speakers || []);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch speakers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSpeakers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this speaker?")) return;
    try {
      await axios.delete(`http://localhost:3001/speaker/${id}`);
      setSpeakers((prev) => prev.filter((speaker) => speaker._id !== id));
      setSuccessMsg("Speaker deleted successfully!");
    } catch (err) {
      setError("Failed to delete speaker");
    }
  };

  const handleEditOpen = (speaker) => {
    setEditData({
      _id: speaker._id,
      name: speaker.name,
      image: null,
      existingImage: speaker.image,
    });
    setOpenEdit(true);
  };

  const handleEditClose = () => {
    setOpenEdit(false);
    setEditData({ _id: "", name: "", image: null, existingImage: "" });
  };

  const handleEditChange = (e) => {
    setEditData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e) => {
    setEditData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleUpdate = async () => {
    const { _id, name, image } = editData;
    if (!name) {
      setError("Please provide a name.");
      return;
    }

    setUpdateLoading(true);
    try {
      const data = new FormData();
      data.append("name", name);
      if (image) data.append("image", image);

      const res = await axios.put(`http://localhost:3001/speaker/${_id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        setSuccessMsg("Speaker updated successfully!");
        setSpeakers((prev) => prev.map((item) => (item._id === _id ? res.data.speaker : item)));
        handleEditClose();
      }
    } catch (err) {
      setError("Error updating speaker");
    } finally {
      setUpdateLoading(false);
    }
  };

  // ─── LOADING SCREEN ─────────────────────────────────────────────
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
          Loading Speakers
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
      {/* Global Styles */}
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=Poppins:wght@300;400;500;600;700;800;900&display=swap');
      `}</style>

      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        {/* ─── HEADER ─────────────────────────────────────────────── */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "14px",
              marginBottom: "16px",
            }}
          >
            <MicIcon size={28} />
            <span
              style={{
                color: GOLD,
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "4px",
                textTransform: "uppercase",
              }}
            >
              Event Management
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
            Event Speakers
          </h1> */}
          <h1 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 700,
            color: G.white, lineHeight: 1.1, marginBottom: "12px",
            letterSpacing: "-0.01em",
          }}>
            Event <span style={{ color: G.gold, fontStyle: "italic" }}>Speakers</span>
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

        {/* ─── TOASTS ─────────────────────────────────────────────── */}
        {error && (
          <PremiumToast
            message={error}
            type="error"
            onClose={() => setError("")}
          />
        )}
        {successMsg && (
          <PremiumToast
            message={successMsg}
            type="success"
            onClose={() => setSuccessMsg("")}
          />
        )}

        {/* ─── TABLE ──────────────────────────────────────────────── */}
        <GlassCard>
          {/* Table Header */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 120px 180px",
              padding: "20px 28px",
              borderBottom: "1px solid rgba(201,168,76,0.1)",
              background: "linear-gradient(90deg, rgba(201,168,76,0.03), transparent)",
            }}
          >
            {["Speaker Name", "Image", "Actions"].map((heading, i) => (
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
          {speakers.length === 0 ? (
            <div
              style={{
                padding: "60px 20px",
                textAlign: "center",
                color: GRAY_TEXT,
              }}
            >
              <MicIcon size={40} />
              <p style={{ marginTop: "16px", fontSize: "0.95rem" }}>No speakers found</p>
            </div>
          ) : (
            speakers.map((speaker, index) => (
              <div
                key={speaker._id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 120px 180px",
                  alignItems: "center",
                  padding: "18px 28px",
                  borderBottom:
                    index < speakers.length - 1
                      ? "1px solid rgba(255,255,255,0.03)"
                      : "none",
                  transition: "all 0.3s ease",
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(201,168,76,0.03)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                }}
              >
                {/* Name */}
                <div
                  style={{
                    color: "#fff",
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  {speaker.name}
                </div>

                {/* Image */}
                <div>
                  {speaker.image ? (
                    <img
                      src={`http://localhost:3001/uploads/${speaker.image}`}
                      alt={speaker.name}
                      style={{
                        width: "52px",
                        height: "52px",
                        objectFit: "cover",
                        borderRadius: "12px",
                        border: `1px solid rgba(201,168,76,0.2)`,
                        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: "52px",
                        height: "52px",
                        borderRadius: "12px",
                        background: BLACK_INPUT,
                        border: `1px dashed rgba(255,255,255,0.1)`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "rgba(255,255,255,0.3)",
                        fontSize: "0.7rem",
                      }}
                    >
                      No Img
                    </div>
                  )}
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
                    onClick={() => handleEditOpen(speaker)}
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
                    onClick={() => handleDelete(speaker._id)}
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
            ))
          )}
        </GlassCard>
      </div>

      {/* ─── EDIT MODAL ───────────────────────────────────────────── */}
      <PremiumModal
        open={openEdit}
        onClose={handleEditClose}
        title="Edit Speaker"
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
              {updateLoading ? "Updating..." : "Update Speaker"}
            </PremiumButton>
          </>
        }
      >
        <PremiumInput
          label="Speaker Name"
          name="name"
          value={editData.name}
          onChange={handleEditChange}
          placeholder="Enter speaker name"
        />

        {/* Current Image Preview */}
        {editData.existingImage && !editData.image && (
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
              Current Image
            </label>
            <div
              style={{
                display: "inline-block",
                padding: "4px",
                borderRadius: "14px",
                border: `1px solid rgba(201,168,76,0.15)`,
                background: BLACK_INPUT,
              }}
            >
              <img
                src={`http://localhost:3001/uploads/${editData.existingImage}`}
                alt="Current"
                style={{
                  width: "80px",
                  height: "80px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  display: "block",
                }}
              />
            </div>
          </div>
        )}

        <FileUploadZone
          onChange={handleImageChange}
          fileName={editData.image?.name}
          label="Upload New Image"
        />
      </PremiumModal>
    </div>
  );
}

export default ShowSpeaker;
