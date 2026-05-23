// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   TextField,
//   Button,
//   Typography,
//   MenuItem,
//   Alert,
//   Paper,
//   CircularProgress,
//   Grid,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// // Theme Constants
// const NEON_CYAN = "#4CC9F0";

// function AddExpo() {
//   const [formData, setFormData] = useState({
//     title: "",
//     date: "",
//     venue: "",
//     description: "",
//     theme: "",
//     startTime: "",
//     endTime: "",
//     speaker: "",
//   });

//   const [image, setImage] = useState(null);
//   const [alert, setAlert] = useState({ success: true, message: "" });
//   const [loading, setLoading] = useState(false);
//   const [venues, setVenues] = useState([]);
//   const [speakers, setSpeakers] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const venueRes = await axios.get("http://localhost:3001/venue");
//         if (venueRes.data.success) setVenues(venueRes.data.venues);

//         const speakerRes = await axios.get("http://localhost:3001/speaker");
//         if (speakerRes.data.success) setSpeakers(speakerRes.data.speakers);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     fetchData();
//   }, []);

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleImageChange = (e) => {
//     setImage(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const { title, date, venue, startTime } = formData;

//     if (!title || !date || !venue || !startTime) {
//       setAlert({ success: false, message: "Required fields: Title, Date, Venue, Start Time" });
//       return;
//     }

//     setLoading(true);
//     try {
//       const data = new FormData();
//       Object.entries(formData).forEach(([key, value]) => data.append(key, value));
//       if (image) data.append("image", image);

//       const res = await axios.post("http://localhost:3001/expo/create", data, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       if (res.data.success) {
//         setAlert({ success: true, message: "Expo created successfully!" });
//         setTimeout(() => navigate("/showExpo"), 1500);
//       } else {
//         setAlert({ success: false, message: res.data.message });
//       }
//     } catch (error) {
//       setAlert({ success: false, message: "Something went wrong!" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Reusable Input Style
//   const inputStyle = {
//     "& .MuiFilledInput-root": {
//       backgroundColor: "rgba(255, 255, 255, 0.05)",
//       color: "#fff",
//       borderRadius: "12px",
//       "&:before, &:after": { display: "none" },
//       border: "1px solid rgba(76, 201, 240, 0.2)",
//       "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.08)" },
//       "&.Mui-focused": {
//         border: `2px solid ${NEON_CYAN}`,
//         boxShadow: `0 0 15px ${NEON_CYAN}44`,
//       },
//     },
//     "& .MuiInputLabel-root": { color: "#94A3B8" },
//     "& .MuiInputLabel-root.Mui-focused": { color: NEON_CYAN },
//     "& .MuiSelect-icon": { color: NEON_CYAN },
//   };

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         background: "radial-gradient(circle at top right, #1B263B, #0D1B2A)",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         p: 3,
//       }}
//     >
//       <Paper
//         elevation={24}
//         sx={{
//           width: "100%",
//           maxWidth: 700,
//           p: { xs: 3, md: 5 },
//           borderRadius: "30px",
//           background: "rgba(13, 27, 42, 0.9)",
//           backdropFilter: "blur(15px)",
//           border: "1px solid rgba(255, 255, 255, 0.1)",
//           boxShadow: "0 25px 50px rgba(0,0,0,0.6)",
//         }}
//       >
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
//           Create New Expo
//         </Typography>

//         {alert.message && (
//           <Alert
//             severity={alert.success ? "success" : "error"}
//             sx={{ mb: 3, borderRadius: "12px" }}
//           >
//             {alert.message}
//           </Alert>
//         )}

//         <form onSubmit={handleSubmit}>
//           <Grid container spacing={2}>
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 label="Expo Title"
//                 name="title"
//                 variant="filled"
//                 value={formData.title}
//                 onChange={handleChange}
//                 required
//                 sx={inputStyle}
//               />
//             </Grid>

//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 label="Date"
//                 name="date"
//                 type="date"
//                 variant="filled"
//                 value={formData.date}
//                 onChange={handleChange}
//                 InputLabelProps={{ shrink: true }}
//                 inputProps={{ min: new Date().toISOString().split("T")[0] }}
//                 required
//                 sx={inputStyle}
//               />
//             </Grid>

//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 label="Theme"
//                 name="theme"
//                 variant="filled"
//                 value={formData.theme}
//                 onChange={handleChange}
//                 sx={inputStyle}
//               />
//             </Grid>

//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 label="Start Time"
//                 name="startTime"
//                 type="time"
//                 variant="filled"
//                 value={formData.startTime}
//                 onChange={handleChange}
//                 InputLabelProps={{ shrink: true }}
//                 required
//                 sx={inputStyle}
//               />
//             </Grid>

//             <Grid item xs={12} md={6}>
//               <TextField
//                 fullWidth
//                 label="End Time"
//                 name="endTime"
//                 type="time"
//                 variant="filled"
//                 value={formData.endTime}
//                 onChange={handleChange}
//                 InputLabelProps={{ shrink: true }}
//                 sx={inputStyle}
//               />
//             </Grid>

//             <Grid item xs={12} md={6}>
//               <TextField
//                 select
//                 fullWidth
//                 label="Venue"
//                 name="venue"
//                 variant="filled"
//                 value={formData.venue}
//                 onChange={handleChange}
//                 required
//                 sx={inputStyle}
//               >
//                 {venues.map((v) => (
//                   <MenuItem key={v._id} value={v._id}>
//                     {v.venueName}
//                   </MenuItem>
//                 ))}
//               </TextField>
//             </Grid>

//             <Grid item xs={12} md={6}>
//               <TextField
//                 select
//                 fullWidth
//                 label="Speaker"
//                 name="speaker"
//                 variant="filled"
//                 value={formData.speaker}
//                 onChange={handleChange}
//                 sx={inputStyle}
//               >
//                 <MenuItem value="">-- None --</MenuItem>
//                 {speakers.map((s) => (
//                   <MenuItem key={s._id} value={s._id}>
//                     {s.name}
//                   </MenuItem>
//                 ))}
//               </TextField>
//             </Grid>

//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 multiline
//                 rows={2}
//                 label="Description"
//                 name="description"
//                 variant="filled"
//                 value={formData.description}
//                 onChange={handleChange}
//                 sx={inputStyle}
//               />
//             </Grid>

//             <Grid item xs={12}>
//               <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 1 }}>
//                 <Button
//                   variant="outlined"
//                   component="label"
//                   sx={{
//                     color: NEON_CYAN,
//                     borderColor: NEON_CYAN,
//                     borderRadius: "10px",
//                     "&:hover": { borderColor: "#fff", color: "#fff" },
//                   }}
//                 >
//                   Upload Image
//                   <input type="file" hidden accept="image/*" onChange={handleImageChange} />
//                 </Button>
//                 <Typography variant="caption" sx={{ color: "#94A3B8" }}>
//                   {image ? image.name : "No file chosen"}
//                 </Typography>
//               </Box>
//             </Grid>
//           </Grid>

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
//               mt: 4,
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
//                   Launching...
//                 </Typography>
//               </Box>
//             ) : (
//               "Launch Expo"
//             )}
//           </Button>
//         </form>
//       </Paper>
//     </Box>
//   );
// }

// export default AddExpo;



import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
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
const IconRocket = ({ size = 55, color = G.gold }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
  </svg>
);
const IconUpload = ({ size = 20, color = G.gold }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/>
  </svg>
);

/* =============================================
   FIELD — reusable input
   ============================================= */
function Field({ label, name, value, onChange, type = "text", required, placeholder, min, rows }) {
  const [focused, setFocused] = React.useState(false);
  const Tag = rows ? "textarea" : "input";

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
      <Tag
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        min={min}
        rows={rows}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: "100%",
          background: G.black3,
          border: `1px solid ${focused ? G.bGold : G.border}`,
          borderRadius: "8px",
          padding: rows ? "14px 18px" : "14px 18px",
          fontFamily: "'Inter', sans-serif",
          fontSize: "14px",
          color: G.white,
          outline: "none",
          resize: rows ? "vertical" : undefined,
          transition: "border-color 0.2s, box-shadow 0.2s",
          boxSizing: "border-box",
          boxShadow: focused ? "0 0 20px rgba(201,168,76,0.08)" : "none",
          lineHeight: rows ? 1.7 : undefined,
        }}
      />
    </div>
  );
}

/* =============================================
   SELECT FIELD
   ============================================= */
function SelectField({ label, name, value, onChange, options, required, placeholder }) {
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
      <select
        name={name}
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
          cursor: "pointer",
          transition: "border-color 0.2s, box-shadow 0.2s",
          boxSizing: "border-box",
          boxShadow: focused ? "0 0 20px rgba(201,168,76,0.08)" : "none",
          appearance: "none",
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%23C9A84C' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 14px center",
          paddingRight: "40px",
        }}
      >
        {placeholder && <option value="" style={{ background: G.black3, color: G.w55 }}>{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} style={{ background: G.black3, color: G.white }}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

/* =============================================
   MAIN COMPONENT
   ============================================= */
export default function AddExpo() {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    venue: "",
    description: "",
    theme: "",
    startTime: "",
    endTime: "",
    speaker: "",
  });

  const [image, setImage] = useState(null);
  const [alert, setAlert] = useState({ success: true, message: "" });
  const [loading, setLoading] = useState(false);
  const [venues, setVenues] = useState([]);
  const [speakers, setSpeakers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const venueRes = await axios.get("http://localhost:3001/venue");
        if (venueRes.data.success) setVenues(venueRes.data.venues);

        const speakerRes = await axios.get("http://localhost:3001/speaker");
        if (speakerRes.data.success) setSpeakers(speakerRes.data.speakers);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, date, venue, startTime } = formData;

    if (!title || !date || !venue || !startTime) {
      setAlert({ success: false, message: "Required fields: Title, Date, Venue, Start Time" });
      return;
    }

    setLoading(true);
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => data.append(key, value));
      if (image) data.append("image", image);

      const res = await axios.post("http://localhost:3001/expo/create", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        setAlert({ success: true, message: "Expo created successfully!" });
        setTimeout(() => navigate("/showExpo"), 1500);
      } else {
        setAlert({ success: false, message: res.data.message });
      }
    } catch (error) {
      setAlert({ success: false, message: "Something went wrong!" });
    } finally {
      setLoading(false);
    }
  };

  const venueOptions = venues.map((v) => ({ value: v._id, label: v.venueName }));
  const speakerOptions = [
    { value: "", label: "-- None --" },
    ...speakers.map((s) => ({ value: s._id, label: s.name })),
  ];

  return (
    <div style={{
      background: G.black, minHeight: "100vh",
      fontFamily: "'Inter', sans-serif",
      WebkitFontSmoothing: "antialiased",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "24px",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Background glow */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%,-50%)",
        width: "800px", height: "600px", borderRadius: "50%",
        background: "radial-gradient(ellipse, rgba(201,168,76,0.06), transparent 70%)",
        pointerEvents: "none",
        zIndex: 0,
      }} />

      {/* Toast */}
      <Toast alert={alert} onClose={() => setAlert({ ...alert, message: "" })} />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 200, damping: 20 }}
        style={{
          width: "100%", maxWidth: "700px",
          background: G.black2,
          border: `1px solid ${G.border}`,
          borderRadius: "20px",
          padding: "clamp(32px, 5vw, 48px)",
          position: "relative", zIndex: 1,
          overflow: "hidden",
          boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
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

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "32px", position: "relative" }}>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
            style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              width: "72px", height: "72px",
              background: "rgba(201,168,76,0.08)",
              border: `1px solid ${G.bGold}`,
              borderRadius: "16px",
              marginBottom: "20px",
            }}
          >
            <IconRocket size={32} color={G.gold} />
          </motion.div>

          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            fontSize: "11px", fontWeight: 700, letterSpacing: "0.16em",
            textTransform: "uppercase", color: G.gold,
            fontFamily: "'Inter', sans-serif", marginBottom: "10px",
          }}>
            <span style={{ width: "20px", height: "1px", background: G.gold }} />
            Event Management
          </div>

          <h1 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(1.6rem, 4vw, 2rem)",
            fontWeight: 700, color: G.white, lineHeight: 1.15,
          }}>
            Create New{" "}
            <em style={{ fontStyle: "italic", color: G.gold }}>Expo</em>
          </h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "0 16px",
          }}>
            <Field
              label="Expo Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />

            <Field
              label="Date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              required
              min={new Date().toISOString().split("T")[0]}
            />

            <Field
              label="Theme"
              name="theme"
              value={formData.theme}
              onChange={handleChange}
            />

            <Field
              label="Start Time"
              name="startTime"
              type="time"
              value={formData.startTime}
              onChange={handleChange}
              required
            />

            <Field
              label="End Time"
              name="endTime"
              type="time"
              value={formData.endTime}
              onChange={handleChange}
            />

            <SelectField
              label="Venue"
              name="venue"
              value={formData.venue}
              onChange={handleChange}
              options={venueOptions}
              required
              placeholder="Select Venue"
            />

            <SelectField
              label="Speaker"
              name="speaker"
              value={formData.speaker}
              onChange={handleChange}
              options={speakerOptions}
              placeholder="Select Speaker"
            />

            <div style={{ gridColumn: "1 / -1" }}>
              <Field
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
              />
            </div>
          </div>

          {/* Image Upload */}
          <div style={{
            display: "flex", alignItems: "center", gap: "16px",
            marginTop: "8px", marginBottom: "8px",
          }}>
            <label style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "10px 18px",
              background: "rgba(201,168,76,0.08)",
              border: `1px solid ${G.bGold}`,
              borderRadius: "8px",
              color: G.gold,
              fontFamily: "'Inter', sans-serif",
              fontSize: "13px", fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s",
            }}>
              <IconUpload size={18} />
              Upload Image
              <input type="file" hidden accept="image/*" onChange={handleImageChange} />
            </label>
            <span style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "13px", color: G.w55,
            }}>
              {image ? image.name : "No file chosen"}
            </span>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={!loading ? { y: -3, boxShadow: "0 14px 32px rgba(201,168,76,0.35)" } : {}}
            whileTap={!loading ? { scale: 0.97 } : {}}
            style={{
              width: "100%", padding: "17px",
              marginTop: "16px",
              background: loading ? "rgba(255,255,255,0.05)" : G.gold,
              color: loading ? G.w30 : "#000",
              fontFamily: "'Inter', sans-serif",
              fontSize: "14px", fontWeight: 700,
              letterSpacing: "0.06em", textTransform: "uppercase",
              border: "none", borderRadius: "8px",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "background 0.25s",
              display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
            }}
          >
            {loading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                style={{
                  width: "20px", height: "20px",
                  border: `2px solid ${G.border}`,
                  borderTopColor: G.gold,
                  borderRadius: "50%",
                }}
              />
            ) : (
              "Launch Expo"
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}