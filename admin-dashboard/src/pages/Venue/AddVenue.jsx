// import React, { useState } from "react";
// import { Box, TextField, Button, Typography, Alert, Paper, CircularProgress } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// // Theme Constants
// const NEON_CYAN = "#4CC9F0";

// function AddVenue() {
//   const [formData, setFormData] = useState({
//     venueName: "",
//     venueLocation: "",
//   });

//   const [alert, setAlert] = useState({ success: true, message: "" });
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const { venueName, venueLocation } = formData;

//     if (!venueName || !venueLocation) {
//       setAlert({ success: false, message: "Please fill all fields" });
//       return;
//     }

//     setLoading(true);

//     try {
//       const res = await axios.post("http://localhost:3001/venue", formData);

//       if (res.data.success) {
//         setAlert({ success: true, message: "Venue added successfully!" });
//         setFormData({ venueName: "", venueLocation: "" });

//         setTimeout(() => {
//           navigate("/showVenue");
//         }, 1500);
//       } else {
//         setAlert({ success: false, message: res.data.message });
//       }
//     } catch (error) {
//       console.error(error);
//       setAlert({
//         success: false,
//         message: error.response?.data?.message || "Something went wrong!",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         background: "radial-gradient(circle at top right, #1B263B, #0D1B2A)",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         p: 2,
//       }}
//     >
//       <Paper
//         elevation={24}
//         sx={{
//           width: "100%",
//           maxWidth: 450,
//           p: 5,
//           borderRadius: "30px",
//           background: "rgba(13, 27, 42, 0.9)",
//           backdropFilter: "blur(15px)",
//           border: "1px solid rgba(255, 255, 255, 0.1)",
//           boxShadow: "0 25px 50px rgba(0,0,0,0.6)",
//         }}
//       >
//         {/* Dashboard  Heading*/}
//         <Typography
//           variant="h4"
//           sx={{
//             fontWeight: 900,
//             fontFamily: "'Poppins', sans-serif",
//             textAlign: "center",
//             textTransform: "uppercase",
//             letterSpacing: "2px",
//             mb: 4,
//             background: "linear-gradient(90deg, #4CC9F0, #4895EF, #F72585)",
//             WebkitBackgroundClip: "text",
//             WebkitTextFillColor: "transparent",
//             filter: "drop-shadow(0px 4px 8px rgba(76, 201, 240, 0.3))",
//           }}
//         >
//           Add New Venue
//         </Typography>

//         {alert.message && (
//           <Alert
//             severity={alert.success ? "success" : "error"}
//             sx={{ mb: 3, borderRadius: "12px", fontWeight: "bold" }}
//           >
//             {alert.message}
//           </Alert>
//         )}

//         <form onSubmit={handleSubmit}>
//           {[
//             { label: "Venue Name", name: "venueName", type: "text" },
//             { label: "Venue Location", name: "venueLocation", type: "text" },
//           ].map((field) => (
//             <TextField
//               key={field.name}
//               fullWidth
//               label={field.label}
//               name={field.name}
//               type={field.type}
//               value={formData[field.name]}
//               onChange={handleChange}
//               margin="normal"
//               required
//               variant="filled"
//               sx={{
//                 mb: 2,
//                 "& .MuiFilledInput-root": {
//                   backgroundColor: "rgba(255, 255, 255, 0.05)",
//                   color: "#fff",
//                   borderRadius: "12px",
//                   "&:before, &:after": { display: "none" },
//                   border: "1px solid rgba(76, 201, 240, 0.2)",
//                   transition: "0.3s",
//                   "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.08)" },
//                   "&.Mui-focused": {
//                     border: `2px solid ${NEON_CYAN}`,
//                     boxShadow: `0 0 15px ${NEON_CYAN}44`,
//                   },
//                 },
//                 "& .MuiInputLabel-root": { color: "#94A3B8" },
//                 "& .MuiInputLabel-root.Mui-focused": { color: NEON_CYAN },
//               }}
//             />
//           ))}

//           {/* Action Button */}
//           <Button
//             type="submit"
//             variant="contained"
//             fullWidth
//             disabled={loading}
//             sx={{
//               py: 2,
//               fontSize: 18,
//               fontWeight: 800,
//               borderRadius: "18px",
//               textTransform: "none",
//               background: "linear-gradient(90deg, #4895EF, #4CC9F0)",
//               boxShadow: "0 12px 30px rgba(76, 201, 240, 0.3)",
//               transition: "all 0.4s ease",
//               mt: 3,
//               "&:hover": {
//                 transform: "translateY(-4px)",
//                 boxShadow: "0 18px 45px rgba(76, 201, 240, 0.5)",
//                 background: "linear-gradient(90deg, #4CC9F0, #4895EF)",
//               },
//               "&:disabled": {
//                 background: "rgba(255, 255, 255, 0.1)",
//                 color: "rgba(255, 255, 255, 0.3)",
//               },
//             }}
//           >
//             {loading ? (
//               <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//                 <CircularProgress size={20} sx={{ color: "#fff" }} />
//                 <Typography variant="body1" fontWeight={800}>
//                   Registering...
//                 </Typography>
//               </Box>
//             ) : (
//               "Register Venue"
//             )}
//           </Button>
//         </form>
//       </Paper>
//     </Box>
//   );
// }

// export default AddVenue;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
const BuildingIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 21h18" />
    <path d="M5 21V7l8-4 8 4v14" />
    <path d="M9 21v-6h6v6" />
    <path d="M10 9h4" />
    <path d="M10 13h4" />
  </svg>
);

const MapPinIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
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

const ArrowLeftIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
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
function PremiumInput({ label, name, value, onChange, type = "text", placeholder = "", icon = null }) {
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
        {icon && (
          <div
            style={{
              position: "absolute",
              left: "16px",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 2,
              opacity: focused ? 1 : 0.5,
              transition: "opacity 0.3s",
            }}
          >
            {icon}
          </div>
        )}
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
            padding: icon ? "14px 18px 14px 48px" : "14px 18px",
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
function PremiumButton({ children, onClick, type = "button", variant = "primary", disabled = false, loading = false, style = {} }) {
  const [hovered, setHovered] = useState(false);
  const isPrimary = variant === "primary";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: "100%",
        padding: "16px 32px",
        borderRadius: "14px",
        fontSize: "0.95rem",
        fontWeight: 800,
        fontFamily: "'Poppins', sans-serif",
        letterSpacing: "1.5px",
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
      {loading ? (
        <>
          <div
            style={{
              width: "20px",
              height: "20px",
              border: `2px solid rgba(201,168,76,0.15)`,
              borderTop: `2px solid ${isPrimary ? BLACK : GOLD}`,
              borderRadius: "50%",
              animation: "spin 0.8s linear infinite",
            }}
          />
          <span>Registering...</span>
        </>
      ) : (
        children
      )}
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

// ─── MAIN COMPONENT ───────────────────────────────────────────────
function AddVenue() {
  const [formData, setFormData] = useState({
    venueName: "",
    venueLocation: "",
  });

  const [alert, setAlert] = useState({ success: true, message: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { venueName, venueLocation } = formData;

    if (!venueName || !venueLocation) {
      setAlert({ success: false, message: "Please fill all fields" });
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post("http://localhost:3001/venue", formData);

      if (res.data.success) {
        setAlert({ success: true, message: "Venue added successfully!" });
        setFormData({ venueName: "", venueLocation: "" });

        setTimeout(() => {
          navigate("/showVenue");
        }, 1500);
      } else {
        setAlert({ success: false, message: res.data.message });
      }
    } catch (error) {
      console.error(error);
      setAlert({
        success: false,
        message: error.response?.data?.message || "Something went wrong!",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: BLACK,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=Poppins:wght@300;400;500;600;700;800;900&display=swap');
      `}</style>

      {/* Toast */}
      {alert.message && (
        <PremiumToast
          message={alert.message}
          type={alert.success ? "success" : "error"}
          onClose={() => setAlert({ ...alert, message: "" })}
        />
      )}

      <GlassCard style={{ width: "100%", maxWidth: "480px", padding: "40px" }}>
        {/* Back Button */}
        <button
          onClick={() => navigate("/showVenue")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "none",
            border: "none",
            color: GRAY_TEXT,
            fontSize: "0.85rem",
            fontWeight: 600,
            fontFamily: "'Poppins', sans-serif",
            cursor: "pointer",
            marginBottom: "24px",
            padding: "4px 0",
            transition: "color 0.3s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = GOLD)}
          onMouseLeave={(e) => (e.currentTarget.style.color = GRAY_TEXT)}
        >
          <ArrowLeftIcon size={16} />
          Back to Venues
        </button>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "16px",
              background: "rgba(201,168,76,0.08)",
              border: `1px solid rgba(201,168,76,0.15)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px",
            }}
          >
            <BuildingIcon size={32} />
          </div>
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
          <h1
            style={{
              margin: "12px 0 0 0",
              color: "#fff",
              fontSize: "1.8rem",
              fontWeight: 700,
              fontFamily: "'Playfair Display', serif",
              fontStyle: "italic",
              letterSpacing: "1px",
            }}
          >
            Add New Venue
          </h1>
          <div
            style={{
              width: "60px",
              height: "2px",
              background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
              margin: "16px auto 0",
            }}
          />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <PremiumInput
            label="Venue Name"
            name="venueName"
            value={formData.venueName}
            onChange={handleChange}
            placeholder="Enter venue name"
            icon={<BuildingIcon size={18} />}
          />

          <PremiumInput
            label="Venue Location"
            name="venueLocation"
            value={formData.venueLocation}
            onChange={handleChange}
            placeholder="Enter venue location"
            icon={<MapPinIcon size={18} />}
          />

          <div style={{ marginTop: "8px" }}>
            <PremiumButton type="submit" loading={loading} disabled={loading}>
              Register Venue
            </PremiumButton>
          </div>
        </form>
      </GlassCard>
    </div>
  );
}

export default AddVenue;