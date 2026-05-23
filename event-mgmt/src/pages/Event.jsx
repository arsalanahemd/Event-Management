// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Grid,
//   Card,
//   CardMedia,
//   CardContent,
//   Typography,
//   Button,
//   CircularProgress,
//   Alert,
//   Container,
//   Stack,
//   Snackbar,
//   Chip,
// } from "@mui/material";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import ExploreIcon from "@mui/icons-material/Explore";

// function ShowExpos() {
//   const [expos, setExpos] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [alert, setAlert] = useState({ success: true, message: "" });
//   const [userType, setUserType] = useState(null);
//   const [userId, setUserId] = useState(null);
//   const [userRegistrations, setUserRegistrations] = useState([]);

//   const navigate = useNavigate();
//   const BASE_URL = "http://localhost:3001";

//   // Helper function
//   const getShortDesc = (title, desc) => {
//     const titles = {
//       "COVID-19": "Register now to get your free COVID vaccine.",
//       "Zyro Agency": "Expert digital marketing, branding, and growth services.",
//       "Star Security Services":
//         "Get advanced professional security and protection services.",
//       "Moonlight Events":
//         "Plan magical events and memorable festive celebrations.",
//       PolySite: "Leading manufacturers of premium plastic bottles and jars.",
//       Papyrus: "You can easily download greeting cards from Papyrus.",
//     };
//     return titles[title] || desc || "Experience innovation and excellence.";
//   };

//   const fetchExpos = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get(`${BASE_URL}/expo`);
//       if (res.data.success) {
//         const allExpos = res.data.expos || [];
//         const today = new Date();
//         today.setHours(0, 0, 0, 0);

//         const currentAndUpcoming = allExpos.filter((expo) => {
//           const expoDate = new Date(expo.date);
//           expoDate.setHours(0, 0, 0, 0);
//           return expoDate >= today;
//         });

//         setExpos(currentAndUpcoming);
//       } else {
//         setAlert({ success: false, message: "No upcoming expos found." });
//       }
//     } catch (err) {
//       setAlert({ success: false, message: "Failed to load expos." });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const detectUser = () => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     const admin = JSON.parse(localStorage.getItem("adminUser"));
//     if (user) {
//       setUserId(user._id || user.id);
//       setUserType(user.role);
//     } else if (admin) {
//       setUserId(null);
//       setUserType(admin.role);
//     } else {
//       setUserId(null);
//       setUserType(null);
//     }
//   };

//   const fetchUserRegistrations = async (uid) => {
//     if (!uid) return;
//     try {
//       const res = await axios.get(`${BASE_URL}/register/user?userId=${uid}`);
//       if (res.data.success) setUserRegistrations(res.data.registrations || []);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleAction = async (expoId) => {
//     if (!userType) {
//       setAlert({ success: false, message: "Please Login first!" });
//       return;
//     }
//     const role = userType.toLowerCase();
//     if (role === "admin") {
//       setAlert({
//         success: false,
//         message: "Admins cannot register. Please login as a User.",
//       });
//       return;
//     }
//     if (role === "attendee") {
//       try {
//         const res = await axios.post(`${BASE_URL}/register`, {
//           userId,
//           expoId,
//           status: "pending",
//         });
//         if (res.data.success) {
//           setAlert({ success: true, message: "Registered successfully!" });
//           setUserRegistrations((prev) => [
//             ...prev,
//             { expoId: { _id: expoId }, status: "pending" },
//           ]);
//         } else {
//           setAlert({
//             success: false,
//             message: res.data.message || "Registration failed.",
//           });
//         }
//       } catch (err) {
//         setAlert({
//           success: false,
//           message: "Something went wrong. Try again.",
//         });
//       }
//     }
//     if (role === "exhibitor") {
//       try {
//         const companyRes = await axios.get(
//           `${BASE_URL}/company/by-exhibitor/${userId}`
//         );
//         if (!companyRes.data.success || !companyRes.data.company) {
//           setAlert({
//             success: false,
//             message: "Please add your company profile first!",
//           });
//           return;
//         }
//         navigate(`/participateExpo/${expoId}`, {
//           state: {
//             expoId,
//             userId,
//             companyId: companyRes.data.company._id,
//             fromShowExpos: true,
//           },
//         });
//       } catch (err) {
//         setAlert({ success: false, message: "API error." });
//       }
//     }
//   };

//   const getButtonProps = (expoId) => {
//     if (userType?.toLowerCase() === "exhibitor") {
//       return {
//         label: "Participate",
//         color: "linear-gradient(90deg, #4CC9F0, #4895EF)",
//         disabled: false,
//       };
//     }
//     const reg = userRegistrations.find((r) => r.expoId?._id === expoId);
//     if (!reg)
//       return {
//         label: "Register Now",
//         color: "linear-gradient(90deg, #4895EF, #4CC9F0)",
//         disabled: false,
//       };
//     if (reg.status === "pending")
//       return { label: "Pending", color: "orange", disabled: true };
//     if (reg.status === "approved")
//       return { label: "Confirmed ✓", color: "#4CC9F0", disabled: true };
//     if (reg.status === "rejected")
//       return { label: "Rejected", color: "#F72585", disabled: true };
//     return {
//       label: "Register",
//       color: "linear-gradient(90deg, #4895EF, #4CC9F0)",
//       disabled: false,
//     };
//   };

//   useEffect(() => {
//     fetchExpos();
//     detectUser();
//     window.addEventListener("storage", detectUser);
//     return () => window.removeEventListener("storage", detectUser);
//   }, []);

//   useEffect(() => {
//     if (userType?.toLowerCase() === "attendee" && userId)
//       fetchUserRegistrations(userId);
//   }, [userType, userId]);

//   return (
//     <Box
//       sx={{
//         background: "linear-gradient(90deg, #0D1B2A 0%, #1B263B 100%)",
//         minHeight: "100vh",
//         width: "100%",
//         pb: 10,
//       }}
//     >
//       <Snackbar
//         open={!!alert.message}
//         autoHideDuration={4000}
//         onClose={() => setAlert({ ...alert, message: "" })}
//         anchorOrigin={{ vertical: "top", horizontal: "center" }}
//       >
//         <Alert severity={alert.success ? "success" : "error"} variant="filled">
//           {alert.message}
//         </Alert>
//       </Snackbar>

//       {/* Hero Header */}
//       <Box
//         sx={{
//           background: "linear-gradient(135deg, #1B263B 0%, #0D1B2A 100%)",
//           py: { xs: 6, md: 8 },
//           mb: 6,
//           textAlign: "center",
//           color: "white",
//           boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
//         }}
//       >
//         <Container maxWidth="md">
//           <Stack spacing={2} alignItems="center">
//             <ExploreIcon sx={{ fontSize: "3rem", color: "#4CC9F0" }} />
//             <Typography
//               variant="h2"
//               fontWeight={900}
//               sx={{
//                 background: "linear-gradient(90deg, #4CC9F0, #4895EF, #F72585)",
//                 WebkitBackgroundClip: "text",
//                 WebkitTextFillColor: "transparent",
//                 fontSize: { xs: "2.2rem", md: "3.5rem" },
//                 textTransform: "uppercase",
//                 letterSpacing: "2px",
//               }}
//             >
//               Upcoming Expos
//             </Typography>
//             <Typography
//               sx={{
//                 color: "rgba(255,255,255,0.6)",
//                 fontSize: "1rem",
//                 maxWidth: "600px",
//               }}
//             >
//               Discover innovation and creativity in our upcoming events.
//             </Typography>
//           </Stack>
//         </Container>
//       </Box>

//       {/* Container */}
//       <Container maxWidth="xl" disableGutters sx={{ px: { xs: 2, md: 3 } }}>
//         {loading ? (
//           <Box textAlign="center" sx={{ py: 10 }}>
//             <CircularProgress sx={{ color: "#4CC9F0" }} size={60} />
//           </Box>
//         ) : (
//           <Grid
//             container
//             spacing={2}
//             sx={{
//               width: "100%",
//               m: 0,
//               justifyContent: "flex-start",
//             }}
//           >
//             {expos.map((expo) => {
//               const btn = getButtonProps(expo._id);
//               return (
//                 <Grid
//                   item
//                   xs={12}
//                   sm={6}
//                   md={3}
//                   key={expo._id}
//                   sx={{ display: "flex", p: 1 }}
//                 >
//                   <Card
//                     sx={{
//                       width: "100%",
//                       borderRadius: 4,
//                       background: "rgba(255, 255, 255, 0.05)",
//                       backdropFilter: "blur(10px)",
//                       border: "1px solid rgba(255,255,255,0.1)",
//                       color: "white",
//                       display: "flex",
//                       flexDirection: "column",
//                       transition: "0.3s",
//                       "&:hover": {
//                         transform: "translateY(-8px)",
//                         border: "1px solid #4CC9F0",
//                       },
//                     }}
//                   >
//                     <CardMedia
//                       component="img"
//                       image={`${BASE_URL}/uploads/${expo.image}`}
//                       alt={expo.title}
//                       // Image height
//                       sx={{ height: 300, objectFit: "cover", width: "100%" }}
//                     />

//                     <CardContent
//                       sx={{
//                         p: 1.5,
//                         flexGrow: 1,
//                         display: "flex",
//                         flexDirection: "column",
//                       }}
//                     >
//                       <Typography
//                         variant="h6"
//                         sx={{
//                           fontWeight: 800,
//                           color: "#4CC9F0",
//                           mb: 0.5,
//                           fontSize: "0.9rem",
//                           whiteSpace: "nowrap",
//                           overflow: "hidden",
//                           textOverflow: "ellipsis",
//                         }}
//                       >
//                         {expo.title}
//                       </Typography>

//                       <Typography
//                         variant="body2"
//                         sx={{
//                           color: "rgba(255,255,255,0.6)",
//                           mb: 1.5,
//                           fontSize: "0.75rem",
//                           height: "2.2rem",
//                           display: "-webkit-box",
//                           WebkitLineClamp: 2,
//                           WebkitBoxOrient: "vertical",
//                           overflow: "hidden",
//                         }}
//                       >
//                         {getShortDesc(expo.title, expo.description)}
//                       </Typography>

//                       <Box sx={{ mb: 1.5, mt: "auto" }}>
//                         <Typography
//                           sx={{ color: "rgba(255,255,255,0.8)", fontSize: 10 }}
//                         >
//                           📅 <b>Date:</b>{" "}
//                           {expo.date ? expo.date.split("T")[0] : "N/A"}
//                         </Typography>
//                         <Typography
//                           sx={{
//                             color: "rgba(255,255,255,0.8)",
//                             fontSize: 10,
//                             mt: 0.3,
//                             whiteSpace: "nowrap",
//                             overflow: "hidden",
//                             textOverflow: "ellipsis",
//                           }}
//                         >
//                           📍 <b>Venue:</b> {expo.venue?.venueName || "TBA"}
//                         </Typography>
//                       </Box>

//                       <Button
//                         variant="contained"
//                         fullWidth
//                         disabled={btn.disabled}
//                         onClick={() => handleAction(expo._id)}
//                         sx={{
//                           py: 1.5,
//                           fontWeight: 800,
//                           borderRadius: "12px",
//                           background:
//                             "linear-gradient(90deg, #4895EF, #4CC9F0)",
//                           color: "#0D1B2A",
//                           textTransform: "uppercase",
//                           fontSize: "0.75rem",
//                           "&.Mui-disabled": {
//                             background: "rgba(255, 255, 255, 0.12)",
//                             color: "rgba(255, 255, 255, 0.3)",
//                           },
//                           "&:hover": {
//                             background:
//                               "linear-gradient(90deg, #4CC9F0, #4895EF)",
//                             transform: "scale(1.02)",
//                           },
//                           transition: "0.3s",
//                         }}
//                       >
//                         {btn.label}
//                       </Button>
//                     </CardContent>
//                   </Card>
//                 </Grid>
//               );
//             })}
//           </Grid>
//         )}
//       </Container>
//     </Box>
//   );
// }

// export default ShowExpos;
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

/* ─────────────────────────────────────────────
   DESIGN TOKENS  (EventSphere dark + gold)
───────────────────────────────────────────── */
const T = {
  bg: "#0c0c0c",
  surface: "#141414",
  card: "#181818",
  gold: "#c9a84c",
  goldLight: "#e8c96a",
  goldDim: "rgba(201,168,76,0.15)",
  white: "#ffffff",
  muted: "rgba(255,255,255,0.5)",
  dim: "rgba(255,255,255,0.08)",
  border: "rgba(201,168,76,0.2)",
  borderFaint: "rgba(255,255,255,0.06)",
};

/* ─────────────────────────────────────────────
   GLOBAL STYLES injected once
───────────────────────────────────────────── */
const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Outfit:wght@300;400;500;600;700&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    body { background: ${T.bg}; color: ${T.white}; font-family: 'Outfit', sans-serif; }

    .expo-page { background: ${T.bg}; min-height: 100vh; overflow-x: hidden; }

    /* ── fade-in-up animation ── */
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(32px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeIn {
      from { opacity: 0; } to { opacity: 1; }
    }
    @keyframes shimmer {
      0%   { background-position: -400px 0; }
      100% { background-position: 400px 0; }
    }
    @keyframes pulseGold {
      0%, 100% { box-shadow: 0 0 0 0 rgba(201,168,76,0.35); }
      50%       { box-shadow: 0 0 0 8px rgba(201,168,76,0); }
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    @keyframes slideDown {
      from { opacity: 0; transform: translateY(-12px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    .reveal { opacity: 0; transform: translateY(28px); transition: opacity .6s ease, transform .6s ease; }
    .reveal.visible { opacity: 1; transform: translateY(0); }

    /* ── Card hover ── */
    .expo-card { transition: transform .35s ease, box-shadow .35s ease, border-color .35s ease; }
    .expo-card:hover {
      transform: translateY(-10px);
      box-shadow: 0 24px 60px rgba(0,0,0,0.6), 0 0 0 1px ${T.gold};
      border-color: ${T.gold} !important;
    }
    .expo-card:hover .card-img { transform: scale(1.06); }
    .card-img { transition: transform .5s ease; }

    /* ── Button ── */
    .btn-gold {
      background: linear-gradient(135deg, #c9a84c 0%, #e8c96a 50%, #c9a84c 100%);
      background-size: 200% 100%;
      color: #0c0c0c;
      border: none;
      cursor: pointer;
      font-family: 'Outfit', sans-serif;
      font-weight: 700;
      letter-spacing: .08em;
      text-transform: uppercase;
      transition: background-position .4s ease, transform .2s ease, box-shadow .2s ease;
    }
    .btn-gold:hover {
      background-position: 100% 0;
      transform: scale(1.02);
      box-shadow: 0 0 20px rgba(201,168,76,0.4);
    }
    .btn-gold:disabled {
      background: rgba(255,255,255,0.08) !important;
      color: rgba(255,255,255,0.25) !important;
      cursor: not-allowed;
      transform: none !important;
      box-shadow: none !important;
    }

    /* ── Tabs ── */
    .filter-tab { transition: all .25s ease; cursor: pointer; }
    .filter-tab:hover { color: ${T.goldLight}; border-color: ${T.gold}; }
    .filter-tab.active {
      background: ${T.goldDim};
      color: ${T.goldLight};
      border-color: ${T.gold};
    }

    /* ── Snackbar ── */
    .snack { animation: slideDown .35s ease; }

    /* ── Skeleton shimmer ── */
    .skeleton {
      background: linear-gradient(90deg, #1e1e1e 25%, #2a2a2a 50%, #1e1e1e 75%);
      background-size: 400px 100%;
      animation: shimmer 1.4s infinite;
      border-radius: 4px;
    }

    /* ── Section divider line ── */
    .gold-line {
      height: 1px;
      background: linear-gradient(90deg, transparent, ${T.gold}, transparent);
      margin: 0 auto;
    }

    /* ── Count-up number ── */
    .stat-num { font-family: 'Playfair Display', serif; }

    /* Scroll track */
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: ${T.bg}; }
    ::-webkit-scrollbar-thumb { background: ${T.gold}; border-radius: 3px; }
  `}</style>
);

/* ─────────────────────────────────────────────
   HOOK: intersection observer for reveal
───────────────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  });
}

/* ─────────────────────────────────────────────
   COMPONENT: Snackbar
───────────────────────────────────────────── */
function Snackbar({ alert, onClose }) {
  useEffect(() => {
    if (!alert.message) return;
    const t = setTimeout(onClose, 4000);
    return () => clearTimeout(t);
  }, [alert.message]);

  if (!alert.message) return null;
  return (
    <div
      className="snack"
      style={{
        position: "fixed", top: 24, left: "50%", transform: "translateX(-50%)",
        zIndex: 9999, display: "flex", alignItems: "center", gap: 10,
        background: alert.success ? "rgba(20,40,20,0.95)" : "rgba(40,15,15,0.95)",
        border: `1px solid ${alert.success ? "#4caf50" : "#e53935"}`,
        borderRadius: 10, padding: "12px 22px",
        backdropFilter: "blur(12px)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
        fontFamily: "'Outfit', sans-serif", fontSize: 14, color: T.white,
        maxWidth: 380,
      }}
    >
      <span style={{ fontSize: 18 }}>{alert.success ? "✓" : "✕"}</span>
      <span>{alert.message}</span>
      <button onClick={onClose} style={{ background: "none", border: "none", color: T.muted, cursor: "pointer", fontSize: 16, marginLeft: 8 }}>✕</button>
    </div>
  );
}

/* ─────────────────────────────────────────────
   COMPONENT: HeroSection
───────────────────────────────────────────── */
function HeroSection({ total }) {
  return (
    <div style={{ position: "relative", overflow: "hidden", background: T.bg, padding: "80px 24px 60px", textAlign: "center" }}>
      {/* decorative noise overlay */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.03,
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='60' height='60' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
      }} />

      {/* gold accent top bar */}
      <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 80, height: 3, background: T.gold, borderRadius: "0 0 4px 4px" }} />

      <div style={{ position: "relative", animation: "fadeUp .8s ease both", maxWidth: 760, margin: "0 auto" }}>
        <p style={{ fontSize: 11, letterSpacing: "0.3em", color: T.gold, textTransform: "uppercase", marginBottom: 20, fontWeight: 600 }}>
          // Upcoming Events
        </p>

        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(2.4rem, 6vw, 4.8rem)",
          fontWeight: 900, lineHeight: 1.1,
          color: T.white,
          marginBottom: 20,
        }}>
          Explore{" "}
          <span style={{
            background: `linear-gradient(135deg, ${T.gold}, ${T.goldLight})`,
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>Exhibitions</span>
        </h1>

        <p style={{ color: T.muted, fontSize: "1.05rem", maxWidth: 480, margin: "0 auto 36px", lineHeight: 1.7 }}>
          Discover innovation and creativity in our upcoming events. Register now and be part of something extraordinary.
        </p>

        {/* stats row */}
        <div style={{ display: "flex", justifyContent: "center", gap: 48, flexWrap: "wrap" }}>
          {[
            { num: total, label: "Upcoming Expos" },
            { num: "80+", label: "Exhibitors" },
            { num: "50K+", label: "Attendees" },
          ].map((s) => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div className="stat-num" style={{ fontSize: "2rem", fontWeight: 900, color: T.gold }}>{s.num}</div>
              <div style={{ fontSize: 11, color: T.muted, letterSpacing: "0.15em", textTransform: "uppercase", marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="gold-line" style={{ width: "40%", marginTop: 56 }} />
    </div>
  );
}

/* ─────────────────────────────────────────────
   COMPONENT: FilterBar
───────────────────────────────────────────── */
function FilterBar({ active, onChange }) {
  const tabs = ["All Events", "This Week", "This Month", "Featured"];
  return (
    <div style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap", padding: "28px 24px" }}>
      {tabs.map((t) => (
        <button
          key={t}
          className={`filter-tab${active === t ? " active" : ""}`}
          onClick={() => onChange(t)}
          style={{
            background: "transparent", border: `1px solid ${T.borderFaint}`,
            color: T.muted, borderRadius: 30, padding: "8px 22px",
            fontSize: 13, fontWeight: 500, fontFamily: "'Outfit', sans-serif",
            letterSpacing: "0.04em",
          }}
        >
          {t}
        </button>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   COMPONENT: SkeletonCard
───────────────────────────────────────────── */
function SkeletonCard() {
  return (
    <div style={{ borderRadius: 16, overflow: "hidden", border: `1px solid ${T.borderFaint}`, background: T.card }}>
      <div className="skeleton" style={{ height: 280 }} />
      <div style={{ padding: 20 }}>
        <div className="skeleton" style={{ height: 18, width: "70%", marginBottom: 10 }} />
        <div className="skeleton" style={{ height: 13, width: "90%", marginBottom: 6 }} />
        <div className="skeleton" style={{ height: 13, width: "60%", marginBottom: 20 }} />
        <div className="skeleton" style={{ height: 42, borderRadius: 10 }} />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   COMPONENT: ExpoCard
───────────────────────────────────────────── */
function ExpoCard({ expo, btnProps, onAction, index }) {
  const BASE_URL = "http://localhost:3001";

  const statusColors = {
    "Register Now": T.gold,
    Participate: T.gold,
    Pending: "#f59e0b",
    "Confirmed ✓": "#22c55e",
    Rejected: "#ef4444",
  };

  const descMap = {
    "COVID-19": "Register now to get your free COVID vaccine.",
    "Zyro Agency": "Expert digital marketing, branding, and growth services.",
    "Star Security Services": "Advanced professional security and protection services.",
    "Moonlight Events": "Plan magical events and memorable festive celebrations.",
    PolySite: "Leading manufacturers of premium plastic bottles and jars.",
    Papyrus: "Easily download greeting cards from Papyrus.",
  };

  const desc = descMap[expo.title] || expo.description || "Experience innovation and excellence.";
  const dateStr = expo.date ? expo.date.split("T")[0] : "TBA";
  const venue = expo.venue?.venueName || "TBA";

  return (
    <div
      className="expo-card reveal"
      style={{
        borderRadius: 16, overflow: "hidden",
        border: `1px solid ${T.borderFaint}`,
        background: T.card, display: "flex",
        flexDirection: "column", height: "100%",
        animationDelay: `${index * 0.07}s`,
      }}
    >
      {/* Image */}
      <div style={{ overflow: "hidden", height: 260, flexShrink: 0, position: "relative" }}>
        <img
          className="card-img"
          src={`${BASE_URL}/uploads/${expo.image}`}
          alt={expo.title}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          onError={(e) => { e.target.src = "https://via.placeholder.com/400x260/181818/c9a84c?text=EXPO"; }}
        />
        {/* date badge */}
        <div style={{
          position: "absolute", top: 14, right: 14,
          background: "rgba(12,12,12,0.85)", backdropFilter: "blur(8px)",
          border: `1px solid ${T.gold}`, borderRadius: 8,
          padding: "5px 12px", fontSize: 11, color: T.gold,
          fontWeight: 700, letterSpacing: "0.05em",
        }}>
          📅 {dateStr}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "20px", flexGrow: 1, display: "flex", flexDirection: "column" }}>
        {/* title */}
        <h3 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "1.05rem", fontWeight: 700,
          color: T.white, marginBottom: 8,
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
        }}>
          {expo.title}
        </h3>

        {/* desc */}
        <p style={{
          color: T.muted, fontSize: 13, lineHeight: 1.6,
          marginBottom: 16,
          display: "-webkit-box", WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical", overflow: "hidden",
        }}>
          {desc}
        </p>

        {/* meta */}
        <div style={{ marginBottom: 18, marginTop: "auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
            <span style={{ fontSize: 12 }}>📍</span>
            <span style={{ fontSize: 12, color: T.muted, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {venue}
            </span>
          </div>
          <div style={{ height: 1, background: T.borderFaint, margin: "10px 0" }} />
        </div>

        {/* CTA button */}
        <button
          className="btn-gold"
          disabled={btnProps.disabled}
          onClick={() => onAction(expo._id)}
          style={{
            width: "100%", padding: "13px 0",
            borderRadius: 10, fontSize: 12,
            letterSpacing: "0.1em",
            background: btnProps.disabled
              ? "rgba(255,255,255,0.07)"
              : `linear-gradient(135deg, ${T.gold}, ${T.goldLight})`,
            color: btnProps.disabled ? T.muted : "#0c0c0c",
          }}
        >
          {btnProps.label}
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   COMPONENT: EmptyState
───────────────────────────────────────────── */
function EmptyState() {
  return (
    <div style={{ textAlign: "center", padding: "80px 24px", animation: "fadeUp .6s ease" }}>
      <div style={{ fontSize: 56, marginBottom: 20 }}>🗓</div>
      <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.6rem", color: T.white, marginBottom: 12 }}>
        No upcoming expos
      </h3>
      <p style={{ color: T.muted, maxWidth: 340, margin: "0 auto" }}>
        Check back soon — new exhibitions are added regularly.
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────────
   COMPONENT: Loader
───────────────────────────────────────────── */
function Loader() {
  return (
    <div style={{ textAlign: "center", padding: "80px 0" }}>
      <div style={{
        width: 48, height: 48, border: `3px solid ${T.borderFaint}`,
        borderTopColor: T.gold, borderRadius: "50%",
        animation: "spin .8s linear infinite", margin: "0 auto 20px",
      }} />
      <p style={{ color: T.muted, fontSize: 14, letterSpacing: "0.1em" }}>Loading expos…</p>
    </div>
  );
}

/* ─────────────────────────────────────────────
   COMPONENT: SectionHeader
───────────────────────────────────────────── */
function SectionHeader({ tag, title, sub }) {
  return (
    <div className="reveal" style={{ textAlign: "center", marginBottom: 48 }}>
      {tag && (
        <p style={{ fontSize: 11, letterSpacing: "0.3em", color: T.gold, textTransform: "uppercase", marginBottom: 12, fontWeight: 600 }}>
          // {tag}
        </p>
      )}
      <h2 style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 900,
        color: T.white, lineHeight: 1.2, marginBottom: 14,
      }}>
        {title}
      </h2>
      {sub && <p style={{ color: T.muted, maxWidth: 440, margin: "0 auto", lineHeight: 1.7, fontSize: "0.95rem" }}>{sub}</p>}
    </div>
  );
}

/* ─────────────────────────────────────────────
   COMPONENT: InfoBanner (why attend section)
───────────────────────────────────────────── */
function InfoBanner() {
  const features = [
    { icon: "🎯", title: "Curated Exhibitors", desc: "Hand-picked brands and innovators across every industry." },
    { icon: "🤝", title: "Live Networking", desc: "Meet industry leaders, investors, and creative minds." },
    { icon: "🎤", title: "Expert Speakers", desc: "Insightful talks that spark ideas and drive change." },
    { icon: "🏆", title: "Awards & Prizes", desc: "Recognising outstanding achievement at every expo." },
  ];

  return (
    <div style={{ padding: "80px 24px", background: T.surface, borderTop: `1px solid ${T.borderFaint}`, borderBottom: `1px solid ${T.borderFaint}` }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionHeader tag="Why Attend" title={<>Why EventSphere <span style={{ background: `linear-gradient(135deg,${T.gold},${T.goldLight})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Stands Out</span></>} />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 24 }}>
          {features.map((f, i) => (
            <div
              key={f.title}
              className="reveal"
              style={{
                background: T.card, borderRadius: 14,
                border: `1px solid ${T.borderFaint}`,
                padding: "28px 24px",
                transition: "border-color .3s, transform .3s",
                animationDelay: `${i * 0.08}s`,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = T.gold; e.currentTarget.style.transform = "translateY(-4px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = T.borderFaint; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <div style={{ fontSize: 32, marginBottom: 14 }}>{f.icon}</div>
              <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem", color: T.white, marginBottom: 8 }}>{f.title}</h4>
              <p style={{ fontSize: 13, color: T.muted, lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   COMPONENT: CallToAction Banner
───────────────────────────────────────────── */
function CTABanner() {
  return (
    <div style={{
      background: `linear-gradient(135deg, rgba(201,168,76,0.1) 0%, rgba(201,168,76,0.02) 100%)`,
      border: `1px solid ${T.border}`, borderRadius: 20,
      padding: "60px 40px", textAlign: "center",
      margin: "80px auto", maxWidth: 700,
    }}
      className="reveal"
    >
      <p style={{ fontSize: 11, letterSpacing: "0.3em", color: T.gold, textTransform: "uppercase", marginBottom: 16, fontWeight: 600 }}>
        // Never Miss a Single Event
      </p>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 900, color: T.white, marginBottom: 14 }}>
        Get notified about new expos
      </h2>
      <p style={{ color: T.muted, marginBottom: 32, lineHeight: 1.7 }}>
        Subscribe to stay in the loop. We'll let you know the moment new exhibitions open for registration.
      </p>
      <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
        <input
          type="email"
          placeholder="your@email.com"
          style={{
            background: T.dim, border: `1px solid ${T.border}`,
            borderRadius: 10, padding: "13px 20px", color: T.white,
            fontSize: 14, fontFamily: "'Outfit', sans-serif",
            outline: "none", width: 260,
          }}
        />
        <button
          className="btn-gold"
          style={{ padding: "13px 28px", borderRadius: 10, fontSize: 13 }}
        >
          Subscribe
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN PAGE: ShowExpos
───────────────────────────────────────────── */
function ShowExpos() {
  const [expos, setExpos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({ success: true, message: "" });
  const [userType, setUserType] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userRegistrations, setUserRegistrations] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All Events");

  const navigate = useNavigate();
  const BASE_URL = "http://localhost:3001";

  useReveal();

  /* ── data fetching ── */
  const fetchExpos = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${BASE_URL}/expo`);
      if (res.data.success) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const upcoming = (res.data.expos || []).filter((e) => {
          const d = new Date(e.date);
          d.setHours(0, 0, 0, 0);
          return d >= today;
        });
        setExpos(upcoming);
      } else {
        setAlert({ success: false, message: "No upcoming expos found." });
      }
    } catch {
      setAlert({ success: false, message: "Failed to load expos." });
    } finally {
      setLoading(false);
    }
  };

  const detectUser = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const admin = JSON.parse(localStorage.getItem("adminUser"));
    if (user) { setUserId(user._id || user.id); setUserType(user.role); }
    else if (admin) { setUserId(null); setUserType(admin.role); }
    else { setUserId(null); setUserType(null); }
  };

  const fetchUserRegistrations = async (uid) => {
    if (!uid) return;
    try {
      const res = await axios.get(`${BASE_URL}/register/user?userId=${uid}`);
      if (res.data.success) setUserRegistrations(res.data.registrations || []);
    } catch { /* silent */ }
  };

  useEffect(() => {
    fetchExpos();
    detectUser();
    window.addEventListener("storage", detectUser);
    return () => window.removeEventListener("storage", detectUser);
  }, []);

  useEffect(() => {
    if (userType?.toLowerCase() === "attendee" && userId) fetchUserRegistrations(userId);
  }, [userType, userId]);

  /* ── action handler ── */
  const handleAction = async (expoId) => {
    if (!userType) { setAlert({ success: false, message: "Please login first!" }); return; }
    const role = userType.toLowerCase();
    if (role === "admin") { setAlert({ success: false, message: "Admins cannot register. Please login as a User." }); return; }
    if (role === "attendee") {
      try {
        const res = await axios.post(`${BASE_URL}/register`, { userId, expoId, status: "pending" });
        if (res.data.success) {
          setAlert({ success: true, message: "Registered successfully!" });
          setUserRegistrations((prev) => [...prev, { expoId: { _id: expoId }, status: "pending" }]);
        } else { setAlert({ success: false, message: res.data.message || "Registration failed." }); }
      } catch { setAlert({ success: false, message: "Something went wrong. Try again." }); }
    }
    if (role === "exhibitor") {
      try {
        const companyRes = await axios.get(`${BASE_URL}/company/by-exhibitor/${userId}`);
        if (!companyRes.data.success || !companyRes.data.company) {
          setAlert({ success: false, message: "Please add your company profile first!" });
          return;
        }
        navigate(`/participateExpo/${expoId}`, { state: { expoId, userId, companyId: companyRes.data.company._id, fromShowExpos: true } });
      } catch { setAlert({ success: false, message: "API error." }); }
    }
  };

  /* ── button props ── */
  const getButtonProps = (expoId) => {
    if (userType?.toLowerCase() === "exhibitor") return { label: "Participate", disabled: false };
    const reg = userRegistrations.find((r) => r.expoId?._id === expoId);
    if (!reg) return { label: "Register Now", disabled: false };
    if (reg.status === "pending") return { label: "Pending", disabled: true };
    if (reg.status === "approved") return { label: "Confirmed ✓", disabled: true };
    if (reg.status === "rejected") return { label: "Rejected", disabled: true };
    return { label: "Register Now", disabled: false };
  };

  /* ── filter logic ── */
  const filteredExpos = expos.filter((expo) => {
    if (activeFilter === "All Events") return true;
    const d = new Date(expo.date);
    const now = new Date();
    if (activeFilter === "This Week") {
      const end = new Date(now); end.setDate(now.getDate() + 7);
      return d >= now && d <= end;
    }
    if (activeFilter === "This Month") {
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    }
    if (activeFilter === "Featured") return expo.featured || false;
    return true;
  });

  /* ── render ── */
  return (
    <div className="expo-page">
      <GlobalStyle />
      <Snackbar alert={alert} onClose={() => setAlert({ ...alert, message: "" })} />

      {/* HERO */}
      <HeroSection total={expos.length} />

      {/* FILTERS */}
      <FilterBar active={activeFilter} onChange={setActiveFilter} />

      {/* EXPO GRID */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px 80px" }}>
        <SectionHeader
          tag="Browse all expos"
          title={<>Upcoming <span style={{ background: `linear-gradient(135deg,${T.gold},${T.goldLight})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Exhibitions</span></>}
          sub="Discover innovation and creativity in our upcoming events and join a community of thinkers."
        />

        {loading ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))", gap: 24 }}>
            {[...Array(8)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : filteredExpos.length === 0 ? (
          <EmptyState />
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))", gap: 24 }}>
            {filteredExpos.map((expo, i) => (
              <ExpoCard
                key={expo._id}
                expo={expo}
                btnProps={getButtonProps(expo._id)}
                onAction={handleAction}
                index={i}
              />
            ))}
          </div>
        )}
      </div>

      {/* WHY ATTEND */}
      <InfoBanner />

      {/* CTA */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <CTABanner />
      </div>

      {/* FOOTER NOTE */}
      <div style={{ textAlign: "center", padding: "32px 24px", borderTop: `1px solid ${T.borderFaint}` }}>
        <p style={{ color: T.muted, fontSize: 12, letterSpacing: "0.08em" }}>
          © {new Date().getFullYear()} EventSphere · All rights reserved
        </p>
      </div>
    </div>
  );
}

export default ShowExpos;