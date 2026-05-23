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
// } from "@mui/material";
// import axios from "axios";

// // Theme Constants
// const NEON_CYAN = "#4CC9F0";
// const NEON_AMBER = "#FFD166";

// function UsersRatings() {
//   const [ratings, setRatings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     fetchRatings();
//   }, []);

//   const fetchRatings = async () => {
//     setLoading(true);
//     setError("");
//     try {
//       const res = await axios.get("http://localhost:3001/api/ratings");
//       const sortedRatings = res.data.ratings.sort(
//         (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//       );
//       setRatings(sortedRatings);
//     } catch (err) {
//       setError("Failed to fetch ratings");
//     } finally {
//       setLoading(false);
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
//           Loading Ratings...
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
//           Users Ratings
//         </Typography>

//         {error && (
//           <Alert severity="error" sx={{ mb: 2, borderRadius: "10px" }}>
//             {error}
//           </Alert>
//         )}

//         {ratings.length === 0 ? (
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
//               No Ratings Found
//             </Typography>
//             <Typography sx={{ color: "rgba(148, 163, 184, 0.6)", mt: 1 }}>
//               Looks like there are no ratings submitted yet.
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
//                   {["User Name", "Email", "Rating", "Message", "Submitted At"].map((heading) => (
//                     <TableCell
//                       key={heading}
//                       align={heading === "Rating" ? "center" : "left"}
//                       sx={{
//                         color: "#A2EDFF !important",
//                         fontWeight: "900",
//                         fontSize: "1.1rem",
//                         textTransform: "uppercase",
//                         letterSpacing: "1.5px",
//                         borderBottom: "3px solid rgba(76, 201, 240, 0.4)",
//                         padding: "24px",
//                         fontFamily: "'Poppins', sans-serif",
//                       }}
//                     >
//                       {heading}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               </TableHead>

//               <TableBody>
//                 {ratings.map((rating) => (
//                   <TableRow
//                     key={rating._id}
//                     sx={{
//                       "&:hover": { backgroundColor: "rgba(76, 201, 240, 0.03)" },
//                       transition: "all 0.3s",
//                       "& td": { borderBottom: "1px solid rgba(255, 255, 255, 0.05)" },
//                     }}
//                   >
//                     <TableCell sx={{ color: "#F1F5F9", fontWeight: 600 }}>
//                       {rating.fullName || rating.userId?.name || "—"}
//                     </TableCell>
//                     <TableCell sx={{ color: "#94A3B8" }}>
//                       {rating.email || rating.userId?.email || "—"}
//                     </TableCell>
//                     <TableCell sx={{ color: NEON_AMBER, fontWeight: "bold", textAlign: "center" }}>
//                       {"⭐".repeat(rating.rating)}{" "}
//                       {rating.rating < 5 ? "☆".repeat(5 - rating.rating) : ""}
//                     </TableCell>
//                     <TableCell
//                       sx={{
//                         color: "#94A3B8",
//                         maxWidth: 200,
//                         whiteSpace: "nowrap",
//                         overflow: "hidden",
//                         textOverflow: "ellipsis",
//                       }}
//                     >
//                       {rating.message}
//                     </TableCell>
//                     <TableCell sx={{ color: "#94A3B8", fontSize: "0.8rem" }}>
//                       {new Date(rating.createdAt).toLocaleString()}
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

// export default UsersRatings;
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
const StarIcon = ({ size = 20, filled = true }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? GOLD : "none"} stroke={GOLD} strokeWidth="1.5">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const StarEmptyIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="rgba(201,168,76,0.25)" strokeWidth="1.5">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
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

const EmptyBoxIcon = ({ size = 48 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.3">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
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

// ─── RATING STARS DISPLAY ─────────────────────────────────────────
function RatingStars({ rating }) {
  return (
    <div style={{ display: "flex", gap: "3px", alignItems: "center", justifyContent: "center" }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star}>
          {star <= rating ? <StarIcon size={16} filled /> : <StarEmptyIcon size={16} />}
        </span>
      ))}
      <span
        style={{
          marginLeft: "8px",
          color: GOLD,
          fontWeight: 700,
          fontSize: "0.85rem",
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        {rating}/5
      </span>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────
function UsersRatings() {
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchRatings();
  }, []);

  const fetchRatings = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get("http://localhost:3001/api/ratings");
      const sortedRatings = res.data.ratings.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setRatings(sortedRatings);
    } catch (err) {
      setError("Failed to fetch ratings");
    } finally {
      setLoading(false);
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
          Loading Ratings
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
            <StarIcon size={24} filled />
            <span
              style={{
                color: GOLD,
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "4px",
                textTransform: "uppercase",
              }}
            >
              Feedback Center
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
            Users Ratings
          </h1> */}
          <h1 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 700,
            color: G.white, lineHeight: 1.1, marginBottom: "12px",
            letterSpacing: "-0.01em",
          }}>
            User <span style={{ color: G.gold, fontStyle: "italic" }}>Ratings</span>
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

        {/* Toast */}
        {error && <PremiumToast message={error} type="error" onClose={() => setError("")} />}

        {/* Content */}
        {ratings.length === 0 ? (
          <GlassCard>
            <div style={{ padding: "80px 20px", textAlign: "center" }}>
              <EmptyBoxIcon size={48} />
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
                No Ratings Found
              </p>
              <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.9rem" }}>
                Looks like there are no ratings submitted yet.
              </p>
            </div>
          </GlassCard>
        ) : (
          <GlassCard>
            {/* Table Header */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "160px 220px 140px 1fr 160px",
                padding: "18px 28px",
                borderBottom: "1px solid rgba(201,168,76,0.1)",
                background: "linear-gradient(90deg, rgba(201,168,76,0.03), transparent)",
              }}
            >
              {["User Name", "Email", "Rating", "Message", "Submitted At"].map(
                (heading, i) => (
                  <div
                    key={heading}
                    style={{
                      color: GOLD,
                      fontSize: "0.7rem",
                      fontWeight: 800,
                      letterSpacing: "2px",
                      textTransform: "uppercase",
                      textAlign: i === 2 ? "center" : "left",
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
            {ratings.map((rating, index) => (
              <div
                key={rating._id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "160px 220px 140px 1fr 160px",
                  alignItems: "center",
                  padding: "16px 28px",
                  borderBottom:
                    index < ratings.length - 1
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
                  {rating.fullName || rating.userId?.name || "—"}
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
                  {rating.email || rating.userId?.email || "—"}
                </div>

                {/* Rating Stars */}
                <div style={{ textAlign: "center" }}>
                  <RatingStars rating={rating.rating} />
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
                  title={rating.message}
                >
                  {rating.message}
                </div>

                {/* Submitted At */}
                <div
                  style={{
                    color: "rgba(255,255,255,0.4)",
                    fontSize: "0.78rem",
                    fontFamily: "'Poppins', sans-serif",
                    whiteSpace: "nowrap",
                    paddingRight: "12px",
                  }}
                >
                  {formatDate(rating.createdAt)}
                </div>
              </div>
            ))}
          </GlassCard>
        )}
      </div>
    </div>
  );
}

export default UsersRatings;